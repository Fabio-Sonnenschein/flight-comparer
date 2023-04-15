package routes

import (
	"flight-comparer/backend/src/controllers"
	"github.com/gin-gonic/gin"
)

func FlightRouter(router *gin.Engine) {
	router.GET("/flight/all", controllers.GetFlights())
	router.GET("/flight/:id", controllers.GetFlightById())
}
