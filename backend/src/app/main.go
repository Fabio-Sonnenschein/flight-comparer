package main

import (
	"flight-comparer/backend/src/middlewares"
	"flight-comparer/backend/src/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	err := router.SetTrustedProxies([]string{"127.0.0.1"})
	if err != nil {
		log.Fatalln(err)
	}

	router.Use(middlewares.CORSMiddleware())

	routes.AirlineRouter(router)
	routes.AirportRouter(router)
	routes.AmenityRouter(router)
	routes.FlightRouter(router)

	err = router.Run("localhost:8080")
	if err != nil {
		log.Fatalln(err)
	}
}
