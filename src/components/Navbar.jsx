import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { connected, publicKey } = useWallet()
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Tokenomics', path: '/tokenomics' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Community', path: '/community' },
  ]
  
  // Social links
  const socialLinks = [
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com/vimji' },
    { name: 'Telegram', icon: <FaTelegram />, url: 'https://t.me/vimji' },
    { name: 'Discord', icon: <FaDiscord />, url: 'https://discord.gg/vimji' },
  ]
  
  // Format wallet address for display
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.toString().slice(0, 4)}...${address.toString().slice(-4)}`;
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold gradient-text"
          >
            VIMJI
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path}
              className={`relative font-medium hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-light'}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
          
          {/* Social Icons */}
          <div className="flex items-center space-x-4 ml-4">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light hover:text-primary transition-colors text-xl"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          {/* Connect Wallet Button */}
          <div className="ml-4">
            {connected ? (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                {formatWalletAddress(publicKey)}
              </motion.button>
            ) : (
              <WalletMultiButton className="btn-primary" />
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path}
                  className={`text-lg font-medium py-2 ${location.pathname === link.path ? 'text-primary' : 'text-light'}`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Social Icons - Mobile */}
              <div className="flex items-center space-x-6 py-2">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light hover:text-primary transition-colors text-2xl"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              {/* Connect Wallet Button - Mobile */}
              <div className="w-full mt-2">
                <WalletMultiButton className="btn-primary w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar