package routes

import (
	"flight-comparer/backend/src/controllers"
	"github.com/gin-gonic/gin"
)

func TripRouter(router *gin.Engine) {
	router.GET("/trip/all", controllers.GetTrips())
	router.GET("/trip/:id", controllers.GetTripById())

	router.POST("/trip", controllers.CreateTrip())

	router.PUT("/trip", controllers.UpdateTrip())

	router.DELETE("/trip/:id", controllers.DeleteTrip())
}
