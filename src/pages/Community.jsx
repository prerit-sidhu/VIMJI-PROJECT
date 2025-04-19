import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaTwitter, FaTelegram, FaDiscord, FaReddit, FaMedium } from 'react-icons/fa'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Community = () => {
  const sectionRefs = {
    hero: useRef(null),
    social: useRef(null),
    events: useRef(null),
    faq: useRef(null)
  }
  
  // FAQ data
  const faqData = [
    {
      question: 'What is VIMJI?',
      answer: 'VIMJI is the first Indian memecoin built on the Solana blockchain, combining the fun aspects of memecoins with lightning-fast transactions and minimal fees.'
    },
    {
      question: 'How can I join the VIMJI community?',
      answer: 'You can join our community by following us on Twitter, joining our Telegram group, or becoming a member of our Discord server. Links to all our social platforms are available on this page.'
    },
    {
      question: 'Are there any community events for VIMJI holders?',
      answer: 'Yes! We regularly host AMAs, trading competitions, community calls, and virtual meetups. Keep an eye on our social channels for announcements about upcoming events.'
    },
    {
      question: 'How can I contribute to the VIMJI project?',
      answer: 'We welcome contributions from community members! You can help with marketing, content creation, community moderation, or technical development. Reach out to our team on Discord to discuss how you can get involved.'
    },
    {
      question: 'Is there a community rewards program?',
      answer: 'Yes, we have allocated 10% of the total token supply for community rewards. Active community members can earn VIMJI tokens through various activities and contributions to the ecosystem.'
    }
  ]
  
  // Community events data
  const eventsData = [
    {
      title: 'Weekly AMA Session',
      date: 'Every Friday, 3:00 PM UTC',
      platform: 'Discord',
      description: 'Join our team for a live Ask-Me-Anything session where we discuss project updates and answer community questions.'
    },
    {
      title: 'Trading Competition',
      date: 'June 15-30, 2023',
      platform: 'Decentralized Exchanges',
      description: 'Participate in our trading competition with a prize pool of 1,000,000 VIMJI tokens for the top traders.'
    },
    {
      title: 'Community Call',
      date: 'First Monday of every month',
      platform: 'Telegram',
      description: 'Monthly community call to discuss roadmap progress, upcoming features, and gather feedback from the community.'
    },
    {
      title: 'Virtual Meetup',
      date: 'July 10, 2023',
      platform: 'Zoom',
      description: 'Virtual meetup for VIMJI community members to network and connect with each other and the team.'
    }
  ]
  
  // Social platforms data
  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: <FaTwitter className="text-4xl" />,
      url: 'https://twitter.com/vimji',
      followers: '25K+',
      color: '#1DA1F2',
      description: 'Follow us for the latest news, updates, and announcements.'
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="text-4xl" />,
      url: 'https://t.me/vimji',
      followers: '15K+',
      color: '#0088cc',
      description: 'Join our active community for discussions and instant updates.'
    },
    {
      name: 'Discord',
      icon: <FaDiscord className="text-4xl" />,
      url: 'https://discord.gg/vimji',
      followers: '10K+',
      color: '#7289DA',
      description: 'Connect with developers and other community members.'
    },
    {
      name: 'Reddit',
      icon: <FaReddit className="text-4xl" />,
      url: 'https://reddit.com/r/vimji',
      followers: '8K+',
      color: '#FF4500',
      description: 'Join discussions and stay updated with community-driven content.'
    },
    {
      name: 'Medium',
      icon: <FaMedium className="text-4xl" />,
      url: 'https://medium.com/vimji',
      followers: '5K+',
      color: '#00AB6C',
      description: 'Read in-depth articles and project updates from our team.'
    }
  ]
  
  // FAQ accordion functionality
  const toggleFAQ = (index) => {
    const faqItems = document.querySelectorAll('.faq-answer')
    const currentItem = faqItems[index]
    const faqQuestions = document.querySelectorAll('.faq-question')
    
    faqItems.forEach((item, i) => {
      if (i !== index) {
        // Hide other answers with animation
        item.style.maxHeight = '0px'
        item.style.opacity = '0'
        setTimeout(() => {
          item.classList.add('hidden')
        }, 300)
        
        faqQuestions[i].classList.remove('text-primary')
        // Reset the plus icon
        const icons = faqQuestions[i].querySelectorAll('svg')
        icons.forEach(icon => {
          icon.classList.remove('rotate-45')
        })
      }
    })
    
    // Toggle current answer with animation
    if (currentItem.classList.contains('hidden')) {
      currentItem.classList.remove('hidden')
      currentItem.style.maxHeight = '0px'
      currentItem.style.opacity = '0'
      
      // Trigger reflow to ensure transition works
      void currentItem.offsetWidth
      
      // Animate opening
      currentItem.style.maxHeight = currentItem.scrollHeight + 'px'
      currentItem.style.opacity = '1'
    } else {
      // Animate closing
      currentItem.style.maxHeight = '0px'
      currentItem.style.opacity = '0'
      setTimeout(() => {
        currentItem.classList.add('hidden')
      }, 300)
    }
    
    faqQuestions[index].classList.toggle('text-primary')
    
    // Toggle the plus icon to an X by rotating
    const icon = faqQuestions[index].querySelector('svg')
    icon.classList.toggle('rotate-45')
  }
  
  // GSAP animations and show first FAQ by default
  useEffect(() => {
    // Minimal animations only for initial page load
    gsap.from('.community-hero-content', {
      opacity: 0.8,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // Show first FAQ item by default after render
    const timer = setTimeout(() => {
      toggleFAQ(0)
    }, 500)
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      clearTimeout(timer)
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
  
  // Social card animation variants with staggered delay
  const socialCardVariants = {
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
  
  // Event card animation variants
  const eventCardVariants = {
    offscreen: { 
      opacity: 0,
      x: -50
    },
    onscreen: i => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };
  
  // FAQ animation variants
  const faqVariants = {
    offscreen: { 
      opacity: 0,
      y: 30
    },
    onscreen: i => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.08,
        ease: "easeOut"
      }
    })
  };
  
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
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="community-hero-content text-center max-w-4xl mx-auto">
            <div className="bg-dark/80 p-8 rounded-xl backdrop-blur-md shadow-2xl border-2 border-gray-700/50">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Join Our Community</h1>
              <p className="text-xl text-white font-medium mb-8">
                Connect with fellow VIMJI enthusiasts and stay updated with the latest news and events
              </p>
              <motion.button 
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Discord
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Platforms Section */}
      <section 
        ref={sectionRefs.social}
        className="section-padding bg-dark"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="bg-dark/80 p-6 rounded-xl backdrop-blur-md shadow-xl border-2 border-gray-700/50 inline-block">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Connect With Us</h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Follow VIMJI on various social platforms to stay updated and engage with our community
              </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialPlatforms.map((platform, index) => (
              <motion.a 
                key={index}
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={socialCardVariants}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card card hover:border-primary transition-all duration-300 block"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4" style={{ color: platform.color }}>
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{platform.name}</h3>
                    <p className="text-primary">{platform.followers} Followers</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{platform.description}</p>
                <div className="inline-block bg-dark/80 px-4 py-2 rounded-full border border-gray-700 text-sm text-primary hover:bg-primary/10 transition-all duration-300">
                  Follow us on {platform.name}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community Events Section */}
      <section 
        ref={sectionRefs.events}
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
            <div className="bg-dark/80 p-6 rounded-xl backdrop-blur-md shadow-xl border-2 border-gray-700/50 inline-block">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Community Events</h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Participate in our upcoming events and connect with the VIMJI community
              </p>
            </div>
          </motion.div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {eventsData.map((event, index) => (
              <motion.div 
                key={index}
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={eventCardVariants}
                className="event-card bg-dark/90 p-6 rounded-xl backdrop-blur-md shadow-xl border-2 border-gray-700/50 hover:border-primary/50 transition-all duration-300"
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold gradient-text">{event.title}</h3>
                    <p className="text-primary">{event.date}</p>
                  </div>
                  <div className="md:w-3/4">
                    <div className="flex items-center mb-2">
                      <span className="text-secondary font-medium bg-secondary/20 px-3 py-1 rounded-full text-sm">
                        {event.platform}
                      </span>
                    </div>
                    <p className="text-white">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <motion.button 
              className="btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Events
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section 
        ref={sectionRefs.faq}
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
            className="text-center mb-16"
          >
            <div className="bg-dark/90 p-6 rounded-xl backdrop-blur-md shadow-xl border-2 border-gray-700/50 inline-block">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Find answers to common questions about VIMJI and our community
              </p>
            </div>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={faqVariants}
                className="faq-item bg-dark/90 p-6 rounded-xl backdrop-blur-md shadow-xl border-2 border-gray-700/50 hover:border-primary/30 transition-all duration-300"
              >
                <div 
                  className="faq-question flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <div className="ml-4">
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
                      className="transition-transform duration-300 text-primary"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </div>
                <div className="faq-answer hidden mt-4 overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: '0px', opacity: '0' }}>
                  <p className="text-white text-lg">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <p className="text-white text-lg font-medium mb-4">Still have questions?</p>
            <motion.button 
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center bg-dark/80 p-8 rounded-xl backdrop-blur-md shadow-2xl border-2 border-gray-700/50"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Ready to Join the VIMJI Revolution?
            </h2>
            <p className="text-xl text-white font-medium mb-8">
              Be part of the first Indian memecoin on Solana and join our growing community
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button 
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy VIMJI
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
    </motion.div>
  )
}

export default Community
