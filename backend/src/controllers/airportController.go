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

var airportCollection = GetCollection(DB, "airport")

func GetAirports() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airports []models.Airport
		defer cancel()

		opts := options.Find().SetSort(bson.D{{"code", 1}})
		cur, err := airportCollection.Find(ctx, bson.M{}, opts)
		if err != nil {
			panic(err)
		}

		err = cur.All(ctx, &airports)
		if err != nil {
			panic(err)
		}
		defer cur.Close(ctx)

		c.IndentedJSON(http.StatusOK, airports)
		return
	}
}

func GetAirportById() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airport models.Airport
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		query := airportCollection.FindOne(ctx, bson.M{"_id": id})
		if query.Err() != nil {
			panic(query.Err())
		}

		err = query.Decode(&airport)
		if err != nil {
			panic(err)
		}

		c.IndentedJSON(http.StatusOK, airport)
		return
	}
}
