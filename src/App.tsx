import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, CheckCircle, Star, Hand } from 'lucide-react';

// Intersection Observer hook for animations
const useIntersectionObserver = (options = {}) => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, { threshold: 0.1, ...options });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options, hasIntersected]);

  return [setElement, hasIntersected] as const;
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [showContentFade, setShowContentFade] = useState(false);

  // Section animation refs
  const [setHeroRef, heroAnimated] = useIntersectionObserver();
  const [setAboutRef, aboutAnimated] = useIntersectionObserver();
  const [setWorkRef, workAnimated] = useIntersectionObserver();
  const [setEducationRef, educationAnimated] = useIntersectionObserver();
  const [setTechnicalRef, technicalAnimated] = useIntersectionObserver();
  const [setSkillsRef, skillsAnimated] = useIntersectionObserver();
  const [setContactRef, contactAnimated] = useIntersectionObserver();

  useEffect(() => {
    // Submit Netlify form on page load
    const submitVisitorForm = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;

        const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const geoData = await geoResponse.json();
        const country = geoData.country_name || 'Unknown';

        const formData = new FormData();
        formData.append('form-name', 'visitor-tracking');
        formData.append('ip-address', ipAddress);
        formData.append('country', country);

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    };

    submitVisitorForm();

    // Intro sequence timing
    const introSequence = [
      { delay: 0, step: 0 },    // qa engineer
      { delay: 1500, step: 1 }, // software tester
      { delay: 3000, step: 2 }, // automation expert
      { delay: 4500, step: 3 }  // loading dots
    ];

    introSequence.forEach(({ delay, step }) => {
      setTimeout(() => setIntroStep(step), delay);
    });

    // Trigger content fade and split screen animation
    setTimeout(() => setShowContentFade(true), 5500);
    setTimeout(() => setShowSplitScreen(true), 6000);

    // Hide intro and show main content
    setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setIsLoaded(true), 100);
    }, 8000);

    const handleScroll = () => {
      if (showIntro) return;
      
      const sections = ['home', 'about', 'work', 'technical', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showIntro]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const technicalSkills = [
    "Test Automation",
    "API Testing", 
    "Performance Testing",
    "Security Testing",
    "Mobile Testing",
    "CI/CD Integration",
    "Test Planning"
  ];

  const workExperiences = [
    {
      company: "TechFlow Solutions",
      position: "QA Engineering Intern",
      period: "2019 - 2020",
      description: "Gained foundational experience in software testing methodologies, automated testing tools, and quality assurance processes."
    },
    {
      company: "Flutterwave",
      position: "Senior Quality Assurance Engineer",
      period: "2020 - Present",
      description: "Leading comprehensive testing strategies for fintech solutions, ensuring payment systems meet highest quality standards across multiple markets."
    },
    {
      company: "CyberSecure Tech",
      position: "Lead QA Engineer",
      period: "2025 - Present",
      description: "Spearheading quality assurance initiatives for cybersecurity products, implementing advanced testing frameworks and mentoring junior engineers."
    }
  ];

  const skills = [
    "Critical Thinking",
    "Attention to Detail",
    "Problem Solving",
    "Team Collaboration",
    "Communication",
    "Adaptability",
    "Time Management",
    "Mentoring"
  ];

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Split Screen Panels - TV Off Effect */}
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${showSplitScreen ? 'scale-x-0' : 'scale-x-100'}`}>
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-black"></div>
        </div>
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out delay-100 ${showSplitScreen ? 'scale-x-0' : 'scale-x-100'}`}>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-black"></div>
        </div>
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out delay-200 ${showSplitScreen ? 'scale-y-0' : 'scale-y-100'}`}>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-black"></div>
        </div>
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out delay-300 ${showSplitScreen ? 'scale-0' : 'scale-100'}`}>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-black"></div>
        </div>

        {/* Content overlay */}
        <div className={`absolute inset-0 bg-black text-white flex items-center justify-center transition-opacity duration-1000 ${showContentFade ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center max-w-6xl px-6 md:px-20 lg:px-32">
            <div className="flex flex-wrap items-center justify-center">
              {/* Step 0: QA Engineer */}
              <div className={`transition-all duration-1000 ${introStep >= 0 ? 'opacity-100 -translate-y-4' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '600'}}>QA ENGINEER</h1>
              </div>

              {/* Comma separator */}
              <div className={`transition-all duration-1000 ${introStep >= 0 ? 'opacity-100 -translate-y-4' : 'opacity-0 translate-y-8'}`}>
                <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-red-400 mr-2">,</span>
              </div>

              {/* Step 1: Software Tester */}
              <div className={`transition-all duration-1000 delay-300 ${introStep >= 1 ? 'opacity-100 -translate-y-4' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-pulse" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '600'}}>SOFTWARE TESTER</h2>
              </div>

              {/* Comma separator */}
              <div className={`transition-all duration-1000 delay-300 ${introStep >= 1 ? 'opacity-100 -translate-y-4' : 'opacity-0 translate-y-8'}`}>
                <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-red-400 mr-2">,</span>
              </div>

              {/* Step 2: Automation Expert */}
              <div className={`transition-all duration-1000 delay-600 ${introStep >= 2 ? 'opacity-100 -translate-y-4' : 'opacity-0 translate-y-8'}`}>
                <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '600'}}>AUTOMATION EXPERT</h3>
              </div>
            </div>

            {/* Step 3: Loading dots */}
            <div className={`transition-all duration-500 absolute bottom-20 left-1/2 transform -translate-x-1/2 ${introStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex justify-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-700 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-red-600 to-red-800 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-700 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <style jsx global>{`
        * {
          font-family: 'Poppins', sans-serif;
        }

        .gradient-red {
          background: linear-gradient(135deg, #dc2626, #ea580c, #b91c1c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-red-subtle {
          background: linear-gradient(135deg, #f87171, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-red-orange {
          background: linear-gradient(135deg, #dc2626, #f97316, #dc2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .border-gradient {
          border-image: linear-gradient(135deg, #dc2626, #f97316) 1;
        }

        .bg-gradient-red {
          background: linear-gradient(135deg, #dc2626, #f97316);
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
        }

        .wave-animation {
          animation: wave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 to-red-50/95 backdrop-blur-md border-b border-red-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`text-xl font-bold transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <a href="#home" onClick={() => scrollToSection('home')} className="gradient-red cursor-pointer hover:opacity-80 transition-opacity">Osho.</a>
          </div>
          <div className={`flex space-x-8 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <button
              onClick={() => scrollToSection('about')}
              className={`px-4 py-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-medium ${activeSection === 'about' ? 'bg-red-100 text-red-700' : 'text-gray-700'}`}
            >
              about
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-4 py-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-medium ${activeSection === 'contact' ? 'bg-red-100 text-red-700' : 'text-gray-700'}`}
            >
              contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center px-6 relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50" ref={setHeroRef}>
        <div className="max-w-4xl w-full">
          {/* Wave Animation */}
          <div className={`text-6xl mb-12 mt-32 sm:mt-36 md:mt-28 lg:mt-24 transition-all duration-1000 delay-500 ${isLoaded && heroAnimated ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <span className="wave-animation">👋</span>
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-8 transition-all duration-1000 delay-700 ${isLoaded && heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Hey there, my<br />
            name is Osho, <span className="gradient-red">quality assurance</span><br />
            <span className="gradient-red">engineer</span> and <span className="gradient-red">testing specialist</span>.
          </h1>

          <p className={`text-lg md:text-xl max-w-2xl leading-relaxed mb-8 text-gray-700 transition-all duration-1000 delay-1000 ${isLoaded && heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            I ensure software excellence by connecting development teams with their users through
            comprehensive testing strategies. I specialize in automation, performance testing, and quality assurance
            processes that help deliver <span className="gradient-red-subtle font-semibold">bug-free, reliable applications</span>.
          </p>

          <div className={`transition-all duration-1000 delay-1200 ${isLoaded && heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a
              href="mailto:oshioke@adolphus.com"
              className="text-black border-b-2 border-gradient hover:border-red-400 hover:gradient-red-subtle transition-all duration-300 pb-1"
            >
              oshioke@adolphus.com
            </a>
          </div>

          {/* Floating elements */}
          <div className="hidden md:block absolute top-1/4 right-10 w-20 h-20 border border-red-200 rounded-full animate-pulse opacity-30"></div>
          <div className="absolute bottom-1/4 left-10 w-12 h-12 bg-gradient-red rounded-full animate-bounce opacity-20"></div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown
            className={`w-6 h-6 animate-bounce cursor-pointer hover:text-red-500 transition-colors ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => scrollToSection('about')}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 px-6 bg-gradient-to-br from-red-50 to-orange-50 flex items-center" ref={setAboutRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center transition-all duration-1000 ${aboutAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="gradient-red-orange">About</span>
          </h2>

          {/* Brief Intro */}
          <div className={`mb-16 transition-all duration-1000 delay-200 ${aboutAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-white shadow-2xl max-w-4xl mx-auto px-6 md:px-12 lg:px-16" style={{boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.8)'}}>
              <p className="text-lg leading-relaxed text-gray-700 text-center">
                As a dedicated <span className="gradient-red-subtle font-semibold">Quality Assurance Engineer</span> with over 5 years of experience, I specialize in
                ensuring software reliability, performance, and user satisfaction. My expertise spans across
                automated testing, API validation, performance optimization, and comprehensive test strategy development.
                I am passionate about bridging the gap between technical excellence and user experience, ensuring every release meets the highest standards.
                My approach combines meticulous attention to detail with strategic thinking to identify potential issues before they impact end users.
                I thrive in collaborative environments where quality is a shared responsibility, and I continuously seek to improve testing processes and methodologies.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Work Experience & Education Section */}
      <section id="work" className="min-h-screen py-20 px-6 bg-gradient-to-br from-white to-red-50 flex items-center" ref={setWorkRef}>
        <div className="max-w-6xl mx-auto">
          {/* Work History */}
          <div className={`mb-20 transition-all duration-1000 ${workAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-red-500" />
              <span className="gradient-red-subtle">Work Experience</span>
            </h3>
            <div className="space-y-6">
              {workExperiences.map((experience, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg border border-red-100 hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1 mx-4 md:mx-8 lg:mx-12 ${workAnimated ? 'animate-fade-in-scale' : 'opacity-0'}`}
                  style={{boxShadow: '0 10px 20px -5px rgba(220, 38, 38, 0.15), 0 6px 8px -4px rgba(220, 38, 38, 0.1)', animationDelay: `${index * 200}ms`}}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h4 className="text-xl font-semibold gradient-red-subtle">{experience.position}</h4>
                    <div className="flex items-center text-gray-600 mt-1 md:mt-0">
                      <Calendar className="w-4 h-4 mr-2" />
                      {experience.period}
                    </div>
                  </div>
                  <h5 className="text-lg font-medium text-gray-700 mb-3">{experience.company}</h5>
                  <p className="text-gray-600">{experience.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className={`transition-all duration-1000 ${educationAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} ref={setEducationRef}>
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-red-500" />
              <span className="gradient-red-subtle">Education</span>
            </h3>
            <div className="space-y-6">
              <div className={`bg-white p-6 rounded-lg border border-red-100 hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1 mx-4 md:mx-8 lg:mx-12 ${educationAnimated ? 'animate-fade-in-scale' : 'opacity-0'}`} style={{boxShadow: '0 10px 20px -5px rgba(220, 38, 38, 0.15), 0 6px 8px -4px rgba(220, 38, 38, 0.1)', animationDelay: '200ms'}}>
                <h4 className="text-xl font-semibold mb-2 gradient-red-subtle">MSc Information Technology (Distinction)</h4>
                <h5 className="text-lg font-medium text-gray-700 mb-2">University of Derby, United Kingdom</h5>
                <p className="text-gray-600">Advanced studies in information systems, software engineering, and technology management.</p>
              </div>

              <div className={`bg-white p-6 rounded-lg border border-red-100 hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1 mx-4 md:mx-8 lg:mx-12 ${educationAnimated ? 'animate-fade-in-scale' : 'opacity-0'}`} style={{boxShadow: '0 10px 20px -5px rgba(220, 38, 38, 0.15), 0 6px 8px -4px rgba(220, 38, 38, 0.1)', animationDelay: '400ms'}}>
                <h4 className="text-xl font-semibold mb-2 gradient-red-subtle">BSc Computer Science</h4>
                <h5 className="text-lg font-medium text-gray-700 mb-2">Babcock University, Nigeria</h5>
                <p className="text-gray-600">Comprehensive foundation in computer science principles, programming, and software development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="technical" className="min-h-screen py-20 px-6 bg-gradient-to-br from-red-50 to-orange-50 flex items-center overflow-hidden" ref={setTechnicalRef}>
        <div className="max-w-7xl mx-auto w-full">
          <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center transition-all duration-1000 ${technicalAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="gradient-red-orange">Technical Skills</span>
          </h2>

          <div className="flex items-center justify-center">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-24 xl:gap-32 items-center justify-center max-w-6xl w-full">
              {/* Central Circle with radiating lines */}
              <div className={`flex justify-center transition-all duration-1000 delay-200 ${technicalAnimated ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} relative`}>
                <div className="relative flex items-center">
                  {/* Connection Lines - radiating from circle */}
                  <div className="absolute left-full ml-0 hidden md:block">
                    <svg width="200" height="300" viewBox="0 0 200 300" className={`transition-all duration-1000 delay-400 ${technicalAnimated ? 'opacity-100' : 'opacity-0'}`}>
                      <line x1="0" y1="150" x2="200" y2="20" stroke="url(#gradient1)" strokeWidth="2"/>
                      <line x1="0" y1="150" x2="200" y2="62" stroke="url(#gradient1)" strokeWidth="2"/>
                      <line x1="0" y1="150" x2="200" y2="104" stroke="url(#gradient1)" strokeWidth="2"/>
                      <line x1="0" y1="150" x2="200" y2="146" stroke="url(#gradient1)" strokeWidth="2"/>
                      <line x1="0" y1="150" x2="200" y2="188" stroke="url(#gradient1)" strokeWidth="2"/>
                      <line x1="0" y1="150" x2="200" y2="230" stroke="url(#gradient1)" strokeWidth="2"/>
                      <line x1="0" y1="150" x2="200" y2="272" stroke="url(#gradient1)" strokeWidth="2"/>
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f87171" />
                          <stop offset="100%" stopColor="#fb923c" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center relative shadow-2xl z-10">
                    <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" />
                  </div>
                </div>
              </div>

              {/* Skills Side */}
              <div className="space-y-3 md:space-y-4 w-full md:w-auto max-w-md">
                {technicalSkills.map((skill, index) => (
                  <div
                    key={index}
                    className={`p-3 md:p-4 bg-white border-2 border-red-200 rounded-lg shadow-md transition-all duration-700 hover:shadow-xl hover:border-red-400 hover:bg-red-50 ${technicalAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                  >
                    <span className="font-medium text-sm sm:text-base md:text-lg text-gray-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soft Skills Section */}
      <section id="skills" className="min-h-screen py-20 px-6 bg-gradient-to-br from-white to-red-50 flex items-center overflow-hidden" ref={setSkillsRef}>
        <div className="max-w-7xl mx-auto w-full">
          <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center transition-all duration-1000 ${skillsAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="gradient-red-orange">Soft Skills</span>
          </h2>

          <div className="flex items-center justify-center">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-24 xl:gap-32 items-center justify-center max-w-6xl w-full">
              {/* Central Circle with radiating lines */}
              <div className={`flex justify-center transition-all duration-1000 delay-200 ${skillsAnimated ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} relative`}>
                <div className="relative flex items-center">
                  {/* Connection Lines - radiating from circle to each skill */}
                  <div className="absolute left-full ml-0 hidden md:block">
                    <svg width="200" height="350" viewBox="0 0 200 350" className={`transition-all duration-1000 delay-400 ${skillsAnimated ? 'opacity-100' : 'opacity-0'}`}>
                      <line x1="0" y1="175" x2="200" y2="20" stroke="url(#gradient2)" strokeWidth="2"/>
                      <line x1="0" y1="175" x2="200" y2="62" stroke="url(#gradient2)" strokeWidth="2"/>
                      <line x1="0" y1="175" x2="200" y2="104" stroke="url(#gradient2)" strokeWidth="2"/>
                      <line x1="0" y1="175" x2="200" y2="146" stroke="url(#gradient2)" strokeWidth="2"/>
                      <line x1="0" y1="175" x2="200" y2="188" stroke="url(#gradient2)" strokeWidth="2"/>
                      <line x1="0" y1="175" x2="200" y2="230" stroke="url(#gradient2)" strokeWidth="2"/>
                      <line x1="0" y1="175" x2="200" y2="272" stroke="url(#gradient2)" strokeWidth="2"/>
                      <line x1="0" y1="175" x2="200" y2="314" stroke="url(#gradient2)" strokeWidth="2"/>
                      <defs>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#fb923c" />
                          <stop offset="100%" stopColor="#f87171" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center relative shadow-2xl z-10">
                    <Star className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" />
                  </div>
                </div>
              </div>

              {/* Skills Side */}
              <div className="space-y-3 md:space-y-4 w-full md:w-auto max-w-md">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`p-3 md:p-4 bg-white border-2 border-orange-200 rounded-lg shadow-md transition-all duration-700 hover:shadow-xl hover:border-orange-400 hover:bg-orange-50 ${skillsAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                  >
                    <span className="font-medium text-sm sm:text-base md:text-lg text-gray-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-6 bg-gradient-to-br from-white to-red-50 flex items-center" ref={setContactRef}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-16 transition-all duration-1000 ${contactAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="gradient-red-orange">Let's Connect</span>
          </h2>

          <div className={`grid md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-200 ${contactAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-red-200">
              <Mail className="w-8 h-8 mx-auto mb-4 text-red-500" />
              <h3 className="font-semibold mb-2 gradient-red-subtle">Email</h3>
              <a
                href="mailto:oshioke@adolphus.com"
                className="text-gray-600 hover:text-red-600 transition-all duration-300"
              >
                oshioke@adolphus.com
              </a>
            </div>

            <div className="p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-red-200">
              <Phone className="w-8 h-8 mx-auto mb-4 text-red-500" />
              <h3 className="font-semibold mb-2 gradient-red-subtle">Phone</h3>
              <a
                href="tel:+2348123456789"
                className="text-gray-600 hover:text-red-600 transition-all duration-300"
              >
                +1 (609) 222-6789
              </a>
            </div>

            <div className="p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-red-200">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-red-500" />
              <h3 className="font-semibold mb-2 gradient-red-subtle">Location</h3>
              <p className="text-gray-600">Ontario, Canada</p>
            </div>
          </div>

          <p className={`text-lg text-gray-600 mb-8 transition-all duration-1000 delay-400 ${contactAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Ready to ensure your software meets the <span className="gradient-red-subtle font-semibold">highest quality standards</span>? Let's discuss how we can work together.
          </p>

          <a href="mailto:oshioke.adolphus@example.com" className={`inline-block bg-gradient-red text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 font-medium hover:scale-105 transition-all duration-1000 delay-600 ${contactAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 to-orange-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-300">© 2025 <span className="gradient-red-subtle">Oshioke Christopher Adolphus</span>. All rights reserved.</p>
        </div>
      </footer>

      {/* Hidden Netlify Form */}
      <form name="visitor-tracking" netlify netlify-honeypot="bot-field" hidden>
        <input type="text" name="ip-address" />
        <input type="text" name="country" />
      </form>
    </div>
  );
}

export default App;