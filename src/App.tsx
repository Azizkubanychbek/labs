import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Zap, 
  Users, 
  Award, 
  ArrowRight, 
  Menu, 
  X,
  Coins,
  Calculator,
  BarChart3,
  ChefHat,
  Database,
  Cloud,
  Mail,
  MapPin,
  Sparkles,
  Rocket,
  Star,
  TrendingUp,
  Brain,
  Shield,
  Layers,
  Cpu,
  Network,
  Eye,
  Lightbulb,
  Target,
  CheckCircle,
  Play,
  Building2,
  Briefcase,
  Settings,
  Monitor,
  Server,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [time, setTime] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    company: '',
    projectDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!contactForm.fullName.trim() || !contactForm.email.trim() || !contactForm.projectDetails.trim()) {
      setSubmitMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setSubmitMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message });
        // Reset form
        setContactForm({
          fullName: '',
          email: '',
          company: '',
          projectDetails: ''
        });
      } else {
        setSubmitMessage({ type: 'error', text: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'solutions', 'products', 'cases', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const animationFrame = () => {
      setTime(Date.now() * 0.001);
      requestAnimationFrame(animationFrame);
    };
    requestAnimationFrame(animationFrame);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const solutions = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Asset Tokenization Platform",
      description: "Enterprise-grade blockchain platform for tokenizing real estate, commodities, and investment assets with regulatory compliance",
      features: ["Smart Contract Automation", "DeFi Integration", "Regulatory Compliance", "Multi-chain Support", "Investor Portal", "KYC/AML"],
      gradient: "from-amber-500 to-orange-600",
      pricing: "From $50K setup + 2% transaction fee",
      timeline: "3-6 months",
      tech: ["Ethereum", "Polygon", "Solidity", "IPFS", "React", "Node.js"]
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "AI-Powered Accounting Suite",
      description: "Intelligent accounting automation with machine learning document processing and real-time financial insights",
      features: ["AI Document Recognition", "Automated Tax Filing", "Real-time Analytics", "Multi-currency Support", "Bank Integration", "Audit Trail"],
      gradient: "from-green-500 to-emerald-600",
      pricing: "From $299/month per user",
      timeline: "2-4 months",
      tech: ["Python", "TensorFlow", "Django", "PostgreSQL", "Redis", "AWS"]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Business Intelligence Platform",
      description: "Advanced analytics and reporting solution with predictive modeling and interactive dashboards",
      features: ["Real-time Dashboards", "Predictive Analytics", "Custom Report Builder", "Data Integration", "Mobile BI", "Role-based Access"],
      gradient: "from-violet-500 to-purple-600",
      pricing: "From $499/month per user",
      timeline: "4-8 months",
      tech: ["Python", "Apache Spark", "React", "D3.js", "PostgreSQL", "Kubernetes"]
    },
    {
      icon: <ChefHat className="w-6 h-6" />,
      title: "Restaurant Management Ecosystem",
      description: "Comprehensive restaurant solution covering POS, inventory, staff management, and customer analytics",
      features: ["Cloud POS System", "Inventory Management", "Staff Scheduling", "Customer Analytics", "Online Ordering", "Loyalty Program"],
      gradient: "from-red-500 to-pink-600",
      pricing: "From $199/month per location",
      timeline: "3-5 months",
      tech: ["Vue.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS"]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Enterprise Web Applications",
      description: "Scalable web applications built with modern architecture for high-performance business operations",
      features: ["Microservices Architecture", "Cloud Native", "API-first Design", "Progressive Web Apps", "Real-time Updates", "Multi-tenant"],
      gradient: "from-blue-500 to-cyan-600",
      pricing: "From $75K setup + monthly maintenance",
      timeline: "6-12 months",
      tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Kubernetes"]
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Application Development",
      description: "Native and cross-platform mobile solutions with offline capabilities and push notifications",
      features: ["Native iOS/Android", "Cross-platform React Native", "Offline Functionality", "Push Notifications", "Biometric Auth", "App Store Optimization"],
      gradient: "from-purple-500 to-pink-600",
      pricing: "From $25K per platform",
      timeline: "3-6 months",
      tech: ["React Native", "Swift", "Kotlin", "Firebase", "AWS Amplify", "App Store Connect"]
    }
  ];

  const products = [
    {
      name: "TokenizeHub Enterprise",
      category: "Blockchain Platform",
      description: "Professional asset tokenization platform for real estate, commodities, and investment portfolios with regulatory compliance",
      price: "$50,000 setup + 2% transaction fee",
      features: ["Smart Contract Automation", "Multi-chain Support", "Regulatory Compliance", "Investor Portal", "KYC/AML Integration", "DeFi Protocols"],
      image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-amber-400 to-orange-500",
      tech: ["Ethereum", "Polygon", "Solidity", "IPFS", "React", "Node.js"],
      deployment: "Cloud/On-premise",
      support: "24/7 Premium Support"
    },
    {
      name: "AccountingAI Professional",
      category: "Financial Software",
      description: "Enterprise AI-powered accounting system with automated document processing, tax compliance, and real-time financial insights",
      price: "$299/month per user (min 5 users)",
      features: ["AI Document Processing", "Automated Tax Filing", "Multi-currency Support", "Bank Integration", "Real-time Analytics", "Audit Trail"],
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-green-400 to-emerald-500",
      tech: ["Python", "TensorFlow", "Django", "PostgreSQL", "Redis", "AWS"],
      deployment: "Cloud SaaS",
      support: "Business Hours + Emergency"
    },
    {
      name: "RestaurantOS Pro",
      category: "Restaurant Software",
      description: "Comprehensive restaurant management solution with cloud POS, inventory management, and advanced analytics",
      price: "$199/month per location + $49/month per additional terminal",
      features: ["Cloud POS System", "Inventory Management", "Staff Scheduling", "Customer Analytics", "Online Ordering", "Loyalty Program"],
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-red-400 to-pink-500",
      tech: ["Vue.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS"],
      deployment: "Cloud SaaS",
      support: "8/5 Support + 24/7 Emergency"
    },
    {
      name: "AnalyticsPro Enterprise",
      category: "Business Intelligence",
      description: "Advanced analytics and reporting platform with predictive modeling, real-time dashboards, and data integration",
      price: "$499/month per user (min 3 users) + $2,000 setup fee",
      features: ["Real-time Dashboards", "Predictive Analytics", "Custom Report Builder", "Data Integration", "Mobile BI", "Role-based Access"],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-violet-400 to-purple-500",
      tech: ["Python", "Apache Spark", "React", "D3.js", "PostgreSQL", "Kubernetes"],
      deployment: "Cloud/On-premise",
      support: "24/7 Premium Support"
    }
  ];

  const caseStudies = [
    {
      client: "Global Real Estate Fund",
      industry: "Real Estate Investment",
      project: "Asset Tokenization Platform",
      result: "$89M in tokenized assets",
      description: "Developed a comprehensive blockchain platform for tokenizing real estate assets across 12 countries, enabling fractional ownership and global investment opportunities with regulatory compliance.",
      challenge: "Need to tokenize $500M+ in real estate assets across multiple jurisdictions with varying regulatory requirements",
      solution: "Built multi-chain platform with smart contracts, KYC/AML integration, and regulatory compliance modules",
      tech: ["Ethereum", "Polygon", "Solidity", "React", "Node.js", "IPFS", "Chainlink"],
      metrics: { 
        roi: "156%", 
        time: "8 months", 
        users: "8.5K+", 
        assets: "$89M tokenized",
        countries: "12",
        compliance: "100%"
      },
      image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
      testimonial: "The platform has revolutionized how we manage and distribute real estate investments globally."
    },
    {
      client: "Restaurant Chain Network",
      industry: "Food & Beverage",
      project: "Multi-location Management System",
      result: "47 locations managed",
      description: "Implemented an integrated restaurant management ecosystem handling POS, inventory, staff scheduling, and customer analytics across multiple locations with real-time synchronization.",
      challenge: "Managing 47 restaurant locations with inconsistent systems, leading to inventory waste and operational inefficiencies",
      solution: "Developed cloud-based unified system with real-time data synchronization and advanced analytics",
      tech: ["Vue.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS", "WebSockets"],
      metrics: { 
        efficiency: "+58%", 
        cost: "-28%", 
        revenue: "+15%",
        locations: "47",
        terminals: "189",
        users: "1,200+"
      },
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
      testimonial: "We've seen dramatic improvements in operational efficiency and customer satisfaction."
    },
    {
      client: "Fortune 500 Manufacturing Corp",
      industry: "Manufacturing",
      project: "AI-Powered Accounting System",
      result: "99.8% accuracy in processing",
      description: "Deployed an enterprise AI-driven accounting system with automated document recognition, intelligent tax processing, and real-time financial insights across 23 subsidiaries.",
      challenge: "Manual processing of 50,000+ documents monthly across 23 subsidiaries, leading to errors and compliance risks",
      solution: "Implemented AI-powered system with machine learning document recognition and automated compliance checks",
      tech: ["Python", "TensorFlow", "Django", "PostgreSQL", "OCR", "AWS", "Kubernetes"],
      metrics: { 
        accuracy: "99.8%", 
        speed: "6x faster", 
        savings: "$850K+",
        documents: "50K+/month",
        subsidiaries: "23",
        users: "450+"
      },
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
      testimonial: "The AI system has transformed our accounting operations and significantly reduced compliance risks."
    }
  ];

  const stats = [
    { 
      number: "127+", 
      label: "Projects Delivered", 
      icon: <Briefcase className="w-5 h-5" />,
      detail: "Across 15+ industries",
      trend: "+23% YoY"
    },
    { 
      number: "23+", 
      label: "Enterprise Clients", 
      icon: <Building2 className="w-5 h-5" />,
      detail: "Fortune 500 & Global",
      trend: "+5 new this year"
    },
    { 
      number: "99.9%", 
      label: "Uptime Guarantee", 
      icon: <Shield className="w-5 h-5" />,
      detail: "SLA commitment",
      trend: "Consistent performance"
    },
    { 
      number: "24/7", 
      label: "Support Available", 
      icon: <Settings className="w-5 h-5" />,
      detail: "Global timezone coverage",
      trend: "15 min response time"
    }
  ];

  const faqData = [
    {
      question: "What technologies do you use for development?",
      answer: "We use modern enterprise technology stack: Frontend (React, Vue.js, TypeScript), Backend (Node.js, Python, Java), Databases (PostgreSQL, MongoDB, Redis), Cloud (AWS, Azure, GCP), DevOps (Docker, Kubernetes, Terraform), AI/ML (TensorFlow, PyTorch), and blockchain (Ethereum, Polygon, Solidity). All solutions are scalable and meet enterprise security standards.",
      category: "Technology Stack"
    },
    {
      question: "How long does it take to develop an enterprise solution?",
      answer: "Development time depends on the complexity and scale of the project. MVP (Minimum Viable Product) is ready in 2-3 months, full enterprise solution - 6-18 months. We use Agile/Scrum methodology with two-week sprints, ensuring fast iteration and ability to adjust requirements during development.",
      category: "Development Process"
    },
    {
      question: "Do you provide technical support after launch?",
      answer: "Yes, we provide comprehensive technical support 24/7/365, including: performance monitoring, security updates, infrastructure scaling, feature development, backup, and technical consulting. Support includes SLA with guaranteed 15-minute response time for critical incidents.",
      category: "Support & Maintenance"
    },
    {
      question: "Can you integrate the solution with existing systems?",
      answer: "Of course! We specialize in integrating with any existing systems through REST/SOAP API, GraphQL, databases (Oracle, SQL Server, MySQL), file systems, ERP/CRM systems (SAP, Salesforce), payment gateways, and other data exchange protocols. We use enterprise integration patterns and ensure data transmission security.",
      category: "Integration"
    },
    {
      question: "What quality guarantees do you provide?",
      answer: "We guarantee 99.9% uptime according to SLA, complete unit/integration test coverage (minimum 90%), compliance with international security standards (ISO 27001, SOC 2), automated CI/CD testing, and 30-day warranty for fixing any critical bugs. All solutions undergo code review and security audit.",
      category: "Quality Assurance"
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes, we have extensive experience working with clients from the US, Europe, Asia and other regions. We ensure compliance with local legislation (GDPR, CCPA, LGPD), international standards (ISO, IEEE), and provide localization in 15+ languages. Our team works in different time zones to ensure 24/7 support.",
      category: "Global Operations"
    },
    {
      question: "What pricing models do you offer?",
      answer: "We offer flexible pricing models: Time & Materials (hourly billing), Fixed Price (fixed price), and Dedicated Team (dedicated team). For enterprise projects, subscription models with monthly/annual payment are available. All prices are transparent, with no hidden fees, and scalable.",
      category: "Pricing"
    },
    {
      question: "How do you ensure data security?",
      answer: "We apply multi-level protection: data encryption at rest and in transit (AES-256), two-factor authentication, regular security audits, penetration testing, compliance with international standards (ISO 27001, SOC 2), and strict access policies. All employees undergo regular security training.",
      category: "Security"
    }
  ];

  const teamData = [
    {
      name: "Dr. Alexander Chen",
      position: "Chief Technology Officer",
      expertise: "AI/ML, Blockchain, Enterprise Architecture",
      experience: "15+ years",
      education: "PhD Computer Science, MIT",
      achievements: ["Led 50+ enterprise projects", "Published 25+ research papers", "15 patents in AI/ML"],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Maria Rodriguez",
      position: "Head of Product Development",
      expertise: "Product Strategy, UX/UI, Agile Methodologies",
      experience: "12+ years",
      education: "MBA, Stanford University",
      achievements: ["Launched 30+ products", "Led 100+ person teams", "Expert in enterprise UX"],
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "David Kim",
      position: "Lead Solutions Architect",
      expertise: "Cloud Architecture, DevOps, Security",
      experience: "10+ years",
      education: "MS Computer Engineering, UC Berkeley",
      achievements: ["Architected 40+ cloud solutions", "AWS Solutions Architect", "Security expert"],
      image: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const certifications = [
    { name: "ISO 27001", description: "Information Security Management", year: "2023" },
    { name: "SOC 2 Type II", description: "Security, Availability, Processing Integrity", year: "2023" },
    { name: "AWS Advanced Consulting Partner", description: "Cloud Solutions Expertise", year: "2022" },
    { name: "Microsoft Gold Partner", description: "Application Development", year: "2022" },
    { name: "Google Cloud Partner", description: "Infrastructure & Analytics", year: "2021" }
  ];

  const technologies = {
    frontend: ["React", "Vue.js", "Angular", "TypeScript", "Next.js", "Nuxt.js"],
    backend: ["Node.js", "Python", "Java", "C#", "Go", "Rust"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Oracle", "Cassandra"],
    cloud: ["AWS", "Azure", "GCP", "DigitalOcean", "Heroku"],
    devops: ["Docker", "Kubernetes", "Terraform", "Jenkins", "GitLab CI/CD"],
    ai_ml: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "Hugging Face"],
    blockchain: ["Ethereum", "Polygon", "Solana", "Solidity", "Web3.js"]
  };

  const developmentProcess = {
    methodology: "Agile/Scrum with DevOps",
    phases: [
      {
        name: "Discovery & Planning",
        duration: "2-4 weeks",
        activities: ["Requirements gathering", "Technical architecture", "Project planning", "Risk assessment"]
      },
      {
        name: "Design & Prototyping",
        duration: "3-6 weeks",
        activities: ["UI/UX design", "Technical design", "Prototype development", "Stakeholder feedback"]
      },
      {
        name: "Development",
        duration: "8-24 weeks",
        activities: ["Sprint development", "Code review", "Testing", "Continuous integration"]
      },
      {
        name: "Testing & QA",
        duration: "2-4 weeks",
        activities: ["Unit testing", "Integration testing", "User acceptance testing", "Performance testing"]
      },
      {
        name: "Deployment & Launch",
        duration: "1-2 weeks",
        activities: ["Production deployment", "User training", "Documentation", "Go-live support"]
      }
    ],
    tools: {
      project_management: ["Jira", "Confluence", "Trello", "Asana"],
      version_control: ["Git", "GitHub", "GitLab", "Bitbucket"],
      ci_cd: ["Jenkins", "GitLab CI/CD", "GitHub Actions", "CircleCI"],
      monitoring: ["New Relic", "Datadog", "Grafana", "Prometheus"]
    }
  };

  const industryExpertise = [
    {
      industry: "Financial Services",
      experience: "8+ years",
      projects: 45,
      solutions: ["Risk Management", "Compliance Systems", "Trading Platforms", "Payment Processing"],
      clients: ["Banks", "Insurance Companies", "Investment Firms", "Fintech Startups"]
    },
    {
      industry: "Healthcare",
      experience: "6+ years",
      projects: 32,
      solutions: ["Electronic Health Records", "Telemedicine Platforms", "Medical Analytics", "Patient Management"],
      clients: ["Hospitals", "Clinics", "Pharmaceutical Companies", "Health Tech"]
    },
    {
      industry: "Manufacturing",
      experience: "7+ years",
      projects: 38,
      solutions: ["Supply Chain Management", "IoT Integration", "Quality Control", "Predictive Maintenance"],
      clients: ["Automotive", "Electronics", "Food & Beverage", "Chemical"]
    },
    {
      industry: "Retail & E-commerce",
      experience: "9+ years",
      projects: 52,
      solutions: ["E-commerce Platforms", "Inventory Management", "Customer Analytics", "Omnichannel Solutions"],
      clients: ["Online Retailers", "Brick & Mortar", "Marketplaces", "Fashion Brands"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden relative">
      {/* Premium Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Ultra Dynamic Grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(${time * 20}deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(${90 + time * 15}deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px),
              linear-gradient(${45 + time * 10}deg, rgba(236, 72, 153, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 80px 80px, 100px 100px',
            transform: `translate(${Math.sin(time * 0.5) * 50}px, ${Math.cos(time * 0.3) * 30}px) scale(${1 + Math.sin(time * 0.2) * 0.1})`
          }}
        />
        
        {/* Floating Data Streams */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`stream-${i}`}
            className="absolute opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i * 15) % 60}%`,
              transform: `translateY(${Math.sin(time * 0.8 + i) * 100}px) rotate(${time * 30 + i * 45}deg)`,
              width: '2px',
              height: '60px',
              background: `linear-gradient(${time * 50 + i * 60}deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.6), transparent)`
            }}
          />
        ))}
        
        {/* Pulsing Nodes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="absolute rounded-full border-2"
            style={{
              left: `${15 + (i * 7) % 70}%`,
              top: `${15 + (i * 9) % 70}%`,
              width: `${8 + Math.sin(time * 2 + i) * 4}px`,
              height: `${8 + Math.sin(time * 2 + i) * 4}px`,
              borderColor: `rgba(59, 130, 246, ${0.3 + Math.sin(time * 3 + i) * 0.3})`,
              transform: `translate(${Math.sin(time * 0.4 + i) * 40}px, ${Math.cos(time * 0.6 + i) * 40}px) scale(${1 + Math.sin(time * 1.5 + i) * 0.5})`,
              boxShadow: `0 0 ${10 + Math.sin(time * 2 + i) * 10}px rgba(59, 130, 246, 0.4)`
            }}
          />
        ))}
        
        {/* Sophisticated grid pattern */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: `${80 + Math.sin(time * 0.5) * 20}px ${80 + Math.cos(time * 0.3) * 20}px`,
            transform: `translate(${Math.sin(time * 0.2) * 30}px, ${Math.cos(time * 0.15) * 30}px) rotate(${time * 2}deg)`
          }}
        />
        
        {/* Premium gradient overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse at ${mousePosition.x * 0.1 + Math.sin(time * 0.5) * 10}% ${mousePosition.y * 0.1 + Math.cos(time * 0.3) * 10}%, rgba(59, 130, 246, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse at ${100 - mousePosition.x * 0.05 + Math.sin(time * 0.7) * 15}% ${100 - mousePosition.y * 0.05 + Math.cos(time * 0.4) * 15}%, rgba(147, 51, 234, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at ${50 + Math.sin(time * 0.3) * 20}% ${50 + Math.cos(time * 0.2) * 20}%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              linear-gradient(${time * 10}deg, rgba(59, 130, 246, 0.08), rgba(147, 51, 234, 0.08), rgba(236, 72, 153, 0.05))
            `
          }}
        />
        
        {/* Enhanced floating tech elements */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${10 + (i * 9) % 80}%`,
              transform: `
                translate(${Math.sin(time * 0.3 + i) * 50}px, ${Math.cos(time * 0.4 + i) * 40}px) 
                rotate(${time * 20 + i * 30}deg)
                scale(${1 + Math.sin(time * 1.2 + i) * 0.3})
              `,
              filter: `hue-rotate(${time * 30 + i * 20}deg)`
            }}
          >
            <div className={`w-${3 + i % 3} h-${3 + i % 3} border-2 ${
              i % 3 === 0 ? 'border-blue-400/60 rounded-none' : 
              i % 3 === 1 ? 'border-purple-400/60 rounded-full' : 
              'border-pink-400/60 rounded-lg'
            }`} style={{
              boxShadow: `0 0 ${5 + Math.sin(time * 2 + i) * 5}px currentColor`
            }} />
          </div>
        ))}
        
        {/* Animated Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" style={{ transform: `rotate(${time * 5}deg)` }}>
          {[...Array(6)].map((_, i) => (
            <g key={`circuit-${i}`}>
              <path
                d={`M ${20 + i * 150} ${100 + Math.sin(time + i) * 50} Q ${200 + i * 100} ${200 + Math.cos(time * 0.5 + i) * 100} ${400 + i * 80} ${300 + Math.sin(time * 0.3 + i) * 80}`}
                stroke={`rgba(${59 + i * 20}, ${130 + i * 15}, 246, 0.6)`}
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                strokeDashoffset={time * 20 + i * 10}
              />
              <circle
                cx={20 + i * 150 + Math.sin(time * 0.5 + i) * 30}
                cy={100 + Math.sin(time + i) * 50}
                r={3 + Math.sin(time * 2 + i) * 2}
                fill={`rgba(${59 + i * 20}, ${130 + i * 15}, 246, 0.8)`}
                style={{ filter: `drop-shadow(0 0 ${5 + Math.sin(time * 3 + i) * 3}px currentColor)` }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-white">
                anteyko<span className="text-blue-400">Labs</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Solutions', id: 'solutions' },
                { name: 'Products', id: 'products' },
                { name: 'Cases', id: 'cases' },
                { name: 'About', id: 'about' },
                { name: 'FAQ', id: 'faq' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.id 
                      ? 'text-blue-400' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-slate-300 hover:text-white transition-colors duration-300">
                Login
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Enterprise Software Solutions
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in-up">
                  Build the Future with
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">Premium Software</span>
                </h1>
                
                <p className="text-xl text-slate-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  We deliver enterprise-grade software solutions that transform businesses. 
                  From blockchain platforms to AI-powered systems.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:rotate-1 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </button>
                
                <button className="group border border-slate-600 hover:border-blue-400 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-600/10 hover:scale-105 hover:-rotate-1 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="flex justify-center mb-2 text-blue-400 group-hover:text-purple-400 transition-colors duration-300 group-hover:scale-110 transform">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{stat.number}</div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:rotate-1 group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  
                  <div className="space-y-3 font-mono text-sm">
                    <div className="text-blue-400 animate-typing">$ npm install @anteyko/enterprise-suite</div>
                    <div className="text-green-400 animate-fade-in-up" style={{ animationDelay: '1s' }}>✓ Blockchain integration ready</div>
                    <div className="text-green-400 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>✓ AI/ML modules loaded</div>
                    <div className="text-green-400 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>✓ Enterprise security enabled</div>
                    <div className="text-yellow-400 animate-fade-in-up" style={{ animationDelay: '1.6s' }}>→ Starting development server...</div>
                    <div className="text-white animate-fade-in-up" style={{ animationDelay: '1.8s' }}>🚀 Your enterprise solution is ready!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive software solutions designed for modern enterprises
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="group bg-slate-800/50 backdrop-blur-xl p-8 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${solution.gradient} rounded-lg flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-float`} style={{ animationDelay: `${index * 0.2}s` }}>
                  {solution.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {solution.title}
                </h3>
                
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {solution.description}
                </p>
                
                <div className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-slate-800/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Products
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Ready-to-deploy software products for immediate business impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div 
                key={index}
                className="group bg-slate-800/60 backdrop-blur-xl rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-500 transform hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  
                  <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${product.gradient} rounded-full text-white font-medium text-sm`}>
                    {product.category}
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold text-sm">
                    {product.price}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-sm text-slate-300">
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                      Learn More
                    </button>
                    <button className="px-4 py-2 border border-slate-600 hover:border-blue-400 rounded-lg font-medium transition-all duration-300 hover:bg-blue-600/10">
                      Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Real results from real clients who transformed their business with our solutions
            </p>
          </div>
          
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative">
                    <img 
                      src={study.image} 
                      alt={study.project}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-xl"></div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="space-y-6">
                    <div>
                      <div className="text-blue-400 font-medium mb-2">{study.client}</div>
                      <h3 className="text-2xl font-bold mb-4">{study.project}</h3>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        {study.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                      {Object.entries(study.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{value}</div>
                          <div className="text-sm text-slate-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {study.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm border border-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-xl font-bold text-green-400">
                      Result: {study.result}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose anteykoLabs?
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                  We're not just developers – we're your technology partners. With years of experience 
                  in enterprise software development, we understand what it takes to build solutions that scale.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Brain className="w-6 h-6" />,
                    title: "AI-Powered Solutions",
                    description: "Leverage cutting-edge AI and machine learning in every project"
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: "Enterprise Security",
                    description: "Bank-level security standards and compliance built-in"
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Rapid Deployment",
                    description: "Get to market faster with our proven development methodologies"
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: "24/7 Support",
                    description: "Dedicated support team available around the clock"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">127+</div>
                    <div className="text-slate-400">Projects Completed</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">23+</div>
                      <div className="text-sm text-slate-400">Enterprise Clients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                      <div className="text-sm text-slate-400">Uptime</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">24/7</div>
                      <div className="text-sm text-slate-400">Support</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">5★</div>
                      <div className="text-sm text-slate-400">Client Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Answers to common questions about our services and approach
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="text-blue-400 transition-transform duration-300">
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                <div className={`transition-all duration-500 ease-in-out ${
                  openFaq === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <div className="px-6 pb-6">
                    <p className="text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Let's discuss your project and see how we can help transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-slate-800/60 backdrop-blur-xl p-8 rounded-xl border border-slate-700">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  {/* Success/Error Message */}
                  {submitMessage && (
                    <div className={`p-4 rounded-lg ${
                      submitMessage.type === 'success' 
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                        : 'bg-red-500/20 border border-red-500/50 text-red-400'
                    }`}>
                      {submitMessage.text}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        value={contactForm.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-400 focus:outline-none transition-all duration-300 text-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        value={contactForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-400 focus:outline-none transition-all duration-300 text-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Company
                    </label>
                    <input 
                      type="text" 
                      value={contactForm.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-400 focus:outline-none transition-all duration-300 text-white"
                      placeholder="Enter your company name (optional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Project Details *
                    </label>
                    <textarea 
                      rows={4}
                      value={contactForm.projectDetails}
                      onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-400 focus:outline-none transition-all duration-300 text-white resize-none"
                      placeholder="Tell us about your project requirements, timeline, and budget..."
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      isSubmitting 
                        ? 'bg-slate-600 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                { 
                  icon: <Mail className="w-6 h-6" />, 
                  title: "Email Us", 
                  info: "labs@anteyko.com",
                  description: "Get in touch for project inquiries"
                },
                { 
                  icon: <MapPin className="w-6 h-6" />, 
                  title: "Visit Us", 
                  info: "Bishkek, Kyrgyzstan",
                  description: "Our headquarters location"
                }
              ].map((contact, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-xl p-6 rounded-xl border border-slate-700">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{contact.title}</h3>
                      <p className="text-blue-400 font-medium mb-1">{contact.info}</p>
                      <p className="text-sm text-slate-400">{contact.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-xl font-bold text-white mb-4">
                anteyko<span className="text-blue-400">Labs</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Building the future through innovative enterprise software solutions. 
                Transform your business with our cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
                  <Network className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Solutions</h3>
              <div className="space-y-2 text-slate-400">
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Asset Tokenization</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Accounting Systems</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Restaurant Management</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Business Intelligence</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <div className="space-y-2 text-slate-400">
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">About Us</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Careers</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Contact</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Support</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-500">
              © 2025 anteykoLabs. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;