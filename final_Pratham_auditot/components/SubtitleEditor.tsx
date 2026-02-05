
import React from 'react';
import { SubtitleSegment } from '../types';

interface SubtitleEditorProps {
  segments: SubtitleSegment[];
  onChange: (index: number, field: keyof SubtitleSegment, value: string) => void;
  onDelete: (index: number) => void;
}

const SubtitleEditor: React.FC<SubtitleEditorProps> = ({ segments, onChange, onDelete }) => {
  return (
    <div className="w-full space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {segments.map((segment, idx) => (
        <div key={idx} className="glass p-4 rounded-xl flex items-start gap-4 group transition-all hover:bg-white/5">
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-sm">
            {idx + 1}
          </div>
          <div className="flex-grow space-y-2">
            <div className="flex flex-wrap gap-2">
              <input 
                value={segment.start} 
                onChange={(e) => onChange(idx, 'start', e.target.value)}
                className="bg-black/40 border border-white/5 rounded px-2 py-1 text-xs text-gray-400 focus:border-blue-500 outline-none w-32"
                placeholder="00:00:00,000"
              />
              <span className="text-gray-600 text-xs self-center">→</span>
              <input 
                value={segment.end} 
                onChange={(e) => onChange(idx, 'end', e.target.value)}
                className="bg-black/40 border border-white/5 rounded px-2 py-1 text-xs text-gray-400 focus:border-blue-500 outline-none w-32"
                placeholder="00:00:00,000"
              />
            </div>
            <textarea 
              value={segment.text}
              onChange={(e) => onChange(idx, 'text', e.target.value)}
              className="w-full bg-transparent text-white font-medium focus:ring-1 focus:ring-blue-500/30 rounded p-2 outline-none resize-none min-h-[50px] transition-all"
              rows={2}
            />
          </div>
          <button 
            onClick={() => onDelete(idx)}
            className="text-gray-600 hover:text-red-400 transition-colors p-2"
            title="Remove segment"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubtitleEditor;
