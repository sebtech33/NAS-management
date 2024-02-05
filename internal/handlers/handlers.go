// internal/handlers/handlers.go
package handlers

import (
	"fmt"
	"net/http"
)

// HomeHandler handles requests to the home page.
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Backend!")
}
