package controllers

import (
	"be-isweb/services"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	Funcs services.UserServices
}

func GetUserController(s services.UserServices) *UserController {
	return &UserController{
		Funcs: s,
	}
}

func (app *AuthController) UserRoutes(incomingRoutes *gin.RouterGroup) {

}
