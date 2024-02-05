package routes

import (
	// ... other imports
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/gorilla/mux"
)

// RegisterAPIRoutes registers API routes.
func RegisterAPIRoutes(router *mux.Router) {
	router.HandleFunc("/api/endpoint1", APIEndpoint1Handler).Methods("GET")
	router.HandleFunc("/api/endpoint2", APIEndpoint2Handler).Methods("POST")
	// Add more API routes as needed
}

// APIEndpoint1Handler handles requests to /api/endpoint1.
func APIEndpoint1Handler(w http.ResponseWriter, r *http.Request) {
	dockerClient, err := getDockerClient()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error initializing Docker client: %s", err), http.StatusInternalServerError)
		return
	}

	containers, err := dockerClient.ContainerList(context.Background(), container.ListOptions{})
	if err != nil {
		http.Error(w, fmt.Sprintf("Error listing Docker containers: %s", err), http.StatusInternalServerError)
		return
	}

	// Return the list of containers as JSON
	json.NewEncoder(w).Encode(containers)
}

// APIEndpoint2Handler handles requests to /api/endpoint2.
func APIEndpoint2Handler(w http.ResponseWriter, r *http.Request) {
	// Your logic for handling /api/endpoint2
}

// HomeHandler handles requests to the home page.
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Backend!")
}

// Docker Integration
func getDockerClient() (*client.Client, error) {
	return client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
}
