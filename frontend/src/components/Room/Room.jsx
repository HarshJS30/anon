import styles from '../../components/Room/Room.module.css';
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";

export function Room(){
    const {code} = useParams();
    const [messages,setMessages] = useState([]);
    const [participants,setParticipants] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error,setError] = useState();
    const username = localStorage.getItem('username');
    const messagesEndRef = useRef(null);

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!inputMessage.trim()) return;

        socket.emit('message',{
            roomCode: code,
            msg: inputMessage
        });

        setInputMessage('')
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(()=>{
        socket.emit('join-room',{
            roomCode: code,
            name:localStorage.getItem('username')
        });

        socket.on('message',(msgObj)=>{
            setMessages(prev=>[...prev,msgObj])
        })

        socket.on('user-left',(data)=>{
            setMessages(prev => [...prev, {username: "System", text:`${data.username} left the room`}])
        })

        socket.on('error',(error)=>{
            setError(error.message)
            if (error.message === 'Username already taken in this room') {
                setTimeout(() => {
                    window.location.href = '/join';
                }, 2000);
            }
        })

        socket.on('total-participants',(data)=>{
            setParticipants(data)
        })

        return ()=>{
            socket.off('message')
            socket.off('user-left')
            socket.off('error')
            socket.off('total-participants')
        }
    },[code])

    return (
    <div className={styles.chat}>
        <div className={styles.left}>
            <h1>Anon</h1>
            <h2 className={styles.code}>{code}</h2>
            
            <div className={styles.participants}>
                <h3>Participants</h3>
                {participants.map((user, i) => (
                    <div key={i} className={user === username ? styles.you : ''}>
                        🟢 {user}
                    </div>
                ))}
            </div>
            {error && <div className={styles.error}>{error}</div>}
        </div>
        
        <div className={styles.right}>
            <div className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    msg.username === "System" ? (
                        <div key={index} className={styles.systemMessage}>
                            {msg.text}
                        </div>
                    ) : (
                        <div key={index} className={styles.message}>
                            <span className={styles.messageUsername}>{msg.username}:</span>
                            {msg.text}
                        </div>
                    )
                ))}
                <div ref={messagesEndRef} />
            </div>
        
            <form onSubmit={handleSubmit} className={styles.messageForm}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message"
                    className={styles.inputbox}
                />
                <button type="submit" className={styles.sendButton}>
                    Send
                </button>
            </form>
        </div>
    </div>
);
}