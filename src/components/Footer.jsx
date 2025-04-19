import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTwitter, FaTelegram, FaDiscord, FaGithub } from 'react-icons/fa'

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }
  
  // Footer links
  const footerLinks = [
    { title: 'Navigation', links: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Tokenomics', path: '/tokenomics' },
      { name: 'Roadmap', path: '/roadmap' },
      { name: 'Community', path: '/community' },
    ]},
    { title: 'Resources', links: [
      { name: 'Whitepaper', path: '#' },
      { name: 'Documentation', path: '#' },
      { name: 'FAQs', path: '#' },
    ]},
    { title: 'Legal', links: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Disclaimer', path: '#' },
    ]},
  ]
  
  // Social links
  const socialLinks = [
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com/vimji' },
    { name: 'Telegram', icon: <FaTelegram />, url: 'https://t.me/vimji' },
    { name: 'Discord', icon: <FaDiscord />, url: 'https://discord.gg/vimji' },
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/vimji' },
  ]
  
  return (
    <footer className="bg-dark/80 backdrop-blur-md pt-16 pb-8">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-1">
            <Link to="/" className="text-3xl font-bold gradient-text mb-4 inline-block">VIMJI</Link>
            <p className="text-gray-400 mb-6">The first Indian memecoin built on Solana blockchain with lightning-fast transactions and minimal fees.</p>
            <div className="flex space-x-5">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors text-2xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* Links Columns */}
          {footerLinks.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants} className="col-span-1">
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} VIMJI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Powered by <span className="text-primary">Solana Blockchain</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer