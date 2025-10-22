CLIENT_PUBLIC="../client/public"
all: 
	@mkdir -p build
	GOOS=js GOARCH=wasm go build -o ./build/lib.wasm .
	cp build/lib.wasm $(CLIENT_PUBLIC)
	cp $(shell go env GOROOT)/lib/wasm/wasm_exec.js $(CLIENT_PUBLIC)