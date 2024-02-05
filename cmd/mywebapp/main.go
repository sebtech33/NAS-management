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

	// Serve static files
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("web/static"))))

	// Serve HTML templates
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/templates/index.html")
	})

	// Register API routes
	routes.RegisterAPIRoutes(r)

	port := ":8080"
	fmt.Printf("Server listening on %s\n", port)
	log.Fatal(http.ListenAndServe(port, r))
}
