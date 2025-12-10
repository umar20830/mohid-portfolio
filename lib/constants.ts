export const siteConfig = {
  name: 'Mohid Ali',
  title: 'Mohid Ali | Professional SEO Specialist',
  description: 'Professional SEO Specialist from Pakistan helping businesses achieve top search rankings, increase organic traffic, and drive sustainable growth through data-driven SEO strategies.',
  url: 'https://mohidali.com',
  ogImage: '/og-image.jpg',
  author: 'Mohid Ali',
  location: 'Pakistan',
  email: 'contact@mohidali.com',
  social: {
    twitter: 'https://twitter.com/mohidali',
    linkedin: 'https://linkedin.com/in/mohidali',
    github: 'https://github.com/mohidali',
  },
};

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const services = [
  {
    id: 'technical-seo',
    title: 'Technical SEO',
    description: 'Comprehensive technical audits, site speed optimization, structured data implementation, and crawlability improvements to ensure search engines can efficiently index your content.',
    icon: 'Code',
    features: [
      'Site architecture optimization',
      'Core Web Vitals improvement',
      'Schema markup implementation',
      'XML sitemap optimization',
      'Robots.txt configuration',
      'Mobile-first optimization',
    ],
  },
  {
    id: 'on-page-seo',
    title: 'On-Page SEO',
    description: 'Strategic keyword research, content optimization, meta tag optimization, and internal linking strategies that align with search intent and boost rankings.',
    icon: 'FileText',
    features: [
      'Keyword research & mapping',
      'Meta title & description optimization',
      'Header tag optimization',
      'Content gap analysis',
      'Internal linking strategy',
      'Image optimization',
    ],
  },
  {
    id: 'off-page-seo',
    title: 'Off-Page SEO',
    description: 'White-hat link building, brand mentions, and authority building strategies that establish your domain as a trusted industry leader.',
    icon: 'Link',
    features: [
      'High-quality link building',
      'Guest posting outreach',
      'Brand mention monitoring',
      'Competitor backlink analysis',
      'Digital PR strategies',
      'Local citation building',
    ],
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    description: 'Google Business Profile optimization, local keyword targeting, and citation management to dominate local search results and attract nearby customers.',
    icon: 'MapPin',
    features: [
      'Google Business Profile optimization',
      'Local keyword targeting',
      'NAP consistency audit',
      'Review management strategy',
      'Local schema markup',
      'Geo-targeted content',
    ],
  },
  {
    id: 'ecommerce-seo',
    title: 'E-commerce SEO',
    description: 'Product page optimization, category structure improvements, and conversion-focused SEO strategies tailored for online stores.',
    icon: 'ShoppingCart',
    features: [
      'Product page optimization',
      'Category page structure',
      'Product schema markup',
      'Faceted navigation handling',
      'Inventory-based SEO',
      'Conversion rate optimization',
    ],
  },
  {
    id: 'seo-audit',
    title: 'SEO Audit & Strategy',
    description: 'In-depth SEO audits with actionable recommendations and custom strategies aligned with your business goals and competitive landscape.',
    icon: 'Search',
    features: [
      'Comprehensive site audit',
      'Competitor analysis',
      'Keyword opportunity analysis',
      'Content strategy development',
      'ROI-focused recommendations',
      'Monthly reporting & tracking',
    ],
  },
];

export const caseStudies = [
  {
    id: 'ecommerce-growth',
    title: 'E-commerce Traffic Explosion',
    client: 'Fashion Retail Brand',
    industry: 'E-commerce / Fashion',
    duration: '8 months',
    thumbnail: '/projects/ecommerce-case-study.jpg',
    description: 'Transformed an underperforming e-commerce store into a traffic powerhouse through comprehensive technical SEO fixes and content strategy.',
    challenge: 'The client was struggling with declining organic traffic, poor Core Web Vitals scores, and losing ground to competitors in search rankings.',
    solution: 'Implemented a full technical SEO overhaul including site speed optimization, structured data implementation, and a content hub strategy targeting high-intent keywords.',
    results: [
      { metric: 'Organic Traffic', before: '25K', after: '180K', change: '+620%' },
      { metric: 'Keyword Rankings', before: '150', after: '1,200+', change: '+700%' },
      { metric: 'Revenue from Organic', before: '$50K', after: '$420K', change: '+740%' },
      { metric: 'Domain Authority', before: '28', after: '52', change: '+86%' },
    ],
    testimonial: {
      quote: 'Mohid transformed our online presence. The results exceeded our expectations.',
      author: 'Sarah Johnson',
      role: 'Marketing Director',
    },
  },
  {
    id: 'saas-rankings',
    title: 'SaaS Keyword Domination',
    client: 'B2B Software Company',
    industry: 'SaaS / Technology',
    duration: '12 months',
    thumbnail: '/projects/saas-case-study.jpg',
    description: 'Helped a B2B SaaS company achieve first-page rankings for highly competitive industry keywords and establish thought leadership.',
    challenge: 'The company had minimal organic visibility in a highly competitive market with well-funded competitors dominating search results.',
    solution: 'Developed a comprehensive content strategy with pillar pages, implemented technical SEO improvements, and built high-authority backlinks through digital PR.',
    results: [
      { metric: 'Organic Traffic', before: '8K', after: '95K', change: '+1,087%' },
      { metric: 'MQLs from Organic', before: '45', after: '380', change: '+744%' },
      { metric: 'Featured Snippets', before: '2', after: '28', change: '+1,300%' },
      { metric: 'Avg. Position', before: '42', after: '8.5', change: '+394%' },
    ],
    testimonial: {
      quote: 'The SEO strategy Mohid implemented became our primary lead generation channel.',
      author: 'Michael Chen',
      role: 'CEO',
    },
  },
  {
    id: 'local-business',
    title: 'Local Market Takeover',
    client: 'Multi-Location Dental Practice',
    industry: 'Healthcare / Local Business',
    duration: '6 months',
    thumbnail: '/projects/local-case-study.jpg',
    description: 'Dominated local search results for a dental practice with multiple locations, driving a significant increase in new patient appointments.',
    challenge: 'The practice was invisible in local search results, losing potential patients to competitors with better online visibility.',
    solution: 'Optimized Google Business Profiles for all locations, built local citations, implemented location-specific landing pages, and developed a review generation strategy.',
    results: [
      { metric: 'Google Map Pack Rankings', before: '#15', after: '#1-3', change: 'Top 3' },
      { metric: 'Monthly Calls', before: '85', after: '420', change: '+394%' },
      { metric: 'New Patients', before: '22', after: '95', change: '+332%' },
      { metric: 'Google Reviews', before: '45', after: '280', change: '+522%' },
    ],
    testimonial: {
      quote: 'Our phones started ringing off the hook. Best investment we\'ve made for our practice.',
      author: 'Dr. Emily Roberts',
      role: 'Practice Owner',
    },
  },
  {
    id: 'content-authority',
    title: 'Content Authority Building',
    client: 'Financial Services Firm',
    industry: 'Finance / Professional Services',
    duration: '10 months',
    thumbnail: '/projects/finance-case-study.jpg',
    description: 'Built topical authority in the competitive financial services space through strategic content creation and link building.',
    challenge: 'The firm had no content strategy and was competing against established financial publications with decades of authority.',
    solution: 'Created a comprehensive content hub strategy, produced expert-level financial guides, and secured backlinks from authoritative financial publications.',
    results: [
      { metric: 'Organic Traffic', before: '5K', after: '78K', change: '+1,460%' },
      { metric: 'Backlinks', before: '120', after: '2,400', change: '+1,900%' },
      { metric: 'Leads Generated', before: '15', after: '180', change: '+1,100%' },
      { metric: 'Brand Searches', before: '200', after: '3,500', change: '+1,650%' },
    ],
    testimonial: {
      quote: 'Mohid helped us become the go-to resource in our industry.',
      author: 'James Wilson',
      role: 'Managing Partner',
    },
  },
];

export const skills = [
  'Technical SEO',
  'On-Page Optimization',
  'Link Building',
  'Keyword Research',
  'Content Strategy',
  'Local SEO',
  'E-commerce SEO',
  'Google Analytics',
  'Google Search Console',
  'Ahrefs',
  'SEMrush',
  'Screaming Frog',
  'Core Web Vitals',
  'Schema Markup',
  'International SEO',
];

export const tools = [
  { name: 'Google Analytics', category: 'Analytics' },
  { name: 'Google Search Console', category: 'Analytics' },
  { name: 'Ahrefs', category: 'SEO Tools' },
  { name: 'SEMrush', category: 'SEO Tools' },
  { name: 'Moz Pro', category: 'SEO Tools' },
  { name: 'Screaming Frog', category: 'Technical' },
  { name: 'Sitebulb', category: 'Technical' },
  { name: 'PageSpeed Insights', category: 'Performance' },
  { name: 'GTmetrix', category: 'Performance' },
  { name: 'Surfer SEO', category: 'Content' },
  { name: 'Clearscope', category: 'Content' },
  { name: 'BrightLocal', category: 'Local SEO' },
];

export const experience = [
  {
    year: '2024',
    title: 'Senior SEO Consultant',
    company: 'Freelance',
    description: 'Providing strategic SEO consulting for enterprise clients and high-growth startups across multiple industries.',
  },
  {
    year: '2022',
    title: 'SEO Lead',
    company: 'Digital Marketing Agency',
    description: 'Led SEO strategy for 20+ clients, managing a team of SEO specialists and driving consistent organic growth.',
  },
  {
    year: '2020',
    title: 'SEO Specialist',
    company: 'E-commerce Company',
    description: 'Managed SEO for a large e-commerce platform, implementing technical improvements and content strategies.',
  },
  {
    year: '2018',
    title: 'Junior SEO Analyst',
    company: 'Marketing Startup',
    description: 'Started career in SEO, learning fundamentals of keyword research, on-page optimization, and analytics.',
  },
];

export const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '150M+', label: 'Organic Impressions' },
  { value: '50M+', label: 'Traffic Generated' },
  { value: '98%', label: 'Client Satisfaction' },
];

export const testimonials = [
  {
    quote: 'Mohid is an exceptional SEO professional. His strategic approach and attention to detail helped us achieve results we never thought possible.',
    author: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
  },
  {
    quote: 'Working with Mohid was a game-changer for our business. Our organic traffic increased by over 500% in just 6 months.',
    author: 'Michael Chen',
    role: 'CEO',
    company: 'GrowthLabs',
  },
  {
    quote: 'The best SEO specialist I\'ve ever worked with. Mohid combines technical expertise with creative strategy like no one else.',
    author: 'Emily Roberts',
    role: 'Founder',
    company: 'BrandBuilders',
  },
];
