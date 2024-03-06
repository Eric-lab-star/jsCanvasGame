package compiler

import (
	"fmt"
	"os/exec"
	"strings"
)

// javaCompiler compiles java file located in src
// directory compiled java files will be saved in build
// directory
func Java(filename string) {
	if strings.HasSuffix(filename, ".java") {
		cmd := exec.Command("javac", "-d", "build", "-cp", "src", filename)
		err := cmd.Run()
		if err != nil {
			fmt.Println("err", err)
		}
	}
}

func Mes(filename string) {
	fmt.Println("compiled: ", filename)
}

func TS(filename string) {
	if strings.HasSuffix(filename, ".ts") || strings.HasSuffix(filename, ".js") {
		cmd := exec.Command("tsc", filename, "--outDir", "buid")
		err := cmd.Run()
		if err != nil {
			fmt.Println("compile err", err)
		}
	}
}
