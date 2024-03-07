package controllers

import (
	"MyGram/database"
	"MyGram/helpers"
	"MyGram/models"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"strings"
	"time"
)

func CreateEmployee(c *gin.Context) {
	db := database.GetDB()
	contentType := helpers.GetContentType(c)
	userData := c.MustGet("userData").(jwt.MapClaims)
	userID := userData["id"].(string)

	employee := models.Employee{}

	if contentType == appJSON {
		c.ShouldBindJSON(&employee)
	} else {
		c.ShouldBind(&employee)
	}

	employee.ID = uuid.New()
	employee.CreatedBy = uuid.MustParse(userID)

	err := db.Debug().Create(&employee).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err":     "Bad Request",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, employee)
}

func GetAllEmployee(c *gin.Context) {
	db := database.GetDB()
	employee := []models.Employee{}
	userData := c.MustGet("userData").(jwt.MapClaims)
	userID := userData["id"].(string)

	err := db.Model(&models.Employee{}).Where("created_by = ?", userID).Where("deleted_at IS NULL").Find(&employee).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err":     "Bad Request",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, employee)
}

func GetDetailEmployee(c *gin.Context) {
	db := database.GetDB()
	employee := models.Employee{}
	employeeId := c.Param("id")

	err := db.Model(&models.Employee{}).Where("id = ?", employeeId).First(&employee).Error
	currTime := strings.TrimRight(employee.DOB, "T")
	employee.DOB = currTime

	fmt.Printf("\n\n%v\n\n", employee.DOB)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err":     "Bad Request",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, employee)
}

func UpdateEmployee(c *gin.Context) {
	db := database.GetDB()
	contentType := helpers.GetContentType(c)
	employee := models.Employee{}
	employeeId := c.Param("id")

	if contentType == appJSON {
		c.ShouldBindJSON(&employee)
	} else {
		c.ShouldBind(&employee)
	}

	err := db.Model(&models.Employee{}).Where("id = ?", employeeId).Updates(models.Employee{
		Name:        employee.Name,
		NIP:         employee.NIP,
		POB:         employee.POB,
		DOB:         employee.DOB,
		Age:         employee.Age,
		Address:     employee.Address,
		Religion:    employee.Religion,
		Gender:      employee.Gender,
		PhoneNumber: employee.PhoneNumber,
		Email:       employee.Email,
	}).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err":     "Bad Request",
			"message": err.Error(),
		})
		return
	}

	err = db.Model(&models.Employee{}).Where("id = ?", employeeId).First(&employee).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err":     "Bad Request",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, employee)
}

func DeleteEmployee(c *gin.Context) {
	db := database.GetDB()
	employeeId := c.Param("id")

	err := db.Model(&models.Employee{}).Where("id = ?", employeeId).Update("deleted_at", time.Now()).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err":     "Bad Request",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Employee has been successfully deleted",
	})
}
