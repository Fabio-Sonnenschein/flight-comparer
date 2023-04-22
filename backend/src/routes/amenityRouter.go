package routes

import (
	"flight-comparer/backend/src/controllers"
	"github.com/gin-gonic/gin"
)

func AmenityRouter(router *gin.Engine) {
	router.GET("/amenity/all", controllers.GetAmenities())

	router.POST("/amenity", controllers.CreateAmenity())

	router.PUT("/amenity", controllers.UpdateAmenity())

	router.DELETE("/amenity/:id", controllers.DeleteAmenity())
}
