
import React, { useState } from 'react';
import { SubtitleSegment, ProcessingStatus } from './types';
import { transcribeAudio } from './services/geminiService';
import { formatToSRT, formatToVTT, formatToTXT, downloadFile } from './utils/exportHelpers';
import FileUploader from './components/FileUploader';
import SubtitleEditor from './components/SubtitleEditor';
import About from './components/About';

type View = 'home' | 'about';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [segments, setSegments] = useState<SubtitleSegment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setStatus(ProcessingStatus.UPLOADING);
      setError(null);
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
      setAudioUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        setStatus(ProcessingStatus.TRANSCRIBING);
        
        try {
          const result = await transcribeAudio(base64Data, file.type);
          setSegments(result);
          setStatus(ProcessingStatus.COMPLETED);
        } catch (err: any) {
          setError(err.message || 'Failed to transcribe audio.');
          setStatus(ProcessingStatus.ERROR);
        }
      };
    } catch (err) {
      setError('Error reading file.');
      setStatus(ProcessingStatus.ERROR);
    }
  };

  const handleUpdateSegment = (idx: number, field: keyof SubtitleSegment, value: string) => {
    const updated = [...segments];
    updated[idx] = { ...updated[idx], [field]: value };
    setSegments(updated);
  };

  const handleDeleteSegment = (idx: number) => {
    setSegments(segments.filter((_, i) => i !== idx));
  };

  const handleExport = (format: 'SRT' | 'VTT' | 'TXT') => {
    let content = '';
    let mimeType = 'text/plain';
    let ext = '';

    if (format === 'SRT') {
      content = formatToSRT(segments);
      mimeType = 'application/x-subrip';
      ext = '.srt';
    } else if (format === 'VTT') {
      content = formatToVTT(segments);
      mimeType = 'text/vtt';
      ext = '.vtt';
    } else {
      content = formatToTXT(segments);
      ext = '.txt';
    }

    downloadFile(content, `${fileName}${ext}`, mimeType);
  };

  const reset = () => {
    setStatus(ProcessingStatus.IDLE);
    setSegments([]);
    setAudioUrl(null);
    setFileName('');
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-6xl mx-auto">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between mb-12 glass px-6 py-4 rounded-full border-white/5 sticky top-6 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white italic">L</div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">LuminaSub</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('home')} 
            className={`text-sm font-medium transition-colors ${view === 'home' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            Converter
          </button>
          <button 
            onClick={() => setView('about')} 
            className={`text-sm font-medium transition-colors ${view === 'about' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            About & FAQ
          </button>
        </div>
      </nav>

      {view === 'about' ? (
        <About />
      ) : (
        <>
          {/* Header */}
          <header className="text-center mb-16 space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight">
              <span className="gradient-text">Free Online Audio to Subtitle Converter</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Experience the fastest <strong>automated subtitle generator</strong>. Convert your audio to text instantly with 99.9% accuracy using the latest AI technology.
            </p>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Controls & Audio */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass rounded-3xl p-8 space-y-8">
                {status === ProcessingStatus.IDLE || status === ProcessingStatus.ERROR ? (
                  <FileUploader 
                    onFileSelect={handleFileSelect} 
                    isLoading={status === ProcessingStatus.UPLOADING || status === ProcessingStatus.TRANSCRIBING} 
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-white truncate max-w-[200px]">
                        {fileName}
                      </h2>
                      <button onClick={reset} className="text-xs text-gray-500 hover:text-white transition-colors">
                        Start New
                      </button>
                    </div>
                    
                    {audioUrl && (
                      <div className="bg-black/30 p-4 rounded-2xl">
                        <audio src={audioUrl} controls className="w-full opacity-80" />
                      </div>
                    )}

                    {status === ProcessingStatus.TRANSCRIBING && (
                      <div className="flex flex-col items-center py-10 space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="text-blue-400 animate-pulse font-medium">Transcribing Audio to Text...</p>
                      </div>
                    )}

                    {status === ProcessingStatus.COMPLETED && (
                      <div className="space-y-4 pt-4">
                        <p className="text-sm font-medium text-gray-400 mb-2">Export Your Subtitles:</p>
                        <div className="grid grid-cols-3 gap-3">
                          <button 
                            onClick={() => handleExport('SRT')}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all border border-white/5 active:scale-95"
                          >
                            SRT
                          </button>
                          <button 
                            onClick={() => handleExport('VTT')}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all border border-white/5 active:scale-95"
                          >
                            VTT
                          </button>
                          <button 
                            onClick={() => handleExport('TXT')}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all border border-white/5 active:scale-95"
                          >
                            TXT
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm flex gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}
              </div>
              
              <div className="hidden lg:block glass rounded-3xl p-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">Why use LuminaSub?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">✓</div>
                    <p className="text-sm text-gray-500">Free <strong>SRT and VTT generator</strong>.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">✓</div>
                    <p className="text-sm text-gray-500">Perfect for YouTube, TikTok, and Instagram.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">✓</div>
                    <p className="text-sm text-gray-500">Secure and fast AI processing.</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Subtitle Editor */}
            <div className="lg:col-span-7">
              <div className="glass rounded-3xl p-8 min-h-[500px]">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Subtitle Editor</h2>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-gray-400">
                    {segments.length} segments detected
                  </span>
                </div>

                {segments.length > 0 ? (
                  <SubtitleEditor 
                    segments={segments} 
                    onChange={handleUpdateSegment} 
                    onDelete={handleDeleteSegment} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-600">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">No Transcription Found</h3>
                      <p className="text-sm text-gray-500 max-w-[200px] mx-auto">Upload an MP3 or WAV file to generate professional subtitles.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      )}

      <footer className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <button onClick={() => setView('home')} className="hover:text-white transition-colors">Subtitle Converter</button>
          <button onClick={() => setView('about')} className="hover:text-white transition-colors">How it Works</button>
          <button onClick={() => setView('about')} className="hover:text-white transition-colors">Privacy Policy</button>
          <button onClick={() => setView('about')} className="hover:text-white transition-colors">Terms of Service</button>
        </div>
        <p>&copy; {new Date().getFullYear()} LuminaSub. Optimized for high-precision <strong>audio transcription</strong>.</p>
      </footer>
    </div>
  );
};

export default App;
