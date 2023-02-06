package routes

import (
	"flight-comparer/backend/src/controllers"
	"github.com/gin-gonic/gin"
)

func AirportRouter(router *gin.Engine) {
	router.GET("/airport/all", controllers.GetAirports())
	router.GET("/airport/:id", controllers.GetAirportById())
}
