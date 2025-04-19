import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Roadmap = () => {
  const roadmapRef = useRef(null)
  const currentRef = useRef(null)
  
  // Roadmap data
  const roadmapData = [
    {
      phase: 'Phase 1',
      title: 'Foundation',
      items: [
        'Token creation and deployment on Solana',
        'Website and social media launch',
        'Community building initiatives',
        'Initial marketing campaigns',
        'Listing on DEX platforms'
      ],
      completed: true
    },
    {
      phase: 'Phase 2',
      title: 'Growth',
      items: [
        'Partnerships with Indian crypto influencers',
        'Exchange listings (CEX)',
        'Enhanced marketing campaigns',
        'Community expansion programs',
        'Development of VIMJI merchandise'
      ],
      completed: false
    },
    {
      phase: 'Phase 3',
      title: 'Expansion',
      items: [
        'Launch of VIMJI NFT collection',
        'Integration with major DeFi platforms',
        'Strategic partnerships with Indian brands',
        'Community governance implementation',
        'Global marketing initiatives'
      ],
      completed: false
    },
    {
      phase: 'Phase 4',
      title: 'Evolution',
      items: [
        'Development of VIMJI ecosystem',
        'Launch of VIMJI wallet',
        'Cross-chain integration',
        'Real-world utility partnerships',
        'Charitable initiatives in India'
      ],
      completed: false
    }
  ]
  
  // Current focus areas
  const currentFocus = [
    {
      title: 'Exchange Listings',
      description: 'Working on listing VIMJI on major centralized exchanges to increase accessibility'
    },
    {
      title: 'Community Growth',
      description: 'Expanding our community through targeted marketing and engagement initiatives'
    },
    {
      title: 'Strategic Partnerships',
      description: 'Forming partnerships with key players in the Indian crypto and business ecosystem'
    }
  ]
  
  // GSAP animations
  useEffect(() => {
    // Remove this to prevent elements from being visible before animations
    // gsap.set('.roadmap-item, .focus-card', { 
    //   opacity: 1,
    //   y: 0
    // });
    
    // Minimal animations only for initial page load
    gsap.from('.main-heading', {
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
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }
  
  // Animation variants for roadmap items
  const roadmapItemVariants = {
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
  
  // Animation variants for focus cards
  const focusCardVariants = {
    offscreen: { 
      opacity: 0,
      y: 30
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-dark to-black relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-container bg-dark/80 p-8 rounded-xl backdrop-blur-md shadow-2xl border-2 border-gray-700/50">
              <h1 className="main-heading text-4xl md:text-6xl font-bold mb-6 gradient-text">Roadmap</h1>
              <p className="text-xl text-white font-medium mb-8">
                Our journey to revolutionize the memecoin space
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Roadmap Section */}
      <section ref={roadmapRef} className="section-padding bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative roadmap-timeline">
              {/* Vertical line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
              
              {/* Roadmap items */}
              {roadmapData.map((item, index) => (
                <motion.div 
                  key={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={roadmapItemVariants}
                  className={`roadmap-item relative flex flex-col md:flex-row md:items-center mb-16 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-dark bg-gradient-to-r from-primary to-secondary"></div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 pl-10 md:pl-0 ${
                    index % 2 === 0 ? 'md:mr-16 md:ml-0' : 'md:ml-16 md:mr-0'
                  }`}>
                    <div className="bg-dark/90 p-6 rounded-xl backdrop-blur-md shadow-xl border-2 border-gray-700/50 hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <span className="text-sm font-semibold text-primary bg-primary/20 px-3 py-1 rounded-full mr-3">
                          {item.phase}
                        </span>
                        {item.completed && (
                          <span className="text-xs font-semibold text-green-400 bg-green-400/20 px-3 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                      <ul className="space-y-2">
                        {item.items.map((listItem, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span className="text-gray-200">{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Focus Section */}
      <section ref={currentRef} className="section-padding bg-gradient-to-b from-black to-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-container inline-block bg-dark/80 p-6 rounded-xl backdrop-blur-md shadow-xl border-2 border-gray-700/50">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Current Focus</h2>
              <p className="text-xl text-white font-medium">
                What we're actively working on right now
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {currentFocus.map((focus, index) => (
              <motion.div 
                key={index} 
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={focusCardVariants}
                className="focus-card bg-dark/90 p-6 rounded-xl backdrop-blur-md shadow-xl border-2 border-gray-700/50 hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-white">{focus.title}</h3>
                <p className="text-gray-200">{focus.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Roadmap