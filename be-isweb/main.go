package main

import (
	"be-isweb/controllers"
	"be-isweb/database"
	"be-isweb/services"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	port            string
	app             *gin.Engine
	IsWebDB         *database.MySql
	AuthControllers controllers.AuthController
	UserControllers controllers.UserController
)

func init() {
	godotenv.Load()
	config := os.Getenv("MYSQL")
	IsWebDB = database.DbHere(config)
	AuthServices := services.AuthToolsCons(IsWebDB)
	AuthControllers = *controllers.GetAuthController(AuthServices)

	app = gin.Default()
	port = os.Getenv("PORT")
	app.Use(cors.Default())
}

func main() {

	fmt.Println("Aramikalangala")
	defer IsWebDB.Db.Close()
	basePath := app.Group("/apis")
	AuthControllers.AuthRoutes(basePath)
	app.Run(":" + port)
	fmt.Println("Aramichachu")

}
