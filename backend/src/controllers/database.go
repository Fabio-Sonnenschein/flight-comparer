package controllers

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func ConnectToDatabase() *mongo.Client {
	c, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatalln(err)
	}

	err = client.Connect(c)
	if err != nil {
		log.Fatalln(err)
	}

	err = client.Ping(c, readpref.Primary())
	if err != nil {
		log.Fatalln(err)
	}

	log.Println("Database connection established.")
	return client
}

var DB *mongo.Client = ConnectToDatabase()

func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("flight-comparer").Collection(collectionName)
	return collection
}
