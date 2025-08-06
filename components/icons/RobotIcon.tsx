import React from 'react';

interface IconProps {
    className?: string;
}

const RobotIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M20 72.25C20 54.435 34.435 40 52.25 40h55.5C125.565 40 140 54.435 140 72.25v23.279c0 13.88-11.284 25.164-25.164 25.164H45.164C31.284 120.693 20 109.413 20 95.529V72.25z"
            fill="currentColor"
        />
        <path
            d="M36 60h88c4.418 0 8 3.582 8 8v28c0 4.418-3.582 8-8 8H36c-4.418 0-8-3.582-8-8V68c0-4.418 3.582-8 8-8z"
            fill="#E0E0E0"
        />
        <circle cx="64" cy="82" r="16" fill="#2D3748" />
        <circle cx="64" cy="82" r="10" fill="currentColor" />
        <circle cx="64" cy="82" r="5" fill="#2D3748" />
        <circle cx="96" cy="82" r="16" fill="#2D3748" />
        <circle cx="96" cy="82" r="10" fill="currentColor" />
        <circle cx="96" cy="82" r="5" fill="#2D3748" />
    </svg>
);

export default RobotIcon;
