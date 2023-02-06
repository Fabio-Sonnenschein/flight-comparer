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

var airlineCollection = GetCollection(DB, "airline")

func GetAirlines() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airlines []models.Airline
		defer cancel()

		cur, err := airlineCollection.Find(ctx, bson.M{})
		if err != nil {
			panic(err)
		}

		err = cur.All(ctx, &airlines)
		if err != nil {
			panic(err)
		}
		defer cur.Close(ctx)

		c.IndentedJSON(http.StatusOK, airlines)
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

		c.IndentedJSON(http.StatusOK, airline)
		return
	}
}
