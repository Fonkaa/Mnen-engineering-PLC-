export interface DossierTopic {
  id: string;
  category: string;
  keywords: string[];
  response: string;
}

export const CEO_DOSSIER_DATA = {
  fullName: 'Eng. Habtamu Getu Mihret',
  role: 'Co-founder, General Manager (CEO) & Lead Structural Engineer',
  firm: 'MENEN Engineering PLC',
  experienceYears: 'Over 10+ years of structural and project management practice',
  license: 'Category One Professional Structural Engineer',
  contacts: {
    phone: '+251 920 517 606 / +251 913 034 623',
    email: 'habtamuengr@gmail.com',
    office: 'Wello Sefer, behind Garad Mall, GS Building, 2nd Floor Office, Addis Ababa, Ethiopia',
    linkedin: 'https://www.linkedin.com/in/habtamu-mihret',
    facebook: 'https://www.facebook.com/habtamu.getu.984',
  },
};

export const KNOWLEDGE_BASE: DossierTopic[] = [
  {
    id: 'education_chalmers',
    category: 'Education & Master’s Degrees',
    keywords: [
      'chalmers', 'sweden', 'education', 'degree', 'master', 'msc', 'university',
      'study', 'graduate', 'school', 'academic', 'qualification', 'course'
    ],
    response: `Eng. Habtamu Getu holds two master's degrees and specialized European postgraduate certifications:

1. **Chalmers University of Technology (Gothenburg, Sweden | 2017–2019):**
   - **MSc in Structural Design & Construction Project Management**
   - Advanced coursework: Non-linear Concrete Structures, Timber Engineering, Prestressed Concrete, Steel Structures & Bridges, Construction Contract Relationships, Real Estate Finance & Supply Chain Management.

2. **Università degli Studi di Messina (Italy | 2018):**
   - **Seismic Structural Safety (SSS) Certification**
   - Advanced studies in structural dynamics, base isolation, tuned mass dampers (TMD), and masonry collapse analysis under earthquake actions.

3. **Addis Ababa University / AAiT (Ethiopia | 2015–2017):**
   - **MSc in Structural Engineering**
   - Thesis: *"Study of Steel I-Beam with Trapezoidal Corrugated vs. Flat Web for Lateral Torsional Buckling (LTB) using Linear & Non-linear FEM"*.

4. **Bahir Dar University (2014):**
   - **BSc in Civil Engineering**.`
  },
  {
    id: 'seismic_dynamics',
    category: 'Seismic & Structural Dynamics',
    keywords: [
      'seismic', 'earthquake', 'messina', 'italy', 'dynamics', 'base isolation',
      'tmd', 'retrofitting', 'damping', 'vibration', 'structural safety'
    ],
    response: `Eng. Habtamu completed specialized training in **Seismic Structural Safety (SSS)** at **Università degli Studi di Messina (Italy)** in 2018.

His seismic and dynamic engineering capabilities include:
- **Local Seismic Response Analysis** & site-specific ground acceleration modeling.
- **Base Isolation & Tuned Mass Dampers (TMD)** for dynamic wind and seismic vibration mitigation in high-rises.
- **Innovative Retrofitting** of existing reinforced concrete and historic masonry buildings.
- **Collapse Limit State Analysis** under seismic load combinations.`
  },
  {
    id: 'trail_bridges_helvetas',
    category: 'Rural Infrastructure & Trail Bridges',
    keywords: [
      'trail bridge', 'bridge', 'helvetas', 'rural', 'training', 'transport',
      'harari', 'afar', 'somali', 'hawassa', 'amhara', 'community', 'road bureau'
    ],
    response: `Eng. Habtamu has played an active leadership role in rural transport capacity building.

In August, he conducted an intensive **6-day Trail Bridge Infrastructure Technical Training** in Addis Ababa for:
- Contractors from **Harari** and **Afar** regions
- Multidisciplinary engineering teams from **HELVETAS** (Hawassa, Somali, Amhara, and Addis Ababa offices)
- Regional Government Road Bureau Engineers

The program focused on practical design standards, technical quality control, and execution strategies for pedestrian trail bridges to expand safe all-weather access for rural and remote communities across Ethiopia.`
  },
  {
    id: 'software_skills',
    category: 'Software & Technical Tools',
    keywords: [
      'software', 'tools', 'etabs', 'sap2000', 'tekla', 'abaqus', 'autocad',
      'fem', 'finite element', 'safe', 'diana', 'csicol', 'matlab', 'simulation'
    ],
    response: `Eng. Habtamu leverages top-tier structural analysis, finite element modeling, and BIM software suites:

- **Structural Modeling & Building Design:** ETABS, SAP2000, Tekla Structural Designer, CSICOL
- **Advanced Non-linear & FE Simulations:** Abaqus FEA, DIANA FEA, MATLAB
- **Foundation & Geotechnical Analysis:** SAFE, Geotechnical Finite Element tools
- **Drafting & Coordination:** AutoCAD, BIM workflows`
  },
  {
    id: 'experience_history',
    category: 'Career & Professional History',
    keywords: [
      'experience', 'career', 'work', 'background', 'fasil giorghis', 'akademiska hus',
      'gothenburg', 'company', 'history', 'role', 'jobs', 'past'
    ],
    response: `Eng. Habtamu’s career spans European project management, historic heritage conservation, and multi-story engineering:

1. **MENEN Engineering PLC (Sep 2021 – Present):**
   - Co-founder, General Manager (CEO) & Lead Structural Engineer overseeing high-rise towers, multi-typology masterplans, and infrastructure.

2. **Akademiska Hus (Gothenburg, Sweden | Jan 2018 – May 2018):**
   - Project Manager Internship focusing on European institutional campus infrastructure and facility management.

3. **Fasil Giorghis Consult (Sep 2014 – 2017):**
   - Structural Engineer on major national conservation landmarks, including the National Palace, Holy Trinity Cathedral, and Jimma Aba Jiffar Palace.`
  },
  {
    id: 'menen_projects',
    category: 'Current Landmark High-Rises',
    keywords: [
      'projects', 'high rise', 'tower', 'kk', 'kanmax', 'bullaleas', 'arba minch',
      'jupiter', 'building', 'apartments', 'mixed use', 'mxd', 'palace'
    ],
    response: `At MENEN Engineering PLC, Eng. Habtamu oversees the structural design and engineering coordination of landmark projects, including:

- **4B+G+M+23 MXD Tower (KK PLC):** 1st Prize Awarded schematic design & full structural package.
- **3B+G+22 Luxury Apartment Tower (Bullaleas Real Estate):** Complete structural engineering with triple subterranean basements.
- **4B+G+M+20 MXD Complex (KANMAX):** 2nd Prize Awarded schematic design.
- **8 Towers Lakeside Masterplan (Bahir Dar):** Eight interconnected 15-story towers.
- **National Palace Visitors Reception Pavilion:** Full architectural & historic structural conservation.
- **37 Modular Border Clearance Stations:** Standardized prototype design for Ethiopian Immigration & Citizenship Services.`
  },
  {
    id: 'contact_consultation',
    keywords: [
      'contact', 'hire', 'phone', 'email', 'meeting', 'consultation', 'book',
      'office', 'reach', 'call', 'talk', 'address', 'location', 'appointment'
    ],
    category: 'Direct Contact & Appointments',
    response: `You can connect with Eng. Habtamu Getu directly through:

- **Direct Email:** [habtamuengr@gmail.com](mailto:habtamuengr@gmail.com)
- **Direct Phone / Mobile:** +251 920 517 606 / +251 913 034 623
- **Head Office:** Wello Sefer, behind Garad Mall, GS Building, 2nd Floor, Addis Ababa, Ethiopia
- **Verified LinkedIn:** [linkedin.com/in/habtamu-mihret](https://www.linkedin.com/in/habtamu-mihret)
- **Personal Facebook:** [facebook.com/habtamu.getu.984](https://www.facebook.com/habtamu.getu.984)

You can also submit your architectural or structural brief directly through the **[Submit Project Brief](/submit-project)** portal.`
  },
  {
    id: 'social_profiles',
    category: 'Social & Web Profiles',
    keywords: [
      'facebook', 'linkedin', 'social', 'profile', 'link', 'account', 'online', 'web'
    ],
    response: `Here are Eng. Habtamu Getu’s verified professional and social profiles:

- **LinkedIn:** [https://www.linkedin.com/in/habtamu-mihret](https://www.linkedin.com/in/habtamu-mihret)
- **Facebook:** [https://www.facebook.com/habtamu.getu.984](https://www.facebook.com/habtamu.getu.984)
- **Company:** MENEN Engineering PLC (Category One Architectural & Engineering Firm)`
  },
];

/**
 * Custom deterministic NLP evaluation engine
 * Scores matching tokens and returns the most relevant verified dossier entry.
 */
export function queryCeoKnowledge(rawQuery: string): string {
  const query = rawQuery.toLowerCase().trim();
  if (!query) {
    return 'Please enter a question regarding Eng. Habtamu Getu’s engineering background, projects, or credentials.';
  }

  // Check direct matches & score keyword occurrences
  let highestScore = 0;
  let bestMatch: DossierTopic | null = null;

  for (const topic of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (query.includes(kw)) {
        // Longer keywords carry higher intent weight
        score += kw.length > 5 ? 3 : 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  // Threshold: If at least one relevant keyword is matched
  if (bestMatch && highestScore >= 2) {
    return bestMatch.response;
  }

  // Contextual fallback with helpful navigation hints
  return `I am programmed specifically with verified records regarding Eng. Habtamu Getu Mihret (CEO of MENEN Engineering PLC).

I can answer questions regarding:
- 🎓 Education: His MSc from Chalmers University (Sweden), Seismic safety in Messina (Italy), and AAiT.
- 🌉 Rural Infrastructure: His 6-day Trail Bridge training with HELVETAS and regional road bureaus.
- 🏢 Structural Skills: Software tools (Tekla, Abaqus, ETABS, SAP2000, FEA) and high-rise engineering.
- 🏛️ Heritage Projects: Work with Fasil Giorghis on the National Palace and historic landmarks.
- 📞 Contact: How to book a technical consultation or reach his LinkedIn/Facebook.

Feel free to pick one of the quick chips above or ask any question on these topics!`;
}