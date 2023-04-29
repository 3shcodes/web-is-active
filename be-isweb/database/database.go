package database

import (
	"be-isweb/models"
	"database/sql"
	"errors"

	_ "github.com/go-sql-driver/mysql"
)

type MySql struct {
	Db *sql.DB
}

func DbHere(conf string) *MySql {
	db, err := sql.Open("mysql", conf)
	if err != nil {
		panic(err)
	}

	return &MySql{
		Db: db,
	}
}

// create
func (inst *MySql) InsertUser(newUser models.User) error {

	qstring := `INSERT INTO users ( userName, email, password, image, token, refToken) VALUES (?,?,?,?,?,?);`
	insTool, err := inst.Db.Prepare(qstring)
	if err != nil {
		return err
	}

	defer insTool.Close()

	if _, err = insTool.Exec(newUser.UserName, newUser.Email, newUser.Password, newUser.Image, newUser.Token, newUser.RefToken); err != nil {
		return err
	}

	return nil
}

func (inst *MySql) InsertSite(newSite models.Site) error {

	qstring := `INSERT INTO sites ( siteName, url, lastStat, lastTime, issue ) VALUES (?,?,?,?,?);`
	insTool, err := inst.Db.Prepare(qstring)
	if err != nil {
		return err
	}

	defer insTool.Close()

	if _, err = insTool.Exec(newSite.SiteName, newSite.Url, newSite.LastStat, newSite.LastTime, newSite.Issue); err != nil {
		return err
	}

	return nil
}

func (inst *MySql) InsertUserSite(newRel models.UserSite) error {

	qstring := `INSERT INTO userSite ( userName, siteName, isFav ) VALUES (?,?,?);`
	insTool, err := inst.Db.Prepare(qstring)
	if err != nil {
		return err
	}

	defer insTool.Close()

	if _, err = insTool.Exec(newRel.UserName, newRel.SiteName, 0); err != nil {
		return err
	}

	return nil
}

// read
func (inst *MySql) GetUsers(inc string, exc string) ([]models.User, error) {

	var resUsers []models.User
	qstring := "SELECT * FROM users;"

	if inc != "" {
		qstring = `SELECT * FROM users WHERE userName LIKE "` + inc + `"`
	}
	if exc != "" {
		qstring = `SELECT * FROM users WHERE userName="` + exc + `"`
	}

	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resUsers = append(resUsers, models.UserScan(rows))
	}

	return resUsers, nil
}

func (inst *MySql) GetSites(inc string, exc string) ([]models.Site, error) {

	var resSites []models.Site
	qstring := "SELECT * FROM sites;"

	if inc != "" {
		qstring = `SELECT * FROM site WHERE siteName LIKE "` + inc + `"`
	}
	if exc != "" {
		qstring = `SELECT siteId,sites.siteName,url,lastStat,lastTime,issue FROM sites LEFT JOIN userSite on sites.siteName=userSite.siteName WHERE userSite.userName="` + exc + `"`
	}

	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resSites = append(resSites, models.SiteScan(rows))
	}

	return resSites, nil
}

func (inst *MySql) GetUserSites(inc string, exc string) ([]models.UserSite, error) {

	var resRels []models.UserSite
	qstring := "SELECT * FROM userSite;"

	if inc != "" {
		qstring = `SELECT * FROM userSite WHERE siteName LIKE "` + inc + `"`
	}
	if exc != "" {
		qstring = `SELECT * FROM userSite WHERE userName="` + exc + `"`
	}

	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resRels = append(resRels, models.UserSiteScan(rows))
	}

	return resRels, nil
}

// update
func (inst *MySql) UpdateUser(updUser models.User) error {

	users, err := inst.GetUsers("", updUser.UserName)
	if err != nil {
		panic(err)
	}

	if len(users) != 1 {
		return errors.New("No user or Internal Server error. You decide")
	}

	qstring := "UPDATE users SET email=?, image=?, token=?, refToken=? WHERE userName=?"
	updTool, err := inst.Db.Prepare(qstring)

	if err != nil {
		panic(err)
	}
	defer updTool.Close()

	if _, err = updTool.Exec(updUser.Email, updUser.Image, updUser.Token, updUser.RefToken, updUser.UserName); err != nil {
		panic(err)
	}

	return nil
}

// delete
func (inst *MySql) RemoveUser(userName string) error {

	users, err := inst.GetUsers("", userName)
	if err != nil {
		panic(err)
	}

	if len(users) != 1 {
		return errors.New("No user or Internal Server error. You decide")
	}

	qstring := `DELETE FROM users WHERE userName="` + userName + `";`

	_, err = inst.Db.Exec(qstring)
	if err != nil {
		panic(err)
	}

	return nil
}
