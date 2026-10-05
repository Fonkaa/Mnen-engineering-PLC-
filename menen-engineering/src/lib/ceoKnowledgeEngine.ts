export interface DossierTopic {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  response: string;
}

export const CEO_DOSSIER_DATA = {
  fullName: 'Eng. Habtamu Getu Mihret',
  role: 'Co-founder, General Manager (CEO) & Lead Structural Engineer',
  firm: 'MENEN Engineering PLC',
  experienceYears: 'Over 10+ years of high-rise structural, bridge, and project management practice',
  license: 'Category One Professional Structural Engineer (Addis Ababa Construction Bureau Certified)',
  motto: "It's all about commitment!",
  contacts: {
    phone: '+251 920 517 606 / +251 913 034 623',
    email: 'habtamuengr@gmail.com',
    office: 'Wello Sefer, behind Garad Mall, GS Building, 2nd Floor Office, Addis Ababa, Ethiopia',
    linkedin: 'https://www.linkedin.com/in/habtamu-mihret',
    facebook: 'https://www.facebook.com/habtamu.getu.984',
  },
};

export const KNOWLEDGE_BASE: DossierTopic[] = [
  // 1. Education - Chalmers University
  {
    id: 'education_chalmers',
    category: 'Academic Qualifications',
    question: "What are Eng. Habtamu's postgraduate degrees from Chalmers University in Sweden?",
    keywords: ['chalmers', 'sweden', 'gothenburg', 'master', 'msc', 'education', 'degree', 'qualification', 'prestressed', 'timber'],
    response: `Eng. Habtamu earned his Master of Science (MSc) in **Structural Design & Construction Project Management** from **Chalmers University of Technology** in Gothenburg, Sweden (2017–2019).

His specialized European postgraduate curriculum included:
- **Non-linear Concrete Modeling:** Finite element analysis of cracking, strain-hardening, and plasticity.
- **Timber & Engineered Wood:** Modern high-capacity mass-timber connections and multi-story wood frames.
- **Prestressed & Post-Tensioned Concrete:** Long-span transfer slabs, precast bridge beams, and deflection control.
- **Advanced Steel Structures & Bridges:** Fatigue, stability, and aeroelastic wind effects.
- **Project Economics & Delivery:** Real Estate Finance, FIDIC/PPA Contract Law, and Lean Construction Supply Chain Management.`
  },

  // 2. Education - Università degli Studi di Messina
  {
    id: 'education_messina',
    category: 'Academic Qualifications',
    question: 'What specialized seismic certification did he obtain in Messina, Italy?',
    keywords: ['messina', 'italy', 'seismic', 'earthquake', 'sss', 'dynamics', 'vibration', 'ground acceleration', 'damping'],
    response: `In 2018, Eng. Habtamu completed an advanced **Seismic Structural Safety (SSS)** certification at **Università degli Studi di Messina** in Italy.

The certification focused on Eurocode 8 earthquake engineering protocols:
- **Site-Specific Response Spectra:** Dynamic soil-structure interaction and local peak ground acceleration (PGA).
- **Vibration Mitigation Devices:** Base isolation bearing design, elastomeric elastomeric dampers, and Tuned Mass Dampers (TMD) for high-rise wind/earthquake oscillation.
- **Collapse Limit State Analysis:** Non-linear pushover simulations for existing masonry and reinforced concrete structures.`
  },

  // 3. Education - AAiT Master Thesis
  {
    id: 'education_aait',
    category: 'Academic Qualifications',
    question: "What was Eng. Habtamu's Master's research at Addis Ababa Institute of Technology (AAiT)?",
    keywords: ['aait', 'addis ababa university', 'thesis', 'research', 'corrugated', 'steel', 'beam', 'buckling', 'ltb', 'fem'],
    response: `Eng. Habtamu completed his first Master of Science (MSc) in **Structural Engineering** at the **Addis Ababa Institute of Technology (AAiT)**, Addis Ababa University (2015–2017).

His Master's thesis was titled:
*"Study of Steel I-Beam with Trapezoidal Corrugated Web vs. Flat Web for Lateral Torsional Buckling (LTB) using Linear and Non-linear Finite Element Analysis."*

The research demonstrated that trapezoidal corrugations in steel beam webs eliminate shear stiffeners and increase buckling resistance by over 30%, significantly reducing structural steel tonnage in industrial warehouses, stadium roofs, and bridge spans.`
  },

  // 4. Bachelor's Degree
  {
    id: 'education_bahirdar',
    category: 'Academic Qualifications',
    question: 'Where did Eng. Habtamu complete his undergraduate civil engineering training?',
    keywords: ['bahir dar', 'bachelor', 'bsc', 'undergraduate', 'civil engineering', 'first degree'],
    response: `Eng. Habtamu completed his undergraduate studies at **Bahir Dar University**, graduating with a **BSc in Civil Engineering** in 2014 with top academic standing. This foundational program covered reinforced concrete design, hydraulics, soil mechanics, and survey engineering prior to his European and AAiT postgraduate degrees.`
  },

  // 5. HELVETAS Trail Bridges
  {
    id: 'trail_bridges_helvetas',
    category: 'Rural Infrastructure',
    question: 'How did he train regional road bureaus and HELVETAS in trail bridge construction?',
    keywords: ['helvetas', 'trail bridge', 'bridge', 'pedestrian', 'harari', 'afar', 'somali', 'hawassa', 'amhara', 'rural'],
    response: `Eng. Habtamu served as the lead technical instructor for an intensive **6-day Trail Bridge Infrastructure Capacity Training** in Addis Ababa.

The program brought together:
- Regional Government Road Bureau Engineers (Somali, Afar, Harari, Amhara, and Sidama regions).
- Engineering specialists from **HELVETAS Swiss Intercooperation** (Hawassa, Addis Ababa, and regional offices).
- Local contractors building river-crossing infrastructure.

The training covered short-span and long-span pedestrian trail bridge design standards, steel wire cable safety factors, anchor block geotechnical stability, and local community-managed quality inspection protocols to eliminate river-crossing fatalities during flood seasons.`
  },

  // 6. Historic Heritage Conservation
  {
    id: 'heritage_fasil_giorghis',
    category: 'Heritage & Conservation',
    question: "What historic landmark restorations did Eng. Habtamu engineer with Fasil Giorghis Consult?",
    keywords: ['fasil', 'giorghis', 'conservation', 'heritage', 'national palace', 'jubilee', 'palace', 'trinity', 'cathedral', 'aba jiffar'],
    response: `From 2014 to 2017, Eng. Habtamu practiced as Structural Engineer with renowned conservation architect **Fasil Giorghis Consult**, directing structural investigations, diagnostic monitoring, and restoration packages for Ethiopia's foremost historic sites:

1. **National Jubilee Palace (Addis Ababa):** Structural integrity assessments of royal chambers, state halls, and subgrade foundations.
2. **Holy Trinity Cathedral (Kidist Selassie):** Masonry vault analysis, cracked stone archway rehabilitation, and roof truss consolidation.
3. **Jimma Aba Jiffar Palace (Jimma):** Structural wood preservation, traditional joinery retrofitting, and indigenous timber stabilization for the 19th-century royal compound.`
  },

  // 7. National Palace Visitors Reception Pavilion
  {
    id: 'project_palace_visitors',
    category: 'Signature Projects',
    question: "What is MENEN's role in the National Palace Visitors Reception Pavilion?",
    keywords: ['reception', 'visitors', 'pavilion', 'palace', 'national palace', 'tourism', 'vip'],
    response: `Under Eng. Habtamu's direction, MENEN Engineering designed the **Visitors Reception & Protocol Pavilion** at the National Palace in Addis Ababa. 

The project balanced high-security diplomatic entry requirements with historic architectural continuity. The structural solution incorporates slender column supports, subterranean utility coordination, and an unobtrusive low-profile roof form that complements the existing heritage palace grounds.`
  },

  // 8. 4B+G+M+23 KK Tower
  {
    id: 'project_kk_tower',
    category: 'Signature Projects',
    question: 'What are the engineering details of the 1st-Prize 4B+G+M+23 Tower for KK PLC?',
    keywords: ['kk', 'kk plc', '23', 'tower', 'high rise', 'first prize', 'award', 'schematic', 'basement', 'mxd'],
    response: `The **4B+G+M+23 Mixed-Use Tower** for KK PLC / KANMAX is a flagship high-rise awarded **1st Prize** in a nationwide architectural competition:

- **Height & Floors:** 4 Basements + Ground + Mezzanine + 23 Superstructure Floors.
- **Deep Excavation:** A 16-meter deep subterranean excavation secured with continuous soldier piles and prestressed ground anchors.
- **Lateral Force-Resisting System:** Dual core-wall and special moment-resisting frame (SMRF) designed under Eurocode 8 / ES EN 1998 standards for severe seismic and high wind conditions.
- **Services:** Integrated automated multi-level parking, mixed retail, and Class-A commercial headquarters.`
  },

  // 9. Bullaleas 3B+G+22 Apartment Tower
  {
    id: 'project_bullaleas',
    category: 'Signature Projects',
    question: 'How did MENEN engineer the 3B+G+22 Bullaleas Luxury Apartment Tower?',
    keywords: ['bullaleas', 'apartment', '22', 'luxury', 'residential', 'slab', 'flat slab', 'subterranean'],
    response: `The **3B+G+22 Bullaleas Residential Tower** represents one of Addis Ababa's premier luxury high-rises:

- **Structural Scheme:** Cast-in-place post-tensioned / flat-slab framing to maximize clear ceiling heights and eliminate downstand beams in residential suites.
- **Foundation System:** Heavy reinforced concrete raft foundation keyed into deep volcanic bedrock with subterranean waterproofing membranes across 3 basement levels.
- **Acoustic & Vibration Isolation:** Vibration-damped mechanical plant isolation floors to prevent elevator and generator noise from penetrating residential suites.`
  },

  // 10. 8 Lakeside Towers Masterplan (Bahir Dar)
  {
    id: 'project_bahir_dar_lakeside',
    category: 'Signature Projects',
    question: 'What is the scale of the 8 Towers Lakeside Masterplan in Bahir Dar?',
    keywords: ['bahir dar', 'lakeside', 'lake tana', '8 towers', 'tana', 'masterplan', '15 floors', 'waterfront'],
    response: `The **Bahir Dar Lakeside Masterplan** is an expansive waterfront development featuring **eight interconnected 15-story residential and hospitality towers** overlooking Lake Tana:

- **Total Built Area:** Over 120,000 square meters.
- **Geotechnical Solution:** Driven displacement piles and continuous perimeter sheet-piling to counter the high hydrostatic pressure and soft alluvial clay strata adjacent to the lake.
- **Environmental Design:** Wind-tunnel analyzed airflow corridors allowing natural convective cooling off Lake Tana, reducing HVAC loads by over 25%.`
  },

  // 11. Modular Border Clearance Stations
  {
    id: 'project_border_stations',
    category: 'Government & National Infrastructure',
    question: 'What is the 37 Modular Border Clearance Stations project across Ethiopia?',
    keywords: ['37', 'border', 'immigration', 'stations', 'modular', 'citizenship', 'checkpoints', 'national'],
    response: `Commissioned by the **Ethiopian Immigration & Citizenship Service**, MENEN Engineering engineered the standardized prototype architectural and structural packages for **37 Modular Border Clearance Checkpoints** deployed along national borders with Kenya, Sudan, South Sudan, Djibouti, and Somaliland.

Key design criteria included:
- Rapid deployability using prefabricated hot-rolled structural steel sections.
- High thermal resistance sandwich panels designed for extreme arid border climates.
- Off-grid self-sufficiency incorporating solar photovoltaic arrays and rainwater harvesting systems.`
  },

  // 12. Software & FEA Tools
  {
    id: 'software_fea',
    category: 'Technical Capabilities',
    question: 'What finite element and structural analysis software does Eng. Habtamu use?',
    keywords: ['software', 'etabs', 'sap2000', 'tekla', 'abaqus', 'safe', 'diana', 'matlab', 'autocad', 'tools', 'fem'],
    response: `Eng. Habtamu applies industry-standard structural simulation and BIM suites:

- **High-Rise & Seismic Analysis:** CSI ETABS (P-Delta, modal response spectrum, non-linear time history).
- **Bridge & General FEA:** CSI SAP2000, CSICOL (biaxial column interaction).
- **Non-Linear Continuum Modeling:** Abaqus FEA & DIANA FEA for complex fracture mechanics, dynamic soil-structure interaction, and concrete plasticity.
- **Foundation & Mat Footings:** CSI SAFE (raft foundation deflections and punching shear).
- **BIM & Rebar Detailing:** Tekla Structural Designer, Revit Structure, AutoCAD.`
  },

  // 13. Deep Excavation & Shoring
  {
    id: 'geotechnical_shoring',
    category: 'Technical Capabilities',
    question: 'How does MENEN handle deep subterranean basements and neighbor protection?',
    keywords: ['excavation', 'shoring', 'basement', 'piles', 'anchors', 'soldier', 'geotechnical', 'adjacent', 'subsidence'],
    response: `Addis Ababa's dense urban corridors require specialized excavation support. MENEN Engineering designs custom shoring systems:

1. **Soldier Piles with Tieback Anchors:** Multi-row prestressed ground anchors locked into bedrock to prevent horizontal deflection.
2. **Secant & Contiguous Piling:** Used where shallow groundwater threatens adjacent multi-story buildings.
3. **Inclinometer Monitoring:** Continuous electronic displacement monitoring ensuring adjacent foundations experience zero settlement or cracking during 3-to-5 level basement excavation.`
  },

  // 14. Retrofitting & Rehabilitation
  {
    id: 'retrofitting_repair',
    category: 'Technical Capabilities',
    question: 'Can MENEN assess cracked, damaged, or unpermitted existing buildings for retrofitting?',
    keywords: ['retrofit', 'repair', 'cracking', 'damage', 'strengthening', 'carbon fiber', 'cfrp', 'jacketing', 'safety', 'permit review'],
    response: `Yes. Eng. Habtamu leads building pathology and structural rehabilitation services:

- **Non-Destructive Testing (NDT):** Concrete Schmidt rebound hammer tests, ultrasonic pulse velocity, and rebar pacometer scans.
- **Strengthening Solutions:** Reinforced concrete column jacketing, steel beam flitching, and Carbon Fiber Reinforced Polymer (CFRP) composite wraps for under-strength slabs.
- **Municipal Design Reviews:** Engineering reports for regularization of unpermitted structures or buildings changing use (e.g. converting apartments into hospitals or schools).`
  },

  // 15. Mass Timber & Sustainable Materials
  {
    id: 'timber_sustainable',
    category: 'Technical Capabilities',
    question: "What is Eng. Habtamu's background in Mass Timber and low-carbon engineering?",
    keywords: ['timber', 'wood', 'carbon', 'sustainable', 'clt', 'glulam', 'sweden', 'green'],
    response: `Trained at Chalmers University (Sweden), a global center for mass-timber structural engineering, Eng. Habtamu specializes in Cross-Laminated Timber (CLT) and Glued Laminated Timber (Glulam). 

He designs hybrid mass-timber structures that reduce embodied carbon by up to 60% compared to conventional concrete frames, while utilizing precision concealed steel connectors to meet strict 2-hour structural fire ratings.`
  },

  // 16. Category 1 Firm Classification
  {
    id: 'firm_category_one',
    category: 'Corporate & Legal Licensing',
    question: 'What does MENEN Engineering’s Category 1 designation legally authorize?',
    keywords: ['category 1', 'cat 1', 'license', 'legal', 'classification', 'authorized', 'mandate', 'permit'],
    response: `MENEN Engineering PLC is certified as a **Category One Architectural & Engineering Consulting Firm** by the Ethiopian Ministry of Urban Development & Infrastructure and the Addis Ababa City Construction Permit Authority.

This is the highest consulting classification in Ethiopia. It permits MENEN to legally design, sign, stamp, and supervise:
- Unlimited height skyscrapers and high-rise towers.
- Complex municipal mixed-use complexes and international shopping malls.
- Major bridges, grade-separated highways, and public transportation terminals.
- Large-scale industrial campuses and university masterplans.`
  },

  // 17. Permitting & Municipal Navigation
  {
    id: 'permitting_city_hall',
    category: 'Corporate & Legal Licensing',
    question: 'Does MENEN handle Addis Ababa City Hall building permit approvals?',
    keywords: ['permit', 'approval', 'city hall', 'sub city', 'building permit', 'municipal', 'authorities', 'drawings'],
    response: `Yes. MENEN Engineering manages the complete end-to-end municipal permit approval process through the **Addis Ababa City Administration Construction Permit & Inspection Authority** (and regional sub-cities):

- Complete Architectural, Structural, Sanitary, Electrical, Mechanical (HVAC/Fire), and Environmental drawings.
- Full compliance verification under the Ethiopian Building Proclamation No. 624/2009 and revised Ethiopian Standards (ES).
- Municipal design defence sessions until unconditional construction permit release.`
  },

  // 18. Bill of Quantities (BoQ) & Tender Packages
  {
    id: 'boq_tender',
    category: 'Contract Administration',
    question: 'What is included in MENEN’s Technical Specifications and BOQ packages?',
    keywords: ['boq', 'bill of quantities', 'tender', 'cost', 'estimation', 'budget', 'procurement', 'contractor', 'bid'],
    response: `MENEN produces comprehensive, bank-grade Bill of Quantities (BoQ) and tender packages:

- **Detailed Itemized Measurement:** Derived from structural 3D models with bar bending schedules (BBS) and concrete volumetric takeoffs.
- **Technical Specifications:** Strict material quality metrics for 42.5R Portland cement, Grade 60 / 500 MPa rebar, waterproofing admixtures, and façade systems.
- **Confidential Engineer’s Cost Estimates:** Market-aligned unit rate breakdowns used by developers to evaluate contractor bids and negotiate fixed-price contracts.`
  },

  // 19. Construction Supervision & Quality Control
  {
    id: 'supervision_site',
    category: 'Contract Administration',
    question: 'Does MENEN provide resident site supervision during construction?',
    keywords: ['supervision', 'resident', 'engineer', 'site', 'inspection', 'quality control', 'pour', 'concrete test'],
    response: `Yes. MENEN assigns dedicated resident structural engineers and MEP inspectors to project sites:

- **Pre-Pour Checklists:** Rebar spacing, lap lengths, cover blocks, conduit coordination, and formwork stability verified prior to casting.
- **Cylinder Testing Oversight:** Continuous verification of 7-day and 28-day concrete compressive crushing strengths at accredited laboratories.
- **Interim Payment Certificates (IPC):** Verification of physical progress milestones before contractor invoices are approved for bank disbursement.`
  },

  // 20. Submission & Consultation Process
  {
    id: 'submission_workflow',
    category: 'Client Intake',
    question: 'How does a prospective client submit a project brief or book a technical consultation?',
    keywords: ['submit', 'brief', 'intake', 'portal', 'consultation', 'book', 'hire', 'start', 'meeting', 'project brief'],
    response: `Clients can initiate an architectural or structural commission through:

1. **Digital Intake Portal:** Use our online **[Submit Project Brief](/submit-project)** form to transmit project drawings, site dimensions, coordinates, or architectural sketches (supports PDF documents up to 25MB).
2. **Direct Executive Line:** Call Eng. Habtamu directly at **+251 920 517 606** or **+251 913 034 623**.
3. **Office Consultation:** Schedule an in-person working session at our headquarters in Wello Sefer, GS Building, 2nd Floor, Addis Ababa.`
  },

  // 21. Fee Structure & Proposal Turnaround
  {
    id: 'fee_pricing_proposals',
    category: 'Client Intake',
    question: 'How are consulting fees structured and how fast are proposals prepared?',
    keywords: ['fee', 'cost', 'price', 'proposal', 'payment', 'percentage', 'quote', 'contract', 'rate'],
    response: `MENEN Engineering operates with transparent, standardized engineering fee models based on project scope:

- **Percentage of Construction Cost:** Standard for full turnkey design (Architecture + Structure + MEP + Supervision).
- **Lump-Sum Fixed Pricing:** Applied to discrete packages such as structural-only engineering, shoring design, or structural review.
- **Turnaround:** Upon receiving your plot location and spatial requirements through the Submit Brief portal, our engineering board delivers a formal technical & financial proposal within **48 to 72 business hours**.`
  },

  // 22. Student Internships & Apprenticeships
  {
    id: 'student_internship_program',
    category: 'Corporate Social Responsibility',
    question: 'How does MENEN select and mentor university engineering interns?',
    keywords: ['internship', 'student', 'university', 'apprentice', 'training', 'mentorship', 'cgpa', 'civil engineering', 'revit', 'etabs'],
    response: `In alignment with our corporate mission of youth empowerment, MENEN Engineering hosts competitive semester internships for 4th and 5th-year students from AAiT, ASTU, Bahir Dar University, and accredited institutions:

- **Practical Software Immersion:** Hands-on training in ETABS frame modeling, SAFE mat foundation design, and Revit rebar detailing under senior licensed engineers.
- **Active Site Rotations:** Weekly field rotations to high-rise basement excavations, core-wall pours, and steel fabrication yards.
- **Application Portal:** Students submit academic transcripts, CGPA, and statement of purpose via the **[Student Internship Portal](/submit-project)**.`
  },

  // 23. Complete Contact Directory
  {
    id: 'contact_directory',
    category: 'Direct Contacts',
    question: 'What are all verified telephone numbers, emails, and physical office coordinates?',
    keywords: ['contact', 'phone', 'email', 'address', 'location', 'office', 'wello sefer', 'garad mall', 'gs building', 'call'],
    response: `**MENEN Engineering PLC — Official Contact Registry:**

- **CEO & General Manager:** Eng. Habtamu Getu Mihret
- **Primary Hotline:** +251 920 517 606
- **Secondary Operations Line:** +251 913 034 623
- **Official Inquiries Email:** [habtamuengr@gmail.com](mailto:habtamuengr@gmail.com)
- **Physical Headquarters:** Wello Sefer, behind Garad Mall, GS Building, 2nd Floor Office, Addis Ababa, Ethiopia.
- **Digital Portal:** [menen-engineering.onrender.com](https://menen-engineering.onrender.com)`
  },

  // 24. Verified Social Profiles
  {
    id: 'social_presence',
    category: 'Direct Contacts',
    question: 'Where can I find Eng. Habtamu’s verified professional social media accounts?',
    keywords: ['social', 'linkedin', 'facebook', 'profile', 'web', 'online', 'network'],
    response: `Eng. Habtamu Getu maintains the following verified profiles:

- **LinkedIn:** [https://www.linkedin.com/in/habtamu-mihret](https://www.linkedin.com/in/habtamu-mihret)
- **Facebook:** [https://www.facebook.com/habtamu.getu.984](https://www.facebook.com/habtamu.getu.984)
- **Firm Website:** [MENEN Engineering PLC](/)`
  }
];

/**
 * Intelligent deterministic token-scoring matching algorithm
 * Accurately scores user prompts against verified keywords and questions
 */
export function queryCeoKnowledge(rawQuery: string): string {
  const query = rawQuery.toLowerCase().trim();
  if (!query) {
    return 'Please ask a question regarding Eng. Habtamu Getu Mihret, MENEN Engineering projects, credentials, seismic design, or building services.';
  }

  let highestScore = 0;
  let bestMatch: DossierTopic | null = null;

  for (const topic of KNOWLEDGE_BASE) {
    let score = 0;

    // Check exact question title match
    if (query.includes(topic.question.toLowerCase())) {
      score += 15;
    }

    // Check keywords
    for (const kw of topic.keywords) {
      if (query.includes(kw.toLowerCase())) {
        score += kw.length > 5 ? 4 : 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  // Threshold: If high-confidence match is found
  if (bestMatch && highestScore >= 2) {
    return bestMatch.response;
  }

  // Fallback with structured topic guide
  return `I am the Executive Intelligence Dossier for Eng. Habtamu Getu Mihret (CEO of MENEN Engineering PLC).

I could not find an exact match for your phrasing, but I can answer questions across 24 verified domains:

1. 🎓 **Academics:** Chalmers University (Sweden) MSc, Univ. of Messina (Italy) Seismic Certification, AAiT Master's Thesis, Bahir Dar BSc.
2. 🏢 **Signature High-Rises:** 4B+G+M+23 KK Tower, 3B+G+22 Bullaleas Apartments, 8 Towers Lake Tana Masterplan, National Palace Reception.
3. 🌉 **Infrastructure & Heritage:** HELVETAS Trail Bridge program, Fasil Giorghis restorations (Jubilee Palace, Aba Jiffar, Holy Trinity).
4. ⚙️ **Technical Tools:** Non-linear FEA (Abaqus, DIANA, ETABS, SAP2000, Tekla), deep basement shoring & sheet piling.
5. ⚖️ **Legal & Licensing:** Category 1 Firm designation, Addis Ababa municipal permit approvals, and BoQ tender packages.
6. 📞 **Contact & Booking:** Scheduling technical consultations, fee proposals, and student internship intake.

Try selecting one of the suggested buttons above or ask any technical engineering question!`;
}