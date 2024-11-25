package main

import (
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/echo/v4"
	"github.com/hyphypnotic/fdev-social-media/config"
)
func main() {
	config := GetConfig()
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	
	

	e.Logger.Fatal(e.Start(":8080"))
}