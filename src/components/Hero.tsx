import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Download } from 'lucide-react';

export const Hero = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <section className="relative bg-[#F8F7F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              {installPrompt ? (
                <button 
                  onClick={handleInstall}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#00A82D] text-white font-bold hover:bg-[#008a25] transition-all animate-bounce shadow-lg shadow-[#00A82D]/20"
                >
                  <Download className="w-5 h-5" />
                  Install CIY App
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#E5F6E8] text-[#00A82D] text-sm font-bold">
                    #1 MEAL KIT DELIVERY SERVICE
                  </span>
                  <button 
                    onClick={() => alert("To install CIY on your phone:\n\n1. Tap the browser menu (⋮) or Share icon\n2. Select 'Add to Home screen' or 'Install app'\n\nThis will add the CIY icon to your home screen for quick access!")}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Get the App
                  </button>
                </div>
              )}
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#2C2C2C] leading-[1.1] mb-6">
              Take the stress out of <span className="text-[#00A82D]">mealtime.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              CIY delivers step-by-step recipes and fresh, pre-portioned ingredients right to your door.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="px-8 py-4 bg-[#00A82D] text-white rounded-full font-bold text-lg hover:bg-[#008a25] shadow-lg shadow-[#00A82D]/20 transition-all flex items-center justify-center gap-2 group">
                View Our Plans
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
                How It Works
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                'Fresh ingredients',
                'Easy-to-follow recipes',
                'Flexible subscriptions',
                'Sustainable sourcing'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#00A82D]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/seed/cooking/1200/1000"
                alt="Fresh ingredients on a table"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#00A82D] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
