import React from 'react';
import { Clock, Flame, ChevronRight } from 'lucide-react';
import { Recipe } from '../data/meals';
import { motion } from 'motion/react';

interface MealCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ recipe, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group"
      onClick={() => onClick(recipe)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {(recipe.tags || []).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#2C2C2C] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {recipe.prepTime}
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {recipe.calories} CAL
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-[#2C2C2C] mb-1 group-hover:text-[#00A82D] transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-1">
          {recipe.subtitle}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-top border-gray-50">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {recipe.difficulty}
          </span>
          <div className="flex items-center gap-1 text-[#00A82D] font-bold text-sm">
            View Recipe
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
