import { useState, useRef, useCallback, useEffect } from 'react';

// Type definitions (keeping them short for space)
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    length: number;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start: () => void;
    stop: () => void;
}

interface SpeechRecognitionStatic {
    new (): SpeechRecognition;
}

interface IWindow extends Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
}

const SpeechRecognition = (window as unknown as IWindow).SpeechRecognition || (window as unknown as IWindow).webkitSpeechRecognition;

export const useVoice = (
    onListenResult: (transcript: string) => void,
    onSpeakEnd: () => void
) => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (!SpeechRecognition) {
            console.error("Speech Recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript.trim();
            if (transcript) {
                onListenResult(transcript);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, [onListenResult]);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.error("Error starting speech recognition:", error);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [isListening]);

    const speak = useCallback((text: string) => {
        if (!window.speechSynthesis) {
            console.error("Speech Synthesis not supported");
            onSpeakEnd();
            return;
        }
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Simple, working settings
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Just use the default voice for now
        // We'll fix the voice quality separately
        
        utterance.onend = () => {
            setIsSpeaking(false);
            onSpeakEnd();
        };
        
        utterance.onerror = () => {
            setIsSpeaking(false);
            onSpeakEnd();
        };
        
        window.speechSynthesis.speak(utterance);
    }, [onSpeakEnd]);
    
    const cancelSpeech = useCallback(() => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return { startListening, stopListening, isListening, speak, isSpeaking, cancelSpeech };
};
