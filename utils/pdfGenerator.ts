
import jsPDF from 'jspdf';
import { Report } from '../types';

// Helper to add wrapped text and return the height it took up
const addWrappedText = (
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number
): number => {
  if (!text) return 0;
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  // Calculate height based on number of lines and line height
  return lines.length * (doc.getLineHeight() / doc.internal.scaleFactor);
};

export const generateReportPdf = (report: Report): Promise<void> => {
  return new Promise((resolve) => {
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    let yPos = 20;
    const leftMargin = 15;
    const rightMargin = 15;
    const contentWidth = doc.internal.pageSize.getWidth() - leftMargin - rightMargin;

    const checkPageBreak = () => {
      if (yPos > 270) { // Check if yPos is near the bottom of the page
        doc.addPage();
        yPos = 20;
      }
    };

    // --- HEADER ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('PolicyPulse Analysis Report', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Source: ${report.source.value}`, doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
    yPos += 5;
    doc.text(`Analyzed on: ${new Date(report.created_at).toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
    yPos += 12;
    doc.setDrawColor(200, 200, 200);
    doc.line(leftMargin, yPos, doc.internal.pageSize.getWidth() - rightMargin, yPos);
    yPos += 10;

    // --- SCORE & SUMMARY ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Overall Privacy Score', leftMargin, yPos);
    doc.setFontSize(24);
    doc.text(`${report.score}/100`, doc.internal.pageSize.getWidth() - rightMargin, yPos, { align: 'right' });
    yPos += 7;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    yPos += addWrappedText(doc, report.score_rationale, leftMargin, yPos, contentWidth);
    yPos += 10;
    checkPageBreak();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Summary (TL;DR)', leftMargin, yPos);
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    yPos += addWrappedText(doc, report.tldr, leftMargin, yPos, contentWidth);
    yPos += 12;
    checkPageBreak();

    // --- IDENTIFIED RISKS ---
    if (report.risks.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(`Identified Risks (${report.risks.length})`, leftMargin, yPos);
      yPos += 8;
      
      report.risks.forEach((risk, index) => {
        checkPageBreak();
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(`• ${risk.risk_label} (${risk.severity.toUpperCase()} RISK)`, leftMargin + 5, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        yPos += addWrappedText(doc, `"${risk.excerpt}"`, leftMargin + 8, yPos, contentWidth - 8);
        yPos += 5;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        yPos += addWrappedText(doc, `Suggested Action: ${risk.suggested_action}`, leftMargin + 8, yPos, contentWidth - 8);
        yPos += 10;
      });
    }
    
    // --- RECOMMENDED ACTIONS ---
    checkPageBreak();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Recommended Actions', leftMargin, yPos);
    yPos += 8;

    report.actions.forEach(action => {
      checkPageBreak();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      yPos += addWrappedText(doc, `• ${action.title}`, leftMargin + 5, yPos, contentWidth - 5);
      yPos += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      yPos += addWrappedText(doc, action.description, leftMargin + 8, yPos, contentWidth - 8);
      yPos += 8;
    });

    // --- FOOTER ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount} | PolicyPulse Report`, doc.internal.pageSize.getWidth() / 2, 287, { align: 'center' });
        doc.text('Disclaimer: This is an AI-generated analysis and not legal advice.', doc.internal.pageSize.getWidth() / 2, 292, { align: 'center' });
    }

    doc.save(`PolicyPulse_Report_${report.source.value.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
    resolve();
  });
};
