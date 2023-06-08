package controllers

import (
	"context"
	"flight-comparer/backend/src/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"time"
)

var airlineCollection = GetCollection(DB, "airline")

func GetAirlines() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airlines []models.Airline
		defer cancel()

		cur, err := airlineCollection.Find(ctx, bson.M{}, options.Find().SetSort(bson.D{{"name", 1}}))
		if err != nil {
			panic(err)
		}

		err = cur.All(ctx, &airlines)
		if err != nil {
			panic(err)
		}
		defer cur.Close(ctx)

		c.JSON(http.StatusOK, airlines)
		return
	}
}

func GetAirlineById() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airline models.Airline
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		query := airlineCollection.FindOne(ctx, bson.M{"_id": id})
		if query.Err() != nil {
			panic(query.Err())
		}

		err = query.Decode(&airline)
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, airline)
		return
	}
}

func CreateAirline() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airline models.Airline
		defer cancel()

		err := c.BindJSON(&airline)
		if err != nil {
			panic(err)
		}

		result, err := airlineCollection.InsertOne(ctx, bson.D{
			{"alliance", airline.Alliance},
			{"code", airline.Code},
			{"name", airline.Name},
		})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func UpdateAirline() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airline models.Airline
		defer cancel()

		err := c.BindJSON(&airline)
		if err != nil {
			panic(err)
		}

		result, err := airlineCollection.UpdateOne(ctx, bson.D{{"_id", airline.ID}}, bson.D{{"$set", bson.D{
			{"_id", airline.ID},
			{"alliance", airline.Alliance},
			{"code", airline.Code},
			{"name", airline.Name},
		}}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func DeleteAirline() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		result, err := airlineCollection.DeleteOne(ctx, bson.D{{"_id", id}})
		if err != nil {
			panic(err)
		}

		_, err = flightCollection.DeleteMany(ctx, bson.D{{"airline", id}})
		if err != nil {
			panic(err)
		}

		_, err = tripCollection.DeleteMany(ctx, bson.D{{"airlines", id}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}
