package controllers

import (
	"be-isweb/models"
	"be-isweb/services"
	"fmt"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	Funcs services.AuthServices
}

func GetAuthController(s services.AuthServices) *AuthController {
	return &AuthController{
		Funcs: s,
	}
}

func (app *AuthController) AuthRoutes(incomingRoutes *gin.RouterGroup) {

	routes := incomingRoutes.Group("/auth")
	routes.POST("/signup", app.SignUp)
	routes.POST("/login", app.Login)
}

func (app *AuthController) SignUp(c *gin.Context) {

	var signupReq models.User

	if err := c.BindJSON(&signupReq); err != nil {
		c.JSON(403, gin.H{"msg": "Parsing Error", "err": err, "ok": false})
		return
	}

	resp := app.Funcs.SignUp(signupReq)
	if resp.Err != nil {
		c.JSON(500, gin.H{"msg": "Intrernal Server Error", "ok": false, "err": resp.Err})
		panic(resp.Err)
	}

	c.JSON(200, gin.H{"msg": "Signed Up Successfully", "ok": true})
	return

}

func (app *AuthController) Login(c *gin.Context) {

	var loginReq models.User

	if err := c.BindJSON(&loginReq); err != nil {
		c.JSON(403, gin.H{"msg": "Parsing Error", "err": err, "ok": false})
		return
	}
	fmt.Println(loginReq)

	resp := app.Funcs.Login(loginReq.UserName, loginReq.Password)
	if resp.Msg == "Wrong Password" {
		c.JSON(403, gin.H{"msg": "Wrong Password", "ok": false})
		return
	}
	if resp.Err != nil {
		c.JSON(500, gin.H{"msg": "Intrernal Server Error", "ok": false, "err": resp.Err})
		panic(resp.Err)
	}

	c.JSON(200, gin.H{"msg": "Authenticated Successfully", "ok": true, "user": resp.Data})
	return
}
