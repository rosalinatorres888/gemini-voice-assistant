import React, { useRef, useEffect } from 'react';
import { Message, Sender } from '../types';
import UserIcon from './icons/UserIcon';
import RobotIcon from './icons/RobotIcon';

interface ConversationViewProps {
    messages: Message[];
}

const ConversationView: React.FC<ConversationViewProps> = ({ messages }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="w-full flex-grow overflow-y-auto p-4 space-y-6">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <div className="w-24 h-24 mb-4 text-gray-600">
                        <RobotIcon className="w-full h-full" />
                    </div>
                    <p className="text-xl text-center text-gray-400">
                        I'm ready to chat!
                        <br/>
                        Tap the icon below to start.
                    </p>
                </div>
            ) : (
                messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-4 ${message.sender === Sender.User ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.sender === Sender.AI && (
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                <RobotIcon className="w-7 h-7 text-cyan-400" />
                            </div>
                        )}
                        <div
                            className={`max-w-md lg:max-w-2xl rounded-2xl px-5 py-3 text-lg shadow-lg ${
                                message.sender === Sender.User
                                    ? 'bg-gray-800 text-gray-100 rounded-tr-none'
                                    : 'bg-cyan-600 text-white rounded-tl-none'
                            }`}
                        >
                            <p>{message.text}</p>
                        </div>
                        {message.sender === Sender.User && (
                             <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                <UserIcon className="w-6 h-6 text-gray-300" />
                            </div>
                        )}
                    </div>
                ))
            )}
            <div ref={endOfMessagesRef} />
        </div>
    );
};

export default ConversationView;
