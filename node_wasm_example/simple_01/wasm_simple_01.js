const fs = require("fs");
const { argv, env } = require("process");
const { WASI } = require("wasi");
const wasi = new WASI({
    args: argv,
    env
})

// const importObj = {
//     wasi_snapshot_preview1: { 
//         fd_write: (fd, iovs_ptr, iovs_len, nwritten_ptr) => {
//             console.log(fd, iovs_ptr, iovs_len, nwritten_ptr)
//             return 1;
//         } 
//     }
// }
const importObj = { wasi_snapshot_preview1: wasi.wasiImport }

const wasmModuleBufferSource = fs.readFileSync("hello.wasm");

WebAssembly.compile(wasmModuleBufferSource).then((mod) => {
    console.log(WebAssembly.Module.imports(mod));
    console.log(WebAssembly.Module.exports(mod));
    WebAssembly.instantiate(mod, importObj).then((ins) => {
        let fake = {exports: {_start:() => {}}};
        Object.assign(fake, ins);
        Object.assign(fake.exports, ins.exports)
        wasi.start(fake);
        fake.exports.helloworld('s');
    }).catch((error) => {
        console.log(error);
    });
})