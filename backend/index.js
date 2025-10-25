const express = require('express');
const app = express();
const cors = require('cors');
const {createServer} = require('node:http')
const server = createServer(app);
const {Server} = require('socket.io');
const { timeStamp } = require('node:console');
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  connectionStateRecovery:{}
});


const PORT = 3000;

const rooms = {};

const usernames = [
    "QuantumPioneer", "NebulaWhisper", "StellarVoyager", "CosmicDreamer", "LunarEcho",
    "SolarFlare", "GalacticNomad", "AstralWanderer", "CelestialGuardian", "OrionHunter",
    "PhantomRider", "MysticTraveler", "EtherealBeing", "ShadowWalker", "CrimsonTide",
    "AzureKnight", "EmeraldSage", "GoldenPhoenix", "SilverWolf", "CobaltStorm",
    "VioletDawn", "AmberLight", "ObsidianBlade", "PearlDiver", "RubyHeart",
    "SapphireEye", "TopazMind", "JadeTiger", "OnyxRaven", "IvoryTower",
    "MidnightRider", "DuskWhisper", "DawnBreaker", "TwilightSeeker", "EclipseChaser",
    "FrostGiant", "FlameSpirit", "ThunderLord", "OceanDepth", "MountainPeak",
    "ForestGuardian", "DesertWind", "RiverFlow", "SkyDancer", "EarthShaker",
    "TimeTraveler", "SpaceExplorer", "DimensionHopper", "RealityBender", "DreamWeaver"
];

const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
const codeLength = 6;



function generateRoomCode() {
    let code, name;
    do {
        code = '';
        for (let i = 0; i < codeLength; i++) {
            const index = Math.floor(Math.random() * chars.length);
            code += chars[index];
        }
    } while (rooms[code]);
    
    do {
        const randomIndex = Math.floor(Math.random() * usernames.length);
        name = usernames[randomIndex];
    } while (rooms[code] && rooms[code].participants.includes(name));
    
    return { code, name };
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/create-room', (req, res) => {
    const { code, name } = generateRoomCode();
    rooms[code] = {
        messages: [],
        participants: [],
        createdAt: Date.now()
    };
    res.send({ code: code, username: name });
});

io.on('connection', (socket) => {
     
    socket.on('join-room', (data) => {
        const roomCode = data.roomCode;
        if (rooms[roomCode]) {
            // Check if username is already taken in this room
            if (rooms[roomCode].participants.includes(data.name)) {
                socket.emit('error', { message: 'Username already taken in this room' });
                return;
            }
            
            socket.join(roomCode);
            if (data.name) {
                socket.username = data.name;
                socket.currentRoom = roomCode;
                rooms[roomCode]["participants"].push(data.name);
                socket.emit('previous-messages', rooms[roomCode].messages);
                io.to(roomCode).emit('total-participants',rooms[roomCode]["participants"])
            } else {
                socket.emit('error', { message: "Name not defined" });
            }
        } else {
            socket.emit('error', { message: 'Room not found' });
        }
    });

    socket.on('message', (data) => {
        const roomCode = data.roomCode;
        const msgObj = {
            text:data.msg,
            username:socket.username,
            timeStamp:Date.now()
        };

        if (rooms[roomCode]) {
            io.to(roomCode).emit('message', msgObj);
            rooms[roomCode]["messages"].push(msgObj);
        } else {
            socket.emit('error', { message: "Room not available anymore!" });
        }
    });
    
    socket.on('disconnect', () => {
        const username = socket.username;
        const roomCode = socket.currentRoom;
        
        if (roomCode && rooms[roomCode]) {
            rooms[roomCode]["participants"] = rooms[roomCode]["participants"].filter(
                name => name !== username
            );

            io.to(roomCode).emit('total-participants', rooms[roomCode].participants);
            
            io.to(roomCode).emit('user-left', { username: username });
            if (rooms[roomCode].participants.length === 0) {
                delete rooms[roomCode];
            }
        }
    });
});


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
}); 