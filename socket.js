const Server = require('socket.io')
const os = require('os')

const server = new Server(3000)
let connectionCount = 0
server.on('connection', socket => {
    console.log(`Connection count: ${++connectionCount}`)
    
    socket.on('chat', message => {
        server.emit('chat', message)
    })

    socket.on('getNetworkStatus', () => {
        server.emit('getNetworkStatus', {
            "eol": os.eol,
            "arch": os.arch(),
            "cpus": os.cpus(),
            "freemem": os.freemem(),
            "hostname": os.hostname(),
            "loadavg": os.loadavg(),
            "nw": os.networkInterfaces(),
            "platform": os.platform(),
            "totalmem": os.totalmem(),
            "type": os.type(),
            "upTime": os.uptime()
        })
    })

    socket.emit('ready', 'Welcome')
})

