package main

import (
	"syscall/js"
)

func main() {
	// Register the multiply function to be callable from JavaScript
	js.Global().Set("multiply", js.FuncOf(multiply))
	
	// Keep the program running
	select {}
}

func multiply(this js.Value, args []js.Value) interface{} {
	if len(args) != 2 {
		return js.ValueOf(0)
	}
	
	a := args[0].Int()
	b := args[1].Int()
	return js.ValueOf(a * b)
}
