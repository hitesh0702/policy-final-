
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Report } from '../types';
import ScoreBadge from './ScoreBadge';
import RiskCard from './RiskCard';
import ActionCard from './ActionCard';
import { generateReportPdf } from '../utils/pdfGenerator';
import DownloadIcon from './icons/DownloadIcon';
import MailIcon from './icons/MailIcon';
import LinkIcon from './icons/LinkIcon';

const ReportPage: React.FC = () => {
  const location = useLocation();
  const { report } = (location.state || {}) as { report?: Report };
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    if (!report) return;
    setIsGeneratingPdf(true);
    try {
      await generateReportPdf(report);
    } catch (error) {
      alert("Export failed.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!report) {
    return (
      <div className="text-center py-40 px-6">
        <h2 className="text-5xl font-black text-neutral-900 tracking-tighter">SESSION EXPIRED.</h2>
        <Link to="/" className="mt-12 inline-block bg-neutral-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-2xl shadow-neutral-200 hover:scale-105 transition-all">
          New Analysis
        </Link>
      </div>
    );
  }

  const { contact_info } = report;
  const hasContactInfo = contact_info && (contact_info.support_email || contact_info.cancellation_link);

  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-16">
      {/* HUD Panel - Increased opacity for readability */}
      <div className="glass-card p-10 md:p-20 rounded-5xl border border-neutral-100 bg-white/80">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16 border-b border-neutral-100 pb-16">
          <div className="flex-1 text-center md:text-left">
            <span className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-4 block">Security Audit Complete</span>
            <h1 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter leading-tight mb-6">
              {report.source.value}
            </h1>
            <p className="text-neutral-400 font-black text-xs uppercase tracking-widest">
              Generated {new Date(report.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <ScoreBadge score={report.score} />
        </div>

        {/* TL;DR Section */}
        <div className="py-20">
          <h2 className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-10">Executive Summary</h2>
          <div className="bg-white p-10 rounded-4xl border border-neutral-200 shadow-sm">
            <p className="text-3xl font-black text-neutral-900 leading-[1.2] tracking-tight">
              {report.tldr}
            </p>
            <p className="mt-10 text-xs text-neutral-500 font-black uppercase tracking-widest border-t border-neutral-100 pt-8">
              AI Rationale: <span className="font-semibold normal-case italic text-neutral-600">{report.score_rationale}</span>
            </p>
          </div>
        </div>

        {/* Risks Section */}
        <div className="py-20 border-t border-neutral-100">
           <h2 className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-12">Findings</h2>
          {report.risks.length > 0 ? (
            <div className="grid grid-cols-1 gap-10">
              {report.risks.map((risk) => (
                <RiskCard key={risk.risk_id} risk={risk} />
              ))}
            </div>
          ) : (
             <div className="text-center py-24 bg-neutral-50 rounded-5xl border border-neutral-200">
              <p className="font-black text-neutral-900 text-2xl tracking-tighter">NO CONCERNS FOUND</p>
              <p className="text-neutral-600 mt-2 font-semibold tracking-tight">This policy is within standard user-friendly guidelines.</p>
            </div>
          )}
        </div>

         {/* Actions Section */}
        <div className="py-20 border-t border-neutral-100">
           <h2 className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-12">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {report.actions.map((action, index) => (
              <ActionCard key={index} title={action.title} description={action.description} />
            ))}
          </div>
        </div>

        {/* Contact HUD */}
        {hasContactInfo && (
          <div className="py-20 border-t border-neutral-100">
            <h2 className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-12">Support & Ops</h2>
            <div className="flex flex-wrap gap-4">
              {contact_info.support_email && (
                <a href={`mailto:${contact_info.support_email}`} className="flex items-center gap-5 bg-white border border-neutral-200 px-10 py-6 rounded-3xl hover:border-neutral-900 transition-all shadow-md group">
                  <MailIcon className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  <span className="text-base font-black text-neutral-900">{contact_info.support_email}</span>
                </a>
              )}
              {contact_info.cancellation_link && (
                <a href={contact_info.cancellation_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 bg-white border border-neutral-200 px-10 py-6 rounded-3xl hover:border-neutral-900 transition-all shadow-md group">
                  <LinkIcon className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  <span className="text-base font-black text-neutral-900 uppercase tracking-tighter">Account Dashboard</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 py-10">
          <button 
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="w-full sm:w-auto px-12 py-6 bg-white text-neutral-900 font-black rounded-full hover:bg-neutral-50 transition-all shadow-md border border-neutral-200 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
          >
            <DownloadIcon className="w-5 h-5" />
            {isGeneratingPdf ? 'EXPORTING...' : 'SAVE PDF'}
          </button>
          <Link to="/" className="w-full sm:w-auto px-16 py-6 bg-neutral-900 text-white font-black rounded-full hover:bg-black transition-all shadow-2xl shadow-neutral-900/20 text-center tracking-widest uppercase text-xs">
            NEW AUDIT
          </Link>
        </div>
    </div>
  );
};

export default ReportPage;
