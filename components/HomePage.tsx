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

  const inputClasses =
    "w-full p-4 bg-white border border-neutral-200 rounded-2xl focus:ring-0 focus:border-neutral-900 outline-none text-sm shadow-sm";

  const renderInput = () => {
    switch (activeTab) {
      case SourceType.PDF:
        return (
          <div className="mt-6">
            <label htmlFor="file-upload" className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center border border-dashed border-neutral-300 rounded-2xl p-10 bg-neutral-50 hover:bg-white transition">
                <UploadIcon className="h-8 w-8 text-neutral-700" />
                <span className="mt-4 text-sm font-semibold text-neutral-900">
                  {fileName || 'Upload PDF'}
                </span>
                <p className="text-xs text-neutral-500 mt-1">
                  Click to browse
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </label>
          </div>
        );
      case SourceType.TEXT:
        return (
          <div className="mt-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste policy text here..."
              className={`${inputClasses} h-40 resize-none`}
              disabled={isLoading}
            />
          </div>
        );
      default:
        return (
          <div className="mt-6">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://apple.com/privacy"
              className={inputClasses}
              disabled={isLoading}
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-xl mx-auto px-5 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-neutral-900 tracking-tight leading-tight">
          Privacy <span className="text-neutral-300">decoded</span>
        </h1>
        <p className="text-sm text-neutral-600 mt-3">
          Understand complex privacy policies in seconds.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Tabs */}
          <div className="bg-neutral-100 p-1 rounded-2xl flex mb-6">
            {[
              { id: SourceType.URL, label: 'Link', icon: LinkIcon },
              { id: SourceType.PDF, label: 'File', icon: DocumentIcon },
              { id: SourceType.TEXT, label: 'Text', icon: TextIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1 rounded-xl transition ${
                  activeTab === tab.id
                    ? 'bg-white shadow text-neutral-900'
                    : 'text-neutral-500'
                }`}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>

          {renderInput()}

          {error && (
            <div className="mt-4 text-xs text-red-600 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full py-4 bg-neutral-900 text-white text-sm font-semibold rounded-full hover:bg-black transition disabled:opacity-40"
          >
            {isLoading ? 'Analyzing…' : 'Start Audit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
