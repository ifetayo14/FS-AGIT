package controllers

import (
	"MyGram/database"
	"MyGram/helpers"
	"MyGram/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

var (
	appJSON = "application/json"
)

func UserRegister(c *gin.Context) {
	db := database.GetDB()
	contentType := helpers.GetContentType(c)
	_, _ = db, contentType
	user := models.User{}

	if contentType == appJSON {
		c.ShouldBindJSON(&user)
	} else {
		c.ShouldBind(&user)
	}

	user.ID = uuid.New()

	err := db.Debug().Create(&user).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "bad Request",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id":       user.ID,
		"username": user.Username,
	})
}

func UserLogin(c *gin.Context) {
	db := database.GetDB()
	contentType := helpers.GetContentType(c)
	_, _ = db, contentType
	User := models.User{}
	password := ""

	if contentType == appJSON {
		c.ShouldBindJSON(&User)
	} else {
		c.ShouldBind(&User)
	}

	password = User.Password

	err := db.Debug().Where("username = ?", User.Username).Take(&User).Error

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":   "Unauthorized",
			"message": "Invalid Email/Password",
		})
		return
	}

	comparePass := helpers.ComparePass([]byte(User.Password), []byte(password))

	if !comparePass {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":   "Unauthorized",
			"message": "Invalid Email/Password",
		})
		return
	}

	token := helpers.GenerateToken(User.ID.String(), User.Username)

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}
