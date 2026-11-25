import { sitePath } from '../utils/sitePath.ts';

export type ProjectFilterCategory =
  | 'All Projects'
  | 'CAD Design'
  | 'Manufacturing'
  | 'Product Development'
  | 'Automation'
  | 'Research';

export type ServiceType =
  | 'Mechanical Design'
  | '3D CAD Modeling'
  | '3D Printing Services'
  | 'Engineering Problem Solving';

export interface ProjectGalleryItem {
  id: string;
  title: string;
  caption: string;
  kind: 'cad_render' | 'drawing_slot' | 'cnc_slot' | 'exploded_slot' | 'photo_slot';
  imageUrl: string | null;
  alt: string;
}

export interface EngineeringProject {
  id: string;
  number: string;
  slug: string;
  title: string;
  client?: string;
  primaryCategory: string;
  filterCategories: Exclude<ProjectFilterCategory, 'All Projects'>[];
  featured: boolean;
  serviceTag: ServiceType;
  shortSummary: string;
  heroImage: string | null;
  heroImageAlt?: string;
  heroImageNote?: string;
  tools: string[];
  overview: string;
  problemObjective: string;
  designApproach: string;
  developmentProcess: string[];
  cadAndDrawingsNotes?: string;
  manufacturingProcess: string;
  hasManufacturingPhase: boolean;
  finalOutcome: string;
  engineeringInsights: string[];
  gallery: ProjectGalleryItem[];
  reportDownloadUrl?: string | null;
  reportGoogleDriveUrl?: string | null;
  reportFileName?: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  engagementType: string;
  clarificationNote?: string;
  organizationLogoUrl: string | null;
  responsibilities: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  highlight?: boolean;
  credentialSummary: string;
  certificateImageUrl: string | null;
  certificatePlaceholderLabel: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconKey: 'design' | 'manufacturing' | 'simulation' | 'automation';
  skills: string[];
}

export interface ServiceItem {
  id: string;
  title: ServiceType;
  iconKey: 'mechanical' | 'cad' | 'printing' | 'problem';
  description: string;
}

export const personalInfo = {
  fullName: 'Khan Abdullah All Noman',
  shortName: 'Noman',
  brandWordmark: 'Khan Abdullah All Noman',
  roleLine: 'Mechanical Engineer | CAD Designer | Problem Solver',
  heroGreeting: "Hello, I'm Noman.",
  heroHeadline: 'Mechanical Engineer. Designer. Problem Solver.',
  heroDescription:
    "I'm Khan Abdullah All Noman, a Mechanical Engineering graduate from KUET with experience in mechanical design, 3D CAD modeling, manufacturing, and product development. I transform engineering concepts into practical, manufacturable solutions.",
  heroIndicators: ['Mechanical Design', 'CAD Modeling', '3D Printing'],
  portraitImageUrl: sitePath('/assets/aistudio/rsz_polished_navy_suit_headshot_f5b798c7.jpg') as string | null,
  portraitAlt: 'Professional portrait of Khan Abdullah All Noman, Mechanical Engineer',
  resumeDownloadUrl: sitePath('/assets/aistudio/Khan_Abdullah_All_Noman_Resume_768d7b42.pdf'),
  resumeFileName: 'Khan_Abdullah_All_Noman_Resume.pdf',
  resumeGoogleDriveUrl: null as string | null,
  contact: {
    email: 'noman4607ma@gmail.com',
    phoneDisplay: '+8801838992163',
    phoneHref: 'tel:+8801838992163',
    location: 'Boyra, Khulna, Bangladesh',
    linkedinDisplayName: 'Khan Abdullah All Noman',
    /**
     * Supply the verified LinkedIn profile URL (e.g., 'https://www.linkedin.com/in/...')
     * once confirmed. Never use an assumed URL.
     */
    linkedinUrl: null as string | null,
  },
};

export const aboutData = {
  heading: 'Engineering Ideas Into Reality',
  paragraphs: [
    'As a Mechanical Engineering graduate from Khulna University of Engineering & Technology (KUET), I focus on bridging theoretical engineering principles with practical, manufacturable implementation. My work spans 3D CAD modeling, structural and sheet-metal design, CNC plasma fabrication preparation, and functional prototyping.',
    'Holding a Certified SOLIDWORKS Associate (CSWA) credential, I support industrial design needs on a project basis while operating 3Dix—a venture dedicated to 3D printing services, customized product development, and physical realization of digital designs.',
  ],
  personalStatement:
    'My approach to engineering combines analytical thinking, creative design, and practical manufacturing knowledge. I enjoy developing functional solutions, optimizing mechanical systems, and bringing ideas from concept to physical reality.',
  profileDetails: [
    { label: 'Full Name', value: 'Khan Abdullah All Noman' },
    { label: 'Education', value: 'B.Sc. in Mechanical Engineering, KUET (2021–2026)' },
    { label: 'Core Credential', value: 'Certified SOLIDWORKS Associate (CSWA)' },
    { label: '3D Printing Venture', value: 'Founder, 3Dix' },
    { label: 'Industry Engagement', value: 'Mechanical Designer, Imperial Chicks House (Project-Based / On-Call)' },
    { label: 'Location', value: 'Boyra, Khulna, Bangladesh' },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'mechanical-design',
    title: 'Mechanical Design',
    iconKey: 'design',
    skills: [
      'SOLIDWORKS',
      'AutoCAD',
      'Mechanical Design',
      '3D CAD Modeling',
      'Sheet Metal Design',
      'Engineering Drawings',
    ],
  },
  {
    id: 'manufacturing-prototyping',
    title: 'Manufacturing and Prototyping',
    iconKey: 'manufacturing',
    skills: [
      'CNC Machining',
      'CNC Plasma Cutting',
      'G Code Generation',
      'SheetCAM',
      '3D Printing Technologies',
      'Product Prototyping',
      'Manufacturing Processes',
    ],
  },
  {
    id: 'simulation-visualization',
    title: 'Simulation and Visualization',
    iconKey: 'simulation',
    skills: [
      'ANSYS Fluent',
      'KeyShot',
      'Engineering Analysis',
      'Technical Visualization',
    ],
  },
  {
    id: 'programming-automation',
    title: 'Programming and Automation',
    iconKey: 'automation',
    skills: [
      'Arduino',
      'C Programming',
      'Automatic Control Projects',
      'Engineering Problem Solving',
    ],
  },
];

export const experienceList: ExperienceItem[] = [
  {
    id: 'imperial-chicks-house',
    role: 'Mechanical Designer',
    organization: 'Imperial Chicks House',
    period: '2024 to Present',
    engagementType: 'Project-Based / On-Call Engagement',
    clarificationNote:
      'Independent project-based and on-call engineering engagement supporting design and CNC fabrication requirements as needed (non-full-time role).',
    organizationLogoUrl: null,
    responsibilities: [
      'Design custom automated poultry housing structures using SOLIDWORKS.',
      'Develop mechanical designs with consideration for manufacturing and material utilization.',
      'Prepare G code for CNC plasma cutting.',
      'Support CNC fabrication and technical manufacturing activities.',
      'Provide engineering design assistance when required by the company.',
    ],
  },
  {
    id: '3dix',
    role: 'Founder',
    organization: '3Dix',
    period: 'Founding year to be added',
    engagementType: '3D Printing & Custom Product Venture',
    organizationLogoUrl: null,
    responsibilities: [
      'Operate a venture providing 3D printing services.',
      'Develop customized product solutions.',
      'Support prototyping and physical product development.',
      'Deliver practical design solutions based on customer requirements.',
    ],
  },
];

export const educationData = {
  degree: 'Bachelor of Science in Mechanical Engineering',
  institution: 'Khulna University of Engineering & Technology (KUET)',
  department: 'Department of Mechanical Engineering',
  period: '2021 to 2026',
  cgpa: '3.26 out of 4.00',
  thesisTitle: 'Numerical Investigation of a Wave Tank Using Reciprocating Wedge Shaped Plunger',
};

export const certificationsList: CertificationItem[] = [
  {
    id: 'cswa',
    title: 'Certified SOLIDWORKS Associate (CSWA)',
    issuer: 'Dassault Systèmes SOLIDWORKS',
    year: '2024',
    highlight: true,
    credentialSummary:
      'Industry-recognized CAD credential verifying proficiency in 3D part modeling, multi-component assemblies, design intent, and engineering drawings in SOLIDWORKS.',
    certificateImageUrl: sitePath('/assets/aistudio/Screenshot_2026-11-25_220914_a16585d7.png'),
    certificatePlaceholderLabel: 'Official CSWA Certificate Image Slot',
  },
  {
    id: 'autocad-workshop',
    title: 'AutoCAD Workshop',
    issuer: 'CADers',
    year: '2022',
    credentialSummary:
      'Structured technical drafting workshop focused on 2D engineering drawing standards, geometric precision, and technical documentation in AutoCAD.',
    certificateImageUrl: sitePath('/assets/aistudio/Ornate_Green_Certificate_of_Achievement_ae925f71.png'),
    certificatePlaceholderLabel: 'AutoCAD Workshop Certificate Image Slot',
  },
];

export const servicesList: ServiceItem[] = [
  {
    id: 'mechanical-design',
    title: 'Mechanical Design',
    iconKey: 'mechanical',
    description:
      'Mechanical component design, assembly modeling, and functional engineering solutions.',
  },
  {
    id: '3d-cad-modeling',
    title: '3D CAD Modeling',
    iconKey: 'cad',
    description:
      'Precise 3D models, detailed parts, assemblies, and CAD based design development.',
  },
  {
    id: '3d-printing-services',
    title: '3D Printing Services',
    iconKey: 'printing',
    description:
      'Custom 3D printed products, prototype production, and physical realization of digital models.',
  },
  {
    id: 'engineering-problem-solving',
    title: 'Engineering Problem Solving',
    iconKey: 'problem',
    description:
      'Analytical and practical approaches to mechanical design challenges and product functionality.',
  },
];

export const researchThesis = {
  title: 'Numerical Investigation of a Wave Tank Using Reciprocating Wedge Shaped Plunger',
  institution: 'Khulna University of Engineering & Technology (KUET)',
  department: 'Department of Mechanical Engineering',
  degreeContext: 'Undergraduate Thesis · B.Sc. in Mechanical Engineering (2021–2026)',
  abstractStatus: 'Abstract pending upload',
  abstractPlaceholder:
    'This undergraduate thesis investigates the numerical modeling of a laboratory wave tank driven by a reciprocating wedge-shaped plunger. The complete abstract, numerical setup notes, simulation contours, and verified conclusions will be published here once the final thesis document is added.',
  geometryImageUrl: sitePath('/assets/aistudio/fgfhgf_f152dd21.png'),
  geometryImageAlt:
    'Dimensioned CAD domain geometry of the 3657.60 × 500.00 mm numerical wave tank with reciprocating 45° wedge-shaped plunger and 45° sloped absorber end',
  geometryImageCaption:
    'Dimensioned CAD geometry of the wave tank domain (3657.60 × 500.00 mm, 260.00 mm water level), showing the 45° reciprocating wedge plunger (180.00 mm height, 25.00 mm wall clearance) and 45° wave absorber slope (609.60 mm).',
  documentSlots: [
    {
      id: 'wave-tank-schematic',
      title: 'Wave Tank & Plunger Geometry Diagram',
      description:
        'Dimensioned CAD domain geometry showing the 3657.60 × 500.00 mm wave tank, 260.00 mm still-water level, 45° wedge plunger, and 45° absorber slope.',
      imageUrl: sitePath('/assets/aistudio/fgfhgf_f152dd21.png') as string | null,
      alt: 'Dimensioned CAD geometry diagram of the numerical wave tank and reciprocating wedge plunger',
      status: 'Official thesis geometry figure attached',
    },
    {
      id: 'numerical-visualizations',
      title: 'CFD Simulation Visuals & Wave Profiles',
      description:
        'ANSYS 2024 R1 Fluent multiphase Volume of Fluid (VOF) water volume fraction contour illustrating free-surface wave generation and propagation from the reciprocating wedge-shaped plunger.',
      imageUrl: sitePath('/assets/aistudio/ANSYS_Water_Volume_Fraction_Contour_Plot_b2bd4bde.png') as string | null,
      alt: 'ANSYS 2024 R1 Fluent Water Volume Fraction contour plot showing propagating wave profile in the wave tank',
      status: 'ANSYS Fluent simulation visual attached',
    },
    {
      id: 'supporting-documentation',
      title: 'Thesis Documentation & Report PDF',
      description: 'Reserved slot for downloadable abstract summary, presentation slides, or thesis monograph.',
      imageUrl: null as string | null,
      alt: 'Placeholder for thesis report PDF',
      status: 'Document link to be attached when supplied',
    },
  ],
};

export const projectFilterCategories: ProjectFilterCategory[] = [
  'All Projects',
  'CAD Design',
  'Manufacturing',
  'Product Development',
  'Automation',
  'Research',
];

export const projectsList: EngineeringProject[] = [
  {
    id: 'automated-layer-cage-system',
    number: '01',
    slug: 'automated-layer-cage-system',
    title: 'Automated Layer Cage System',
    client: 'Imperial Chicks House',
    primaryCategory: 'Mechanical Design and Manufacturing',
    filterCategories: ['CAD Design', 'Manufacturing', 'Automation'],
    featured: true,
    serviceTag: 'Mechanical Design',
    shortSummary:
      'Designed a fully automated poultry layer cage system in SOLIDWORKS and produced G code for CNC plasma cutting of its fabricated structural and sheet-metal components.',
    heroImage: sitePath('/assets/aistudio/Color-Coded_Industrial_Rack_Assembly_f3f8e65b.png'),
    heroImageAlt: 'Official SOLIDWORKS 3D CAD assembly render of the multi-tier Automated Layer Cage System designed for Imperial Chicks House',
    heroImageNote: 'SOLIDWORKS 3D CAD assembly model showing structural frame modules, sheet-metal brackets, feeding channels, and drive sections.',
    tools: ['SOLIDWORKS', 'Sheet Metal Design', 'SheetCAM', 'CNC Plasma Cutting', 'G Code Generation'],
    overview:
      'Commissioned for Imperial Chicks House, this project encompasses the complete mechanical design of a fully automated poultry layer cage system alongside manufacturing preparation for CNC plasma cutting. The engineering scope bridged digital 3D assembly modeling directly with shop-floor sheet-metal fabrication.',
    problemObjective:
      'Develop a cohesive, manufacturable automated layer cage structure suitable for poultry housing operations, ensuring structural practicality, efficient sheet-metal material utilization, and accurate translation of 3D CAD geometry into CNC plasma-cut fabrication components.',
    designApproach:
      'The mechanical structure and associated sheet-metal brackets, frame supports, and automated subsystem interfaces were modeled in SOLIDWORKS with explicit attention to manufacturability, ease of assembly, and material utilization before generating flat profiles and CNC plasma cutting toolpaths.',
    developmentProcess: [
      'Translated functional housing and automation layout requirements into modular 3D SOLIDWORKS sub-assemblies.',
      'Designed sheet-metal brackets, structural supports, and mating mechanical parts considering real workshop fabrication workflows.',
      'Evaluated component geometry to encourage clean material nesting and practical assembly fitment.',
      'Exported cutting profiles from CAD into SheetCAM to configure cutting paths and generate production-ready G code for CNC plasma cutting.',
      'Supported fabrication coordination by resolving technical queries during CNC cutting and component preparation.',
    ],
    cadAndDrawingsNotes:
      'Full 3D multi-tier assembly models, dedicated sub-assemblies (automated feeding, egg collection, head, and tail sections), sheet-metal flat patterns, and fabrication profiles were developed in SOLIDWORKS. Dedicated gallery slots below display the full assembly render and reserve individual frames for each section render alongside 2D drawings and SheetCAM toolpath previews.',
    hasManufacturingPhase: true,
    manufacturingProcess:
      'Fabricated plate and sheet-metal components were prepared for CNC plasma cutting using SheetCAM-generated G code. Manufacturing considerations—including cut profiles, kerf-friendly geometry, and material utilization—were integrated throughout the CAD development phase.',
    finalOutcome:
      'Delivered a complete automated layer cage mechanical design and CNC plasma cutting G code package supporting Imperial Chicks House fabrication activities. Specific structural dimensions, throughput figures, or tolerance reports will be listed here only when verified project documentation is supplied.',
    engineeringInsights: [
      'Aligning 3D CAD modeling early with CNC plasma cutting constraints prevents downstream rework between design and workshop cutting.',
      'Designing sheet-metal components for nesting and straightforward assembly improves material utilization across repetitive multi-tier cage frames.',
      'Direct continuity from SOLIDWORKS modeling to SheetCAM G code generation streamlines communication with fabrication personnel.',
    ],
    gallery: [
      {
        id: 'alc-render',
        title: 'Automated Layer Cage Assembly — Full SOLIDWORKS CAD Model',
        caption: 'Color-coded SOLIDWORKS 3D assembly detailing modular structural columns, sheet-metal end frames, feed trough channels, and drive interfaces.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/Color-Coded_Industrial_Rack_Assembly_f3f8e65b.png'),
        alt: 'Isometric SOLIDWORKS 3D CAD render of the Automated Layer Cage System assembly',
      },
      {
        id: 'alc-egg-collection',
        title: 'Egg Collection Section — SOLIDWORKS CAD Render',
        caption: 'Color-coded SOLIDWORKS sub-assembly of the egg collection unit featuring sheet-metal vertical side plates, multi-tier belt guide brackets, and lower collection trays.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/Egg_collection_Assem_5d3bea90.JPG'),
        alt: 'Isometric SOLIDWORKS 3D CAD render of the Egg Collection Section sub-assembly',
      },
      {
        id: 'alc-head-section',
        title: 'Head Section — SOLIDWORKS CAD Render',
        caption: 'Color-coded SOLIDWORKS sub-assembly of the head structural frame, multi-tier roller/drive mounting plates, cross-bracing rails, and tensioner brackets.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/Head_Assembly_e564627a.JPG'),
        alt: 'Isometric SOLIDWORKS 3D CAD render of the Head Section sub-assembly',
      },
      {
        id: 'alc-tail-section',
        title: 'Tail Section — SOLIDWORKS CAD Render',
        caption: 'Color-coded SOLIDWORKS sub-assembly of the tail structural tower, multi-tier cross rails, guide track extension, and upper motor/drive mounting bracket.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/tail_assembly_5c0e8aa8.JPG'),
        alt: 'Isometric SOLIDWORKS 3D CAD render of the Tail Section sub-assembly',
      },
      {
        id: 'alc-feeding-section',
        title: 'Automated Feeding Section — SOLIDWORKS CAD Render',
        caption: 'Color-coded SOLIDWORKS sub-assembly of the traveling feed gantry featuring multi-tier sheet-metal feed hoppers, overhead guide carriage, and trough dispenser chutes.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/feeding_assembly_final_part_d7cf1abe.JPG'),
        alt: 'Isometric SOLIDWORKS 3D CAD render of the Automated Feeding Section sub-assembly',
      },
      {
        id: 'alc-cnc',
        title: 'CNC Plasma Cutting Toolpath & SheetCAM Preview',
        caption: 'SheetCAM TNG flat-pattern plasma cutting operation configuring outside offset kerf compensation (1.5 mm plasma kerf), lead-ins, and pierce/start points (S1–S5) for G-code generation.',
        kind: 'cnc_slot',
        imageUrl: sitePath('/assets/aistudio/Screenshot_2026-11-25_011623_a4a0bd2b.png'),
        alt: 'SheetCAM TNG CNC plasma cutting toolpath preview showing kerf offset and start points S1 through S5',
      },
      {
        id: 'alc-drawings',
        title: 'SOLIDWORKS Assembly & Sheet-Metal Drawings',
        caption: 'A3 SOLIDWORKS 2D orthographic and isometric engineering drawing detailing a formed sheet-metal bracket (551.00 × 157.92 × 37.14 mm) with bore diameters, slot callouts, and mounting hole positions.',
        kind: 'drawing_slot',
        imageUrl: sitePath('/assets/aistudio/Screenshot_2026-11-25_012130_c86d00b5.png'),
        alt: 'A3 SOLIDWORKS 2D orthographic and isometric engineering drawing of a sheet-metal bracket',
      },
      {
        id: 'alc-photo',
        title: 'Fabricated Components & Shop-Floor Photographs',
        caption: 'Installed multi-tier automated poultry layer cage assembly built from CNC-cut and formed galvanized sheet-metal frames, showing chain-and-sprocket drives, conveyor rollers, and feed troughs.',
        kind: 'photo_slot',
        imageUrl: sitePath('/assets/aistudio/gfgfg_a266f0df.jpg'),
        alt: 'On-site photograph of the fabricated and installed multi-tier automated poultry layer cage system',
      },
    ],
    seoTitle: 'Automated Layer Cage System — Case Study | Khan Abdullah All Noman',
    seoDescription:
      'Mechanical design of a fully automated poultry layer cage system in SOLIDWORKS and CNC plasma cutting G code generation for Imperial Chicks House.',
  },
  {
    id: 'filament-drying-box',
    number: '02',
    slug: 'filament-drying-box',
    title: 'Filament Drying Box',
    primaryCategory: 'Product Design and Prototyping',
    filterCategories: ['CAD Design', 'Product Development'],
    featured: true,
    serviceTag: '3D Printing Services',
    shortSummary:
      'Designed and developed an enclosed filament drying box incorporating a heating element to dry 3D printing filament materials reliably prior to and during fabrication.',
    heroImage: sitePath('/assets/aistudio/Isometric_Mechanical_Frame_Assembly_dbbbf2ae.png'),
    heroImageAlt: 'Official SOLIDWORKS and KeyShot 3D CAD render of the multi-spool Filament Drying Box frame assembly',
    heroImageNote: 'SOLIDWORKS & KeyShot 3D CAD assembly render showing the structural enclosure frame, multi-spool roller shaft arrangement, corner brackets, and heating module housing.',
    tools: ['SOLIDWORKS', 'Product Prototyping', '3D Printing Technologies', 'Enclosure Design', 'KeyShot'],
    overview:
      'Moisture absorption degrades print quality across many common 3D printing polymers. This project focused on designing and constructing a dedicated filament drying box using an integrated heating element to condition filament spools for 3D printing workflows.',
    problemObjective:
      'Create a practical, compact filament drying enclosure capable of housing a filament spool safely alongside a heating element, maintaining effective drying conditions while remaining straightforward to fabricate and operate.',
    designApproach:
      'Focused on clean enclosure architecture, spool support ergonomics, safe integration of the heating element, and practical access for loading and feeding filament—combining CAD assembly planning with hands-on functional prototyping.',
    developmentProcess: [
      'Defined enclosure volume and internal packaging layout for filament spool clearance and heating element placement.',
      'Modeled housing components, spool mounting arrangement, and access interfaces in 3D CAD.',
      'Selected practical materials and hardware compatible with enclosed heating operation and workshop assembly.',
      'Constructed and assembled the functional prototype incorporating the heating element for practical filament drying use.',
    ],
    cadAndDrawingsNotes:
      '3D enclosure geometry and internal component layout were planned prior to prototype construction. Dedicated slots below accommodate exploded assembly views, enclosure dimensional drawings, and physical prototype photographs.',
    hasManufacturingPhase: true,
    manufacturingProcess:
      'Physical construction combined enclosure fabrication, internal mounting of spool support hardware, and safe integration of the heating element into a working desktop drying unit.',
    finalOutcome:
      'Successfully designed and built a functional filament drying box for 3D printing applications. Measured drying curves, internal temperature logs, or specific bill-of-materials metrics will be included once experimental records are added.',
    engineeringInsights: [
      'Packaging thermal components within a compact polymer-handling enclosure demands careful attention to clearance, airflow paths, and user accessibility.',
      'Designing around real spool geometry and direct filament feed routing turns a simple heated box into a genuinely convenient everyday 3D printing tool.',
    ],
    gallery: [
      {
        id: 'fdb-render',
        title: 'Filament Drying Box — SOLIDWORKS & KeyShot CAD Render',
        caption: 'Isometric 3D CAD render illustrating the multi-spool enclosure frame, bearing-mounted roller shaft assembly, corner brackets, and integrated heater bay.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/Isometric_Mechanical_Frame_Assembly_dbbbf2ae.png'),
        alt: 'Isometric SOLIDWORKS and KeyShot 3D CAD render of the Filament Drying Box assembly',
      },
      {
        id: 'fdb-exploded',
        title: 'SOLIDWORKS Assembly Model — Shaded with Edges View',
        caption: 'Native SOLIDWORKS CAD assembly view detailing the mitered structural frame rails, L-shaped corner brackets, roller-bearing spool shaft, four filament spools, and heating module enclosure.',
        kind: 'exploded_slot',
        imageUrl: sitePath('/assets/aistudio/Screenshot_2026-11-25_015514_16ec1601.png'),
        alt: 'SOLIDWORKS Shaded with Edges 3D CAD assembly view of the Filament Drying Box',
      },
      {
        id: 'fdb-photo',
        title: 'Completed Physical Prototype Photographs',
        caption: 'Constructed four-spool filament drying box prototype featuring transparent enclosure panels, 3D-printed roller mounts, integrated heating module, digital hygrometer, and temperature controller.',
        kind: 'photo_slot',
        imageUrl: sitePath('/assets/aistudio/WhatsApp_Image_2026-11-25_at_1.59.13_AM_ddd26c9e.jpeg'),
        alt: 'Photograph of the completed four-spool Filament Drying Box physical prototype in operation',
      },
    ],
    seoTitle: 'Filament Drying Box — Case Study | Khan Abdullah All Noman',
    seoDescription:
      'Product design and functional prototyping of an enclosed filament drying box with an integrated heating element for 3D printing applications.',
  },
  {
    id: 'periodic-flow-generator',
    number: '03',
    slug: 'periodic-flow-generator',
    title: 'Periodic Flow Generator',
    primaryCategory: 'Experimental Fluid Mechanics & Fabrication',
    filterCategories: ['CAD Design', 'Manufacturing', 'Research'],
    featured: true,
    serviceTag: 'Mechanical Design',
    shortSummary:
      'Designed and fabricated a periodic flow generator test apparatus intended to produce oscillating airflow for evaluating the performance of a Wells turbine.',
    heroImage: sitePath('/assets/aistudio/IMG_4572_b79d56df.JPG'),
    heroImageAlt: 'Official SOLIDWORKS 3D CAD assembly render of the Periodic Flow Generator with reciprocating piston, transparent flow cylinder, and Wells turbine rotor',
    heroImageNote: 'SOLIDWORKS 3D CAD assembly render showing the structural drive frame, crank-driven reciprocating piston, transparent flow cylinder, gusseted cradle stanchions, and Wells turbine rotor.',
    tools: ['SOLIDWORKS', 'AutoCAD', 'Manufacturing Processes', 'Engineering Drawings', 'Engineering Analysis'],
    overview:
      'Wells turbines are self-rectifying axial air turbines widely used in oscillating water column wave energy systems because they rotate in a single direction regardless of bidirectional airflow. This project involved the mechanical design and fabrication of a periodic flow generator built specifically to evaluate Wells turbine performance under controlled oscillating flow.',
    problemObjective:
      'Design and build a reliable laboratory mechanical apparatus capable of generating repeatable bidirectional periodic airflow suited for testing and evaluating a Wells turbine.',
    designApproach:
      'Developed a mechanically driven reciprocating flow-generation rig coupling rotary drive motion into controlled periodic fluid displacement directed through a ducted test section where a Wells turbine can be mounted and studied.',
    developmentProcess: [
      'Established mechanical layout requirements to generate repeatable periodic bidirectional airflow across a turbine test section.',
      'Modeled the drive transmission, reciprocating displacement assembly, structural support frame, and flow duct interface in CAD.',
      'Prepared fabrication details ensuring structural rigidity, alignment of moving elements, and convenient installation of the test turbine.',
      'Fabricated and assembled the physical periodic flow generator for Wells turbine performance evaluation.',
    ],
    cadAndDrawingsNotes:
      'CAD layouts define the reciprocating drive mechanism, support frame, and ducting alignment. Reserved slots below are configured for official assembly screenshots, 2D fabrication drawings, and workshop build photographs.',
    hasManufacturingPhase: true,
    manufacturingProcess:
      'Fabrication encompassed structural frame assembly, integration of the mechanical drive and reciprocating flow-generation assembly, and fitting of the ducted Wells turbine evaluation section.',
    finalOutcome:
      'Produced a fabricated periodic flow generator dedicated to Wells turbine performance testing. Specific airflow frequency ranges, pressure curves, or turbine efficiency measurements will be added strictly upon availability of verified experimental data.',
    engineeringInsights: [
      'Designing experimental test rigs requires equal focus on aerodynamic flow continuity and rigid mechanical alignment of reciprocating drive hardware.',
      'Repeatable laboratory flow generation is essential for isolating turbine behavior from uncontrolled environmental disturbances.',
    ],
    gallery: [
      {
        id: 'pfg-render',
        title: 'Periodic Flow Generator — SOLIDWORKS CAD Render',
        caption: 'Isometric SOLIDWORKS 3D CAD assembly render detailing the structural drive frame, crank linkage, reciprocating piston inside the transparent flow cylinder, and mounted Wells turbine.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/IMG_4572_b79d56df.JPG'),
        alt: 'Isometric SOLIDWORKS 3D CAD assembly render of the Periodic Flow Generator test rig',
      },
      {
        id: 'pfg-drawings',
        title: 'Assembly Drawings & Component Schematics',
        caption: 'A4 SOLIDWORKS 2D engineering drawing of the cylinder support stand detailing the Ø16.70 cm saddle cradle, 52.10 cm column height, 17.20 cm baseplate, and 45° triangular gussets (10.00 cm × 7.07 cm).',
        kind: 'drawing_slot',
        imageUrl: sitePath('/assets/aistudio/Support_Stand_34cf31eb.PNG'),
        alt: 'A4 SOLIDWORKS 2D engineering drawing of the Support Stand for the Periodic Flow Generator cylinder',
      },
      {
        id: 'pfg-photo',
        title: 'Fabricated Test Rig Photographs',
        caption: 'Constructed physical periodic flow generator test rig featuring the electric motor and belt-pulley crank drive, steel cradle stanchions, transparent acrylic cylinder with reciprocating piston, and axial Wells turbine assembly.',
        kind: 'photo_slot',
        imageUrl: sitePath('/assets/aistudio/IMG_4571_b57124f7.JPG'),
        alt: 'Photograph of the fabricated Periodic Flow Generator laboratory test rig with transparent cylinder, reciprocating piston, and Wells turbine rotor',
      },
    ],
    seoTitle: 'Periodic Flow Generator — Case Study | Khan Abdullah All Noman',
    seoDescription:
      'Design and fabrication of a periodic oscillating flow generator intended to evaluate Wells turbine performance.',
  },
  {
    id: 'wave-energy-conversion-device',
    number: '04',
    slug: 'wave-energy-conversion-device',
    title: 'Wave Energy Conversion Device',
    primaryCategory: 'Renewable Energy and Mechanical Engineering',
    filterCategories: ['Research', 'Product Development'],
    featured: false,
    serviceTag: 'Engineering Problem Solving',
    shortSummary:
      'Designed and constructed a wave energy conversion device pairing a floating buoy with a linear magnetic electricity generator to investigate electricity generation and system efficiency.',
    heroImage: sitePath('/assets/aistudio/Glass_Water_Tank_Apparatus_with_Red_Float_e34c92dd.png'),
    heroImageAlt: 'Full experimental setup of the Wave Energy Conversion Device showing the glass wave tank, reciprocating wave-maker plunger, floating red buoy, and submerged linear magnetic generator',
    heroImageNote: 'Real-life photograph of the complete Wave Energy Conversion Device experimental setup inside the glass wave tank.',
    tools: ['Mechanical Design', 'Product Prototyping', 'Engineering Analysis'],
    overview:
      'Ocean and surface wave motion represents a compelling renewable mechanical energy source. In this project, a laboratory-scale wave energy conversion device was designed and built using a floating buoy coupled directly to a linear magnetic electricity generator to study electrical energy conversion and overall system efficiency.',
    problemObjective:
      'Translate vertical oscillating surface wave motion into usable electrical output through a direct-drive linear mechanical and magnetic mechanism, enabling practical investigation of electricity generation behavior and system efficiency.',
    designApproach:
      'Rather than adding intermediate rotary gearboxes that introduce friction losses at small scale, the mechanism couples the floating buoy directly to a guided linear magnetic generator—minimizing mechanical complexity while maintaining repeatable vertical alignment.',
    developmentProcess: [
      'Formulated the mechanical layout linking the buoyant float element to a linear reciprocating shaft and magnetic generator assembly.',
      'Designed guiding support frames and alignment elements to maintain concentric linear motion during vertical oscillation.',
      'Constructed the physical prototype combining floating buoy hardware with the linear coil-and-magnet electricity generator.',
      'Used the assembled device to investigate electricity generation characteristics and evaluate overall system efficiency.',
    ],
    hasManufacturingPhase: true,
    manufacturingProcess:
      'Physical construction involved assembling the buoyant float, vertical linear guide structure, and linear magnetic generator coils/magnets into a testable prototype apparatus.',
    finalOutcome:
      'Delivered a working wave energy conversion prototype enabling direct experimental investigation of linear magnetic electricity generation and conversion efficiency. Quantitative electrical output and efficiency data will be displayed once verified experimental figures are supplied.',
    engineeringInsights: [
      'Direct-drive linear coupling reduces mechanical transmission stages, placing primary emphasis on low-friction vertical guidance and alignment.',
      'Constructing a physical test device bridges fluid-structure buoyancy mechanics with electromechanical energy harvesting concepts.',
    ],
    gallery: [
      {
        id: 'wec-full-setup',
        title: 'Full Setup',
        caption: 'Complete experimental setup showing the glass wave tank, reciprocating wedge-shaped wave-maker plunger, floating red buoy, and submerged linear magnetic generator with output leads.',
        kind: 'photo_slot',
        imageUrl: sitePath('/assets/aistudio/Glass_Water_Tank_Apparatus_with_Red_Float_e34c92dd.png'),
        alt: 'Full experimental setup photograph of the Wave Energy Conversion Device in the glass wave tank',
      },
      {
        id: 'wec-buoy-generator',
        title: 'Buoy with Linear Generator',
        caption: 'Closer view of the floating red spherical buoy linked vertically to the linear magnetic generator plunger, copper stator winding, circular mounting base, and electrical output leads.',
        kind: 'photo_slot',
        imageUrl: sitePath('/assets/aistudio/ANWAR_Ball_Suspended_Over_Copper_Coil_d87e13d6.png'),
        alt: 'Real-life photograph of the floating buoy coupled with the linear magnetic electricity generator',
      },
      {
        id: 'wec-linear-generator',
        title: 'Linear Generator',
        caption: 'Close-up photograph of the linear magnetic electricity generator featuring the reciprocating plunger eyelet, copper-wound stator coil with output leads, and bolted circular base plate.',
        kind: 'photo_slot',
        imageUrl: sitePath('/assets/aistudio/Coil_Device_on_Metal_Plate_bd70cd8d.png'),
        alt: 'Real-life close-up photograph of the linear magnetic electricity generator assembly',
      },
    ],
    seoTitle: 'Wave Energy Conversion Device — Case Study | Khan Abdullah All Noman',
    seoDescription:
      'Design and construction of a floating-buoy wave energy conversion device with a linear magnetic electricity generator for investigating power generation and efficiency.',
  },
  {
    id: 'power-screw-operated-vehicle-lifter',
    number: '05',
    slug: 'power-screw-operated-vehicle-lifter',
    title: 'Power Screw Operated Vehicle Lifter',
    primaryCategory: 'Machine Design & Fabrication',
    filterCategories: ['CAD Design', 'Manufacturing', 'Product Development'],
    featured: false,
    serviceTag: 'Mechanical Design',
    shortSummary:
      'Designed and fabricated a power screw operated mechanical vehicle lifter engineered as a practical course project for safe, dependable automotive tire replacement.',
    heroImage: sitePath('/assets/aistudio/Isometric_Gray_and_Red_Screw_Jack_Mechanism_b5b5a95e.png'),
    heroImageAlt: 'Official SOLIDWORKS 3D CAD isometric render of the Power Screw Operated Vehicle Lifter showing the power screw, compression arms, screw holders, connecting pins, top saddle, and flared base support',
    heroImageNote: 'SOLIDWORKS 3D CAD assembly render illustrating the threaded power screw, hinged compression arms, red cylindrical spacer sleeves, connecting pins, top saddle, and gusseted base plate.',
    tools: ['SOLIDWORKS', 'Mechanical Design', 'Manufacturing Processes', 'Engineering Drawings'],
    overview:
      'Mechanical screw-actuated vehicle lifters convert rotational input torque into controlled linear lifting force while taking advantage of self-locking thread mechanics. Completed as a practical team engineering course project, this work covered the mechanical design and workshop fabrication of a power screw operated vehicle lifter intended for automotive tire replacement.',
    problemObjective:
      'Design and fabricate a practical, mechanically sound power screw operated lifter capable of elevating an automotive chassis reliably during tire replacement while maintaining operational stability and straightforward manual actuation.',
    designApproach:
      'Applied fundamental machine design principles to pair a power screw actuator with hinged structural lifting linkages, a stable load-distributing base plate, and a secure vehicle contact saddle.',
    developmentProcess: [
      'Evaluated functional requirements for vehicle tire-replacement lifting geometry, contact stability, and mechanical advantage.',
      'Prepared mechanical sizing, linkage arm geometry, pivot pin arrangement, base plate, and upper lifting saddle specifications.',
      'Checked linkage articulation range and load-path alignment across closed and elevated operating positions.',
      'Fabricated and assembled the physical vehicle lifter prototype in the workshop.',
    ],
    cadAndDrawingsNotes:
      '3D CAD assembly views and component engineering drawings cover the power screw, compression arms, connecting pins, screw holder, top saddle, and base support. Reserved gallery slots below are ready for CAD assembly renders and dimensioned part drawings.',
    hasManufacturingPhase: true,
    manufacturingProcess:
      'Fabrication involved forming and machining structural lifting arms, integrating the power screw and threaded nut assembly, fitting pivot hardware, and assembling the base and load-bearing saddle.',
    finalOutcome:
      'Completed the design and physical fabrication of a functional power screw operated vehicle lifter for automotive tire replacement. Detailed project documentation is available in the downloadable PDF report.',
    engineeringInsights: [
      'Power screw mechanisms offer predictable mechanical advantage and inherent self-locking safety behavior when thread geometry is properly selected.',
      'Clear pivot alignment and wide base-plate stability are decisive for real-world usability during automotive maintenance.',
    ],
    gallery: [
      {
        id: 'psl-cad-1',
        title: 'Power Screw Vehicle Lifter — SOLIDWORKS CAD Render',
        caption: 'Isometric SOLIDWORKS 3D CAD assembly render detailing the threaded power screw, screw-holder blocks, eight compression link arms, cylindrical support sleeves, U-channel top saddle, and flared base plate.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/Isometric_Gray_and_Red_Screw_Jack_Mechanism_b5b5a95e.png'),
        alt: 'Isometric SOLIDWORKS 3D CAD render of the Power Screw Operated Vehicle Lifter assembly',
      },
      {
        id: 'psl-cad-2',
        title: 'Assembly Views & Handlebar Mechanism',
        caption: 'Isometric SOLIDWORKS 3D CAD render depicting the full vehicle lifter assembly coupled with the torque-applying T-handlebar and drive socket.',
        kind: 'exploded_slot',
        imageUrl: sitePath('/assets/aistudio/Mechanical_Truss_Assembly_CAD_Render_7fce2eef.png'),
        alt: 'Isometric SOLIDWORKS 3D CAD render of the Power Screw Operated Vehicle Lifter with handlebar drive mechanism',
      },
      {
        id: 'psl-drawings',
        title: 'Component Dimensioned Drawings',
        caption: 'SOLIDWORKS 2D orthographic and isometric engineering drawing of the compression link arm (Arm 1, Scale 1:2), detailing the 170.00 mm hole center-to-center span, 174.00 mm length, 5.00 mm thickness, 2 × Ø9.00 mm pin bores, and 4 × R6.00 corner fillets.',
        kind: 'drawing_slot',
        imageUrl: sitePath('/assets/aistudio/Precision_Arm_Engineering_Drawing_1ff74375.png'),
        alt: 'SOLIDWORKS 2D orthographic and isometric engineering drawing of the Arm 1 compression member',
      },
    ],
    reportDownloadUrl: sitePath('/assets/aistudio/Power_Screw_Operated_Vehicle_Lifter_ebcd82b8.pdf'),
    reportFileName: 'Power_Screw_Operated_Vehicle_Lifter_Report.pdf',
    seoTitle: 'Power Screw Operated Vehicle Lifter — Case Study | Khan Abdullah All Noman',
    seoDescription:
      'Design and fabrication of a power screw operated mechanical vehicle lifter engineered for automotive tire replacement.',
  },
  {
    id: 'construction-crane-winch-system',
    number: '06',
    slug: 'construction-crane-winch-system',
    title: 'Construction Crane Winch System',
    primaryCategory: 'Mechanical Design & Power Transmission',
    filterCategories: ['CAD Design', 'Manufacturing'],
    featured: false,
    serviceTag: '3D CAD Modeling',
    shortSummary:
      'Designed and analyzed a construction crane winch system encompassing mechanical layout, gear-driven power transmission, cable drum architecture, and lifting mechanisms.',
    heroImage: sitePath('/assets/aistudio/Metallic_Winch_Spool_Assembly_35a879c1.png'),
    heroImageAlt: 'Official SOLIDWORKS 3D CAD render of the Construction Crane Winch System showing the flanged hoisting spool, gear drive ring, worm/pinion input shaft, bronze bushings, and U-bracket cradle',
    heroImageNote: 'SOLIDWORKS 3D CAD assembly render showing the flanged cable drum, side-mounted gear ring, lower input drive shaft, bronze shaft bushings, and formed U-channel base frame.',
    tools: ['SOLIDWORKS', 'AutoCAD', 'Mechanical Design', 'Engineering Analysis', 'Engineering Drawings'],
    overview:
      'Heavy lifting equipment relies on carefully engineered power transmission and braking assemblies to handle suspended loads reliably. This project encompassed the mechanical design and engineering analysis of a construction crane winch system, addressing mechanical arrangement, torque transmission, and lifting drum mechanics.',
    problemObjective:
      'Develop a coherent mechanical arrangement and power transmission design for a construction crane winch capable of converting prime-mover input into controlled wire-rope hoisting motion with appropriate braking and structural support.',
    designApproach:
      'Structured the winch assembly around a rigid structural baseplate supporting the multi-stage gear reduction train, shaft bearing blocks, grooved hoisting drum, and mechanical braking mechanism, evaluating load paths across every interacting machine element.',
    developmentProcess: [
      'Defined the functional mechanical architecture connecting drive input, gear reduction stages, hoisting cable drum, and braking hardware.',
      'Analyzed mechanical power transmission relationships, shaft arrangements, bearing supports, and lifting mechanism geometry.',
      'Developed detailed 3D CAD component models and assembled the complete winch system to verify spatial clearances and alignment.',
      'Prepared technical arrangement views and engineering documentation covering key machine elements.',
    ],
    cadAndDrawingsNotes:
      'The CAD assembly integrates the gear train, shafts, pillow-block supports, grooved wire-rope drum, brake assembly, and base frame. Reserved gallery slots below accommodate native SOLIDWORKS screenshots, exploded views, and orthographic arrangement drawings.',
    hasManufacturingPhase: false,
    manufacturingProcess:
      'This project focused on mechanical design, power transmission layout, and engineering analysis rather than physical full-scale crane fabrication. Design choices nonetheless accounted for conventional heavy-machinery manufacturing processes including machining of shafts and gears and welded structural steel baseplates.',
    finalOutcome:
      'Produced a comprehensive mechanical design and analysis of a construction crane winch system demonstrating structured integration of power transmission and lifting components. Numerical lifting capacity, gear ratios, or stress figures will be published strictly when verified design sheets are attached.',
    engineeringInsights: [
      'Designing multi-element hoisting machinery requires coordinating gear train reduction, shaft support stiffness, drum geometry, and braking safety as one coupled system.',
      'Explicitly organizing baseplate geometry and bearing accessibility simplifies both heavy fabrication and long-term field maintenance.',
    ],
    gallery: [
      {
        id: 'ccw-render',
        title: 'Construction Crane Winch System — SOLIDWORKS CAD Render',
        caption: 'Isometric SOLIDWORKS 3D CAD render depicting the metallic flanged hoisting drum, driven gear ring, lower input shaft with bearing block, bronze shaft bushings, and U-channel support bracket.',
        kind: 'cad_render',
        imageUrl: sitePath('/assets/aistudio/Metallic_Winch_Spool_Assembly_35a879c1.png'),
        alt: 'Isometric SOLIDWORKS 3D CAD render of the Construction Crane Winch System assembly',
      },
      {
        id: 'ccw-exploded',
        title: 'Exploded Transmission & Drum Assembly',
        caption: 'Front-elevation photorealistic CAD render revealing the worm drive shaft, bronze bushing housing, meshing worm gear engagement, drum shaft clearances, and formed U-channel cradle.',
        kind: 'exploded_slot',
        imageUrl: sitePath('/assets/aistudio/Photorealistic_Winch_Spool_Mechanism_bf904969.png'),
        alt: 'Front-elevation SOLIDWORKS CAD render of the Construction Crane Winch transmission and drum assembly',
      },
      {
        id: 'ccw-drawings',
        title: 'Engineering Drawings & Analysis Sheets',
        caption: 'A4 SOLIDWORKS 2D orthographic engineering drawing of the winch base support (Scale 1:20), detailing the 1430.00 mm overall span, 1290.00 mm inner width, 600.00 mm frame width, 550.00 mm shaft centerline height, and Ø209.00 mm / Ø320.00 mm bearing boss geometry.',
        kind: 'drawing_slot',
        imageUrl: sitePath('/assets/aistudio/Base_Support_Engineering_Drawing_11c52d32.png'),
        alt: 'A4 SOLIDWORKS 2D orthographic engineering drawing of the Construction Crane Winch base support',
      },
    ],
    reportDownloadUrl: sitePath('/assets/aistudio/Construction_Crane_Winch_System_491175e6.pdf'),
    reportFileName: 'Construction_Crane_Winch_System_Report.pdf',
    seoTitle: 'Construction Crane Winch System — Case Study | Khan Abdullah All Noman',
    seoDescription:
      'Mechanical design and analysis of a construction crane winch system covering mechanical arrangement, power transmission, and lifting mechanisms.',
  },
  {
    id: 'automatic-water-tank-level-controller',
    number: '07',
    slug: 'automatic-water-tank-level-controller',
    title: 'Automatic Water Tank Level Controller',
    primaryCategory: 'Automation & Control Systems',
    filterCategories: ['Automation', 'Product Development'],
    featured: false,
    serviceTag: 'Engineering Problem Solving',
    shortSummary:
      'Designed and constructed a residential automatic water tank level controller to automate pump operation, prevent overflow, and reduce manual intervention.',
    heroImage: null,
    tools: ['Arduino', 'C Programming', 'Automatic Control Projects', 'Product Prototyping'],
    overview:
      'Manual operation of residential overhead water pumps frequently leads to tank overflows, wasted water, unnecessary electricity consumption, or dry tanks. This project delivered the design and construction of a residential automatic water tank level controller that monitors tank water levels and automatically governs pump switching.',
    problemObjective:
      'Automate residential water pump switching based on defined low and high water-level thresholds in an overhead tank, minimizing daily manual supervision and preventing overflow.',
    designApproach:
      'Integrated level-sensing inputs with microcontroller/control switching logic and relay actuation inside a protective enclosure, separating low-voltage level sensing from pump switching circuitry for practical residential use.',
    developmentProcess: [
      'Defined residential overhead tank control states (low-level pump activation and high-level automatic cutoff).',
      'Designed sensing and switching architecture pairing water-level probes with automated control logic and relay actuation.',
      'Programmed and verified switching logic for reliable, chatter-free pump control transitions.',
      'Constructed and tested the working residential automatic water tank level controller prototype.',
    ],
    hasManufacturingPhase: true,
    manufacturingProcess:
      'Construction involved circuit assembly, enclosure preparation, terminal wiring of level sensor probes and switching relay output, and functional bench testing.',
    finalOutcome:
      'Constructed a working automatic water tank level controller demonstrating automated residential pump control with reduced manual intervention. Full project summary documentation is available in the downloadable PDF report.',
    engineeringInsights: [
      'Practical residential automation succeeds when control logic is simple, repeatable, and housed cleanly for straightforward wiring and maintenance.',
      'Separating threshold trigger points prevents rapid pump cycling near boundary water levels.',
    ],
    gallery: [
      {
        id: 'awt-photo-1',
        title: 'Controller Prototype Photograph',
        caption: 'Placeholder slot reserved for the real-life photograph of the assembled automatic water tank level controller unit.',
        kind: 'photo_slot',
        imageUrl: null,
        alt: 'Placeholder for Automatic Water Tank Level Controller prototype photograph',
      },
      {
        id: 'awt-photo-2',
        title: 'Circuit & Sensor Setup Photograph',
        caption: 'Placeholder slot reserved for real-life photographs of the control circuit, relay module, and water-level sensing setup.',
        kind: 'photo_slot',
        imageUrl: null,
        alt: 'Placeholder for Automatic Water Tank Level Controller circuit and sensor setup photograph',
      },
    ],
    reportDownloadUrl: sitePath('/reports/automatic-water-tank-level-controller.pdf'),
    reportFileName: 'Automatic_Water_Tank_Level_Controller_Report.pdf',
    seoTitle: 'Automatic Water Tank Level Controller — Case Study | Khan Abdullah All Noman',
    seoDescription:
      'Design and construction of a residential automatic water tank level controller to automate pump switching and reduce manual supervision.',
  },
];

export const featuredProjects = projectsList.filter((project) => project.featured);

export function getProjectBySlug(slug: string): EngineeringProject | undefined {
  return projectsList.find((project) => project.slug === slug);
}
