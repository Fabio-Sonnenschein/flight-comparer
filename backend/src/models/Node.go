package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Node struct {
	ID       primitive.ObjectID `bson:"_id" json:"_id"`
	Type     string             `json:"type"`
	Node     primitive.ObjectID `json:"node"`
	Endpoint bool               `json:"endpoint"`
}
