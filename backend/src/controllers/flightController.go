package controllers

import (
	"context"
	"flight-comparer/backend/src/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
)

var flightCollection = GetCollection(DB, "flight")

func GetFlights() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var flights []models.Flight
		defer cancel()

		cur, err := flightCollection.Find(ctx, bson.M{})
		if err != nil {
			panic(err)
		}

		err = cur.All(ctx, &flights)
		if err != nil {
			panic(err)
		}
		defer cur.Close(ctx)

		c.IndentedJSON(http.StatusOK, flights)
		return
	}
}

func GetFlightById() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var flight models.Flight
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		query := flightCollection.FindOne(ctx, bson.M{"_id": id})
		if query.Err() != nil {
			panic(query.Err())
		}

		err = query.Decode(&flight)
		if err != nil {
			panic(err)
		}

		c.IndentedJSON(http.StatusOK, flight)
		return
	}
}

func CreateFlight() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var flight models.Flight
		defer cancel()

		err := c.BindJSON(&flight)
		if err != nil {
			panic(err)
		}

		result, err := flightCollection.InsertOne(ctx, bson.D{
			{"airline", flight.Airline},
			{"number", flight.Number},
			{"aircraft", flight.Aircraft},
			{"cabin", flight.Cabin},
			{"departure", flight.Departure},
			{"duration", flight.Duration},
			{"overnight", flight.Overnight},
			{"arrival", flight.Arrival},
		})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func UpdateFlight() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var flight models.Flight
		defer cancel()

		err := c.BindJSON(&flight)
		if err != nil {
			panic(err)
		}

		result, err := flightCollection.UpdateOne(ctx, bson.D{{"_id", flight.ID}}, bson.D{{"$set", bson.D{
			{"_id", flight.ID},
			{"airline", flight.Airline},
			{"number", flight.Number},
			{"aircraft", flight.Aircraft},
			{"cabin", flight.Cabin},
			{"departure", flight.Departure},
			{"duration", flight.Duration},
			{"overnight", flight.Overnight},
			{"arrival", flight.Arrival},
		}}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func DeleteFlight() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		result, err := flightCollection.DeleteOne(ctx, bson.D{{"_id", id}})
		if err != nil {
			panic(err)
		}

		_, err = tripCollection.DeleteMany(ctx, bson.D{{"flights", id}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}
