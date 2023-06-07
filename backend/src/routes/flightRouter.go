package routes

import (
	"flight-comparer/backend/src/controllers"
	"github.com/gin-gonic/gin"
)

func FlightRouter(router *gin.Engine) {
	router.GET("/flight/all", controllers.GetFlights())
	router.GET("/flight/:id", controllers.GetFlightById())
	router.POST("/flight", controllers.CreateFlight())
	router.PUT("/flight", controllers.UpdateFlight())
	router.DELETE("/flight/:id", controllers.DeleteFlight())
}
