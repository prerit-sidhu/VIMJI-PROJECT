import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register plugins
ChartJS.register(ArcElement, Tooltip, Legend);
gsap.registerPlugin(ScrollTrigger)

const Tokenomics = () => {
  const chartRef = useRef(null);
  const distributionRef = useRef(null);
  const supplyRef = useRef(null);
  const [chartReady, setChartReady] = useState(false);
  
  // Token distribution data
  const tokenDistribution = [
    { category: 'Public Sale', percentage: 40, color: '#FF6B00' },
    { category: 'Team & Advisors', percentage: 15, color: '#8A4FFF' },
    { category: 'Marketing', percentage: 20, color: '#00E0FF' },
    { category: 'Liquidity Pool', percentage: 15, color: '#FFD700' },
    { category: 'Community Rewards', percentage: 10, color: '#FF4D6D' },
  ]
  
  // Chart.js data
  const chartData = {
    labels: tokenDistribution.map(item => item.category),
    datasets: [
      {
        data: tokenDistribution.map(item => item.percentage),
        backgroundColor: tokenDistribution.map(item => item.color),
        borderColor: '#121212',
        borderWidth: 2,
      },
    ],
  };
  
  // Chart.js options - update for better visibility
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          font: {
            family: 'Poppins',
            size: 16,
            weight: 'bold'
          },
          padding: 25,
          boxWidth: 20,
          boxHeight: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#2c2c2c',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    // Add these options for better chart visibility
    elements: {
      arc: {
        borderWidth: 0,
        borderColor: '#000000'
      }
    },
    layout: {
      padding: 20
    }
  };
  
  // Token details
  const tokenDetails = [
    { label: 'Token Name', value: 'VIMJI' },
    { label: 'Token Symbol', value: 'VIMJI' },
    { label: 'Total Supply', value: '1,000,000,000 VIMJI' },
    { label: 'Blockchain', value: 'Solana' },
    { label: 'Token Type', value: 'SPL Token' },
  ]
  
  // Ensure chart is rendered after component mounts
  useEffect(() => {
    // Set a timeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      setChartReady(true);
    }, 1000); // Increased timeout to 1000ms for better stability
    
    return () => clearTimeout(timer);
  }, []);
  
  // GSAP animations - only start after chart is ready
  useEffect(() => {
    if (!chartReady) return;
    
    // Minimal animations only for initial page load
    gsap.from('.main-heading', {
      opacity: 0.8,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // Animate chart on scroll with a shorter duration
    gsap.from(chartRef.current, {
      scrollTrigger: {
        trigger: chartRef.current,
        start: 'top 80%',
      },
      scale: 0.95, // Less dramatic scale change
      opacity: 0.5, // Start from higher opacity
      duration: 0.5, // Shorter duration
      ease: 'power2.out' // Smoother easing
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [chartReady])
  
  // Page transition variants
    const pageVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.5 } },
      exit: { opacity: 0, transition: { duration: 0.3 } }
    }
    
    // Animation variants for chart
    const chartVariants = {
      offscreen: { 
        opacity: 0,
        scale: 0.95
      },
      onscreen: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    };
    
    // Animation variants for distribution items
    const distributionVariants = {
      offscreen: { 
        opacity: 0,
        x: -30
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
    
    // Animation variants for token details
    const detailVariants = {
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
              <div className="text-container">
                <h1 className="main-heading text-4xl md:text-6xl font-bold mb-6 gradient-text">Tokenomics</h1>
                <p className="text-xl text-gray-200 mb-8">
                  Understanding the economics and distribution of VIMJI tokens
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Token Distribution Section - Enhanced visibility */}
        <section className="section-padding bg-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-container inline-block">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Token Distribution</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Pie Chart - Enhanced container */}
              <motion.div 
                ref={chartRef} 
                className="relative"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={chartVariants}
              >
                <div className="aspect-square max-w-xl mx-auto bg-dark/90 p-6 rounded-2xl shadow-xl border-2 border-gray-700/70">
                  {chartReady ? (
                    <div className="h-[300px] w-[300px] mx-auto">
                      <Pie data={chartData} options={chartOptions} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Distribution List - Enhanced visibility */}
              <div ref={distributionRef}>
                <div className="space-y-6">
                  {tokenDistribution.map((item, index) => (
                    <motion.div 
                      key={index} 
                      custom={index}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={distributionVariants}
                      className="distribution-item flex items-center p-6 bg-dark/80 rounded-xl border-2 border-gray-700/50 hover:border-primary/50 transition-all duration-300 shadow-lg"
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mr-6" style={{ backgroundColor: item.color }}>
                        <span className="text-dark text-xl font-bold">{item.percentage}%</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium text-white">{item.category}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Token Details Section - Enhanced visibility */}
        <section className="section-padding bg-gradient-to-b from-black to-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-container inline-block">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Token Details</h2>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div ref={supplyRef} className="bg-dark/90 backdrop-blur-lg rounded-2xl p-8 border-2 border-gray-700/70 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tokenDetails.map((detail, index) => (
                    <motion.div 
                      key={index} 
                      custom={index}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={detailVariants}
                      className="token-detail p-6 bg-dark/80 rounded-xl border-2 border-gray-700/50 shadow-lg"
                    >
                      <h3 className="text-gray-300 text-lg mb-2">{detail.label}</h3>
                      <p className="text-2xl font-medium text-white">{detail.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    )
  
}

export default Tokenomics
