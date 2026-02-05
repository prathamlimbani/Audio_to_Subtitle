
import React, { useCallback } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isLoading }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 
          ${isLoading ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 hover:border-blue-500/50 hover:bg-white/5'} glass`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className={`w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110 ${isLoading ? 'animate-pulse text-blue-400' : 'text-gray-400 group-hover:text-blue-400'}`} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p className="mb-2 text-lg font-medium text-white">
              {isLoading ? 'Processing Audio...' : 'Click to upload audio'}
            </p>
            <p className="text-sm text-gray-400">MP3, WAV, AAC (Max 50MB recommended)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="audio/*" 
            onChange={handleFileChange} 
            disabled={isLoading}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
