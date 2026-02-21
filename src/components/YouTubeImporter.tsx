import React, { useState } from 'react';
import { Youtube, Loader2, Wand2, X, ShoppingBasket } from 'lucide-react';
import { extractRecipeFromYoutube } from '../services/gemini';
import { Recipe } from '../data/meals';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Info } from 'lucide-react';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

interface YouTubeImporterProps {
  onImport: (recipe: Recipe) => void;
  onClose: () => void;
}

export const YouTubeImporter: React.FC<YouTubeImporterProps> = ({ onImport, onClose }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(true);

  const checkKeyStatus = React.useCallback(async () => {
    try {
      // 1. Check server-side config (Secrets)
      const configRes = await fetch('/api/config');
      const { apiKey } = await configRes.json();
      
      if (apiKey && apiKey !== 'undefined' && apiKey !== 'null' && apiKey !== '') {
        setHasKey(true);
        return true;
      }

      // 2. Check platform dialog selection
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        if (selected) {
          setHasKey(true);
          return true;
        }
      }
    } catch (e) {
      console.error("Error checking key status:", e);
    }

    setHasKey(false);
    return false;
  }, []);

  React.useEffect(() => {
    checkKeyStatus();
    
    // Check every 3 seconds
    const interval = setInterval(checkKeyStatus, 3000);
    return () => clearInterval(interval);
  }, [checkKeyStatus]);

  const handleSelectKey = async () => {
    setError(null);
    console.log("Attempting to open key selection dialog...");
    
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      try {
        await window.aistudio.openSelectKey();
        console.log("Dialog opened successfully");
        // Optimistically assume success
        setHasKey(true);
      } catch (e) {
        console.error("Failed to open key dialog:", e);
        setError("Could not open the connection dialog. Please try refreshing the page.");
      }
    } else {
      console.warn("window.aistudio.openSelectKey not found");
      setError("The connection system is still loading. Please wait 5 seconds and try again.");
      checkKeyStatus();
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await extractRecipeFromYoutube(url);
      
      if (data.title === "Unknown Recipe" || !data.steps || data.steps.length === 0) {
        setError("AI could not extract the recipe from this specific video. Please ensure the URL is correct and public.");
        return;
      }

      const newRecipe: Recipe = {
        ...data,
        id: `yt-${Date.now()}`,
        image: `https://picsum.photos/seed/${(data.title || 'recipe').replace(/\s+/g, '-')}/800/600`,
        tags: ['YouTube Import', 'AI Generated'],
        difficulty: 'Medium'
      };
      onImport(newRecipe);
      onClose();
    } catch (err: any) {
      console.error("Import Error:", err);
      const errorMsg = err.message || '';
      
      // Fetch masked key for debugging
      let maskedKey = "unknown";
      try {
        const configRes = await fetch('/api/config');
        const config = await configRes.json();
        maskedKey = config.maskedKey;
      } catch (e) {}

      if (errorMsg.includes("Requested entity was not found") || 
          errorMsg.includes("API key not valid") || 
          errorMsg.includes("API_KEY_INVALID") ||
          errorMsg.includes("INVALID_ARGUMENT")) {
        setHasKey(false);
        setError(`API Key Error: The key provided is invalid (Key: ${maskedKey}). Please try reconnecting or check your Secrets.`);
      } else if (errorMsg.includes("429") || errorMsg.includes("Rate limit exceeded") || errorMsg.includes("Rate exceeded")) {
        setError("AI rate limit reached. Please wait a minute before trying again.");
      } else if (errorMsg.includes("500") || errorMsg.includes("Rpc failed") || errorMsg.includes("UNKNOWN")) {
        setError("The AI service had a temporary hiccup. Please try clicking 'Extract' again in a few seconds.");
      } else {
        setError(`Error: ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#00A82D] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00A82D]/20">
            <ShoppingBasket className="text-white w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2C2C2C]">Import Recipe</h2>
            <p className="text-sm text-gray-500">Paste a YouTube link to extract the recipe</p>
          </div>
        </div>

        <form onSubmit={handleImport} className="space-y-6">
          {!hasKey ? (
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="text-amber-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-amber-900 mb-2">Gemini API Key Required</h3>
              <p className="text-sm text-amber-700 mb-6">
                To use the AI importer, you need to connect your Gemini API key.
              </p>
              <button
                type="button"
                onClick={handleSelectKey}
                className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                Connect Gemini Key
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 text-xs text-amber-600 hover:underline"
              >
                <Info className="w-3 h-3" />
                Learn about API keys & billing
              </a>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  YouTube Video URL
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A82D] focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <div className="space-y-3">
                  <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                  </p>
                  {error.includes("API Key Error") && (
                    <button
                      type="button"
                      onClick={handleSelectKey}
                      className="w-full py-2 text-sm text-amber-700 font-bold bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      Try a different API Key
                    </button>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#00A82D] text-white rounded-xl font-bold text-lg hover:bg-[#008a25] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00A82D]/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Video...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Extract Recipe
                  </>
                )}
              </button>
            </>
          )}
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-xs text-blue-700 leading-relaxed text-center">
            Our AI will analyze the video transcript and content to generate a structured recipe for you.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
