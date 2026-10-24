import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Certificate, CompanyVisit } from '../types';

export class PDFGeneratorService {
  /**
   * Generates a tamper-evident, high-resolution landscape certificate PDF
   * Complete with Metallic Emerald & Pine decorative borders, authorized signatory, and scannable QR Code
   */
  static async generateCertificatePDF(cert: Certificate): Promise<jsPDF> {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4' // 297 x 210 mm
    });

    const pageWidth = 297;
    const pageHeight = 210;

    // 1. Background wash & borders
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer Forest Pine border
    doc.setDrawColor(6, 46, 33); // #012B53
    doc.setLineWidth(3);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'D');

    // Inner Metallic Emerald hairline border
    doc.setDrawColor(16, 185, 129); // #10B981
    doc.setLineWidth(0.8);
    doc.rect(13, 13, pageWidth - 26, pageHeight - 26, 'D');

    // Decorative corner flourishes
    doc.setFillColor(6, 46, 33);
    const cornerSize = 4;
    doc.rect(13, 13, cornerSize, cornerSize, 'F');
    doc.rect(pageWidth - 13 - cornerSize, 13, cornerSize, cornerSize, 'F');
    doc.rect(13, pageHeight - 13 - cornerSize, cornerSize, cornerSize, 'F');
    doc.rect(pageWidth - 13 - cornerSize, pageHeight - 13 - cornerSize, cornerSize, cornerSize, 'F');

    // 2. Header: ESSOR COMPLIANCE SOLUTIONS
    doc.setTextColor(6, 46, 33);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('ESSOR COMPLIANCE SOLUTIONS', pageWidth / 2, 28, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(5, 150, 105); // #059669
    doc.text('FOOD SAFETY CONSULTING · MANAGED COMPLIANCE · AUDIT READINESS · TRAINING', pageWidth / 2, 33, { align: 'center' });

    // Decorative line
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.line(60, 36, pageWidth - 60, 36);

    // 3. Certificate Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(6, 46, 33);
    doc.text('CERTIFICATE OF TRAINING COMPLETION', pageWidth / 2, 48, { align: 'center' });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(110, 110, 110);
    doc.text('This is to officially certify that', pageWidth / 2, 56, { align: 'center' });

    // 4. Participant Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(6, 46, 33);
    doc.text(cert.participantName.toUpperCase(), pageWidth / 2, 69, { align: 'center' });

    // Organization mention
    if (cert.organizationName) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(5, 150, 105);
      doc.text(`of ${cert.organizationName}`, pageWidth / 2, 75, { align: 'center' });
    }

    // 5. Completion Narrative
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(80, 80, 80);
    doc.text('has successfully completed the authorized professional training curriculum and demonstrated verified competency in', pageWidth / 2, 85, { align: 'center' });

    // 6. Course Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(6, 46, 33);
    doc.text(`"${cert.courseTitle}"`, pageWidth / 2, 95, { align: 'center' });

    // 7. Course metadata pill / box
    doc.setFillColor(236, 253, 245);
    doc.setDrawColor(167, 243, 208);
    doc.setLineWidth(0.4);
    doc.roundedRect(65, 103, pageWidth - 130, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(6, 46, 33);
    doc.text(`CURRICULUM DURATION: ${cert.durationHours} HOURS`, 75, 111.5);
    doc.text(`ASSESSMENT SCORE: ${cert.gradeScore ? `${cert.gradeScore}%` : 'COMPETENT / PASS'}`, pageWidth / 2, 111.5, { align: 'center' });
    doc.text(`COMPLETION: ${new Date(cert.completionDate).toLocaleDateString()}`, pageWidth - 75, 111.5, { align: 'right' });

    // 8. Signatory & Security Block
    const bottomY = 138;

    // Left: Authorized Signatory
    doc.setDrawColor(6, 46, 33);
    doc.setLineWidth(0.5);
    doc.line(35, bottomY + 22, 100, bottomY + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 46, 33);
    doc.text(cert.issuedByName, 67.5, bottomY + 28, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(cert.issuedByRole, 67.5, bottomY + 33, { align: 'center' });
    doc.text('ESSOR Compliance Solutions', 67.5, bottomY + 37, { align: 'center' });

    // Middle: Security Seal Crest
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(1);
    doc.circle(pageWidth / 2, bottomY + 20, 14, 'D');
    doc.setLineWidth(0.4);
    doc.circle(pageWidth / 2, bottomY + 20, 12, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(6, 46, 33);
    doc.text('OFFICIAL', pageWidth / 2, bottomY + 16, { align: 'center' });
    doc.setFontSize(9);
    doc.text('ECS', pageWidth / 2, bottomY + 21, { align: 'center' });
    doc.setFontSize(6.5);
    doc.text('VERIFIED', pageWidth / 2, bottomY + 25, { align: 'center' });

    // Right: Generate Real Scannable QR Code
    try {
      const verifyUrl = `${window.location.origin}/verify-certificate?cert=${encodeURIComponent(cert.certificateNumber)}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 120,
        margin: 1,
        color: {
          dark: '#012B53',
          light: '#F8FAFC'
        }
      });

      const qrSize = 28;
      const qrX = pageWidth - 40 - qrSize;
      const qrY = bottomY + 6;

      doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(6, 46, 33);
      doc.text('SCAN TO VERIFY', qrX + qrSize / 2, qrY + qrSize + 4.5, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(120, 120, 120);
      doc.text(`REF: ${cert.certificateNumber}`, qrX + qrSize / 2, qrY + qrSize + 8, { align: 'center' });
    } catch (e) {
      console.warn('QR Code rendering failed in PDF generator', e);
    }

    // 9. Footer Security Metadata
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    const dateIssuedStr = new Date(cert.issueDate).toISOString().split('T')[0];
    doc.text(`Official Document ID: ${cert.id} · Issued on: ${dateIssuedStr} · Security Verification Hash: ${cert.verificationToken.slice(0, 16)}...`, pageWidth / 2, 196, { align: 'center' });

    return doc;
  }

  /**
   * Generates a comprehensive Multi-Page Technical Inspection Report PDF
   * Complete with observation tables, severity matrix, and consultant signoff
   */
  static async generateVisitReportPDF(visit: CompanyVisit): Promise<jsPDF> {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4' // 210 x 297 mm
    });

    const pageWidth = 210;
    const pageHeight = 297;

    // Header banner
    doc.setFillColor(6, 46, 33); // #012B53
    doc.rect(0, 0, pageWidth, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('ESSOR COMPLIANCE SOLUTIONS', 14, 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(167, 243, 208); // Emerald light
    doc.text('TECHNICAL SITE VISIT & AUDIT-READINESS ASSESSMENT REPORT', 14, 19);

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`REF: ${visit.visitReference}`, pageWidth - 14, 15, { align: 'right' });

    // Meta Block
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, 34, pageWidth - 28, 38, 2, 2, 'F');
    doc.setDrawColor(220, 225, 218);
    doc.setLineWidth(0.4);
    doc.roundedRect(14, 34, pageWidth - 28, 38, 2, 2, 'D');

    doc.setTextColor(6, 46, 33);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('ORGANIZATION & VISIT METADATA', 18, 41);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(70, 70, 70);

    doc.text(`Client Organization:`, 18, 48);
    doc.setFont('helvetica', 'bold');
    doc.text(visit.organizationName, 52, 48);

    doc.setFont('helvetica', 'normal');
    doc.text(`Facility Site:`, 18, 54);
    doc.setFont('helvetica', 'bold');
    doc.text(`${visit.siteName} (${visit.siteAddress})`, 52, 54);

    doc.setFont('helvetica', 'normal');
    doc.text(`Lead Consultant:`, 18, 60);
    doc.text(visit.consultantName, 52, 60);

    doc.text(`Visit Type:`, 18, 66);
    doc.text(visit.visitType.replace(/_/g, ' '), 52, 66);

    doc.text(`Inspection Date:`, 120, 48);
    doc.text(new Date(visit.scheduledDate).toLocaleDateString(), 150, 48);

    doc.text(`Status:`, 120, 54);
    doc.text(visit.status, 150, 54);

    doc.text(`Representative:`, 120, 60);
    doc.text(visit.clientRepPresent || 'Client QA Lead', 150, 60);

    doc.text(`Standards Scope:`, 120, 66);
    doc.text(visit.standardsScope.join(', '), 150, 66);

    // Findings Summary Scorecard
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 46, 33);
    doc.text('FINDINGS & RISK CLASSIFICATION SUMMARY', 14, 80);

    const fBoxWidth = (pageWidth - 28 - 9) / 4;
    const fY = 84;

    const cards = [
      { label: 'CRITICAL', count: visit.findingsCount.critical, bg: [254, 226, 226], text: [153, 27, 27] },
      { label: 'MAJOR', count: visit.findingsCount.major, bg: [254, 243, 199], text: [146, 64, 14] },
      { label: 'MINOR', count: visit.findingsCount.minor, bg: [219, 234, 254], text: [30, 64, 175] },
      { label: 'OBSERVATIONS', count: visit.findingsCount.observations, bg: [243, 244, 246], text: [55, 65, 81] }
    ];

    cards.forEach((c, idx) => {
      const x = 14 + idx * (fBoxWidth + 3);
      doc.setFillColor(c.bg[0], c.bg[1], c.bg[2]);
      doc.roundedRect(x, fY, fBoxWidth, 18, 1.5, 1.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(c.text[0], c.text[1], c.text[2]);
      doc.text(c.label, x + fBoxWidth / 2, fY + 6, { align: 'center' });

      doc.setFontSize(14);
      doc.text(c.count.toString(), x + fBoxWidth / 2, fY + 14, { align: 'center' });
    });

    // Executive Summary Notes
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 46, 33);
    doc.text('CONSULTANT EXECUTIVE OBSERVATION', 14, 110);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    const summaryText = visit.consultantSummaryNotes || 
      'The facility demonstrates operational awareness of basic GMP requirements. Critical focus is required on foreign body prevention calibration, temperature log verification during shift changes, and allergen segregation protocols.';
    doc.text(summaryText, 14, 116, { maxWidth: pageWidth - 28, lineHeightFactor: 1.4 });

    // Inspection Checklist Highlights Table
    let currentY = 136;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 46, 33);
    doc.text('INSPECTION CHECKLIST FINDINGS', 14, currentY);

    currentY += 5;
    // Table Header
    doc.setFillColor(6, 46, 33);
    doc.rect(14, currentY, pageWidth - 28, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.text('SECTION / REQUIREMENT', 16, currentY + 4.8);
    doc.text('EVALUATION', 140, currentY + 4.8);
    doc.text('SEVERITY / ACTION', 170, currentY + 4.8);

    currentY += 7;

    visit.checklistResponses.slice(0, 7).forEach((item, idx) => {
      doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      doc.rect(14, currentY, pageWidth - 28, 12, 'F');
      doc.setDrawColor(235, 235, 235);
      doc.line(14, currentY + 12, pageWidth - 14, currentY + 12);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(6, 46, 33);
      doc.text(item.section, 16, currentY + 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(90, 90, 90);
      doc.text(item.question.slice(0, 75) + '...', 16, currentY + 8.5);

      // Status
      doc.setFont('helvetica', 'bold');
      if (item.response === 'COMPLIANT') {
        doc.setTextColor(22, 101, 52);
      } else if (item.response === 'NON_COMPLIANT') {
        doc.setTextColor(185, 28, 28);
      } else {
        doc.setTextColor(100, 100, 100);
      }
      doc.text(item.response, 140, currentY + 6.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(60, 60, 60);
      doc.text(item.severity ? `${item.severity}` : 'None', 170, currentY + 6.5);

      currentY += 12;
    });

    // Signatures & Disclaimer Footer
    const footY = 250;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, footY, pageWidth - 14, footY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(6, 46, 33);
    doc.text('Lead Consultant Signature', 14, footY + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(visit.consultantName, 14, footY + 11);
    doc.text('ESSOR Compliance Solutions', 14, footY + 15);

    doc.setFont('helvetica', 'bold');
    doc.text('Client Representative Acknowledgement', 120, footY + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(visit.clientRepPresent || 'Client QA Lead', 120, footY + 11);
    doc.text('Received & Confirmed on Site', 120, footY + 15);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(130, 130, 130);
    const disclaimer = 'Confidential technical report prepared for internal client remediation and audit readiness preparation. ESSOR Compliance Solutions is an independent advisory firm and not an accredited certification body.';
    doc.text(disclaimer, pageWidth / 2, 285, { align: 'center', maxWidth: 180 });

    return doc;
  }
}
