
export interface SubtitleSegment {
  start: string; // Format: "HH:MM:SS,mmm" or "00:00:00,000"
  end: string;
  text: string;
}

export type ExportFormat = 'SRT' | 'VTT' | 'TXT';

export enum ProcessingStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  TRANSCRIBING = 'TRANSCRIBING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
