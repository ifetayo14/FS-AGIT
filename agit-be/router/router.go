package router

import (
	"MyGram/controllers"
	"MyGram/middlewares"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000/")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			c.JSON(204, "No Content")
			return
		}

		c.Next()
	}
}

func StartApp() *gin.Engine {
	r := gin.Default()

	r.Use(CORSMiddleware())

	userRouter := r.Group("")
	{
		userRouter.POST("/login", controllers.UserLogin)
		userRouter.POST("/register", controllers.UserRegister)
	}

	employeeRouter := r.Group("/employee")
	{
		employeeRouter.Use(middlewares.Authentication())
		employeeRouter.GET("/", controllers.GetAllEmployee)
		employeeRouter.GET("/:id", controllers.GetDetailEmployee)
		employeeRouter.POST("/", controllers.CreateEmployee)
		employeeRouter.PUT("/:id", controllers.UpdateEmployee)
		employeeRouter.DELETE("/:id", controllers.DeleteEmployee)
	}

	return r
}
