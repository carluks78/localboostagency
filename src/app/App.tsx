import { useState, useEffect, useRef } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Menu, X, Phone, Mail, MapPin, Star, TrendingUp, Users, Target, CheckCircle, MessageCircle, AlertTriangle, Search, Eye, FileText, Zap, Wrench, UtensilsCrossed, Car, ShoppingBag, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    typeEntreprise: '',
    site: "",
    message: ''
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    gsap.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out'
    });

    // Floating animation for badges
    gsap.to('.floating-badge', {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.15,
        from: 'start'
      }
    });

    // Problem cards animation
    gsap.from('.problem-card', {
      scrollTrigger: {
        trigger: problemsRef.current,
        start: 'top 75%',
      },
      opacity: 0,
      scale: 0.9,
      y: 60,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    });

    // Solution steps animation
    gsap.from('.solution-step', {
      scrollTrigger: {
        trigger: solutionsRef.current,
        start: 'top 75%',
      },
      opacity: 0,
      x: -80,
      duration: 0.9,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Offers animation
    const offerCards = document.querySelectorAll('#offre .group');
    if (offerCards.length > 0) {
      gsap.from(offerCards, {
        scrollTrigger: {
          trigger: '#offre',
          start: 'top 70%',
        },
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.1)'
      });
    }

    // Stats counter animation
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach((element) => {
      const target = element.getAttribute('data-target');
      if (target) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(element, {
              innerText: target,
              duration: 2.5,
              snap: { innerText: 1 },
              ease: 'power2.out'
            });
          }
        });
      }
    });

    // Parallax effects
    gsap.to('.parallax-slow', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      },
      y: 150,
      ease: 'none'
    });

    gsap.to('.parallax-fast', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      },
      y: 250,
      ease: 'none'
    });

    // Subtle rotation animation for icons on scroll
    gsap.to('.icon-rotate', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2
      },
      rotation: 360,
      ease: 'none'
    });

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const messageText = `Demande d'audit gratuit - LocalBoost Agency

Nom: ${formData.nom}
Téléphone: ${formData.telephone}
Email: ${formData.email}
Type d'entreprise: ${formData.typeEntreprise}
Message: ${formData.message || 'Aucun message'}`;

    if (isMobile) {
      // Ouvrir l'application SMS sur mobile
      const smsBody = encodeURIComponent(messageText);
      window.location.href = `sms:0659841301?body=${smsBody}`;
    } else {
      // Ouvrir Gmail sur ordinateur
      const emailSubject = encodeURIComponent('Demande d\'audit gratuit - LocalBoost Agency');
      const emailBody = encodeURIComponent(messageText);
      window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=localboostagency.contact@gmail.com&su=${emailSubject}&body=${emailBody}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LocalBoost Agency</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#probleme" className="text-gray-700 hover:text-blue-600 transition">Le problème</a>
            <a href="#solution" className="text-gray-700 hover:text-blue-600 transition">La solution</a>
            <a href="#offre" className="text-gray-700 hover:text-blue-600 transition">Notre offre</a>
            <a href="#resultats" className="text-gray-700 hover:text-blue-600 transition">Résultats</a>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Audit gratuit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#probleme" onClick={() => setIsMenuOpen(false)} className="text-gray-700">Le problème</a>
              <a href="#solution" onClick={() => setIsMenuOpen(false)} className="text-gray-700">La solution</a>
              <a href="#offre" onClick={() => setIsMenuOpen(false)} className="text-gray-700">Notre offre</a>
              <a href="#resultats" onClick={() => setIsMenuOpen(false)} className="text-gray-700">Résultats</a>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full">Audit gratuit</Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl parallax-slow"></div>
          <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-purple-400 rounded-full opacity-10 blur-3xl parallax-fast"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400 rounded-full opacity-5 blur-3xl"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6"><span className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold border border-white/20">N°1 en Référencement Local</span>
            </div>

            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-tight">
              Plus de clients grâce à <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Google</span> et votre visibilité locale
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              LocalBoost Agency aide les entreprises locales à générer plus d'appels et de demandes clients grâce à une stratégie digitale optimisée.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-12 py-7 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all font-semibold">
                <a href="#contact" className="flex items-center gap-2">
                  Obtenir plus de clients
                  <TrendingUp className="w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-12 py-7 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold bg-[#ffffff2e]">
                <a href="#contact">Audit gratuit</a>
              </Button>
            </div>

            {/* Floating Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="floating-badge bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <MapPin className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="font-bold text-white text-sm">Google Maps</p>
              </div>
              <div className="floating-badge bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <Search className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="font-bold text-white text-sm">SEO Local</p>
              </div>
              <div className="floating-badge bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <Target className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="font-bold text-white text-sm">Conversion</p>
              </div>
              <div className="floating-badge bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <Zap className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="font-bold text-white text-sm">Résultats rapides</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section id="probleme" ref={problemsRef} className="py-20 bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Le problème
            </h2>
            <p className="text-2xl md:text-3xl text-red-600 font-semibold">
              Vos clients vous échappent sans que vous le sachiez
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="problem-card group">
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-red-400 transform hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Vous n'êtes pas visible sur Google</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Quand un client cherche votre service, il trouve vos concurrents en premier. Vous perdez des opportunités chaque jour.
                </p>
              </div>
            </div>

            <div className="problem-card group">
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-red-400 transform hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Vos concurrents prennent vos clients</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Chaque jour, des clients potentiels choisissent un concurrent mieux référencé que vous. Ils ne savent même pas que vous existez.
                </p>
              </div>
            </div>

            <div className="problem-card group">
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-red-400 transform hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Vous perdez des appels chaque jour</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Des dizaines de personnes cherchent votre service en ligne. Elles ne vous trouvent pas et appellent quelqu'un d'autre.
                </p>
              </div>
            </div>

            <div className="problem-card group">
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-red-400 transform hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Votre présence en ligne n'est pas optimisée</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Un profil Google incomplet ou un site mal conçu, c'est de l'argent qui s'envole. Vos clients vous jugent en 3 secondes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" ref={solutionsRef} className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              La solution
            </h2>
            <p className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
              Une stratégie simple pour attirer plus de clients
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            <div className="solution-step group">
              <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 hover:border-blue-400 transform hover:-translate-x-2">
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Optimisation Google Business Profile</h3>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                      Votre fiche Google complète, optimisée et conçue pour attirer les clics et les appels. Première impression irréprochable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="solution-step group">
              <div className="relative bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-purple-200 hover:border-purple-400 transform hover:-translate-x-2">
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Amélioration de la visibilité locale</h3>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                      Apparaissez en haut des résultats Google quand vos clients cherchent vos services. Soyez vu avant vos concurrents.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="solution-step group">
              <div className="relative bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-indigo-200 hover:border-indigo-400 transform hover:-translate-x-2">
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Présence digitale efficace</h3>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                      Un site web professionnel, rapide et optimisé pour convertir les visiteurs en clients. Design qui inspire confiance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="solution-step group">
              <div className="relative bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-green-200 hover:border-green-400 transform hover:-translate-x-2">
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                    04
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Système de conversion</h3>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                      Appel direct, WhatsApp, formulaire — on facilite au maximum la prise de contact. Transformez vos visiteurs en clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offre" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl parallax-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl parallax-fast"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Nos offres
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
              Des solutions adaptées à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Offre 1 - Fiche Google */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-blue-400 transform hover:-translate-y-3 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Fiche Google</h3>
                  <p className="text-gray-600">Optimisez votre présence sur Google Maps</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Création ou modification de votre fiche Google Business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Optimisation complète du profil</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Photos et descriptions optimisées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Configuration des horaires et services</span>
                  </li>
                </ul>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 group-hover:shadow-lg transition-shadow">
                  <a href="#contact">Choisir cette offre</a>
                </Button>
              </div>
            </div>

            {/* Offre 2 - SEO Google */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-purple-400 transform hover:-translate-y-3 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">SEO Google Maps</h3>
                  <p className="text-gray-600">Dominez les résultats de recherche locaux</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Tout de l'offre Fiche Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Optimisation SEO avancée de la fiche</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Stratégie de mots-clés locaux</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Gestion des avis clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Citations locales</span>
                  </li>
                </ul>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6 group-hover:shadow-lg transition-shadow">
                  <a href="#contact">Choisir cette offre</a>
                </Button>
              </div>
            </div>

            {/* Offre 3 - Pack Complet (Recommandé) */}
            <div className="group relative lg:-mt-4">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  RECOMMANDÉ
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl opacity-5"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border-4 border-gradient-to-br from-blue-500 to-purple-500 transform hover:-translate-y-3 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pack Complet</h3>
                  <p className="text-gray-600 font-semibold">La solution tout-en-un pour dominer votre marché</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Tout des offres précédentes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Création ou refonte de site internet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Optimisation SEO complète du site</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Référencement naturel (SEO)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Optimisation conversion maximale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Analyse concurrence approfondie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Suivi et rapports mensuels</span>
                  </li>
                </ul>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-7 shadow-xl group-hover:shadow-2xl transition-all font-semibold">
                  <a href="#contact">Choisir cette offre</a>
                </Button>

                <p className="text-center text-gray-500 mt-4 text-sm">
                  🚀 Meilleur rapport qualité-prix
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sans engagement · Réponse sous 24h · Audit gratuit pour toutes les offres
            </p>
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-600/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Pour qui ?
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
              Conçu pour les entreprises qui veulent plus de clients
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="group">
              <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-blue-400">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Wrench className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Artisans</h3>
                  <p className="text-gray-600 text-sm">Plombiers, électriciens, serruriers</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-orange-400">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <UtensilsCrossed className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Restaurants</h3>
                  <p className="text-gray-600 text-sm">Restaurants, snacks, traiteurs</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-purple-400">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Car className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Garages</h3>
                  <p className="text-gray-600 text-sm">Mécanique, carrosserie, pneus</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-green-400">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Taxis & VTC</h3>
                  <p className="text-gray-600 text-sm">Transport de personnes</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-pink-400">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <ShoppingBag className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Commerces locaux</h3>
                  <p className="text-gray-600 text-sm">Boutiques, salons, services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultats" ref={statsRef} className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Résultats
            </h2>
            <p className="text-2xl font-semibold">
              Des résultats concrets pour votre business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                <span className="stat-number" data-target="300">0</span>%
              </div>
              <h3 className="text-xl font-semibold mb-2">Plus d'appels clients</h3>
              <p className="text-blue-100">
                Vos clients vous trouvent et vous appellent directement depuis Google.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                <span className="stat-number" data-target="250">0</span>%
              </div>
              <h3 className="text-xl font-semibold mb-2">Plus de demandes de devis</h3>
              <p className="text-blue-100">
                Votre formulaire et WhatsApp génèrent des contacts qualifiés en continu.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-2">Top 3</div>
              <h3 className="text-xl font-semibold mb-2">Visibilité locale</h3>
              <p className="text-blue-100">
                Apparaissez dans les premiers résultats Google de votre ville.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                <span className="stat-number" data-target="40">0</span>%
              </div>
              <h3 className="text-xl font-semibold mb-2">Chiffre d'affaires</h3>
              <p className="text-blue-100">
                Plus de clients = plus de revenus. L'investissement se rentabilise rapidement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
<section
  id="contact"
  className="py-24 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden"
>
  {/* Background decorations (safe, no blocking clicks) */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl pointer-events-none" />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Passez à l'action
        </h2>

        <p className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold mb-4">
          Commencez à recevoir plus de clients dès maintenant
        </p>

        <p className="text-lg md:text-xl text-gray-600">
          Remplissez le formulaire et recevez votre audit gratuit sous 24h.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* FORM */}
        <div className="relative group">

  {/* overlay NON bloquant */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />

  <Card className="relative z-10 shadow-2xl border-2 border-gray-200 rounded-3xl">
    <CardContent className="pt-8 pb-8">

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();

          const msg = `Demande audit LocalBoost

Type: ${formData.typeEntreprise}
Nom: ${formData.nom}
Téléphone: ${formData.telephone}
Email: ${formData.email}
Site: ${formData.site || "Aucun"}  // 👈 AJOUT
Message: ${formData.message}`;

          const isMobile =
            /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

          if (isMobile) {
            window.location.href =
              `sms:+33659841301?body=${encodeURIComponent(msg)}`;
          } else {
            window.open(
              `mailto:localboostagency.contact@gmail.com?subject=${encodeURIComponent(
                "Demande d'audit gratuit"
              )}&body=${encodeURIComponent(msg)}`
            );
          }
        }}
      >

        {/* 🔥 DROPDOWN EN PREMIER */}
        <Select
          value={formData.typeEntreprise || ""}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              typeEntreprise: value,
            }))
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Type d'entreprise" />
          </SelectTrigger>

          <SelectContent position="popper">
            <SelectItem value="artisan">Artisan</SelectItem>
            <SelectItem value="restaurant">Restaurant</SelectItem>
            <SelectItem value="garage">Garage</SelectItem>
            <SelectItem value="taxi">Taxi / VTC</SelectItem>
            <SelectItem value="commerce">Commerce local</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>

        {/* NOM */}
        <Input
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Votre nom"
          required
          className="h-12"
        />

        {/* TELEPHONE */}
        <Input
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          placeholder="Téléphone"
          required
          type="tel"
          className="h-12"
        />

        {/* EMAIL */}
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="h-12"
        />

        <Input
  name="site"
  value={formData.site}
  onChange={handleChange}
  placeholder="https://monsite.fr"
  type="url"
  className="h-12"
/>

        {/* MESSAGE */}
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message (optionnel)"
          rows={4}
        />

        {/* BUTTON */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg py-7 font-semibold shadow-xl"
        >
          Demander un audit gratuit
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Réponse sous 24h · Sans engagement
        </p>

      </form>
    </CardContent>
  </Card>
</div>

        {/* CONTACT DIRECT */}
        <div className="space-y-6">

          {/* PHONE */}
          <Card className="border-2 border-blue-100 rounded-2xl hover:shadow-lg transition">
            <CardContent className="flex items-center gap-5 p-6">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                <Phone className="text-white w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-600">Téléphone</p>
                <a
                  href="tel:+33659841301"
                  className="text-blue-600 font-bold text-lg"
                >
                  06 59 84 13 01
                </a>
              </div>
            </CardContent>
          </Card>

          {/* WHATSAPP */}
          <Card className="border-2 border-green-100 rounded-2xl hover:shadow-lg transition">
            <CardContent className="flex items-center gap-5 p-6">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="text-white w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-600">WhatsApp</p>
                <a
                  href="https://wa.me/33659841301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-bold text-lg"
                >
                  Ouvrir la discussion
                </a>
              </div>
            </CardContent>
          </Card>

          {/* EMAIL */}
          <Card className="border-2 border-purple-100 rounded-2xl hover:shadow-lg transition">
            <CardContent className="flex items-center gap-5 p-6">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center">
                <Mail className="text-white w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-600">Email</p>
                <a
                  href="mailto:localboostagency.contact@gmail.com"
                  className="text-purple-600 font-bold text-sm break-all"
                >
                  localboostagency.contact@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform">
                <TrendingUp className="w-9 h-9 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LocalBoost Agency
              </span>
              <p className="text-gray-400 text-center max-w-md">
                Votre partenaire pour dominer le marché local et générer plus de clients qualifiés.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-8 pb-4">
              <p className="text-center text-gray-400">
                &copy; 2026 LocalBoost Agency. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
