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
    } catch {
      alert('Export failed.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!report) {
    return (
      <div className="text-center py-32 px-6">
        <h2 className="text-3xl font-bold text-neutral-900">
          Session expired
        </h2>
        <Link
          to="/"
          className="mt-8 inline-block bg-neutral-900 text-white px-8 py-4 rounded-full text-sm font-semibold"
        >
          New analysis
        </Link>
      </div>
    );
  }

  const { contact_info } = report;
  const hasContactInfo =
    contact_info &&
    (contact_info.support_email || contact_info.cancellation_link);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 space-y-12">

      {/* Header */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-neutral-100 pb-6">
          <div>
            <p className="text-xs text-neutral-500 mb-1">
              Audit completed
            </p>
            <h1 className="text-2xl font-semibold text-neutral-900 truncate max-w-xl">
              {report.source.value}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              {new Date(report.created_at).toLocaleDateString()}
            </p>
          </div>
          <ScoreBadge score={report.score} />
        </div>

        {/* TLDR */}
        <div className="mt-6">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase mb-2">
            Summary
          </h2>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
            <p className="text-base font-medium text-neutral-900 leading-relaxed">
              {report.tldr}
            </p>
            <p className="mt-3 text-xs text-neutral-500">
              <span className="font-semibold">Why:</span>{' '}
              {report.score_rationale}
            </p>
          </div>
        </div>

        {/* Risks */}
        <div className="mt-8 border-t border-neutral-100 pt-6">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase mb-4">
            Findings
          </h2>

          {report.risks.length > 0 ? (
            <div className="space-y-4">
              {report.risks.map((risk) => (
                <RiskCard key={risk.risk_id} risk={risk} />
              ))}
            </div>
          ) : (
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-center">
              <p className="font-semibold text-neutral-900">
                No major concerns found
              </p>
              <p className="text-sm text-neutral-600 mt-1">
                This policy appears user-friendly.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 border-t border-neutral-100 pt-6">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase mb-4">
            Recommendations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.actions.map((action, index) => (
              <ActionCard
                key={index}
                title={action.title}
                description={action.description}
              />
            ))}
          </div>
        </div>

        {/* Contact */}
        {hasContactInfo && (
          <div className="mt-8 border-t border-neutral-100 pt-6">
            <h2 className="text-xs font-semibold text-neutral-500 uppercase mb-4">
              Support
            </h2>
            <div className="flex flex-wrap gap-3">
              {contact_info.support_email && (
                <a
                  href={`mailto:${contact_info.support_email}`}
                  className="flex items-center gap-2 border border-neutral-200 px-4 py-2 rounded-xl text-sm hover:border-neutral-400"
                >
                  <MailIcon className="w-4 h-4" />
                  {contact_info.support_email}
                </a>
              )}
              {contact_info.cancellation_link && (
                <a
                  href={contact_info.cancellation_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-neutral-200 px-4 py-2 rounded-xl text-sm hover:border-neutral-400"
                >
                  <LinkIcon className="w-4 h-4" />
                  Account page
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="px-6 py-3 border border-neutral-200 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-50"
        >
          <DownloadIcon className="w-4 h-4" />
          {isGeneratingPdf ? 'Exporting…' : 'Save PDF'}
        </button>

        <Link
          to="/"
          className="px-8 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium text-center"
        >
          New audit
        </Link>
      </div>
    </div>
  );
};

export default ReportPage;
