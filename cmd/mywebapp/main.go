// cmd/mywebapp/main.go
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sebtech33/NAS-management/api/routes"
)

func main() {
	r := mux.NewRouter()

	// Register API routes
	routes.RegisterAPIRoutes(r)

	// Serve static files
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("web/static"))))

	// Serve HTML templates
	r.HandleFunc("/", routes.HomeHandler)

	port := ":8080"
	fmt.Printf("Server listening on %s\n", port)
	log.Fatal(http.ListenAndServe(port, r))
}
