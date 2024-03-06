package walker

import (
	"io/fs"
	"strings"

	w "github.com/eric-lab-star/canvasGame/cmd/watcher"
)

func WalkAllFile(fwChan chan string) fs.WalkDirFunc {
	wa := w.New()
	return func(path string, d fs.DirEntry, err error) error {
		go wa.Watching(fwChan, path)
		return nil
	}
}

func WalkJavaFile(fwChan chan string) fs.WalkDirFunc {
	wa := w.New()
	return func(path string, d fs.DirEntry, err error) error {
		if strings.HasSuffix(path, ".java") {
			go wa.Watching(fwChan, path)
		}
		return nil
	}
}

func WalkTsFile(fwChan chan string) fs.WalkDirFunc {
	wa := w.New()
	return func(path string, d fs.DirEntry, err error) error {
		if strings.HasSuffix(path, ".ts") || strings.HasSuffix(path, ".js") {
			go wa.Watching(fwChan, path)
		}
		return nil
	}
}
