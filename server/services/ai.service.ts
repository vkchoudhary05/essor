import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client with telemetry header as required by guidelines
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey.trim().length > 5 && !apiKey.includes('YOUR_API_KEY')) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey.trim(),
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

// Built-in verified expert knowledge bank for instant, lightning-fast response (<100ms)
const DOMAIN_KNOWLEDGE_BASE: Record<string, string> = {
  fssai: `### FSSAI Licensing & Statutory Food Business Approvals

In India, every Food Business Operator (FBO) must hold a valid FSSAI registration or license prior to commercial operations:

• **Registration vs License**:
  - **Basic Registration**: Petty food manufacturers, hawkers, and retail kiosks with turnover up to ₹12 Lakh/annum.
  - **State License**: Manufacturing units with production capacity up to 2 MT/day or turnover between ₹12 Lakh and ₹20 Crore.
  - **Central License**: Units with capacity >2 MT/day, 100% Export Oriented Units (EOUs), proprietary food products, or multi-state chains.

• **Mandatory Schedule 4 Hygiene Blueprint**:
  - Validated pest control contract with trending logs.
  - Potable water test reports per IS 10500 standards.
  - Medical fitness certificates for 100% of food handlers.
  - Calibrated temperature probes for cold room and heat processing.

• **ESSOR Turnkey Support**:
  We prepare error-free technical dossiers, file through FoSCoS, resolve statutory queries, and conduct mock pre-inspections ensuring license issuance within 15 to 25 business days.`,

  haccp_iso: `### HACCP vs. ISO 22000:2018 Comparison

While closely related, HACCP and ISO 22000 serve distinct operational roles in modern food processing:

• **HACCP (Codex Alimentarius)**:
  - Focuses strictly on physical, chemical, biological, and radiological hazards at the factory floor level.
  - Identifies Critical Control Points (CCPs), critical limits, monitoring procedures, and immediate corrective actions.

• **ISO 22000:2018 (Management Framework)**:
  - Adopts ISO Annex SL high-level structure (compatible with ISO 9001 and ISO 14001).
  - Encompasses the entire HACCP plan plus Prerequisite Programs (PRPs per ISO/TS 22002), Operational PRPs (oPRPs), management review, emergency preparedness, and interactive internal/external communication.

• **Recommendation**:
  For domestic retail, HACCP or ISO 22000 is excellent. For Tier-1 FMCG or international export, ISO 22000 or GFSI-benchmarked FSSC 22000 is required. ESSOR provides a phased upgrade path from HACCP to ISO 22000.`,

  brcgs: `### BRCGS Food Safety Issue 9 Unannounced Audit Protocol

BRCGS Issue 9 emphasizes continuous audit-readiness and authentic food safety culture:

1. **Unannounced Audit Mandate**:
   Every 3 years, at least one mandatory unannounced audit is conducted. Plants cannot "cram" before the auditor arrives.

2. **Core Clause Syllabi**:
   • **Senior Management Commitment (Section 1)**: Documented food safety culture plan with quarterly reviews.
   • **Hazard & Risk Management (Section 2)**: Fully validated HACCP plan with annual reviews.
   • **Site Standards & Hygiene (Section 4)**: Zoning (High Care / High Risk), foreign body detection (metal detectors/X-ray), and drainage design.
   • **Traceability Challenge (Section 3.9)**: Forward & backward trace with mass balance reconciled within 4 hours.

3. **How ESSOR Prepares Your Team**:
   We conduct complete unannounced mock inspections, staff interview drills, and CAPA validation to secure an 'AA' or 'A' rating with a 100% pass guarantee.`,

  fssc: `### FSSC 22000 Version 6 Requirements

FSSC 22000 Version 6 became mandatory in April 2024. Key updates include:

• **Three Core Elements**:
  1. ISO 22000:2018 Standard requirements.
  2. Sector-specific PRPs (ISO/TS 22002-1 for food manufacturing).
  3. FSSC 22000 Additional Requirements (Food Defense, Food Fraud mitigation, Food Loss & Waste monitoring, Equipment Design).

• **Audit Duration & Certification Cycle**:
  Initial Stage 1 (Documentation review) + Stage 2 (On-site implementation audit). 3-year certification cycle with annual surveillance.

• **Global Recognition**:
  Benchmarked by GFSI and accepted unconditionally by global retailers (Walmart, Tesco, Nestlé, Unilever). ESSOR provides end-to-end SOP drafting and implementation.`,

  swabs: `### Hygiene Swabbing & Environmental Monitoring Programs (EMP)

An Environmental Monitoring Program (EMP) is essential for verifying plant sanitation and pathogen zoning:

• **Zone Classification**:
  - **Zone 1 (Food Contact Surfaces)**: Conveyor belts, slicers, hoppers, packing funnels. Tested for ATP bioluminescence and Total Plate Count (TPC).
  - **Zone 2 (Adjacent Non-Contact Surfaces)**: Frameworks, control buttons, chutes. Tested for indicator organisms (Coliforms/Enterobacteriaceae).
  - **Zone 3 (Processing Environment)**: Walls, drains, overhead pipes. Tested for target pathogens (Listeria monocytogenes, Salmonella spp.).
  - **Zone 4 (Remote Areas)**: Warehouses, maintenance shops, locker rooms.

• **Sampling Frequency**:
  - Weekly ATP swabs for rapid sanitation validation prior to production startup.
  - Monthly pathogen swabbing in wet processing zones and drain areas.
  - Quarterly bio-burden air plates and personnel hand swabs.

• **ESSOR Laboratory Services**:
  We provide sterile swab kits, sample logistics, NABL-accredited test reports, and corrective action protocols for repeat positive counts.`,

  training: `### FoSTaC & Certified Food Safety Training Programs

Under FSSAI mandate, every licensed food establishment must have at least one trained Food Safety Supervisor (FSS) per 25 food handlers:

• **ESSOR Accredited Programs**:
  1. **FSSAI FoSTaC Certification**: Basic, Advanced, and Special course modules for Catering, Manufacturing, Dairy, and Bakery.
  2. **Internal Auditor (ISO 22000 / BRCGS / FSSC)**: 2-day intensive practical course with simulated non-conformance audits.
  3. **HACCP Team Leader Workshop**: Codex principles, hazard matrices, and CCP critical limit validation.
  4. **GMP & Allergen Hygiene for Floor Operators**: Vernacular training (Hindi / English) for factory floor staff.

• **Tamper-Proof Verification**:
  All certificates issued by ESSOR feature a cryptographically signed QR code verifiable 24/7 on our public registry.`,

  fsma: `### US FDA FSMA Compliance (Preventive Controls & FSVP)

Exporting food and beverage products to the United States requires strict alignment with the FDA Food Safety Modernization Act:

• **Hazard Analysis and Risk-Based Preventive Controls (HARPC)**:
  Requires a Preventive Controls Qualified Individual (PCQI) to author and validate the plant's Food Safety Plan.
• **Process Controls**: Thermal kill steps, acid/pH controls, water activity (aw) logs.
• **Allergen & Sanitation Controls**: Validated clean-in-place (CIP) and dedicated allergen tooling.
• **Supply-Chain Preventive Controls**: Foreign Supplier Verification Program (FSVP) verification for raw material vendors.

• **ESSOR US FDA Desk**:
  Our lead PCQI auditors review your FDA Food Safety Plan, conduct mock FDA-style inspections, and ensure 100% border compliance.`,

  halal_kosher: `### Halal & Kosher Scheme Certification

Specialized dietary certifications unlock massive retail export markets across the GCC, Southeast Asia, North America, and Europe:

• **Halal Certification**:
  - Strict compliance with GSO 2055-1 / MS 1500 standards.
  - Zero cross-contamination with non-Halal ingredients (porcine derivatives, unapproved enzymes, ethyl alcohol).
  - Dedicated storage, clean transportation lines, and Halal-trained internal assurance committees.

• **Kosher Certification**:
  - Kashrut law compliance (separation of meat and dairy, supervision of equipment, rabbinic ingredient approvals).
  - Annual rabbinical on-site audit and batch supervision where required.

• **ESSOR Global Desk**:
  We coordinate with recognized international Islamic bodies and Rabbinical authorities for direct facility audits and certificate issuance.`,

  capa: `### CAPA (Corrective and Preventive Action) Root Cause Resolution

Resolving audit non-conformances requires demonstrating verified root causes rather than temporary surface corrections:

1. **Immediate Correction (Containment)**:
   Quarantine affected product, halt non-conforming batch distribution, and apply immediate containment within 24 hours.
2. **Root Cause Analysis (RCA)**:
   Utilize structured 5-Whys or Ishikawa Fishbone diagrams to identify systemic procedural, equipment, or training gaps.
3. **Preventive Action**:
   Implement engineering interlocks, automated temperature alarms, or updated SOPs.
4. **Effectiveness Verification**:
   Re-audit the critical control after 30 to 60 days to verify zero recurrence.

• **ESSOR Digital CAPA System**:
  Our platform tracks non-conformances with automated due-date reminders, evidence photo uploads, and auditor sign-off.`
};

export async function askFoodSafetyAdvisor(query: string, visitorName?: string): Promise<string> {
  const normalized = query.trim().toLowerCase();

  // If Gemini client is active, query model with strict 3.5s timeout to guarantee zero user delay
  if (aiClient) {
    try {
      const geminiPromise = aiClient.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
        contents: query,
        config: {
          systemInstruction: `You are Dr. Priya Sharma, Lead Food Safety Specialist & Auditor at ESSOR Compliance Solutions.
You provide authoritative, clear, and reassuring guidance on global food safety standards including:
- FSSAI Licensing (State & Central, FoSCoS, Schedule 4)
- BRCGS Food Safety Issue 9
- FSSC 22000 version 6 & ISO 22000:2018
- HACCP & Codex Alimentarius
- US FDA FSMA (PCQI, HARPC, FSVP)
- Halal, Kosher, SQF, and Hygiene Swabbing (ATP, EMP, Listeria)
- FoSTaC Training & Workforce Certification

${visitorName ? `The visitor's name is ${visitorName}.` : ''}
Give a concise, warm answer in under 80 words. Use at most 3 bullets, avoid unsupported guarantees, and ask one helpful follow-up question when useful.`,
        }
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI response timeout')), 3500)
      );

      const response = await Promise.race([geminiPromise, timeoutPromise]);
      const text = response?.text;
      if (text && text.trim().length > 0) {
        return text.trim();
      }
    } catch (err: any) {
      console.warn('[AI Service] Gemini call bypassed or timed out, serving verified domain knowledge:', err?.message || err);
    }
  }

  // Instant intelligent domain fallback matches (<5ms latency)
  if (normalized.includes('fssai') || normalized.includes('license') || normalized.includes('foscos') || normalized.includes('state') || normalized.includes('central')) {
    return DOMAIN_KNOWLEDGE_BASE.fssai;
  }
  if (normalized.includes('haccp') || normalized.includes('iso') || normalized.includes('difference') || normalized.includes('22000')) {
    return DOMAIN_KNOWLEDGE_BASE.haccp_iso;
  }
  if (normalized.includes('brc') || normalized.includes('unannounced')) {
    return DOMAIN_KNOWLEDGE_BASE.brcgs;
  }
  if (normalized.includes('fssc')) {
    return DOMAIN_KNOWLEDGE_BASE.fssc;
  }
  if (normalized.includes('swab') || normalized.includes('micro') || normalized.includes('emp') || normalized.includes('hygiene') || normalized.includes('atp') || normalized.includes('listeria')) {
    return DOMAIN_KNOWLEDGE_BASE.swabs;
  }
  if (normalized.includes('train') || normalized.includes('fostac') || normalized.includes('supervisor') || normalized.includes('course') || normalized.includes('academy')) {
    return DOMAIN_KNOWLEDGE_BASE.training;
  }
  if (normalized.includes('fsma') || normalized.includes('fda') || normalized.includes('pcqi') || normalized.includes('export') || normalized.includes('usa')) {
    return DOMAIN_KNOWLEDGE_BASE.fsma;
  }
  if (normalized.includes('halal') || normalized.includes('kosher')) {
    return DOMAIN_KNOWLEDGE_BASE.halal_kosher;
  }
  if (normalized.includes('capa') || normalized.includes('corrective') || normalized.includes('root cause') || normalized.includes('non-conformance')) {
    return DOMAIN_KNOWLEDGE_BASE.capa;
  }

  // Comprehensive, structured response
  return `### Food Safety & Regulatory Advisory Guidance

Thank you for your inquiry regarding **"${query}"**.

In certified food manufacturing, packaging, and commercial catering, addressing this requirement effectively rests on three core pillars:

1. **Prerequisite Programs (PRPs & GMPs)**:
   Ensure verified sanitary design, pest trending logs, potable water testing (IS 10500), and documented employee personal hygiene.

2. **Hazard Analysis & Critical Limits (CCPs & oPRPs)**:
   Establish scientifically validated critical limits (thermal lethality, metal detection sensitivity, chilled cold chain <4°C) with real-time logging.

3. **Verifiable Audit Evidence & Traceability**:
   Maintain documented SOPs, batch records, forward/backward trace capability within 4 hours, and structured CAPA resolution.

• **Direct Specialist Assistance**:
  ESSOR Compliance Solutions provides hands-on facility gap audits, FSSAI statutory approvals, and GFSI certification blueprints with a 100% first-time pass guarantee.
  - **Direct WhatsApp**: +91 6395843850
  - **Email**: business@essorcompliance.com`;
}
