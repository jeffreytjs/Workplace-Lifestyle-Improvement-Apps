// run "node server.js" on command prompt to run the server
// currently the server.js script running is users/achok

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
let users = [];
let matches = new Map();

server.on('connection', (ws) => {
    users.push(ws);
    console.log("New connection, total users:", users.length);

    broadcast({ type: "updateOnlineCount", count: users.length });

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === "findMatch") {
            matchUser(ws);
        }

        if (data.type === "chat") {
            const pair = matches.get(ws);
            if (pair) {
                pair.send(JSON.stringify({ type: "chat", message: data.message }));
            }
        }
    });

    ws.on('close', () => {
        users = users.filter(user => user !== ws);
        matches.delete(ws);
        console.log("User disconnected, total users:", users.length);
        broadcast({ type: "updateOnlineCount", count: users.length });
    });
});

function broadcast(message) {
    users.forEach(user => user.send(JSON.stringify(message)));
}

function matchUser(ws) {
    const availableUsers = users.filter(user => user !== ws && !matches.has(user));
    if (availableUsers.length > 0) {
        const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
        matches.set(ws, randomUser);
        matches.set(randomUser, ws);

        ws.send(JSON.stringify({ type: "match" }));
        randomUser.send(JSON.stringify({ type: "match" }));
    }
}

console.log("Server running on ws://localhost:8080");
