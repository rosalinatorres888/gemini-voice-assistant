import React, { useState, useRef, useCallback, useEffect } from 'react';
import { type Chat } from '@google/genai';
import { AppStatus, Message, Sender } from './types';
import { createChat } from './services/geminiService';
import { useVoice } from './hooks/useVoice';
import ConversationView from './components/ConversationView';
import ControlButton from './components/ControlButton';
import Visualizer from './components/Visualizer';

const App: React.FC = () => {
    const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
    const geminiChat = useRef<Chat | null>(null);

    useEffect(() => {
        geminiChat.current = createChat();
    }, []);

    const processTranscript = useCallback(async (transcript: string) => {
        if (!geminiChat.current) return;
        setStatus(AppStatus.PROCESSING);
        try {
            const response = await geminiChat.current.sendMessage({ message: transcript });
            const aiText = response.text;
            setMessages(prev => [...prev, { id: Date.now().toString(), sender: Sender.AI, text: aiText }]);
            setStatus(AppStatus.SPEAKING);
            speak(aiText);
        } catch (e) {
            console.error(e);
            const errorMessage = "Sorry, I ran into a problem. Please try again.";
            setError(errorMessage);
            setMessages(prev => [...prev, { id: Date.now().toString(), sender: Sender.AI, text: errorMessage }]);
            setStatus(AppStatus.ERROR);
        }
    }, []);

    const handleListenResult = useCallback((transcript: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: Sender.User, text: transcript }]);
        processTranscript(transcript);
    }, [processTranscript]);

    const handleSpeakEnd = useCallback(() => {
        setStatus(AppStatus.IDLE);
    }, []);
    
    const { startListening, stopListening, speak, cancelSpeech, isListening } = useVoice(handleListenResult, handleSpeakEnd);

    const handleControlButtonClick = () => {
        setError(null);
        if (status === AppStatus.IDLE || status === AppStatus.ERROR) {
            setStatus(AppStatus.LISTENING);
            startListening();
        } else {
            stopListening();
            cancelSpeech();
            setStatus(AppStatus.IDLE);
        }
    };
    
    useEffect(() => {
        let silenceTimeout: NodeJS.Timeout;
        if (isListening) {
             silenceTimeout = setTimeout(() => {
                stopListening();
            }, 5000);
        }
        return () => {
            clearTimeout(silenceTimeout);
        };
    }, [isListening, stopListening, status]);

    const getStatusText = () => {
        if (error) return error;
        switch(status){
            case AppStatus.LISTENING:
                return "Listening... 🎧";
            case AppStatus.PROCESSING:
                return "Thinking... 💭";
            case AppStatus.SPEAKING:
                return "Speaking... 💬";
            case AppStatus.IDLE:
                 return "Tap to chat! ✨";
            case AppStatus.ERROR:
                return "Oops! Let's try again 🔄";
            default:
                 return "Hi! I'm your cute assistant! 💖";
        }
    }

    return (
        <div className="flex flex-col h-screen w-full bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-gray-800 font-sans">
            <header className="text-center p-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ✨ Kawaii Voice Assistant ✨
                </h1>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center overflow-hidden w-full max-w-4xl mx-auto">
                <ConversationView messages={messages} />
            </main>
            <footer className="flex flex-col items-center justify-center p-6 space-y-4">
                <Visualizer status={status} />
                <ControlButton status={status} onClick={handleControlButtonClick} />
                <p className={`h-6 text-lg font-medium transition-colors duration-300 ${error ? 'text-red-500' : 'text-purple-600'}`}>
                    {getStatusText()}
                </p>
            </footer>
        </div>
    );
};

export default App;
