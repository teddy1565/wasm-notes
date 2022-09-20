# Web Assembly

## compile

```shell
# 如果要單純編譯函式提供js 使用

emcc index.c -o hello.wasm -s WASM=1 -s EXPORTED_FUNCTIONS='["_helloworld","_add"]' -Oz --profiling-funcs -Wl,--no-entry
```

當有使用如printf.. 等函式時, 會需要呼叫wasi_snapshot_preview1, 此時需要引入nodejs 內部自帶的 wasi

並且執行nodejs 時 引數需帶上--experimental-wasi-unstable-preview1 (至少在v16如此)

## pointer

如果有使用指標 並且操作malloc 及 free...需要將其也一同匯出

```shell
emcc index.c -o hello.wasm -s WASM=1 -s EXPORTED_FUNCTIONS='["_helloworld","_add","_free","_malloc"]' -Oz --profiling-funcs -Wl,--no-entry
```

## string

如果有字串的操作

- 方法1

轉為asmjs 調用UTF8ToString

```shell
emcc stringTest.c -o stringTest.wasm -s WASM=1 -s EXPORTED_FUNCTIONS='["_show"]' -s EXPORTED_RUNTIME_METHODS='["UTF8ToString"]' -Oz --profiling-funcs --no-entry
```

- 方法2

取得str的buffer address及str length

直接取得memroy內的東西 然後手動將char code轉為 字元

```shell
emcc stringTest.c -o stringTest.wasm -s WASM=1 -s EXPORTED_FUNCTIONS='["_getStr", "_getStrLen"]' -Oz --profiling-funcs --no-entry
```

## 參考資料

- [了解 WebAssembly 的基礎使用方法](https://blog.techbridge.cc/2017/06/17/webassembly-js-future/)
- [WASM_tutorial](https://marcoselvatici.github.io/WASM_tutorial/)
