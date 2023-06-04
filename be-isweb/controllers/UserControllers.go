package controllers

import (
	"be-isweb/middleware"
    "fmt"
	"be-isweb/models"
	"be-isweb/services"
	"errors"
	"log"

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

    var accModel models.User;
    if err := c.ShouldBindJSON(&accModel); err != nil {
        c.JSON(403, gin.H{ "ok":false, "msg":"Invalid user object", "err":err});
        log.Println(err);
        return;
    }

    resp := app.Funcs.EditAccount(accModel);

    if (resp.Err != nil) {
        c.JSON(500, gin.H{ "ok": false, "msg": "Internal Server Error" , "err": resp.Err});
        log.Println(resp.Err);
        return;
    }
    c.JSON(200, gin.H{"ok":true, "err": nil, "msg": "User Updated Successfully!"});
    return;

}

func (app *UserController) DeleteAccount(c *gin.Context) {
    
    qUserId := c.Query("userName");
    if (qUserId=="") {
        c.JSON(403, gin.H{ "ok":false, "msg":"Invalid user object", "err": "No user name provided"});
        log.Println(errors.New("No username provided"));
        return;
    }

    resp := app.Funcs.DeleteAccount(qUserId);
    if (resp.Err != nil) {
        c.JSON(500, gin.H{ "ok": false, "msg": "Internal Server Error" , "err": resp.Err});
        log.Println(resp.Err);
        return;
    }
    c.JSON(200, gin.H{"ok":true, "err": nil, "msg": "User Deleted Successfully!"});
    return;

}

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

func (app *UserController) AddSite(c *gin.Context) {

    var siteModel models.Site;
    userName := c.Query("userName");
    if err := c.ShouldBindJSON(&siteModel); err != nil {
        c.JSON(403, gin.H{ "ok":false, "msg":"Invalid site object", "err":err});
        log.Println(err);
        return;
    }

    resp := app.Funcs.AddSite(userName, siteModel);

    if (resp.Err != nil) {
        c.JSON(500, gin.H{ "ok": false, "msg": "Internal Server Error" , "err": resp.Err});
        log.Println(resp.Err);
        return;
    }
    c.JSON(200, gin.H{"ok":true, "err": nil, "msg": "Site Added Successfully!"});
    return;


}


func (app *UserController) ToggleFav(c *gin.Context)  {
    
    userName := c.Query("userName");
    siteName := c.Query("siteName");
	if siteName == "" || userName == "" {
		c.JSON(403, gin.H{"msg": "No UserName or SiteName", "ok": false});
		return;
	}

    resp := app.Funcs.ToggleFav(userName,siteName);
    if (resp.Err != nil) {
        c.JSON(500, gin.H{ "ok": false, "msg": "Internal Server Error" , "err": resp.Err});
        log.Println(resp.Err);
        return;
    }

    c.JSON(200, gin.H{ "ok":true, "err": nil, "msg": "Fav Stat Changed Successfully"});
    return;

}



func (app *UserController) UpdateSite(c *gin.Context) {

    siteName := c.Query("siteName");
	if siteName == ""  {
		c.JSON(403, gin.H{"msg": "No sitename", "ok": false});
		return;
	}

    resp := app.Funcs.UpdateSite(siteName);
    if (resp.Err != nil) {
        c.JSON(500, gin.H{ "ok": false, "msg": "Internal Server Error" , "err": resp.Err});
        log.Println(resp.Err);
        return;
    }

    c.JSON(200, gin.H{ "ok":true, "err": nil, "msg": "Site Updated Successfully", "data": resp.Data });
    return;
}


func (app *UserController) UpdateSome(c *gin.Context) {

    var siteReq models.SitesArr;
    if err := c.ShouldBindJSON(&siteReq); err != nil {
        c.JSON(403, gin.H{ "ok":false, "msg":"Invalid user object", "err":err});
        log.Println(err);
        return;
    }
    fmt.Println(siteReq);

    resp := app.Funcs.UpdateSome(siteReq.ThatArr);
    if ( resp.Err != nil ) {
        c.JSON(500, gin.H{ "ok": false, "msg": "Internal Server Error" , "err": resp.Err});
        log.Println(resp.Err);
        return;
    }

    c.JSON(200, gin.H{ "ok":true, "err": nil, "msg": "Site Updated Successfully", "data": resp.Data });
    return;
}

func (app *UserController) DeleteSite(c *gin.Context) {

    userName := c.Query("userName");
    siteName := c.Query("siteName");
    if (userName=="" || siteName=="") {
        c.JSON(403, gin.H{ "ok":false, "msg":"Invalid user object", "err": "No user name provided"});
        log.Println(errors.New("No username provided"));
        return;
    }

    resp := app.Funcs.DeleteSite(userName, siteName);
    if (resp.Err != nil) {
        c.JSON(500, gin.H{ "ok": false, "msg": "Internal Server Error" , "err": resp.Err});
        log.Println(resp.Err);
        return;
    }
    c.JSON(200, gin.H{"ok":true, "err": nil, "msg": "Site Deleted Successfully!"});
    return;

}
