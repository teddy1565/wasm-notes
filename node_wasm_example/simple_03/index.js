const fs = require("fs");
const { performance } = require("perf_hooks")

const importObj = {
    wasi_snapshot_preview1: { 
        fd_write: (fd, iovs_ptr, iovs_len, nwritten_ptr) => {
            console.log(fd, iovs_ptr, iovs_len, nwritten_ptr)
            return 1;
        } 
    }
}

const wasmModuleBufferSource = fs.readFileSync("stringTest.wasm");

function AsciiToString(strBuffer) {
    let str = "";
    for (let i=0; i<strBuffer.length; i++) {
        str = str + String.fromCharCode(strBuffer[i]);
    }
    return str;
}

WebAssembly.compile(wasmModuleBufferSource).then((mod) => {
    console.log(WebAssembly.Module.imports(mod));
    console.log(WebAssembly.Module.exports(mod));
    WebAssembly.instantiate(mod, importObj).then((ins) => {
        
        const strAddress = ins.exports.getStr()
        const strLen = ins.exports.getStrLen()
        
        let strBuffer = new Uint8ClampedArray(ins.exports.memory.buffer, strAddress, strLen)
        console.log(AsciiToString(strBuffer));
        // console.log(String.fromCharCode(104,101,108,108,111,32,119,111,114,108,100))
        // console.log(strBuffer[0]);
        // console.log(ins.exports.__indirect_function_table.get());
    }).catch((error) => {
        console.log(error);
    });
})