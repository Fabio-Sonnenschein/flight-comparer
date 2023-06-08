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

var tripCollection = GetCollection(DB, "trip")

func GetTrips() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var trips []models.Trip
		defer cancel()

		cur, err := tripCollection.Find(ctx, bson.M{}, options.Find().SetSort(bson.D{{"name", 1}}))
		if err != nil {
			panic(err)
		}

		err = cur.All(ctx, &trips)
		if err != nil {
			panic(err)
		}
		defer cur.Close(ctx)

		c.JSON(http.StatusOK, trips)
		return
	}
}

func GetTripById() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var trip models.Trip
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		query := tripCollection.FindOne(ctx, bson.M{"_id": id})
		if query.Err() != nil {
			panic(query.Err())
		}

		err = query.Decode(&trip)
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, trip)
		return
	}
}

func CreateTrip() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var trip models.Trip
		defer cancel()

		err := c.BindJSON(&trip)
		if err != nil {
			panic(err)
		}

		result, err := tripCollection.InsertOne(ctx, bson.D{
			{"name", trip.Name},
			{"description", trip.Description},
			{"vendor", trip.Vendor},
			{"link", trip.Link},
			{"roundTrip", trip.RoundTrip},
			{"airlines", trip.Airlines},
			{"cost", trip.Cost},
			{"flights", trip.Flights},
		})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func UpdateTrip() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var trip models.Trip
		defer cancel()

		err := c.BindJSON(&trip)
		if err != nil {
			panic(err)
		}

		result, err := tripCollection.UpdateOne(ctx, bson.D{{"_id", trip.ID}}, bson.D{{"$set", bson.D{
			{"name", trip.Name},
			{"description", trip.Description},
			{"vendor", trip.Vendor},
			{"link", trip.Link},
			{"roundTrip", trip.RoundTrip},
			{"airlines", trip.Airlines},
			{"cost", trip.Cost},
			{"flights", trip.Flights},
		}}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func DeleteTrip() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		result, err := tripCollection.DeleteOne(ctx, bson.D{{"_id", id}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}
