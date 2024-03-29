package routes

import (
	"flight-comparer/backend/src/controllers"
	"github.com/gin-gonic/gin"
)

func AirlineRouter(router *gin.Engine) {
	router.GET("/airline/all", controllers.GetAirlines())
	router.GET("/airline/:id", controllers.GetAirlineById())

	router.POST("/airline", controllers.CreateAirline())

	router.PUT("/airline", controllers.UpdateAirline())

	router.DELETE("/airline/:id", controllers.DeleteAirline())
}
