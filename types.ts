export enum AppStatus {
  IDLE = 'IDLE',
  LISTENING = 'LISTENING',
  PROCESSING = 'PROCESSING',
  SPEAKING = 'SPEAKING',
  ERROR = 'ERROR',
}

export enum Sender {
  User = 'USER',
  AI = 'AI',
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
}
