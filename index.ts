import indexFile from './public/index.html.txt'

const text = await Bun.file("./public/index.html.txt").text()
const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        if (server.upgrade(req)) {
            return;
        }
        return new Response(`${text.replace(/TS/g, `${new Date()}`).replace(/FILESIZE/g, `${indexFile.length}`)}`, {
            headers: {
                'content-type': 'text/html; charset=utf-8',
            }
        })
    },
    websocket: {
        open(ws) {
            console.log("ws open", `${ws.remoteAddress}`)
            if (!ws.isSubscribed("main")) {
                ws.subscribe("main")
            }
        },
        // close(ws, code, message) {console.log("ws open", `${ws.remoteAddress} ${code} ${message}`)},
        async message(ws, message) {console.log("ws open", `${ws.remoteAddress} ${message}`)},
    }
})
console.log(`http://localhost:${server.port}`)
console.log(new Date())
server.publish("main", "hotreload")
