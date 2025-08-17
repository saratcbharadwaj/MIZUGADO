import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/ChatPage.css'; 

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Welcome to MIZU GADO. A smart contract auditor which predicts whether your solidity code is vulnerable. You can either text or paste your solidity code under the length 256.' }
    ]);
    const [inputCode, setInputCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputCode.trim()) return;

        const userMessage = { sender: 'user', text: inputCode };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputCode('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/audit', {
                code: inputCode
            });
            
            const botResponseText = `Analysis complete:\nLabel: ${response.data.label}\nMeaning: ${response.data.meaning}\nScore: ${response.data.score}`;
            setMessages([...newMessages, { sender: 'bot', text: botResponseText }]);

        } catch (error) {
            console.error("Full API Error:", error.response);
            const errorData = error.response?.data;
            const errorMessage = errorData?.detail || JSON.stringify(errorData) || 'An error occurred while analyzing the code.';
            setMessages([...newMessages, { sender: 'bot', text: `Error: ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-page-container">
            <div className="chat-window">
                <div className="message-list">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.sender}`}>
                            <pre>{msg.text}</pre>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message-bubble bot">
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="message-form">
                    <textarea
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Paste your smart contract code here..."
                        disabled={isLoading}
                        rows="4"
                    />
                    <button type="submit" disabled={isLoading}>Audit</button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;