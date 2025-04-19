import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRefs = {
    hero: useRef(null),
    story: useRef(null),
    team: useRef(null),
    vision: useRef(null)
  }
  
  // GSAP animations
  useEffect(() => {
    // Minimal animations only for initial page load
    gsap.from('.about-hero-content', {
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
  
  // Animation variants
  const fadeInUp = {
    offscreen: { 
      opacity: 0,
      y: 50
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
  
  // Team card animation variants with staggered delay
  const teamCardVariants = {
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
  
  // Vision card animation variants
  const visionCardVariants = {
    offscreen: { 
      opacity: 0,
      scale: 0.95
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
  
  // Team members data
  const teamMembers = [
    {
      name: 'Prerit Sidhu',
      role: 'Founder & CEO',
      bio: 'Blockchain enthusiast with 8+ years of experience in crypto and DeFi projects.',
      image: '/src/assets/team/team1.svg'
    },
    {
      name: 'Lakshay Cheema',
      role: 'Co-Founder & Marketing',
      bio: 'Digital marketing expert with a passion for bringing innovative projects to the mainstream.',
      image: '/src/assets/team/team2.svg'
    },
    {
      name: 'Vikram Singh',
      role: 'Lead Developer',
      bio: 'Solana blockchain specialist with extensive experience in smart contract development.',
      image: '/src/assets/team/team3.svg'
    },
    {
      name: 'Ananya Desai',
      role: 'Community Manager',
      bio: 'Building and nurturing communities across various social platforms in the crypto space.',
      image: '/src/assets/team/team4.svg'
    }
  ]
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }
  
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="pt-20"
    >
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        className="py-20 bg-gradient-to-b from-dark to-black relative overflow-hidden"
      >
        {/* Abstract background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="about-hero-content text-center max-w-4xl mx-auto">
            <div className="text-container bg-dark/80 p-8 rounded-xl backdrop-blur-md shadow-2xl border-2 border-gray-700/50">
              <h1 className="main-heading text-5xl md:text-7xl font-bold mb-8 gradient-text">About VIMJI</h1>
              <p className="text-2xl text-white mb-8 font-medium">
                The story behind the first Indian memecoin on Solana blockchain
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section 
        ref={sectionRefs.story}
        className="section-padding bg-dark"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="story-content"
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">Our Story</h2>
              <p className="text-gray-300 mb-4">
                VIMJI was born from a vision to create a memecoin that represents the vibrant culture and growing crypto community of India. In early 2023, a group of blockchain enthusiasts and developers from across India came together with a shared passion for cryptocurrency and a desire to put India on the global crypto map.
              </p>
              <p className="text-gray-300 mb-4">
                Recognizing the potential of the Solana blockchain with its lightning-fast transactions and minimal fees, the team decided to build VIMJI as the first Indian memecoin on this innovative platform.
              </p>
              <p className="text-gray-300">
                The name "VIMJI" itself is a tribute to the spirit of innovation and entrepreneurship that has been a hallmark of Indian culture for centuries. Today, VIMJI stands as a symbol of India's growing influence in the global cryptocurrency landscape.
              </p>
            </motion.div>
            
            <motion.div 
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="story-content"
            >
              <div className="card p-0 overflow-hidden h-80 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-6xl font-bold gradient-text">VIMJI</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section 
        ref={sectionRefs.team}
        className="section-padding bg-gradient-radial from-dark to-black"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The passionate individuals behind VIMJI working to revolutionize the memecoin space
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={teamCardVariants}
                className="team-card card text-center"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section 
        ref={sectionRefs.vision}
        className="section-padding bg-dark relative overflow-hidden"
      >
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="vision-content max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Our Vision</h2>
            <p className="text-xl text-gray-300 mb-8">
              At VIMJI, we envision a future where cryptocurrency is accessible to everyone, and where India plays a leading role in the global blockchain revolution. We aim to create not just a memecoin, but a vibrant ecosystem that celebrates Indian culture while embracing the innovative potential of blockchain technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div 
                custom={0}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={visionCardVariants}
                className="card hover:border-primary transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">Community First</h3>
                <p className="text-gray-400">
                  Building a strong, engaged community that drives the project forward together.
                </p>
              </motion.div>
              <motion.div 
                custom={1}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={visionCardVariants}
                className="card hover:border-primary transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-400">
                  Constantly exploring new ways to add value and utility to the VIMJI ecosystem.
                </p>
              </motion.div>
              <motion.div 
                custom={2}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={visionCardVariants}
                className="card hover:border-primary transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
                <p className="text-gray-400">
                  Bringing Indian creativity and innovation to the global cryptocurrency stage.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default About