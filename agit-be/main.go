package main

import (
	"MyGram/database"
	"MyGram/router"
	"github.com/joho/godotenv"
	"os"
)

func main() {
	godotenv.Load(".env")
	database.StartDB()
	r := router.StartApp()
	r.Run(os.Getenv("APP_PORT"))
}
