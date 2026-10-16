import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client with telemetry header as required by guidelines
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (err) {
    console.warn('[AI Service] Failed to initialize GoogleGenAI client:', err);
  }
}

// Built-in expert knowledge bank for instant offline fallback
const DOMAIN_KNOWLEDGE_BASE: Record<string, string> = {
  haccp_iso: `HACCP (Hazard Analysis Critical Control Point) is a foundational, risk-based operational methodology that identifies specific biological, chemical, and physical hazards and establishes Critical Control Points (CCPs) with strict critical limits. 

ISO 22000 incorporates the entire HACCP system as defined by Codex Alimentarius, but integrates it into a high-level management framework (ISO Annex SL). While HACCP focuses primarily on food safety hazards at the production level, ISO 22000 includes management responsibility, prerequisite programs (PRPs), continuous system audits, internal communication protocols, and interactive supply chain traceability.

ESSOR supports both frameworks: we help facilities design their foundational HACCP plans and elevate them to ISO 22000 / FSSC 22000 certification readiness.`,

  brcgs: `Preparing for an unannounced BRCGS Food Safety audit requires maintaining an "everyday audit-ready" state rather than cramming before an announced visit. Key preparation areas include:

1. Prerequisite Programs (PRPs): Daily GMP audits, boot scrubbing, hand hygiene verification, pest control logs, and chemical segregation.
2. Traceability Challenge: Ensure you can perform a full forward and backward trace test (raw materials to finished pack) within the mandatory 4-hour window, accounting for 100% mass balance.
3. CCP Validation & Calibration: Daily metal detector / X-ray challenge tests with calibrated test wands (Fe, Non-Fe, SS), verified temperature charts, and scale records.
4. Internal Audits & Root Cause CAPA: Evidence that all previous non-conformances were investigated down to root causes rather than superficial fixes.

ESSOR provides simulated mock audits and daily compliance check protocols to ensure your plant scores an AA or A grade.`,

  allergens: `Mandatory allergen management under global standards (BRCGS, FSSC 22000, US FDA FSMA, and EU 1169/2011) centers on preventing unintended cross-contact:

• Matrix Risk Assessment: Profile all raw materials entering the facility against the Major 14 / Big 9 allergens (peanuts, tree nuts, milk, eggs, wheat/gluten, soy, fish, crustacean shellfish, sesame).
• Physical & Temporal Segregation: Store allergenic ingredients in dedicated low racks with color-coded containers. Schedule allergenic production runs at the end of the day before deep sanitation.
• Validated Cleaning Protocols: Use validated quantitative ELISA or lateral flow swab tests to verify allergen protein removal on food contact surfaces.
• Clear Label Specification: Validate packaging print plates to ensure correct bolding and declaration statements ("Contains: Milk, Wheat").

ESSOR audits allergen cleaning validations and provides digital tracking for allergen line clearances.`,

  capa: `A robust Corrective and Preventive Action (CAPA) process moves beyond simply cleaning a spill or rewriting an SOP:

1. Containment (Immediate Correction): Quarantine affected product, halt non-conforming batch distribution, and apply immediate containment.
2. Root Cause Analysis (RCA): Apply proven methodologies such as the 5-Whys or Ishikawa Fishbone Diagram to determine whether the failure was human error, equipment malfunction, procedural ambiguity, or environmental drift.
3. Preventive Action: Implement systemic fixes (e.g., engineering interlocks, automated temperature sensor alarms, or staff retraining).
4. Effectiveness Verification: Re-audit the critical control after 30 to 60 days to confirm the non-conformance has not recurred.

ESSOR's Digital Platform provides real-time CAPA tracking with automated due-date escalation and auditor sign-off.`,

  coldchain: `Cold-chain critical control points are vital for preventing rapid vegetative bacterial multiplication (such as Listeria monocytogenes and Salmonella):

• Chilled Storage: Maintained consistently at 0°C to 4°C (never exceeding 5°C).
• Frozen Storage: Maintained at -18°C or colder throughout holding and shipping.
• Continuous Telemetry: Calibrated digital probes with automatic alerting (SMS/Email) if temperatures drift above threshold for more than 15 minutes.
• Loading Dock Protocols: Refrigerated vestibules or rapid-acting dock seals to prevent condensation formation during truck transfers.

ESSOR helps processing facilities calibrate their thermal monitoring systems and conduct thermal mapping studies.`,

  certificate: `You can instantly verify the authenticity of any ESSOR Food Safety Certificate or Training Credential using our public verification portal:

1. Simply navigate to the 'Verify Credential' section on our website.
2. Enter the unique 8-12 character Certificate Number (e.g., ESS-2026-FSSC-9041).
3. Alternatively, scan the QR code printed directly on the issued certificate document.
4. The system validates the credential against our tamper-proof central registry, showing the issue date, validity status, certified facility, and accredited scope.`
};

export async function askFoodSafetyAdvisor(query: string): Promise<string> {
  const normalized = query.trim().toLowerCase();

  // If Gemini client is active, query model with Dr. Sarah persona
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: query,
        config: {
          systemInstruction: `You are Dr. Sarah Jenkins, Lead Food Safety Specialist & Auditor at ESSOR Compliance Solutions.
You provide authoritative, clear, and reassuring guidance on global food safety standards including:
- BRCGS Food Safety Issue 9
- FSSC 22000 version 6
- ISO 22000:2018
- HACCP & Codex Alimentarius
- US FDA FSMA (PCQI, Foreign Supplier Verification)
- Allergen Management & Environmental Monitoring (Listeria, Salmonella)
- Cold chain controls, sanitation CIP validation, and CAPA resolution.

Keep answers concise (2 to 3 paragraphs max, or clear bullet points), practical, actionable for plant managers and QA professionals, and maintain a warm, highly professional tone. Reference ESSOR's Three Pillars (Consult, Managed Compliance, Digital Platform) where natural.`,
        }
      });

      const text = response.text;
      if (text && text.trim().length > 0) {
        return text.trim();
      }
    } catch (err) {
      console.warn('[AI Service] Gemini call failed, using domain fallback:', err);
    }
  }

  // Intelligent domain fallback matches
  if (normalized.includes('haccp') && (normalized.includes('iso') || normalized.includes('difference') || normalized.includes('fssc'))) {
    return DOMAIN_KNOWLEDGE_BASE.haccp_iso;
  }
  if (normalized.includes('brc') || normalized.includes('unannounced') || normalized.includes('audit')) {
    return DOMAIN_KNOWLEDGE_BASE.brcgs;
  }
  if (normalized.includes('allergen') || normalized.includes('label') || normalized.includes('cross-contact')) {
    return DOMAIN_KNOWLEDGE_BASE.allergens;
  }
  if (normalized.includes('capa') || normalized.includes('corrective') || normalized.includes('root cause') || normalized.includes('non-conformance')) {
    return DOMAIN_KNOWLEDGE_BASE.capa;
  }
  if (normalized.includes('cold') || normalized.includes('temp') || normalized.includes('chilled') || normalized.includes('freeze')) {
    return DOMAIN_KNOWLEDGE_BASE.coldchain;
  }
  if (normalized.includes('verify') || normalized.includes('certificate') || normalized.includes('qr') || normalized.includes('registry')) {
    return DOMAIN_KNOWLEDGE_BASE.certificate;
  }

  // General helpful response from Dr. Sarah
  return `Thank you for your query regarding "${query}". 

In food manufacturing and processing, addressing this requires reviewing three core pillars:
1. Prerequisite Programs (PRPs): Ensuring baseline sanitary design, GMP discipline, water quality testing, and personal hygiene standards.
2. Hazard Analysis & Critical Limits: Establishing scientific validation for every critical control point with continuous logging and verified calibration.
3. Verification & Digital Records: Maintaining verifiable evidence, automated audit trails, and rapid corrective action protocols.

Our team at ESSOR Compliance Solutions specializes in preparing facilities for BRCGS, FSSC 22000, ISO 22000, and FDA compliance. You can schedule a confidential facility assessment or reach out to our lead technical specialists anytime!`;
}
