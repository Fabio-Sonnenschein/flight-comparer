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

var amenityCollection = GetCollection(DB, "amenity")

func GetAmenities() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var amenities []models.Amenity
		defer cancel()

		cur, err := amenityCollection.Find(ctx, bson.M{}, options.Find().SetSort(bson.D{{"text", 1}}))
		if err != nil {
			panic(err)
		}

		err = cur.All(ctx, &amenities)
		if err != nil {
			panic(err)
		}
		defer cur.Close(ctx)

		c.JSON(http.StatusOK, amenities)
		return
	}
}

func CreateAmenity() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var amenity models.Amenity
		defer cancel()

		err := c.BindJSON(&amenity)
		if err != nil {
			panic(err)
		}

		result, err := amenityCollection.InsertOne(ctx, bson.D{
			{"description", amenity.Description},
			{"icon", amenity.Icon},
			{"text", amenity.Text},
		})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func UpdateAmenity() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var amenity models.Amenity
		defer cancel()

		err := c.BindJSON(&amenity)
		if err != nil {
			panic(err)
		}

		result, err := amenityCollection.UpdateOne(ctx, bson.D{{"_id", amenity.ID}}, bson.D{{"$set", bson.D{
			{"_id", amenity.ID},
			{"description", amenity.Description},
			{"icon", amenity.Icon},
			{"text", amenity.Text},
		}}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}

func DeleteAmenity() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			panic(err)
		}

		result, err := amenityCollection.DeleteOne(ctx, bson.D{{"_id", id}})
		if err != nil {
			panic(err)
		}

		_, err = airportCollection.DeleteMany(ctx, bson.D{{"lounges.amenities", id}})
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, result)
		return
	}
}
