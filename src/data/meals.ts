export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  prepTime: string;
  calories: number;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: { title: string; content: string }[];
}

export const MEALS: Recipe[] = [
  {
    id: '1',
    title: 'Firecracker Meatballs',
    subtitle: 'with Roasted Green Beans and Jasmine Rice',
    image: 'https://picsum.photos/seed/meatballs/800/600',
    prepTime: '30 min',
    calories: 780,
    tags: ['Quick & Easy', 'Spicy'],
    difficulty: 'Easy',
    description: 'A fan favorite! These ginger-soy meatballs are glazed in a sweet and spicy sauce that will blow your taste buds away.',
    ingredients: [
      { name: 'Ground Beef', amount: '10 oz' },
      { name: 'Jasmine Rice', amount: '3/4 cup' },
      { name: 'Green Beans', amount: '6 oz' },
      { name: 'Ginger', amount: '1 thumb' },
      { name: 'Scallions', amount: '2' },
      { name: 'Sour Cream', amount: '2 tbsp' },
      { name: 'Soy Sauce', amount: '1 tbsp' },
      { name: 'Sriracha', amount: '1 tsp' }
    ],
    steps: [
      { title: 'Prep & Cook Rice', content: 'Wash rice. In a small pot, combine rice and 1.5 cups water. Bring to a boil, then cover and simmer for 15 mins.' },
      { title: 'Roast Veggies', content: 'Toss green beans on a baking sheet with oil, salt, and pepper. Roast at 400°F until tender, about 12-15 mins.' },
      { title: 'Make Meatballs', content: 'In a bowl, mix beef, ginger, and scallion whites. Form into 1-inch balls. Brown in a pan over medium-high heat.' },
      { title: 'Glaze & Serve', content: 'Add sauce ingredients to pan. Toss meatballs to coat. Serve over rice with green beans.' }
    ]
  },
  {
    id: '2',
    title: 'Creamy Lemon Herb Chicken',
    subtitle: 'with Roasted Potatoes and Asparagus',
    image: 'https://picsum.photos/seed/chicken/800/600',
    prepTime: '35 min',
    calories: 650,
    tags: ['Family Friendly', 'Classic'],
    difficulty: 'Easy',
    description: 'Tender chicken breasts smothered in a rich, zesty lemon herb sauce. A comforting classic that never fails.',
    ingredients: [
      { name: 'Chicken Breast', amount: '12 oz' },
      { name: 'Yukon Gold Potatoes', amount: '12 oz' },
      { name: 'Asparagus', amount: '6 oz' },
      { name: 'Lemon', amount: '1' },
      { name: 'Fresh Thyme', amount: '2 sprigs' },
      { name: 'Heavy Cream', amount: '1/4 cup' }
    ],
    steps: [
      { title: 'Roast Potatoes', content: 'Cut potatoes into wedges. Toss with oil and thyme. Roast for 20-25 mins.' },
      { title: 'Cook Chicken', content: 'Season chicken with salt and pepper. Pan-sear until golden and cooked through, about 5-7 mins per side.' },
      { title: 'Make Sauce', content: 'In the same pan, add lemon juice, cream, and herbs. Simmer until thickened.' }
    ]
  },
  {
    id: '3',
    title: 'Balsamic Fig Pork Chops',
    subtitle: 'with Roasted Sweet Potatoes and Broccoli',
    image: 'https://picsum.photos/seed/pork/800/600',
    prepTime: '40 min',
    calories: 720,
    tags: ['Gourmet', 'Sweet & Savory'],
    difficulty: 'Medium',
    description: 'Elevate your dinner with these juicy pork chops glazed in a sophisticated balsamic fig reduction.',
    ingredients: [
      { name: 'Pork Chops', amount: '2' },
      { name: 'Sweet Potato', amount: '1 large' },
      { name: 'Broccoli', amount: '8 oz' },
      { name: 'Fig Jam', amount: '2 tbsp' },
      { name: 'Balsamic Vinegar', amount: '1 tbsp' }
    ],
    steps: [
      { title: 'Prep Veggies', content: 'Cube sweet potatoes and chop broccoli. Roast sweet potatoes for 25 mins, adding broccoli for the last 15 mins.' },
      { title: 'Sear Pork', content: 'Season pork chops. Pan-fry for 4-5 mins per side until internal temp reaches 145°F.' },
      { title: 'Glaze', content: 'Whisk fig jam and balsamic in the pan. Toss pork to coat.' }
    ]
  },
  {
    id: '4',
    title: 'Veggie Bibimbap Bowls',
    subtitle: 'with Pickled Carrots and Fried Eggs',
    image: 'https://picsum.photos/seed/veggie/800/600',
    prepTime: '25 min',
    calories: 540,
    tags: ['Vegetarian', 'Quick'],
    difficulty: 'Easy',
    description: 'A colorful and nutritious Korean-inspired bowl packed with fresh vegetables and a spicy gochujang kick.',
    ingredients: [
      { name: 'White Rice', amount: '3/4 cup' },
      { name: 'Carrots', amount: '1' },
      { name: 'Spinach', amount: '4 oz' },
      { name: 'Eggs', amount: '2' },
      { name: 'Gochujang', amount: '1 tbsp' }
    ],
    steps: [
      { title: 'Cook Rice', content: 'Prepare rice as per package instructions.' },
      { title: 'Pickle Carrots', content: 'Thinly slice carrots and toss with vinegar and sugar.' },
      { title: 'Sauté Spinach', content: 'Quickly cook spinach with garlic until wilted.' },
      { title: 'Assemble', content: 'Top rice with veggies, a fried egg, and a dollop of gochujang.' }
    ]
  }
];
