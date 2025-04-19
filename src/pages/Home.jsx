import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaRocket, FaBolt, FaGlobe, FaUsers } from 'react-icons/fa'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)
  
  // GSAP animations
  useEffect(() => {
    // We'll remove this to prevent elements from being visible before animations
    // gsap.set('.hero-title span, .hero-subtitle, .hero-cta, .feature-card, .stat-item, .cta-content', { 
    //   opacity: 1,
    //   y: 0
    // });
    
    // Minimal animations only for initial page load
    gsap.from('.hero-title', {
      opacity: 0.8,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  // Animation variants for features
  const featureVariants = {
    offscreen: { 
      opacity: 0,
      y: 50
    },
    onscreen: i => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };
  
  // Animation variants for stats
  const statVariants = {
    offscreen: { 
      opacity: 0,
      scale: 0.9
    },
    onscreen: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };
  
  // Animation variants for CTA
  const ctaVariants = {
    offscreen: { 
      opacity: 0,
      y: 30
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Split text into spans for animation
  const heroTitle = "VIMJI: First Indian Memecoin on Solana"
  const heroTitleSpans = heroTitle.split('').map((char, index) => (
    <span key={index} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section - No changes needed as it already uses motion */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      >
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Sphere args={[1.5, 100, 200]} position={[0, 0, 0]}>
              <MeshDistortMaterial
                color="#8A4FFF"
                attach="material"
                distort={0.5}
                speed={1.5}
                roughness={0.2}
              />
            </Sphere>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-dark/80 p-8 rounded-xl backdrop-blur-md shadow-2xl border-2 border-gray-700/50 max-w-4xl mx-auto"
          >
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">VIMJI</span> - First Indian Memecoin
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-white font-medium mb-8 max-w-3xl mx-auto">
              Experience lightning-fast transactions with minimal fees on the Solana blockchain
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button 
                className="hero-cta btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy VIMJI
              </motion.button>
              <motion.button 
                className="hero-cta btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Whitepaper
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-light/50 text-sm flex flex-col items-center"
          >
            <p>Scroll to explore</p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mt-2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="section-padding bg-gradient-radial from-dark to-black"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={ctaVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Why Choose VIMJI?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The first Indian memecoin built with cutting-edge technology and a vibrant community
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div 
              custom={0}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={featureVariants}
              className="feature-card card group hover:border-primary transition-all duration-300"
            >
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-all duration-300">
                <FaBolt className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-400">
                Built on Solana blockchain, VIMJI transactions are completed in milliseconds with minimal fees.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              custom={1}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={featureVariants}
              className="feature-card card group hover:border-primary transition-all duration-300"
            >
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-all duration-300">
                <FaGlobe className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Indian Heritage</h3>
              <p className="text-gray-400">
                Celebrating the rich culture and innovation of India in the global cryptocurrency landscape.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              custom={2}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={featureVariants}
              className="feature-card card group hover:border-primary transition-all duration-300"
            >
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-all duration-300">
                <FaUsers className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strong Community</h3>
              <p className="text-gray-400">
                Join thousands of VIMJI holders worldwide in our rapidly growing and engaged community.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              custom={3}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={featureVariants}
              className="feature-card card group hover:border-primary transition-all duration-300"
            >
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-all duration-300">
                <FaRocket className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Massive Potential</h3>
              <p className="text-gray-400">
                With a clear roadmap and dedicated team, VIMJI is positioned for exponential growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="section-padding bg-dark relative overflow-hidden"
      >
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={ctaVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">VIMJI by the Numbers</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Growing rapidly since our launch
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <motion.div 
              custom={0}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={statVariants}
              className="stat-item card text-center"
            >
              <h3 className="text-4xl font-bold gradient-text mb-2">10K+</h3>
              <p className="text-gray-400">Community Members</p>
            </motion.div>
            
            {/* Stat 2 */}
            <motion.div 
              custom={1}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={statVariants}
              className="stat-item card text-center"
            >
              <h3 className="text-4xl font-bold gradient-text mb-2">5K+</h3>
              <p className="text-gray-400">Token Holders</p>
            </motion.div>
            
            {/* Stat 3 */}
            <motion.div 
              custom={2}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={statVariants}
              className="stat-item card text-center"
            >
              <h3 className="text-4xl font-bold gradient-text mb-2">$2M+</h3>
              <p className="text-gray-400">Market Cap</p>
            </motion.div>
            
            {/* Stat 4 */}
            <motion.div 
              custom={3}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={statVariants}
              className="stat-item card text-center"
            >
              <h3 className="text-4xl font-bold gradient-text mb-2">100K+</h3>
              <p className="text-gray-400">Transactions</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="section-padding bg-gradient-to-r from-primary/20 to-secondary/20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={ctaVariants}
            className="cta-content max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
              Join the VIMJI Revolution Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of the first Indian memecoin on Solana and experience the future of digital currency
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button 
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy VIMJI Now
              </motion.button>
              <motion.button 
                className="btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Community
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home