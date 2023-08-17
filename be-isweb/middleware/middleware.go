package middleware

import (
	token "be-isweb/utils"

	"github.com/gin-gonic/gin"
)

func Authenticate() gin.HandlerFunc {

	return func(c *gin.Context) {
		ClientToken := c.Request.Header.Get("token")
		if ClientToken == "" {
			c.JSON(500, gin.H{"error": "No Authorization Header Provided", "ok": false})
			c.Abort()
			return
		}
		claims, err := token.ValidateToken(ClientToken)
		if err != "" {
			c.JSON(500, gin.H{"error": err, "ok": false})
			c.Abort()
			return
		}
		c.Set("email", claims.Email)
		c.Set("uid", claims.UserName)
		c.Next()
	}

}
