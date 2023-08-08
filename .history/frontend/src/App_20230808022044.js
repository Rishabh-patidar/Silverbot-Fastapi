import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([
    { text: 'I am Silverbot. How may I assist you?', isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setConversation([
        ...conversation,
        { text: userInput, isUser: true },
        { text: 'Bot response goes here...', isUser: false },
      ]);
      setIsLoading(false);
    }, 1000);

    setUserInput('');
  };

  return (
    <div className='App'>
      <div className='Home'>
        <div className='Home-container'>
          <div className='Home-text-container'>
            <div className='Home-text-wrapper'>
              <div className='Home-text-title'>Silver Chatbot</div>
            </div>
          </div>
          <div className='Home-response-container'>
            <div className='Home-response-wrapper'>
              {isLoading ? (
                <div className='Conversation-bot'>
                  Loading...
                </div>
              ) : (
                <div className='Home-response-text'>
                  {conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`Conversation-${
                        message.isUser ? 'user' : 'bot'
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='Home-form-container'>
            <div className='Home-form-wrapper'>
              <form className='Home-form'>
                <label className='Home-label'>
                  <input
                    className='Home-input'
                    type='text'
                    value={userInput}
                    placeholder={'Enter your question here.'}
                    onChange={handleChange}
                  />
                </label>
                <div className='Button-container'>
                  <div className='Button-wrapper'>
                    <button className='Button' onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
                <div className='Button-container'>
                  <div className='Button-wrapper'>
                    <button
                      className='Button Button-secondary'
                      onClick={() => setConversation([])}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
