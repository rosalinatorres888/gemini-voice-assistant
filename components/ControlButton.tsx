import React from 'react';
import { AppStatus } from '../types';
import MicrophoneIcon from './icons/MicrophoneIcon';
import StopIcon from './icons/StopIcon';
import LoadingIcon from './icons/LoadingIcon';

interface ControlButtonProps {
    status: AppStatus;
    onClick: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ status, onClick }) => {
    const isProcessing = status === AppStatus.PROCESSING;

    const getButtonState = () => {
        switch (status) {
            case AppStatus.LISTENING:
            case AppStatus.SPEAKING:
                 return {
                    icon: <StopIcon className="w-8 h-8 text-white" />,
                    style: 'bg-red-500 hover:bg-red-600',
                };
            case AppStatus.PROCESSING:
                return {
                    icon: <LoadingIcon className="w-8 h-8 text-gray-400" />,
                    style: 'bg-gray-700',
                };
            case AppStatus.IDLE:
            case AppStatus.ERROR:
            default:
                return {
                    icon: <MicrophoneIcon className="w-9 h-9 text-white" />,
                    style: 'bg-cyan-500 hover:bg-cyan-600',
                };
        }
    };

    const { icon, style } = getButtonState();

    return (
        <button
            onClick={onClick}
            disabled={isProcessing}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-cyan-400/50 shadow-lg ${style} ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={status === AppStatus.IDLE ? 'Start conversation' : 'Stop conversation'}
        >
            {icon}
        </button>
    );
};

export default ControlButton;
