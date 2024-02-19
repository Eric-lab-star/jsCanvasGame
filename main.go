// This example demonstrates how to serve static files from your filesystem.
//
// Boot the server:
//
//	$ go run main.go
//
// Client requests:
//
//	$ curl http://localhost:3333/files/
//	<pre>
//	<a href="notes.txt">notes.txt</a>
//	</pre>
//
//	$ curl http://localhost:3333/files/notes.txt
//	Notessszzz
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	workDir, _ := os.Getwd()
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Index handler
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		indexHtml, err := os.ReadFile("./src/index.html")
		if err != nil {
			log.Fatal(err)
		}
		_, err = w.Write(indexHtml)
		if err != nil {
			log.Fatal(err)
		}
	})

	// Create a route along /files that will serve contents from
	// the ./data/ folder.
	filesDir := http.Dir(filepath.Join(workDir, "src"))
	FileServer(r, "/src", filesDir)

	http.ListenAndServe(":3333", r)
	fmt.Println("http://localhost:3333")

}

// FileServer conveniently sets up a http.FileServer handler to serve
// static files from a http.FileSystem.
func FileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit any URL parameters.")
	}

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(root))
		fs.ServeHTTP(w, r)
	})
}
