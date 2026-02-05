
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Introduction */}
      <section className="space-y-6">
        <h2 className="text-4xl font-bold gradient-text">The Ultimate Free Audio to Text Converter</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          LuminaSub is an industry-leading platform providing the best <strong>online audio to subtitle conversion</strong>. Whether you need an <strong>SRT generator</strong> for your YouTube videos or a text transcript for your podcasts, our AI-driven tool ensures 99% accuracy in record time.
        </p>
      </section>

      {/* FAQ Section - Massive SEO value */}
      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-white">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="glass p-6 rounded-2xl">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">How do I convert audio to subtitles online?</h4>
            <p className="text-gray-500 text-sm">Simply upload your audio file (MP3, WAV, etc.) to LuminaSub. Our AI automatically transcribes the dialogue and provides a downloadable SRT or VTT file with perfect timestamps.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">Is LuminaSub free to use?</h4>
            <p className="text-gray-500 text-sm">Yes! LuminaSub offers a completely free audio-to-text service. We believe in accessible tools for creators everywhere.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">Which subtitle formats are supported?</h4>
            <p className="text-gray-500 text-sm">You can export your transcriptions in standard formats including SubRip (.SRT), WebVTT (.VTT), and plain text (.TXT) for maximum compatibility with video editors like Premiere Pro or Final Cut.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">Is the transcription accurate?</h4>
            <p className="text-gray-500 text-sm">We use Google's advanced Gemini 3 AI models, which are trained on massive datasets to handle accents, background noise, and technical terminology with high precision.</p>
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="glass p-10 rounded-3xl space-y-6">
        <h3 className="text-2xl font-bold text-white">Privacy Policy</h3>
        <div className="text-gray-400 text-sm space-y-4 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>LuminaSub is committed to being the most secure <strong>free subtitle generator</strong>. Your files are processed in real-time and are never permanently stored on our infrastructure.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Zero Retention:</strong> We do not store your original audio files.</li>
            <li><strong>Encrypted Processing:</strong> All data is sent via SSL to the Gemini API.</li>
            <li><strong>Ad Transparency:</strong> We use Google AdSense to keep this service free, adhering to all industry privacy standards.</li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center py-10">
        <h3 className="text-2xl font-bold text-white mb-4">Contact Our SEO & Support Team</h3>
        <p className="text-gray-400 mb-8">Have suggestions for our transcription engine or need technical help?</p>
        <a href="mailto:support@luminasub.example.com" className="inline-block glass px-8 py-3 rounded-full hover:bg-white/10 transition-all font-medium border border-blue-500/30">
          Get in Touch
        </a>
      </section>
    </div>
  );
};

export default About;
