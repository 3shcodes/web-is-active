package services

import (
	"be-isweb/database"
	"be-isweb/models"
	"errors"
	"fmt"
	"net/http"
	"time"
)

type UserTools struct {
	IsWebDB *database.MySql
}

func UserToolConstruct(d *database.MySql) UserServices {
	return &UserTools{
		IsWebDB: d,
	}
}

func CheckSite(site models.Site) (models.Site, error) {
	stat, err := http.Get("http://" + site.Url)
	if err != nil {
		site.LastTime = time.Now().Format("2006-01-02 15:04:05")
		return site, err
	}

	resState := stat.StatusCode
	fmt.Println(resState)
	site.LastStat = resState

	site.LastTime = time.Now().Format("2006-01-02 15:04:05")
	return site, nil
}

func (app *UserTools) EditAccount(updatedUser models.User) *models.Resp {

    ok := updatedUser.Validate();
    if(!ok) {
        return models.PResMaker("User obj error", nil, 403, errors.New("User Object Error"));
    }

    if err := app.IsWebDB.UpdateUser(updatedUser); err != nil {
        return models.PResMaker("Internal Server Error", nil, 500, err);
    }
    
	return models.PResMaker("User updated Successfully", nil, 200, nil);
}


func (app *UserTools) DeleteAccount(userName string) *models.Resp {

    users, err := app.IsWebDB.GetUsers("",userName);
    if (len(users) != 1) {
        return models.PResMaker("Internal Server Error", nil, 500, err);
    }

    if err = app.IsWebDB.RemoveUser(userName); err != nil {
        return models.PResMaker("Internal Server Error", nil, 500, err);
    }

	return models.PResMaker("User updated Successfully", nil, 200, nil);
}

func (app *UserTools) GetSites(userName string) *models.Resp {

	sites, err := app.IsWebDB.GetSites("", userName)
	if err != nil {
		return models.PResMaker("Internal server error", nil, 500, err);
	}

	return models.PResMaker("Sites Derived Successfully", sites, 200, nil)

}

func (app *UserTools) AddSite(userName string, newSite models.Site) *models.Resp {

    ok := newSite.Validate();
    if (!ok) {
        return models.PResMaker("Site obj error", nil, 403, errors.New("Site Object Error"));
    }

    fixedState, err := CheckSite(newSite);
    if (err != nil) {
		return models.PResMaker("Internal server error", nil, 500, err);
    }

    err = app.IsWebDB.InsertSite(fixedState);
    if ( err != nil ) {
		return models.PResMaker("Internal server error", nil, 500, err);
    }

    var newRel models.UserSite;
    newRel.UserName = userName;
    newRel.SiteName = fixedState.SiteName;

    if err = app.IsWebDB.InsertRels(newRel); err != nil {
		return models.PResMaker("Internal server error", nil, 500, err);
    }
	return models.PResMaker("User updated Successfully", nil, 200, nil);
}


func (app *UserTools) ToggleFav(userName, siteName string) *models.Resp {
    
    rels, err := app.IsWebDB.GetRels(userName, siteName);
    if (err != nil ) {
		return models.PResMaker("Internal server error", nil, 500, err);
    }

    if ( len(rels) != 1 ) {
        return models.PResMaker("Site obj error", nil, 403, errors.New("Site Object Error"));
    }

    rels[0].IsFav=!rels[0].IsFav;

    if err = app.IsWebDB.UpdateRels(rels[0]); err != nil {
		return models.PResMaker("Internal server error", nil, 500, err);
    }
    
	return models.PResMaker("Fav updated Successfully", nil, 200, nil);
}



func (app *UserTools) UpdateSite(siteName string) *models.Resp {

    sites, err := app.IsWebDB.GetSites(siteName, "" );
    if err != nil {
		return models.PResMaker("Internal server error", nil, 500, err);
    }
    if ( len(sites) != 1 ) {
        return models.PResMaker("Site obj error", nil, 403, errors.New("Site Object Error"));
    }


    resSite, err := CheckSite(sites[0]);
    if err != nil {
		return models.PResMaker("Internal server error", nil, 500, err);
    }

    if err = app.IsWebDB.UpdateSite(resSite); err != nil {
		return models.PResMaker("Internal server error", nil, 500, err);
    }


	return models.PResMaker("User updated Successfully", resSite, 200, nil);
}


func (app *UserTools) UpdateSome(newSitesArr []string) *models.Resp {

    var resSites []any
    for _,v := range newSitesArr {
        resp := app.UpdateSite(v);
        if (resp.Err != nil ) {
            return resp;
        }
        resSites = append(resSites, resp.Data);
    }

	return models.PResMaker("Sites updated Successfully", resSites, 200, nil);
}

func (app *UserTools) DeleteSite(userName, siteName string) *models.Resp {

    if err := app.IsWebDB.RemoveRel(userName, siteName); err != nil {
		return models.PResMaker("Internal server error", nil, 500, err);
    }
        
	return models.PResMaker("Site removed Successfully", nil, 200, nil);
}
