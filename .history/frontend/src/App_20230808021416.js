import React, { useState, useEffect } from 'react';
import './App.css';
import {
  fetchResponse,
  fetchConversation,
  deleteConversations,
} from '../../database';
import Loader from '../../components/Loader';
import Conversation from '../../components/Conversation';

function App() {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await fetchResponse(userInput);
    const response = await fetchConversation();
    setIsLoading(false);
    if (response.user_msg || response.bot_msg) {
      setConversation(response);
    }
    setUserInput('');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteConversations();
    setConversation([]);
    setUserInput('');
  };

  const handleConversationFetch = async () => {
    setIsLoading(true);
    const response = await fetchConversation();
    if (response) {
      setConversation(response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleConversationFetch();
  }, []);

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
                <Loader />
              ) : (
                <div className='Home-response-text'>
                  {conversation.bot_msg ? (
                    <Conversation conversation={conversation} />
                  ) : (
                    <div className='Conversation-bot'>
                      I am Silverbot. How may I assist you?
                    </div>
                  )}
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
                      onClick={handleDelete}
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
