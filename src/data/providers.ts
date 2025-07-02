export interface TiffinProvider {
  id: string;
  name: string;
  area: string;
  description: string;
  cuisine: string[];
  price: {
    min: number;
    max: number;
  };
  type: 'veg' | 'non-veg' | 'both';
  deliveryType: 'pickup' | 'delivery' | 'both';
  timing: {
    lunch: string;
    dinner: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  menu: {
    name: string;
    price: number;
    description: string;
  }[];
  plans: {
    type: 'weekly' | 'monthly';
    price: number;
    description: string;
  }[];
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  foodType: string;
  priceRange: string;
  specialties: string[];
  weeklyPrice: number;
  monthlyPrice: number;
  deliverySlots: string[];
  testimonials: {
    name: string;
    rating: number;
    comment: string;
  }[];
}

export const tiffinProviders: TiffinProvider[] = [
  {
    id: '1',
    name: 'Maharani Kitchen',
    area: 'Koramangala',
    description: 'Authentic North Indian homemade meals prepared with love and traditional recipes passed down through generations.',
    cuisine: ['North Indian', 'Punjabi'],
    price: { min: 120, max: 200 },
    type: 'both',
    deliveryType: 'both',
    timing: {
      lunch: '12:00 PM - 2:00 PM',
      dinner: '7:00 PM - 9:00 PM'
    },
    contact: {
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      email: 'maharanikitchen@gmail.com'
    },
    rating: 4.8,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'
    ],
    menu: [
      { name: 'Dal Makhani Combo', price: 150, description: 'Dal makhani, rice, roti, pickle, salad' },
      { name: 'Rajma Chawal', price: 130, description: 'Rajma curry with basmati rice and pickle' },
      { name: 'Paneer Butter Masala', price: 180, description: 'Rich paneer curry with rice and naan' }
    ],
    plans: [
      { type: 'weekly', price: 900, description: '7 days lunch or dinner' },
      { type: 'monthly', price: 3200, description: '30 days lunch or dinner' }
    ],
    location: {
      address: '123 Koramangala 4th Block, Bangalore',
      lat: 12.9352,
      lng: 77.6245
    },
    foodType: 'both',
    priceRange: '₹120-200',
    specialties: ['Dal Makhani', 'Butter Chicken', 'Naan', 'Biryani'],
    weeklyPrice: 900,
    monthlyPrice: 3200,
    deliverySlots: ['11:30 AM - 12:30 PM', '12:30 PM - 1:30 PM', '6:30 PM - 7:30 PM', '7:30 PM - 8:30 PM'],
    testimonials: [
      { name: 'Amit Sharma', rating: 5, comment: 'Excellent food quality and timely delivery. The dal makhani is absolutely delicious!' },
      { name: 'Priya Patel', rating: 4, comment: 'Good home-style cooking. The variety in weekly menu is great.' },
      { name: 'Rohit Kumar', rating: 5, comment: 'Best tiffin service in the area. Feels like mom\'s cooking!' }
    ]
  },
  {
    id: '2',
    name: 'South Spice Tiffins',
    area: 'Indiranagar',
    description: 'Traditional South Indian tiffin service offering authentic Karnataka and Tamil Nadu cuisines with fresh ingredients.',
    cuisine: ['South Indian', 'Tamil', 'Karnataka'],
    price: { min: 100, max: 160 },
    type: 'veg',
    deliveryType: 'delivery',
    timing: {
      lunch: '11:30 AM - 1:30 PM',
      dinner: '6:30 PM - 8:30 PM'
    },
    contact: {
      phone: '+91 9876543211',
      whatsapp: '+91 9876543211',
      email: 'southspice@gmail.com'
    },
    rating: 4.6,
    reviews: 203,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
    gallery: [
      'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg'
    ],
    menu: [
      { name: 'Sambar Rice Combo', price: 120, description: 'Sambar rice, rasam, vegetable curry, pickle' },
      { name: 'Curd Rice Special', price: 100, description: 'Curd rice with pickle, papad, and vegetable' },
      { name: 'Bisi Bele Bath', price: 140, description: 'Traditional Karnataka mixed rice with vegetables' }
    ],
    plans: [
      { type: 'weekly', price: 750, description: '7 days lunch or dinner' },
      { type: 'monthly', price: 2800, description: '30 days lunch or dinner' }
    ],
    location: {
      address: '456 Indiranagar 1st Stage, Bangalore',
      lat: 12.9719,
      lng: 77.6413
    },
    foodType: 'veg',
    priceRange: '₹100-160',
    specialties: ['Sambar Rice', 'Rasam', 'Curd Rice', 'Bisi Bele Bath'],
    weeklyPrice: 750,
    monthlyPrice: 2800,
    deliverySlots: ['11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM'],
    testimonials: [
      { name: 'Lakshmi Iyer', rating: 5, comment: 'Authentic South Indian taste! Reminds me of home.' },
      { name: 'Suresh Kumar', rating: 4, comment: 'Great variety and consistent quality.' }
    ]
  },
  {
    id: '3',
    name: 'Ghar Ka Khana',
    area: 'HSR Layout',
    description: 'Multi-cuisine homemade meals with a focus on healthy and nutritious food prepared in a clean home kitchen.',
    cuisine: ['North Indian', 'Chinese', 'Continental'],
    price: { min: 140, max: 220 },
    type: 'both',
    deliveryType: 'both',
    timing: {
      lunch: '12:30 PM - 2:30 PM',
      dinner: '7:30 PM - 9:30 PM'
    },
    contact: {
      phone: '+91 9876543212',
      whatsapp: '+91 9876543212',
      email: 'gharkakhana@gmail.com'
    },
    rating: 4.7,
    reviews: 89,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
      'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'
    ],
    menu: [
      { name: 'Chicken Curry Meal', price: 200, description: 'Chicken curry, rice, roti, dal, salad' },
      { name: 'Veg Thali', price: 160, description: 'Mixed vegetables, dal, rice, roti, pickle' },
      { name: 'Fried Rice Combo', price: 180, description: 'Veg/chicken fried rice with manchurian' }
    ],
    plans: [
      { type: 'weekly', price: 1100, description: '7 days lunch or dinner' },
      { type: 'monthly', price: 4000, description: '30 days lunch or dinner' }
    ],
    location: {
      address: '789 HSR Layout Sector 2, Bangalore',
      lat: 12.9116,
      lng: 77.6378
    },
    foodType: 'both',
    priceRange: '₹140-220',
    specialties: ['Chicken Curry', 'Fried Rice', 'Mixed Vegetables', 'Dal Tadka'],
    weeklyPrice: 1100,
    monthlyPrice: 4000,
    deliverySlots: ['12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM'],
    testimonials: [
      { name: 'Rajesh Gupta', rating: 5, comment: 'Amazing variety and taste. Love the Chinese dishes!' },
      { name: 'Neha Singh', rating: 4, comment: 'Healthy and delicious food. Great for working professionals.' }
    ]
  },
  {
    id: '4',
    name: 'Moms Kitchen',
    area: 'Whitefield',
    description: 'Like mother\'s cooking, we prepare healthy and delicious meals with fresh ingredients and lots of love.',
    cuisine: ['North Indian', 'Bengali', 'Gujarati'],
    price: { min: 110, max: 180 },
    type: 'veg',
    deliveryType: 'pickup',
    timing: {
      lunch: '12:00 PM - 2:00 PM',
      dinner: '7:00 PM - 9:00 PM'
    },
    contact: {
      phone: '+91 9876543213',
      whatsapp: '+91 9876543213',
      email: 'momskitchen@gmail.com'
    },
    rating: 4.9,
    reviews: 234,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg'
    ],
    menu: [
      { name: 'Bengali Thali', price: 170, description: 'Fish curry, rice, dal, vegetable, sweet' },
      { name: 'Gujarati Thali', price: 150, description: 'Dal, sabzi, rice, roti, pickle, sweet' },
      { name: 'Aloo Paratha Combo', price: 130, description: 'Stuffed parathas with curd and pickle' }
    ],
    plans: [
      { type: 'weekly', price: 850, description: '7 days lunch or dinner' },
      { type: 'monthly', price: 3100, description: '30 days lunch or dinner' }
    ],
    location: {
      address: '321 Whitefield Main Road, Bangalore',
      lat: 12.9698,
      lng: 77.7500
    },
    foodType: 'veg',
    priceRange: '₹110-180',
    specialties: ['Bengali Fish Curry', 'Gujarati Thali', 'Aloo Paratha', 'Homemade Sweets'],
    weeklyPrice: 850,
    monthlyPrice: 3100,
    deliverySlots: ['11:30 AM - 12:30 PM', '1:00 PM - 2:00 PM', '6:30 PM - 7:30 PM', '8:00 PM - 9:00 PM'],
    testimonials: [
      { name: 'Anita Das', rating: 5, comment: 'Tastes exactly like my mother\'s cooking!' },
      { name: 'Vikram Joshi', rating: 5, comment: 'Best Bengali food in Whitefield. Highly recommended!' }
    ]
  },
  {
    id: '5',
    name: 'Punjabi Tadka',
    area: 'Marathahalli',
    description: 'Authentic Punjabi flavors with rich gravies and fresh bread, bringing the taste of Punjab to your doorstep.',
    cuisine: ['Punjabi', 'North Indian'],
    price: { min: 130, max: 250 },
    type: 'both',
    deliveryType: 'delivery',
    timing: {
      lunch: '12:00 PM - 2:30 PM',
      dinner: '7:00 PM - 10:00 PM'
    },
    contact: {
      phone: '+91 9876543214',
      whatsapp: '+91 9876543214',
      email: 'punjabitadka@gmail.com'
    },
    rating: 4.5,
    reviews: 167,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    gallery: [
      'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg'
    ],
    menu: [
      { name: 'Butter Chicken Meal', price: 220, description: 'Butter chicken, naan, rice, salad' },
      { name: 'Chole Bhature', price: 160, description: 'Spicy chickpeas with fried bread' },
      { name: 'Sarson Ka Saag', price: 180, description: 'Mustard greens with makki roti' }
    ],
    plans: [
      { type: 'weekly', price: 1200, description: '7 days lunch or dinner' },
      { type: 'monthly', price: 4500, description: '30 days lunch or dinner' }
    ],
    location: {
      address: '654 Marathahalli Bridge, Bangalore',
      lat: 12.9560,
      lng: 77.6982
    },
    foodType: 'both',
    priceRange: '₹130-250',
    specialties: ['Butter Chicken', 'Chole Bhature', 'Sarson Ka Saag', 'Makki Roti'],
    weeklyPrice: 1200,
    monthlyPrice: 4500,
    deliverySlots: ['11:30 AM - 12:30 PM', '1:30 PM - 2:30 PM', '6:30 PM - 7:30 PM', '8:30 PM - 9:30 PM'],
    testimonials: [
      { name: 'Harpreet Singh', rating: 5, comment: 'Authentic Punjabi taste! Best butter chicken in town.' },
      { name: 'Simran Kaur', rating: 4, comment: 'Rich flavors and generous portions. Love it!' }
    ]
  },
  {
    id: '6',
    name: 'Coastal Delights',
    area: 'BTM Layout',
    description: 'Specializing in coastal Karnataka and Kerala cuisines with fresh seafood and coconut-based curries.',
    cuisine: ['Coastal', 'Kerala', 'Mangalorean'],
    price: { min: 120, max: 200 },
    type: 'non-veg',
    deliveryType: 'both',
    timing: {
      lunch: '11:30 AM - 2:00 PM',
      dinner: '6:30 PM - 9:00 PM'
    },
    contact: {
      phone: '+91 9876543215',
      whatsapp: '+91 9876543215',
      email: 'coastaldelights@gmail.com'
    },
    rating: 4.4,
    reviews: 98,
    image: 'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg',
    gallery: [
      'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg',
      'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    ],
    menu: [
      { name: 'Fish Curry Rice', price: 180, description: 'Coconut fish curry with steamed rice' },
      { name: 'Chicken Ghee Roast', price: 200, description: 'Mangalorean style chicken with neer dosa' },
      { name: 'Prawn Curry Combo', price: 220, description: 'Spicy prawn curry with rice and pickle' }
    ],
    plans: [
      { type: 'weekly', price: 1000, description: '7 days lunch or dinner' },
      { type: 'monthly', price: 3800, description: '30 days lunch or dinner' }
    ],
    location: {
      address: '987 BTM Layout 2nd Stage, Bangalore',
      lat: 12.9165,
      lng: 77.6101
    },
    foodType: 'non-veg',
    priceRange: '₹120-200',
    specialties: ['Fish Curry', 'Chicken Ghee Roast', 'Prawn Curry', 'Neer Dosa'],
    weeklyPrice: 1000,
    monthlyPrice: 3800,
    deliverySlots: ['11:00 AM - 12:00 PM', '12:30 PM - 1:30 PM', '6:00 PM - 7:00 PM', '8:00 PM - 9:00 PM'],
    testimonials: [
      { name: 'Ramesh Shetty', rating: 5, comment: 'Authentic coastal flavors! Best fish curry in Bangalore.' },
      { name: 'Deepa Nair', rating: 4, comment: 'Fresh seafood and great taste. Highly recommended!' }
    ]
  }
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    content: 'Finding Maharani Kitchen through this platform was a game-changer! The food tastes just like home-cooked meals.',
    rating: 5
  },
  {
    name: 'Rahul Verma',
    role: 'Student',
    content: 'As a student, I was struggling with expensive and unhealthy food. South Spice Tiffins saved my budget and health!',
    rating: 5
  },
  {
    name: 'Anjali Patel',
    role: 'Working Professional',
    content: 'The variety of cuisines available is amazing. I can enjoy different regional foods without leaving my office area.',
    rating: 4
  }
];

export const cuisineTypes = [
  'North Indian', 'South Indian', 'Punjabi', 'Bengali', 'Gujarati', 
  'Maharashtrian', 'Tamil', 'Kerala', 'Coastal', 'Chinese', 'Continental'
];

export const areas = [
  'Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Marathahalli',
  'BTM Layout', 'Jayanagar', 'Banashankari', 'Electronic City', 'Sarjapur'
];

export const deliveryTypes = ['Home Delivery', 'Pickup Only', 'Both Delivery & Pickup'];