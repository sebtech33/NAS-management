// cmd/mywebapp/main.go
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/sebtech33/NAS-management/api/routes"
)

func main() {
	mux := http.NewServeMux()

	// Register API routes
	routes.RegisterAPIRoutes(mux)

	// Serve static files
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("web/static"))))

	// Serve HTML templates
	mux.HandleFunc("/", routes.HomeHandler)

	port := ":8080"
	fmt.Printf("Server listening on %s\n", port)
	log.Fatal(http.ListenAndServe(port, mux))
}
