package controllers

import (
	"be-isweb/middleware"
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

func (app *UserController) UserRoutes(incomingRoutes *gin.RouterGroup) {

	routes := incomingRoutes.Group("/user")
	routes.Use(middleware.Authenticate())
	routes.PUT("/upduser", app.EditAccount)
	routes.DELETE("/deluser", app.DeleteAccount)
	routes.GET("/getsites", app.GetSites)
	routes.POST("/addsite", app.AddSite)
	routes.PUT("/togfav", app.ToggleFav)
	routes.PUT("/updsite", app.UpdateSite)
	routes.PUT("/updsites", app.UpdateSome)
	routes.PUT("/delsite", app.DeleteSite)

}

func (app *UserController) EditAccount(c *gin.Context) {

}
func (app *UserController) DeleteAccount(c *gin.Context) {}

func (app *UserController) GetSites(c *gin.Context) {

	userName := c.Query("userName")
	if userName == "" {
		c.JSON(403, gin.H{"msg": "No UserName", "ok": false})
		return
	}

	resp := app.Funcs.GetSites(userName)
	if resp.Err != nil {
		c.JSON(resp.Stat, gin.H{"msg": resp.Msg, "ok": false, "err": resp.Err})
		return
	}

	c.JSON(200, gin.H{"msg": "All sites Recieved", "ok": true, "sites": resp.Data})
	return
}

func (app *UserController) AddSite(c *gin.Context)    {}
func (app *UserController) ToggleFav(c *gin.Context)  {}
func (app *UserController) UpdateSite(c *gin.Context) {}
func (app *UserController) UpdateSome(c *gin.Context) {}
func (app *UserController) DeleteSite(c *gin.Context) {}
