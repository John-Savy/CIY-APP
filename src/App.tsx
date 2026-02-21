import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MealCard } from './components/MealCard';
import { RecipeModal } from './components/RecipeModal';
import { YouTubeImporter } from './components/YouTubeImporter';
import { Footer } from './components/Footer';
import { MEALS, Recipe } from './data/meals';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, Plus, Youtube } from 'lucide-react';

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('ciy_custom_recipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showImporter, setShowImporter] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('ciy_custom_recipes', JSON.stringify(customRecipes));
  }, [customRecipes]);

  const allMeals = [...MEALS, ...customRecipes];

  const categories = ['All', 'Quick & Easy', 'Family Friendly', 'Vegetarian', 'Spicy', 'Gourmet', 'YouTube Import'];

  const filteredMeals = activeCategory === 'All' 
    ? allMeals 
    : allMeals.filter(meal => (meal.tags || []).includes(activeCategory));

  const handleImport = (recipe: Recipe) => {
    setCustomRecipes(prev => [recipe, ...prev]);
    setActiveCategory('YouTube Import');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#2C2C2C]">
      <Navbar />
      
      <main>
        <Hero />

        {/* Menu Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-extrabold mb-4">Explore our menu</h2>
              <p className="text-gray-500 text-lg">Choose from 40+ weekly recipes, or import your own from YouTube.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setShowImporter(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-100 transition-all border border-red-100"
              >
                <Youtube className="w-5 h-5" />
                Import YouTube Recipe
              </button>
              
              <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden md:block" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#00A82D] text-white shadow-md shadow-[#00A82D]/20'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#00A82D] hover:text-[#00A82D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredMeals.map((meal) => (
              <MealCard 
                key={meal.id} 
                recipe={meal} 
                onClick={setSelectedRecipe} 
              />
            ))}
          </motion.div>

          {filteredMeals.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No recipes found for this category.</p>
              <button 
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-[#00A82D] font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div className="mt-16 text-center">
            <button className="px-10 py-4 border-2 border-[#00A82D] text-[#00A82D] rounded-full font-bold text-lg hover:bg-[#00A82D] hover:text-white transition-all">
              See More Recipes
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#F8F7F5] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Why CIY?</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">We make it easy to cook delicious, healthy meals at home without the stress of planning and shopping.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: 'Fresh & Pre-Portioned',
                  desc: 'We source high-quality ingredients and deliver them in the exact amounts you need, reducing food waste.',
                  icon: '🥬'
                },
                {
                  title: 'Flexible & Convenient',
                  desc: 'Skip a week, cancel anytime, or change your delivery day to fit your busy schedule.',
                  icon: '📅'
                },
                {
                  title: 'Chef-Curated Recipes',
                  desc: 'Our culinary team creates 40+ new recipes every week, from global flavors to family favorites.',
                  icon: '👨‍🍳'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#00A82D] rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Ready to start cooking?</h2>
                <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">Join thousands of happy home cooks and get your first box delivered this week.</p>
                <button className="px-12 py-5 bg-white text-[#00A82D] rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-xl">
                  Get Started Now
                </button>
                <p className="mt-6 text-sm opacity-75">No commitment. Skip or cancel anytime.</p>
              </div>
              
              {/* Abstract shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <RecipeModal 
        recipe={selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} 
      />

      <AnimatePresence>
        {showImporter && (
          <YouTubeImporter 
            onImport={handleImport} 
            onClose={() => setShowImporter(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
