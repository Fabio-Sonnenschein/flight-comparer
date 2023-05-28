package routes

import (
	"flight-comparer/backend/src/controllers"
	"github.com/gin-gonic/gin"
)

func AirportRouter(router *gin.Engine) {
	router.GET("/airport/all", controllers.GetAirports())
	router.GET("/airport/:id", controllers.GetAirportById())

	router.POST("/airport", controllers.CreateAirport())

	router.PUT("/airport", controllers.UpdateAirport())

	router.DELETE("/airport/:id", controllers.DeleteAirport())
}
