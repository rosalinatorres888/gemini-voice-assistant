import React from 'react';
import { AppStatus } from '../types';

interface VisualizerProps {
  status: AppStatus;
}

const Visualizer: React.FC<VisualizerProps> = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case AppStatus.LISTENING:
        return {
          body: 'animate-pulse',
          eyes: 'animate-pulse',
          headphones: 'animate-bounce',
          sparkle: 'animate-spin',
        };
      case AppStatus.PROCESSING:
        return {
          body: 'animate-pulse',
          eyes: 'animate-spin-slow',
          headphones: 'animate-pulse',
          sparkle: 'animate-spin-fast',
        };
      case AppStatus.SPEAKING:
        return {
          body: 'animate-bounce',
          eyes: 'animate-pulse',
          headphones: 'animate-bounce',
          sparkle: 'animate-pulse',
        };
      case AppStatus.ERROR:
        return {
          body: 'animate-shake',
          eyes: '',
          headphones: '',
          sparkle: 'opacity-0',
        };
      default:
        return {
          body: 'animate-float',
          eyes: 'animate-eye-blink',
          headphones: '',
          sparkle: 'animate-pulse',
        };
    }
  };

  const statusClasses = getStatusClasses();
  const isError = status === AppStatus.ERROR;

  return (
    <div className="relative w-96 h-96 flex items-center justify-center scale-125">
      <svg
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${statusClasses.body}`}
      >
        <defs>
          <linearGradient id="body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0ABFC" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <linearGradient id="headphone-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="150" cy="270" rx="60" ry="15" fill="#000000" opacity="0.1" />

        {/* Headphone Band */}
        <path
          d="M 80 120 Q 150 70, 220 120"
          stroke="url(#headphone-gradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          className={statusClasses.headphones}
        />

        {/* Headphone Speakers */}
        <circle cx="75" cy="130" r="25" fill="url(#headphone-gradient)" className={statusClasses.headphones} />
        <circle cx="75" cy="130" r="18" fill="#E0F2FE" />
        <circle cx="225" cy="130" r="25" fill="url(#headphone-gradient)" className={statusClasses.headphones} />
        <circle cx="225" cy="130" r="18" fill="#E0F2FE" />

        {/* Body - Round and cute */}
        <rect x="90" y="100" width="120" height="140" rx="60" fill="url(#body-gradient)" />
        
        {/* Face Background */}
        <rect x="100" y="110" width="100" height="100" rx="50" fill="#FFF9FC" />

        {/* Antenna */}
        <line x1="150" y1="100" x2="150" y2="80" stroke="#C084FC" strokeWidth="4" strokeLinecap="round" />
        <circle cx="150" cy="75" r="6" fill="#FBBF24" className={statusClasses.sparkle} filter="url(#glow)" />

        {/* Eyes */}
        {isError ? (
          <>
            {/* X eyes for error */}
            <g stroke="#EF4444" strokeWidth="4" strokeLinecap="round">
              <line x1="115" y1="140" x2="125" y2="150" />
              <line x1="125" y1="140" x2="115" y2="150" />
              <line x1="175" y1="140" x2="185" y2="150" />
              <line x1="185" y1="140" x2="175" y2="150" />
            </g>
          </>
        ) : (
          <>
            {/* Kawaii eyes */}
            <g className={statusClasses.eyes}>
              {/* Left eye */}
              <ellipse cx="120" cy="145" rx="18" ry="22" fill="#1F2937" />
              <ellipse cx="120" cy="145" rx="15" ry="19" fill="#6366F1" />
              <ellipse cx="122" cy="142" rx="8" ry="10" fill="#E0E7FF" />
              <ellipse cx="125" cy="148" rx="4" ry="5" fill="#FFFFFF" />
              
              {/* Right eye */}
              <ellipse cx="180" cy="145" rx="18" ry="22" fill="#1F2937" />
              <ellipse cx="180" cy="145" rx="15" ry="19" fill="#6366F1" />
              <ellipse cx="182" cy="142" rx="8" ry="10" fill="#E0E7FF" />
              <ellipse cx="185" cy="148" rx="4" ry="5" fill="#FFFFFF" />
            </g>

            {/* Sparkles in eyes */}
            <g className={statusClasses.sparkle}>
              <circle cx="115" cy="138" r="2" fill="#FFFFFF" opacity="0.9" />
              <circle cx="175" cy="138" r="2" fill="#FFFFFF" opacity="0.9" />
            </g>
          </>
        )}

        {/* Cute mouth */}
        {isError ? (
          <path d="M 140 175 Q 150 165, 160 175" stroke="#EF4444" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 140 170 Q 150 180, 160 170" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}

        {/* Blush marks */}
        <ellipse cx="95" cy="165" rx="12" ry="8" fill="#FCA5A5" opacity="0.4" />
        <ellipse cx="205" cy="165" rx="12" ry="8" fill="#FCA5A5" opacity="0.4" />

        {/* Chest panel */}
        <rect x="130" y="195" width="40" height="30" rx="8" fill="#1F2937" opacity="0.2" />
        <rect x="135" y="200" width="30" height="20" rx="5" fill="#67E8F9" opacity="0.6" className={statusClasses.sparkle} />

        {/* Little arms */}
        <ellipse cx="85" cy="180" rx="15" ry="30" fill="url(#body-gradient)" />
        <ellipse cx="215" cy="180" rx="15" ry="30" fill="url(#body-gradient)" />

        {/* Little feet */}
        <ellipse cx="120" cy="235" rx="20" ry="15" fill="#8B5CF6" />
        <ellipse cx="180" cy="235" rx="20" ry="15" fill="#8B5CF6" />

        {/* Decorative sparkles around the robot */}
        {status === AppStatus.LISTENING || status === AppStatus.SPEAKING ? (
          <g className="animate-pulse">
            <circle cx="60" cy="100" r="3" fill="#FBBF24" opacity="0.6" />
            <circle cx="240" cy="100" r="3" fill="#FBBF24" opacity="0.6" />
            <circle cx="70" cy="200" r="3" fill="#67E8F9" opacity="0.6" />
            <circle cx="230" cy="200" r="3" fill="#67E8F9" opacity="0.6" />
          </g>
        ) : null}
      </svg>
    </div>
  );
};

export default Visualizer;
