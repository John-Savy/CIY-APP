import React from 'react';
import { X, Clock, Flame, ChefHat, Info, Share2, ClipboardCheck, BookOpen } from 'lucide-react';
import { Recipe } from '../data/meals';
import { motion, AnimatePresence } from 'motion/react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!recipe) return null;

  const copyForNotebookLM = () => {
    const markdown = `
# ${recipe.title}
## ${recipe.subtitle}

**Prep Time:** ${recipe.prepTime}
**Calories:** ${recipe.calories}

### Description
${recipe.description}

### Ingredients
${(recipe.ingredients || []).map(i => `- ${i.amount} ${i.name}`).join('\n')}

### Instructions
${(recipe.steps || []).map((s, i) => `${i + 1}. **${s.title}**: ${s.content}`).join('\n')}

---
*Source: CIY - Cook It Yourself*
    `.trim();

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-800 hover:bg-white transition-all shadow-md"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="overflow-y-auto">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex gap-2 mb-3">
                  {(recipe.tags || []).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#00A82D] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">{recipe.title}</h2>
                <p className="text-lg opacity-90">{recipe.subtitle}</p>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <section className="mb-10">
                    <h3 className="text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                      <ChefHat className="w-5 h-5 text-[#00A82D]" />
                      About this recipe
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg italic">
                      "{recipe.description}"
                    </p>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-xl font-bold text-[#2C2C2C] mb-6">Instructions</h3>
                    <div className="space-y-8">
                      {(recipe.steps || []).map((step, idx) => (
                        <div key={idx} className="flex gap-6">
                          <div className="flex-shrink-0 w-10 h-10 bg-[#E5F6E8] text-[#00A82D] rounded-full flex items-center justify-center font-bold text-lg">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#2C2C2C] mb-2 text-lg">{step.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{step.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <div className="bg-[#F8F7F5] p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Time</span>
                        <div className="flex items-center gap-1 font-bold text-[#2C2C2C]">
                          <Clock className="w-4 h-4" />
                          {recipe.prepTime}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Calories</span>
                        <div className="flex items-center gap-1 font-bold text-[#2C2C2C]">
                          <Flame className="w-4 h-4" />
                          {recipe.calories}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Ingredients</h3>
                    <ul className="space-y-3">
                      {(recipe.ingredients || []).map((ing, idx) => (
                        <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <span className="text-[#2C2C2C] font-medium">{ing.name}</span>
                          <span className="text-gray-500 text-sm">{ing.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Allergens: Please check individual packaging for detailed allergen information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={copyForNotebookLM}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
            >
              {copied ? (
                <>
                  <ClipboardCheck className="w-5 h-5" />
                  Copied for NotebookLM!
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  Copy for NotebookLM
                </>
              )}
            </button>
            <button className="w-full sm:w-auto px-8 py-3 bg-[#00A82D] text-white rounded-full font-bold hover:bg-[#008a25] transition-all shadow-lg shadow-[#00A82D]/20">
              Add to Box
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
