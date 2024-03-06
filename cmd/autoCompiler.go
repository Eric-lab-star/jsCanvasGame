package main

import (
	"fmt"
	"io/fs"
	"log"
	"os"
	"strings"

	"github.com/eric-lab-star/canvasGame/cmd/compiler"
	"github.com/eric-lab-star/canvasGame/cmd/walker"
)

func main() {
	fmt.Println("watching..")
	fwChan := make(chan string)
	dir := getDir()
	fs.WalkDir(dir, ".", walker.WalkAllFile(fwChan))

	for {
		file := <-fwChan
		fmt.Println(file + " been changed")
		switch {

		case strings.HasSuffix(file, ".java"):
			compiler.Java(file)

		case strings.HasSuffix(file, ".ts") || strings.HasSuffix(file, ".js"):
			compiler.TS(file)
		}

	}

}

func getDir() fs.FS {
	root, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	return os.DirFS(root)
}
