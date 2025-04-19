import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import your pages
import Home from './pages/Home';
import About from './pages/About';
import Tokenomics from './pages/Tokenomics';
import Roadmap from './pages/Roadmap';
import Community from './pages/Community';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import wallet adapter styles - this must come before your own styles
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  // Set up Solana network and wallet adapters
  const network = WalletAdapterNetwork.Devnet; // Using Devnet for testing
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-dark text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/tokenomics" element={<Tokenomics />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/community" element={<Community />} />
            </Routes>
            <Footer />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;