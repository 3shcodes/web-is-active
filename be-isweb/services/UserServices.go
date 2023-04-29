package services

import (
	"be-isweb/database"
	"be-isweb/models"
)

type UserTools struct {
	IsWebDB *database.MySql
}

func UserToolConstruct(d *database.MySql) UserServices {
	return &UserTools{
		IsWebDB: d,
	}
}

func (app *UserTools) EditAccount(updatedUser models.User) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func (app *UserTools) DeleteAccount(userName string) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}

func (app *UserTools) GetSites(userName string) *models.Resp {

	sites, err := app.IsWebDB.GetSites("", userName)
	if err != nil {
		return models.PResMaker("Internal server error", nil, 500, err)
	}

	return models.PResMaker("Sites Derived Successfully", sites, 200, nil)
}

func (app *UserTools) AddSite(newSite models.Site) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func (app *UserTools) ToggleFav(userName, siteName string) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func (app *UserTools) UpdateSite(updatedSite models.Site) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func (app *UserTools) UpdateSome(newSitesArr []models.Site) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func (app *UserTools) DeleteSite(userName, siteName string) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
