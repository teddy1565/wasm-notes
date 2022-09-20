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

const wasmModuleBufferSource = fs.readFileSync("pointerTest.wasm");

WebAssembly.compile(wasmModuleBufferSource).then((mod) => {
    console.log(WebAssembly.Module.imports(mod));
    console.log(WebAssembly.Module.exports(mod));
    WebAssembly.instantiate(mod, importObj).then((ins) => {
        const nodeLength = ins.exports.getListNodeLength()
        let arr = new Uint8Array(ins.exports.memory.buffer);
        const nodeAddress = ins.exports.genrateListNode(2**31-1);
        console.log(nodeAddress);
        // console.log(new Uint8ClampedArray(ins.exports.memory.buffer, nodeAddress, nodeLength))
        console.log(ins.exports.getNodeValue(nodeAddress))
    }).catch((error) => {
        console.log(error);
    });
})