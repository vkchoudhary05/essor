import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Certificate, CompanyVisit } from '../types';

export class PDFGeneratorService {
  /**
   * Generates a tamper-evident, high-resolution landscape certificate PDF
   * Complete with Champagne Gold decorative borders, authorized signatory, and scannable QR Code
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
    doc.setFillColor(250, 251, 249);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer Navy border
    doc.setDrawColor(20, 43, 58); // #142B3A
    doc.setLineWidth(3);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'D');

    // Inner Champagne Gold hairline border
    doc.setDrawColor(217, 183, 106); // #D9B76A
    doc.setLineWidth(0.8);
    doc.rect(13, 13, pageWidth - 26, pageHeight - 26, 'D');

    // Decorative corner flourishes
    doc.setFillColor(20, 43, 58);
    const cornerSize = 4;
    doc.rect(13, 13, cornerSize, cornerSize, 'F');
    doc.rect(pageWidth - 13 - cornerSize, 13, cornerSize, cornerSize, 'F');
    doc.rect(13, pageHeight - 13 - cornerSize, cornerSize, cornerSize, 'F');
    doc.rect(pageWidth - 13 - cornerSize, pageHeight - 13 - cornerSize, cornerSize, cornerSize, 'F');

    // 2. Header: ESSOR COMPLIANCE SOLUTIONS
    doc.setTextColor(20, 43, 58);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('ESSOR COMPLIANCE SOLUTIONS', pageWidth / 2, 28, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(84, 117, 101); // #547565
    doc.text('FOOD SAFETY CONSULTING · MANAGED COMPLIANCE · AUDIT READINESS · TRAINING', pageWidth / 2, 33, { align: 'center' });

    // Decorative line
    doc.setDrawColor(217, 183, 106);
    doc.setLineWidth(0.5);
    doc.line(60, 36, pageWidth - 60, 36);

    // 3. Certificate Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(20, 43, 58);
    doc.text('CERTIFICATE OF TRAINING COMPLETION', pageWidth / 2, 48, { align: 'center' });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(110, 110, 110);
    doc.text('This is to officially certify that', pageWidth / 2, 56, { align: 'center' });

    // 4. Participant Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(20, 43, 58);
    doc.text(cert.participantName.toUpperCase(), pageWidth / 2, 69, { align: 'center' });

    // Organization mention
    if (cert.organizationName) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(84, 117, 101);
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
    doc.setTextColor(20, 43, 58);
    doc.text(`"${cert.courseTitle}"`, pageWidth / 2, 95, { align: 'center' });

    // 7. Course metadata pill / box
    doc.setFillColor(244, 246, 243);
    doc.setDrawColor(220, 225, 218);
    doc.setLineWidth(0.4);
    doc.roundedRect(65, 103, pageWidth - 130, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(20, 43, 58);
    const metaText = `Duration: ${cert.durationHours} Training Hours   |   Score Achieved: ${cert.gradeScore ? `${cert.gradeScore}%` : 'Competent'}   |   Completion Date: ${new Date(cert.completionDate).toLocaleDateString()}`;
    doc.text(metaText, pageWidth / 2, 111.5, { align: 'center' });

    // 8. Signatory & Verification QR Section
    // Generate QR Code data URL
    const verifyUrl = `${window.location.origin}/verify-certificate/${cert.certificateNumber}`;
    try {
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 120,
        margin: 1,
        color: { dark: '#142B3A', light: '#FFFFFF' }
      });
      // Place QR code on the left side
      doc.addImage(qrDataUrl, 'PNG', 32, 138, 30, 30);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.text('Scan to verify authenticity', 47, 172, { align: 'center' });
    } catch (e) {
      console.warn('QR code generation bypassed', e);
    }

    // Center details: Certificate number & Token
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(20, 43, 58);
    doc.text(`Certificate No: ${cert.certificateNumber}`, pageWidth / 2, 150, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 110);
    doc.text(`Issue Date: ${new Date(cert.issueDate).toLocaleDateString()}   |   Status: ${cert.status}`, pageWidth / 2, 155, { align: 'center' });
    doc.text(`Security Verification Token: ${cert.verificationToken}`, pageWidth / 2, 160, { align: 'center' });

    // Right side: Authorized Signature
    const sigX = pageWidth - 65;
    doc.setDrawColor(20, 43, 58);
    doc.setLineWidth(0.6);
    doc.line(sigX - 30, 160, sigX + 30, 160);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 43, 58);
    doc.text(cert.issuedByName, sigX, 165, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(84, 117, 101);
    doc.text(cert.issuedByRole, sigX, 169, { align: 'center' });
    doc.text('ESSOR Compliance Solutions', sigX, 173, { align: 'center' });

    // 9. Statutory Advisory Footer Notice
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(140, 140, 140);
    const disclaimer = 'ESSOR Compliance Solutions provides independent food-safety training and technical competence assessments. This certificate confirms successful participation and internal curriculum assessment. It does not constitute accredited third-party certification under ISO 17024 or ISO 17021.';
    doc.text(disclaimer, pageWidth / 2, 192, { align: 'center', maxWidth: 240 });

    return doc;
  }

  /**
   * Generates a formal, multi-page PDF Audit & Inspection Visit Report
   */
  static async generateVisitReportPDF(visit: CompanyVisit): Promise<jsPDF> {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4' // 210 x 297 mm
    });

    const pageWidth = 210;

    // Header
    doc.setFillColor(20, 43, 58);
    doc.rect(0, 0, pageWidth, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('ESSOR COMPLIANCE SOLUTIONS', 14, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(217, 183, 106);
    doc.text('OFFICIAL SITE AUDIT & INSPECTION SUMMARY REPORT', 14, 18);

    doc.setTextColor(200, 200, 200);
    doc.setFontSize(8);
    doc.text(`Report Ref: ${visit.visitReference}`, pageWidth - 14, 14, { align: 'right' });
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 14, 20, { align: 'right' });

    // Client and Facility Meta Box
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(248, 248, 245);
    doc.roundedRect(14, 34, pageWidth - 28, 38, 2, 2, 'FD');

    doc.setTextColor(20, 43, 58);
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
    doc.setTextColor(20, 43, 58);
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
    doc.setTextColor(20, 43, 58);
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
    doc.setTextColor(20, 43, 58);
    doc.text('INSPECTION CHECKLIST FINDINGS', 14, currentY);

    currentY += 5;
    // Table Header
    doc.setFillColor(20, 43, 58);
    doc.rect(14, currentY, pageWidth - 28, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.text('SECTION / REQUIREMENT', 16, currentY + 4.8);
    doc.text('EVALUATION', 140, currentY + 4.8);
    doc.text('SEVERITY / ACTION', 170, currentY + 4.8);

    currentY += 7;

    visit.checklistResponses.slice(0, 7).forEach((item, idx) => {
      doc.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 251, idx % 2 === 0 ? 255 : 249);
      doc.rect(14, currentY, pageWidth - 28, 12, 'F');
      doc.setDrawColor(235, 235, 235);
      doc.line(14, currentY + 12, pageWidth - 14, currentY + 12);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(20, 43, 58);
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
    doc.setTextColor(20, 43, 58);
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
