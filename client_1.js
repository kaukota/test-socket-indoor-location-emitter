const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:3003?userId=user_1");

ioClient.on("seq-num", (msg) => console.info(msg));
