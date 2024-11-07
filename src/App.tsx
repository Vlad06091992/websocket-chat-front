import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {io} from "socket.io-client";

const socket = io("http://localhost:3009/")

function App() {
    const [messages, setMessages] = useState([
        {message: "Hello Vlad", id: "23f2332", user: {id: "sddsdsfds", name: "Dima"}},
        {message: "Hello Dima", id: "23fd32c23", user: {id: "eefw2", name: "Vlad"}}
    ]);

    const [message, setMessage] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        socket.on("init-messages-published", (messages) => {
            setMessages(messages)
        })

        socket.on('new-message-sent', (message) => {
            debugger
            setMessages((messages) => [...messages, message])
        })

    }, [])

    // const last = useRef<any>()
    const last = useRef<HTMLDivElement | null>(null);


    useEffect(() => {

        if(last && last.current){
            last.current.scrollIntoView({behavior:'smooth'})
        }

    }, [message]);

    return (
        <div className="App">
            <div>
                <div      style={{
                    border: '1px solid black',
                    padding: '10px',
                    height: '300px',
                    width: '300px',
                    overflowY: 'scroll'
                }}>
                    {messages.map((m) => (
                        <div key={m.id}>
                            <b>{m.user.name}:</b> {m.message}
                            <hr />
                        </div>
                    ))}
                    <div ref={last}></div>

                </div>

            <div>
                <input
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <button
                    onClick={() => {
                        socket.emit("client-name-sent", name);
                    }}
                >
                    send name
                </button>
                <br/>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                />
                <button
                    onClick={() => {
                        socket.emit("client-message-sent", message);
                        setMessage("");
                    }}
                >
                    Send
                </button>
            </div>
            </div>
        </div>
    );

    ;
}

export default App;
