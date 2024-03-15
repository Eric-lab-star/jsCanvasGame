package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	// workDir, _ := os.Getwd()
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Handle("/*", http.FileServer(http.Dir("build")))

	fmt.Println("http://localhost:3333")
	http.ListenAndServe(":3333", r)
}
