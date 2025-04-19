import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Cursor = () => {
  const cursorRef = useRef(null)
  
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return;
    
    // Check if device has touch capability (mobile devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Only show custom cursor on non-touch devices
    if (isTouchDevice) {
      document.body.style.cursor = 'auto';
      cursor.style.display = 'none';
      return;
    }
    
    // Make cursor visible
    cursor.style.display = 'block';
    
    const links = document.querySelectorAll('a, button, .btn-primary, .btn-secondary');
    
    // Set up the cursor animation
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
    
    // Handle cursor size change on hoverable elements
    const growCursor = () => {
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: '#FF6B00',
        duration: 0.3
      });
    }
    
    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#8A4FFF',
        duration: 0.3
      });
    }
    
    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    
    links.forEach(link => {
      link.addEventListener('mouseenter', growCursor);
      link.addEventListener('mouseleave', shrinkCursor);
    });
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', growCursor);
        link.removeEventListener('mouseleave', shrinkCursor);
      });
    }
  }, []);
  
  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor bg-secondary hidden"
      style={{ left: '-100px', top: '-100px' }} // Initial position off-screen
    />
  );
}

export default Cursor;