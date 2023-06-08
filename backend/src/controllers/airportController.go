package controllers

import (
	"context"
	"flight-comparer/backend/src/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"time"
)

var airportCollection = GetCollection(DB, "airport")

func GetAirports() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airports []models.Airport
		defer cancel()

		cur, err := airportCollection.Aggregate(ctx, mongo.Pipeline{
			bson.D{
				{"$unwind",
					bson.D{
						{"path", "$lounges"},
						{"preserveNullAndEmptyArrays", true},
					},
				},
			},
			bson.D{
				{"$lookup",
					bson.D{
						{"from", "amenity"},
						{"localField", "lounges.amenities"},
						{"foreignField", "_id"},
						{"as", "lounges.amenities"},
					},
				},
			},
			bson.D{
				{"$lookup",
					bson.D{
						{"from", "airline"},
						{"localField", "lounges.airlines"},
						{"foreignField", "_id"},
						{"as", "lounges.airlines"},
					},
				},
			},
			bson.D{
				{"$group",
					bson.D{
						{"_id", "$_id"},
						{"code", bson.D{{"$first", "$code"}}},
						{"name", bson.D{{"$first", "$name"}}},
						{"location", bson.D{{"$first", "$location"}}},
						{"position", bson.D{{"$first", "$position"}}},
						{"lounges", bson.D{{"$push", "$lounges"}}},
					},
				},
			},
			bson.D{{"$sort", bson.D{{"code", 1}}}},
		})
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
		var airport []models.Airport
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		cur, err := airportCollection.Aggregate(ctx, mongo.Pipeline{
			bson.D{{"$match", bson.D{{"_id", id}}}},
			bson.D{
				{"$unwind",
					bson.D{
						{"path", "$lounges"},
						{"preserveNullAndEmptyArrays", true},
					},
				},
			},
			bson.D{
				{"$lookup",
					bson.D{
						{"from", "amenity"},
						{"localField", "lounges.amenities"},
						{"foreignField", "_id"},
						{"as", "lounges.amenities"},
					},
				},
			},
			bson.D{
				{"$lookup",
					bson.D{
						{"from", "airline"},
						{"localField", "lounges.airlines"},
						{"foreignField", "_id"},
						{"as", "lounges.airlines"},
					},
				},
			},
			bson.D{
				{"$group",
					bson.D{
						{"_id", "$_id"},
						{"code", bson.D{{"$first", "$code"}}},
						{"name", bson.D{{"$first", "$name"}}},
						{"location", bson.D{{"$first", "$location"}}},
						{"position", bson.D{{"$first", "$position"}}},
						{"lounges", bson.D{{"$push", "$lounges"}}},
					},
				},
			},
			bson.D{{"$sort", bson.D{{"code", 1}}}},
			bson.D{{"$limit", 1}},
		})
		if err != nil {
			panic(err)
		}

		err = cur.All(ctx, &airport)
		if err != nil {
			panic(err)
		}
		if err := cur.Close(ctx); err != nil {
			panic(err)
		}

		c.IndentedJSON(http.StatusOK, airport[0])
		return
	}
}

func CreateAirport() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airport models.AirportDB
		defer cancel()

		err := c.BindJSON(&airport)
		if err != nil {
			panic(err)
		}

		result, err := airportCollection.InsertOne(ctx, bson.D{
			{"code", airport.Code},
			{"name", airport.Name},
			{"location", airport.Location},
			{"position", airport.Position},
		})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func UpdateAirport() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var airport models.AirportDB
		defer cancel()

		err := c.BindJSON(&airport)
		if err != nil {
			panic(err)
		}

		result, err := airportCollection.UpdateOne(ctx, bson.D{{"_id", airport.ID}}, bson.D{{"$set", bson.D{
			{"_id", airport.ID},
			{"code", airport.Code},
			{"name", airport.Name},
			{"location", airport.Location},
			{"position", airport.Position},
			{"lounges", airport.Lounges},
		}}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func DeleteAirport() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		result, err := airportCollection.DeleteOne(ctx, bson.D{{"_id", id}})
		if err != nil {
			panic(err)
		}

		_, err = flightCollection.DeleteMany(ctx, bson.D{{"departure.airport", id}})
		if err != nil {
			panic(err)
		}

		_, err = flightCollection.DeleteMany(ctx, bson.D{{"arrival.airport", id}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}
