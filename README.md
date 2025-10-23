# Anonymous Chat App

A real-time anonymous chat application where users can create or join rooms with automatically assigned unique usernames.

## Features

- **Anonymous Chat**: No registration required
- **Unique Usernames**: Automatic assignment of distinctive usernames
- **Room-based Chat**: Create or join chat rooms with unique codes
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Participant List**: See who's currently in the room
- **No Duplicate Names**: Ensures unique usernames per room

## How It Works

1. **Create Room**: Generate a new chat room with a unique 6-character code
2. **Get Assigned Username**: Receive a random unique username automatically
3. **Share Code**: Invite others using your room code
4. **Start Chatting**: Begin real-time anonymous conversations

## Tech Stack

- **Frontend**: React, React Router, CSS Modules, React-icons
- **Backend**: Node.js, Express, Socket.IO
- **Real-time Communication**: WebSockets

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `node index.js`
4. Start the client: `npm run dev`

## Room System

- Each room has a unique 6-character code
- Automatic username assignment from 50+ creative names
- Prevents duplicate usernames in the same room
- Real-time participant tracking
- Persistent chat history per room session
