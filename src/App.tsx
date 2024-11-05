import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { message: "Hello Vlad", id: "23f2332", user: { id: "sddsdsfds", name: "Dima" } },
    { message: "Hello Dima", id: "23fd32c23", user: { id: "eefw2", name: "Vlad" } }
  ]);

  return (
      <div className="App">
          <div>
          <div
              style={{
                  border: '1px solid black',
                  padding: '10px',
                  height: '300px',
                  width: '300px',
                  overflowY: 'scroll'
              }}
          >
              {messages.map(m => {
                  return (
                      <div key={m.id}>
                          <b>{m.user.name}:</b> {m.message}
                          <hr />
                      </div>
                  );
              })}
          </div>
          <textarea></textarea>
          <button>Send</button>
          </div>
      </div>

  );
}

export default App;
