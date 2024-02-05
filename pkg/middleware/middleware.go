// pkg/middleware/middleware.go
package middleware

import (
	"net/http"
)

// ExampleMiddleware is an example middleware.
func ExampleMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Your middleware logic before handling the request
		next.ServeHTTP(w, r)
		// Your middleware logic after handling the request
	})
}
