package watcher

import (
	"io/fs"
	"log"
	"os"
	"time"
)

type File struct {
	fs.FS
	*sizeAndTime
}

type sizeAndTime struct {
	size int64
	time time.Time
}

func New() File {
	root, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	fileSystem := os.DirFS(root)
	return File{
		FS:          fileSystem,
		sizeAndTime: &sizeAndTime{},
	}
}

func (w File) Watching(wChan chan string, filename string) {
	for {
		time.Sleep(300 * time.Millisecond)
		fileStat := w.GetFileStat(filename)
		if w.IsUpdated(fileStat) {
			w.sizeAndTime = fileStat
			wChan <- filename
		}
	}
}

func (w File) GetFileStat(filename string) *sizeAndTime {
	info, err := fs.Stat(w.FS, filename)
	if err != nil {
		log.Fatal(err)
	}
	newStat := &sizeAndTime{
		size: info.Size(),
		time: info.ModTime(),
	}
	return newStat
}

func (w File) IsUpdated(newStat *sizeAndTime) bool {
	if w.size != newStat.size || w.time != newStat.time {
		return true
	}
	return false
}
