import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Local enum dictionary to avoid build/generation type conflicts
const ProjectStatus = {
  COMPLETED: 'COMPLETED',
  UNDER_CONSTRUCTION: 'UNDER_CONSTRUCTION',
  DESIGN_PHASE: 'DESIGN_PHASE',
  DESIGN_PERMIT_PROCESS: 'DESIGN_PERMIT_PROCESS',
  LAND_ACQUISITION_PROCESS: 'LAND_ACQUISITION_PROCESS',
  BOQ_AND_TENDER: 'BOQ_AND_TENDER',
  PROPOSAL: 'PROPOSAL',
} as const;

async function main() {
  console.log('Seeding MENEN Engineering PLC Database...');

  // 1. Initial Site Configuration
  await prisma.siteConfig.upsert({
    where: { id: 'global_config' },
    update: {},
    create: {
      id: 'global_config',
      activeTheme: 'OBSIDIAN_GOLD',
      companyName: 'MENEN Engineering PLC',
      legalCategory: 'Category One Architectural & Engineering Firm',
      motto: "It's all about commitment!",
      primaryPhone: '+251 920 517 606',
      secondaryPhone: '+251 913 034 623',
      primaryEmail: 'habtamuengr@gmail.com',
      officeAddress: 'Wello Sefer, behind Garad Mall, GS Building, 2nd Floor Office @ Menen Engineering PLC, Addis Ababa, Ethiopia',
    },
  });

  // 2. Default Super Admin User
  const defaultPasswordHash = await bcrypt.hash('MenenAdmin2026!', 10);
  await prisma.adminUser.upsert({
    where: { email: 'habtamuengr@gmail.com' },
    update: {},
    create: {
      email: 'habtamuengr@gmail.com',
      name: 'Eng. Habtamu Getu',
      password: defaultPasswordHash,
      role: 'SUPERADMIN',
    },
  });

  // 3. 100% Dynamic Content Dictionary (Every word editable in Admin CMS)
  const dynamicTexts = [
    // Hero & Tagline
    {
      key: 'hero_badge',
      section: 'hero',
      label: 'Hero Badge Top Label',
      value: 'Category One Architectural & Engineering Design Firm — Addis Ababa',
    },
    {
      key: 'hero_title',
      section: 'hero',
      label: 'Main Hero Heading',
      value: 'Architectural Excellence & Resilient Structural Engineering',
    },
    {
      key: 'hero_lead',
      section: 'hero',
      label: 'Hero Description Subtitle',
      value: 'MENEN Engineering PLC is set to deploy experienced professionals delivering well-targeted, unique design solutions to our clients in particular and the recipient public at large.',
    },
    {
      key: 'hero_motto',
      section: 'hero',
      label: 'Corporate Motto / Slogan',
      value: "It's all about commitment!",
    },

    // About & Origin
    {
      key: 'about_welcome',
      section: 'about',
      label: 'Welcome Section Paragraph',
      value: 'Our team has been involved in numerous architectural design activities in Addis Ababa and regional cities. As verified from our members’ resumes, our specialists have gained valuable academic and practical knowledge domestically and overseas. If given the opportunity, we have the capability and experience to carry out tasks to the utmost satisfaction of our clients and the user community at large.',
    },
    {
      key: 'about_origin',
      section: 'about',
      label: 'Founding History',
      value: 'MENEN Engineering was established by Eng. Habtamu Getu and Arch. Samiel Musolino in 2021 to render consultancy services in design, construction supervision, and contract administration. Our approach relies on a combination of individual enthusiasm, professional experience, and collaborative team spirit striving to realize innovative yet practical architectural, engineering, and planning solutions responding to client requirements and contextual realities.',
    },
    {
      key: 'about_message',
      section: 'about',
      label: 'Corporate Message Paragraph',
      value: 'We, MENEN Engineering PLC, take pride in being one of the leading architectural and engineering teams in Ethiopia, having achieved remarkable growth in a short span and contributing significantly to the development of the country. Our company has left its mark in the construction industry through competitiveness, timely delivery, high-quality design, and recognized engineering services.',
    },

    // Mission, Vision & Values
    {
      key: 'vision_statement',
      section: 'vision',
      label: 'Company Vision',
      value: 'To provide best professional services with state-of-the-art solutions irrespective of project size or profitability. We believe in adaptability as an unconditional ability of this time of great changes, among all the conditions of new modernity.',
    },
    {
      key: 'mission_statement',
      section: 'mission',
      label: 'Company Mission',
      value: 'MENEN Engineering is committed to consistent improvement of its professional services through a high level of professional integrity and commitment, creating opportunities for young and competitive professionals to apply their knowledge towards development and service of society.',
    },
    {
      key: 'values_statement',
      section: 'values',
      label: 'Core Company Values',
      value: 'Carry out our responsibilities in a spirit of partnership with our clients and commit ourselves to consulting services characterized by quality, honesty, and uncompromising client privacy.',
    },

    // Policies
    {
      key: 'policies_quality',
      section: 'policies',
      label: 'Quality Policy',
      value: 'Strives to consistently provide quality architectural design with reliable and efficient engineering solutions, subject to total compliance on all challenges, and where possible exceeding the expectations of our clients.',
    },
    {
      key: 'policies_staff_standards',
      section: 'policies',
      label: 'Staff Standards & Multi-Disciplinary Resource',
      value: 'Staffs are familiar with prevailing international standards and local regulatory codes. The multidisciplinary educational academic background and professional skills acquired from extensive field experience provide an integrated and diversified resource.',
    },
    {
      key: 'policies_nodes',
      section: 'policies',
      label: 'Design Philosophy Nodes',
      value: 'Photography, sociology, economy, politics, traditions, technologies, agriculture, and crafts are all nodes of development upon which we base our design care.',
    },
  ];

  for (const item of dynamicTexts) {
    await prisma.dynamicContent.upsert({
      where: { key: item.key },
      update: { value: item.value, label: item.label, section: item.section },
      create: item,
    });
  }

  // 4. Executive Leadership & Specialist Team Profiles
  const teamMembers = [
    {
      name: 'Eng. Habtamu Getu',
      roleTitle: 'CEO & Lead Structural Engineer',
      department: 'Executive Leadership / Structural',
      order: 1,
      isExecutive: true,
      credentials: 'MSc Chalmers University (Sweden 2019) | MSc AAiT (2017) | BSc Bahir Dar (2014) | Messina University Dynamics (Italy 2018)',
      bio: 'The Chief Executive Officer and lead structural engineer of MENEN Engineering PLC. Habtamu obtained his MSc in Design & Construction Project Management from Chalmers University of Technology, Sweden (2019), and attended structural dynamics seminars at University of Messina, Italy (2018). He holds an MSc in Structural Engineering from Addis Ababa Institute of Technology (2017) and BSc in Civil Engineering from Bahir Dar University (2014). He has practiced with prestigious consultants including Fasil Ghiorghis CAE on landmark projects: National Palace Conservation, Holy Trinity Cathedral Conservation, Jimma Aba Jiffar Conservation, as well as multiple high-rise mixed-use, apartment, education, and hospitality structures across Addis Ababa and regional cities.',
      avatarUrl: null, // Renders clean blueprint silhouette placeholder
      linkedinUrl: 'https://www.linkedin.com/in/habtamu-getu-menen',
      email: 'habtamuengr@gmail.com',
      phone: '+251920517606',
    },
    {
      name: 'Arch. Samiel Musolino',
      roleTitle: 'COO, Managing Partner & Design Director',
      department: 'Executive Leadership / Architecture',
      order: 2,
      isExecutive: true,
      credentials: "Master's Degree in Advanced Architecture Design, ENSA de la Ville et des Territoires, Marne-la-Vallée, Paris (2011)",
      bio: 'Born in Italy and raised in both European and African heritages. Graduated with a Master’s Degree in Advanced Architecture Design in Paris. Worked for various Parisian design firms and won multiple architectural competitions with Mikou Design Studio. Served as interior consultant for municipal and university libraries across France, Belarus, and Guadeloupe, as well as the fashion firm LIU.JO in France. Member of Urban Future Organization, Italy. Co-managed AfroDesign CAE and Fasil Giorghis CAE on large-scale works, and collaborates with the FDRE Ministry of Tourism as senior architect and strategic adviser.',
      avatarUrl: null, // Renders clean blueprint silhouette placeholder
      linkedinUrl: 'https://www.linkedin.com/in/samiel-musolino',
      email: 'samiel.musolino@menenengineering.com',
      phone: '+251913034623',
    },
    {
      name: 'Arch. Ephrem',
      roleTitle: 'Design Head & Senior Architect',
      department: 'Architectural Design Department',
      order: 3,
      isExecutive: true,
      credentials: 'Chair Head of History and Theory of Architecture at EiABC, Addis Ababa University (15+ Years Academic & Research)',
      bio: 'Academic researcher and chair head of History and Theory of Architecture at EiABC, Addis Ababa University. Over 15 years of university teaching at AAU and Mekelle University. Active professional architect working with Bereket Tesfaye CAE and Fasil Ghiorghis CAE. Leading architect for major developments including Elilta Real Estate’s luxurious 4B+G+21 mixed-use high-rise at Sarbet, Addis Ababa. Senior architect on large-scale architectural conservation and urban masterplans.',
      avatarUrl: null, // Renders clean blueprint silhouette placeholder
      linkedinUrl: 'https://www.linkedin.com/in/ephrem-architect',
      email: 'ephrem.design@menenengineering.com',
      phone: null,
    },
  ];

  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (existing) {
      await prisma.teamMember.update({ where: { id: existing.id }, data: member });
    } else {
      await prisma.teamMember.create({ data: member });
    }
  }

  // 5. Complete Projects from Profile Document (with blueprint fallbacks & video/audio fields)
  const projects = [
    {
      title: '4B+G+M+23 MXD Tower',
      slug: '4b-g-m-23-mxd-kk-plc',
      client: 'KK PLC',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'MXD',
      status: ProjectStatus.UNDER_CONSTRUCTION,
      scopeOfWork: '1st Prize Awarded Schematic Design & Complete Architectural/Engineering Design Services',
      awards: '1st Prize Awarded Schematic Design Project',
      description: 'Major high-rise mixed-use development comprising four basements, ground, mezzanine, and 23 upper stories.',
      featuredImage: null, // Will use technical blueprint placeholder
      featuredVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder walkthrough video
      audioNarrative: null,
      order: 1,
      isFeatured: true,
    },
    {
      title: '4B+G+M+20 MXD Complex',
      slug: '4b-g-m-20-mxd-kanmax',
      client: 'KANMAX Engineering & Trading PLC',
      associatedFirms: 'ADCAE PLC + MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'MXD',
      status: ProjectStatus.LAND_ACQUISITION_PROCESS,
      scopeOfWork: '2nd Prize Awarded Schematic Design & Comprehensive Engineering Review',
      awards: '2nd Prize Awarded Schematic Design Project',
      description: 'A 20-story modern commercial and residential mixed-use development currently in the land acquisition phase.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 2,
      isFeatured: true,
    },
    {
      title: 'KK Complex: 2B+G+M+8 APT, B+G+3 RES and G+1 MXD',
      slug: 'kk-plc-multi-typology-complex',
      client: 'KK PLC',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'MXD',
      status: ProjectStatus.LAND_ACQUISITION_PROCESS,
      scopeOfWork: '1st Prize Awarded Schematic Design Proposed Multi-Typology Masterplan',
      awards: '1st Prize Awarded Schematic Design Proposed Project',
      description: 'Integrated masterplan encompassing multi-story apartment blocks, private residences, and commercial facilities.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 3,
      isFeatured: true,
    },
    {
      title: '2B+G+15 Apartment Tower',
      slug: '2b-g-15-apt-gashaw-serigalem',
      client: 'Ato Gashaw Serigalem',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'APT',
      status: ProjectStatus.DESIGN_PERMIT_PROCESS,
      scopeOfWork: 'Complete Architectural & Engineering Design Services',
      awards: null,
      description: 'High-density urban residential tower featuring modern structural damping and energy-efficient layouts.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 4,
      isFeatured: false,
    },
    {
      title: '2B+G+13 Residential Tower',
      slug: '2b-g-13-dr-birhanu',
      client: 'Dr. Birhanu',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'APT',
      status: ProjectStatus.DESIGN_PERMIT_PROCESS,
      scopeOfWork: 'Complete Architectural & Engineering Design Services (Permit Process Completed)',
      awards: null,
      description: 'A 13-story residential apartment project with underground parking and advanced civil-structural systems.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 5,
      isFeatured: false,
    },
    {
      title: 'Joburg Real Estate Residential & Interior Package',
      slug: 'joburg-real-estate-abraham',
      client: 'Joburg Real Estate | Ato Abraham',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'RLS',
      status: ProjectStatus.COMPLETED,
      scopeOfWork: 'Complete Architectural Review and Interior Design Package',
      awards: null,
      description: 'Luxury real estate development complete with bespoke interior finishes and high-end spatial layout.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 6,
      isFeatured: false,
    },
    {
      title: 'B+G+M+15 APT Tower',
      slug: 'b-g-m-15-apt-elias-hilawi',
      client: 'Ato Elias | Ato Hilawi',
      associatedFirms: 'ADCAE PLC + MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'APT',
      status: ProjectStatus.DESIGN_PHASE,
      scopeOfWork: 'Complete Architectural & Engineering Design Services',
      awards: null,
      description: 'Contemporary high-rise apartment block currently in the active design and structural coordination phase.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 7,
      isFeatured: false,
    },
    {
      title: '3B+G+22 Luxury Apartment Tower',
      slug: '3b-g-22-bullaleas-real-estate',
      client: 'BULLALEAS Real Estate PLC',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'APT',
      status: ProjectStatus.DESIGN_PHASE,
      scopeOfWork: 'FULL Architectural Design Services',
      awards: null,
      description: 'Flagship 22-story luxury residential apartment with three full subterranean parking basements.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 8,
      isFeatured: true,
    },
    {
      title: '3B+G+M+23 High-Rise Real Estate',
      slug: '3b-g-m-23-dyf-real-estate',
      client: 'DYF Real Estate PLC',
      associatedFirms: 'ADCAE PLC + MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'RLS',
      status: ProjectStatus.DESIGN_PHASE,
      scopeOfWork: 'Schematic Architectural Design Proposed Project',
      awards: null,
      description: 'Large-scale real estate landmark combining retail, commercial spaces, and premium residential penthouses.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 9,
      isFeatured: false,
    },
    {
      title: '2B+G+M+9 HSP Luxury Hotel',
      slug: '2b-g-m-9-hsp-ayf-trading',
      client: 'AYF TRADING PLC',
      associatedFirms: 'ADCAE PLC + MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'HSP',
      status: ProjectStatus.DESIGN_PHASE,
      scopeOfWork: 'Complete Architectural Design Proposed Project',
      awards: null,
      description: 'Bespoke 9-story luxury hospitality project engineered to meet international hotel standards.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 10,
      isFeatured: false,
    },
    {
      title: 'GB+G+M+17 HSP Hotel',
      slug: 'gb-g-m-17-hsp-jupiter-trading',
      client: 'Jupiter Trading PLC',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'HSP',
      status: ProjectStatus.DESIGN_PERMIT_PROCESS,
      scopeOfWork: 'Complete Architectural & Engineering Design Services (Permit Process Completed)',
      awards: null,
      description: '17-story landmark hotel equipped with conference centers, rooftop amenities, and full engineering compliance.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 11,
      isFeatured: false,
    },
    {
      title: '2B+G+12 HSP Suites & Hotel',
      slug: '2b-g-12-hsp-getachew',
      client: 'Ato Getachew',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'HSP',
      status: ProjectStatus.UNDER_CONSTRUCTION,
      scopeOfWork: 'Complete Architectural & Engineering Design Services & Construction Supervision',
      awards: null,
      description: 'A 12-story hotel building with dual basements currently under active physical construction.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 12,
      isFeatured: false,
    },
    {
      title: 'Grand Central Arba Minch Hotel',
      slug: 'grand-central-arba-minch-hotel',
      client: 'GRAND CENTRAL ARBA MINCH HOTEL',
      associatedFirms: 'ADCAE PLC + MENEN Engineering PLC',
      location: 'Arba Minch',
      category: 'HSP',
      status: ProjectStatus.DESIGN_PHASE,
      scopeOfWork: 'Complete Architectural & Engineering Design Services (2B+G+M+4 HSP, B+G+1 RES)',
      awards: null,
      description: 'Regional luxury destination hotel blending local natural topography with advanced structural modeling.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 13,
      isFeatured: false,
    },
    {
      title: 'Royal Hotel Bonga (1B+G+M+8 HSP)',
      slug: 'royal-hotel-bonga',
      client: 'ROYAL HOTEL',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Bonga',
      category: 'HSP',
      status: ProjectStatus.UNDER_CONSTRUCTION,
      scopeOfWork: 'Complete Architectural & Engineering Design Services',
      awards: null,
      description: 'Eight-story premium hotel in Bonga offering executive hospitality services and modern structural design.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 14,
      isFeatured: false,
    },
    {
      title: '2B+G+4 Residence & 3,500 Sqm Landscape Masterplan',
      slug: '2b-g-4-res-landscape-ketema-kebede',
      client: 'Ato Ketema Kebede',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'LND',
      status: ProjectStatus.UNDER_CONSTRUCTION,
      scopeOfWork: 'Complete Architectural & Landscape Design Services',
      awards: null,
      description: 'Private estate residence set on a 3,500 m² plot incorporating biophilic landscaping and outdoor amenities.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 15,
      isFeatured: false,
    },
    {
      title: '2B+G+15 + Terrace (8 Towers Masterplan)',
      slug: '8-towers-masterplan-bahir-dar',
      client: 'Ato Aleme',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Bahir Dar',
      category: 'MXD',
      status: ProjectStatus.UNDER_CONSTRUCTION,
      scopeOfWork: 'Complete Architectural & Engineering Design Services (8 High-Rise Towers)',
      awards: null,
      description: 'Eight interconnected 15-story towers forming a signature urban lakeside skyline in Bahir Dar.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 16,
      isFeatured: true,
    },
    {
      title: 'FDRE Ministry of Tourism HQ Interior (B+G+10 INT)',
      slug: 'tourism-ministry-hq-interior',
      client: 'FDRE Ministry of Tourism',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'INT',
      status: ProjectStatus.COMPLETED,
      scopeOfWork: 'Complete Interior Design & Supervision Coordination',
      awards: null,
      description: 'Comprehensive interior renovation and strategic executive interior design for the Ministry of Tourism HQ.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 17,
      isFeatured: true,
    },
    {
      title: 'National Palace Visitors Reception',
      slug: 'national-palace-visitors-reception',
      client: 'National Palace Administration / FDRE',
      associatedFirms: 'MENEN Engineering PLC',
      location: 'Addis Ababa',
      category: 'STR',
      status: ProjectStatus.COMPLETED,
      scopeOfWork: 'FULL Architectural Design & Historic Conservation Engineering',
      awards: null,
      description: 'Historic architectural conservation, structural rehabilitation, and design for the National Palace reception pavilion.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 18,
      isFeatured: true,
    },
    {
      title: '37 Ethiopian Border Prototype Stations (G+2 STR)',
      slug: '37-ethiopian-border-prototypes',
      client: 'FDRE Immigration & Citizenship Services',
      associatedFirms: 'MENEN Engineering PLC',
      location: '37 Ethiopian Border Prototype Sites',
      category: 'STR',
      status: ProjectStatus.BOQ_AND_TENDER,
      scopeOfWork: 'BoQ, Tender Documentation, Full Architectural & Supervision Services',
      awards: null,
      description: 'Standardized modern modular border clearance prototypes designed for deployment across 37 national crossing stations.',
      featuredImage: null,
      featuredVideo: null,
      audioNarrative: null,
      order: 19,
      isFeatured: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  console.log('Seeding finished successfully! All projects, leadership profiles, and dynamic content ready.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });