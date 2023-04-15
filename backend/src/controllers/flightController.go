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
