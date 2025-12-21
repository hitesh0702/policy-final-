
import React, { useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkIcon from './icons/LinkIcon';
import DocumentIcon from './icons/DocumentIcon';
import TextIcon from './icons/TextIcon';
import UploadIcon from './icons/UploadIcon';
import { analyzePolicy } from '../services/geminiService';
import { SourceType } from '../types';

type Tab = SourceType.URL | SourceType.PDF | SourceType.TEXT;

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(SourceType.URL);
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError(null);
      } else {
        setError('Please upload a valid PDF.');
      }
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    let analysisPromise;
    let displayName = '';

    try {
      if (activeTab === SourceType.URL && url) {
        displayName = url;
        analysisPromise = analyzePolicy({ type: SourceType.URL, value: url });
      } else if (activeTab === SourceType.PDF && file) {
        displayName = file.name;
        analysisPromise = analyzePolicy({ type: SourceType.PDF, value: file });
      } else if (activeTab === SourceType.TEXT && text) {
        displayName = 'Custom Content';
        analysisPromise = analyzePolicy({ type: SourceType.TEXT, value: text });
      } else {
        setError('Please enter source data.');
        setIsLoading(false);
        return;
      }
      
      navigate('/loading', { state: { sourceValue: displayName } });
      const report = await analysisPromise;
      navigate('/report', { state: { report } });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed.');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, url, file, text, navigate]);

  const renderInput = () => {
    const inputClasses = "w-full p-6 bg-white border border-neutral-200 rounded-3xl focus:ring-0 focus:border-neutral-900 outline-none transition-all text-neutral-900 placeholder:text-neutral-400 font-medium text-lg shadow-sm";
    
    switch (activeTab) {
      case SourceType.PDF:
        return (
          <div className="mt-10">
            <label htmlFor="file-upload" className="cursor-pointer group block">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-5xl p-20 bg-neutral-50/50 hover:bg-white hover:border-neutral-900 transition-all duration-300">
                <div className="bg-white p-6 rounded-3xl shadow-md group-hover:scale-105 transition-transform duration-300">
                  <UploadIcon className="h-10 w-10 text-neutral-900" />
                </div>
                <span className="mt-8 text-xl font-black text-neutral-900 tracking-tight">
                  {fileName ? fileName : 'Upload PDF Document'}
                </span>
                <p className="text-sm text-neutral-600 mt-2 font-semibold uppercase tracking-wider">Drag & drop or click to browse</p>
              </div>
              <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" />
            </label>
          </div>
        );
      case SourceType.TEXT:
        return (
          <div className="mt-10">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste policy text here..."
              className={`${inputClasses} h-80 resize-none`}
              disabled={isLoading}
            />
          </div>
        );
      case SourceType.URL:
      default:
        return (
          <div className="mt-10">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://apple.com/privacy"
              className={inputClasses}
              disabled={isLoading}
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-black text-neutral-900 tracking-tighter leading-[0.95] mb-8">
          Privacy,<br/><span className="text-neutral-300">decoded.</span>
        </h1>
        <p className="text-xl text-neutral-600 max-w-lg mx-auto leading-relaxed font-semibold">
          Understand complex Terms of Service in seconds with our AI engine.
        </p>
      </div>

      <div className="glass-card ambient-shadow p-6 md:p-12 rounded-5xl border border-neutral-100">
        <form onSubmit={handleSubmit}>
          {/* iOS-Style Pure Neutral Toggle */}
          <div className="bg-neutral-100 p-1.5 rounded-3xl flex">
            {(
              [
                { id: SourceType.URL, label: 'Link', icon: LinkIcon },
                { id: SourceType.PDF, label: 'File', icon: DocumentIcon },
                { id: SourceType.TEXT, label: 'Text', icon: TextIcon },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-[13px] font-black uppercase tracking-widest flex items-center justify-center gap-2 rounded-2xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-neutral-900 shadow-md'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          
          {renderInput()}

          {error && (
            <div className="mt-8 p-5 bg-neutral-900 text-white rounded-3xl text-sm font-black text-center uppercase tracking-widest">
              {error}
            </div>
          )}
          
          <div className="mt-12">
            <button
              type="submit"
              disabled={isLoading || (activeTab === SourceType.URL && !url) || (activeTab === SourceType.PDF && !file) || (activeTab === SourceType.TEXT && !text)}
              className="w-full py-6 bg-neutral-900 text-white font-black rounded-full hover:bg-black hover:scale-[1.01] transition-all shadow-2xl shadow-neutral-300 active:scale-[0.99] disabled:opacity-30 text-xl tracking-tight"
            >
              {isLoading ? 'ANALYZING...' : 'START AUDIT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
