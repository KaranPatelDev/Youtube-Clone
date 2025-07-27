import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  Bell, 
  User, 
  Home, 
  TrendingUp, 
  Radio, 
  Library, 
  History, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  Settings, 
  HelpCircle, 
  Flag,
  ChevronRight,
  MoreVertical,
  Play,
  ThumbsDown,
  Share,
  Download,
  Plus,
  Zap,
  ChevronDown,
  ChevronUp,
  SkipForward,
  Upload,
  LogIn,
  UserPlus,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from './auth';
import { UserMenu, UploadModal } from './modals';

// Mock data for videos
export const mockVideos = [
  {
    id: '1',
    title: 'Ultimate Gaming Setup Tour 2025 - RGB Everything!',
    channel: 'TechGamer Pro',
    views: '2.1M',
    uploadTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    thumbnail: 'https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf',
    duration: '12:34',
    verified: true,
    description: 'Welcome to the most insane gaming setup tour you\'ve ever seen! In this video, I\'ll show you my complete 2025 gaming battlestation...',
    recap: {
      sections: [
        {
          timestamp: '0:00',
          title: 'Introduction & Overview',
          takeaways: [
            'Total setup cost: $8,500',
            'Three monitor configuration with RTX 4090',
            'Custom water cooling loop featured'
          ]
        },
        {
          timestamp: '2:15',
          title: 'Main Gaming PC Specs',
          takeaways: [
            'AMD Ryzen 9 7900X processor',
            'RTX 4090 graphics card with custom cooling',
            '64GB DDR5 RGB memory',
            'Custom hardline water cooling system'
          ]
        },
        {
          timestamp: '5:30',
          title: 'Monitor Setup & Peripherals',
          takeaways: [
            '34" ultrawide primary monitor (3440x1440)',
            'Two 27" secondary displays for multitasking',
            'Mechanical keyboard with custom switches',
            'High-end gaming mouse with 8000Hz polling rate'
          ]
        },
        {
          timestamp: '8:45',
          title: 'RGB Lighting & Aesthetics',
          takeaways: [
            'Synchronized RGB ecosystem across all components',
            'Ambient bias lighting behind monitors',
            'Custom cable management with RGB extensions',
            'Smart home integration for lighting control'
          ]
        },
        {
          timestamp: '11:00',
          title: 'Performance Testing & Conclusion',
          takeaways: [
            '4K gaming at 144+ FPS on most titles',
            'Content creation capabilities demonstrated',
            'Future upgrade path discussed'
          ]
        }
      ]
    }
  },
  {
    id: '2',
    title: '10-Minute Pasta Recipe That Will Change Your Life',
    channel: 'QuickCook Kitchen',
    views: '856K',
    uploadTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    thumbnail: 'https://images.unsplash.com/photo-1514986888952-8cd320577b68',
    duration: '10:24',
    verified: false,
    description: 'This simple pasta recipe has been passed down through generations in my Italian family...',
    recap: {
      sections: [
        {
          timestamp: '0:00',
          title: 'Ingredients & Preparation',
          takeaways: [
            'Only 6 ingredients needed',
            'Fresh pasta vs dried pasta comparison',
            'Essential tools: large pot, wooden spoon, cheese grater'
          ]
        },
        {
          timestamp: '1:30',
          title: 'Cooking the Perfect Pasta',
          takeaways: [
            'Salt water like the sea - 1 tablespoon per liter',
            'Never break spaghetti - let it soften naturally',
            'Save pasta water - liquid gold for sauce',
            'Al dente timing: 1 minute less than package instructions'
          ]
        },
        {
          timestamp: '4:15',
          title: 'Creating the Sauce',
          takeaways: [
            'Garlic and olive oil base (aglio e olio technique)',
            'Heat control is crucial - medium-low heat',
            'Fresh herbs added at the end for maximum flavor',
            'Pasta water creates silky sauce consistency'
          ]
        },
        {
          timestamp: '7:00',
          title: 'Final Assembly & Plating',
          takeaways: [
            'Toss pasta in pan, not bowl for better coating',
            'Fresh Parmesan grated at the table',
            'Garnish with fresh basil and cracked pepper',
            'Serve immediately while hot'
          ]
        },
        {
          timestamp: '9:15',
          title: 'Pro Tips & Variations',
          takeaways: [
            'Make double batch - leftovers reheat well',
            'Add protein: pancetta, chicken, or shrimp',
            'Vegetarian option with roasted vegetables'
          ]
        }
      ]
    }
  },
  {
    id: '3',
    title: 'RGB Gaming Beast - Custom Water Cooling Build',
    channel: 'PC Master Race',
    views: '1.8M',
    uploadTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    thumbnail: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2',
    duration: '18:45',
    verified: true,
    description: 'Building the ultimate RGB gaming PC with custom water cooling loop. This beast can handle anything!',
    recap: {
      sections: [
        {
          timestamp: '0:00',
          title: 'Build Overview & Components',
          takeaways: [
            'Total build cost: $4,200',
            'Custom loop cooling CPU and GPU',
            'Emphasis on both performance and aesthetics'
          ]
        },
        {
          timestamp: '2:30',
          title: 'Case Preparation & Planning',
          takeaways: [
            'Lian Li O11 Dynamic chosen for optimal water cooling',
            'Radiator placement strategy explained',
            'Cable management routes planned in advance'
          ]
        },
        {
          timestamp: '5:45',
          title: 'Installing Core Components',
          takeaways: [
            'Motherboard installation with proper standoffs',
            'RAM installation - populate slots 2 and 4 first',
            'M.2 SSD placement under motherboard heatsink'
          ]
        },
        {
          timestamp: '9:15',
          title: 'Water Cooling Loop Assembly',
          takeaways: [
            'Radiator and fan configuration (push vs pull)',
            'Pump and reservoir combo unit installation',
            'Hardline tubing bending techniques',
            'Leak testing procedure before powering on'
          ]
        },
        {
          timestamp: '14:20',
          title: 'RGB Setup & Software Configuration',
          takeaways: [
            'RGB synchronization across all components',
            'Software setup for unified lighting control',
            'Custom lighting profiles for different scenarios'
          ]
        },
        {
          timestamp: '16:30',
          title: 'Final Testing & Benchmarks',
          takeaways: [
            'Temperature testing under full load',
            'Benchmark scores compared to air cooling',
            'Noise level comparison'
          ]
        }
      ]
    }
  },
  {
    id: '4',
    title: 'Epic Travel Vlog: Hidden Paradise in Iceland',
    channel: 'Adventure Seekers',
    views: '742K',
    uploadTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    thumbnail: 'https://images.unsplash.com/photo-1489395131208-596c1ecb2a39',
    duration: '15:20',
    verified: true,
    description: 'Join me as I explore the most beautiful hidden spots in Iceland that tourists never see!',
    recap: {
      sections: [
        {
          timestamp: '0:00',
          title: 'Journey Begins - Reykjavik to Highlands',
          takeaways: [
            '4WD vehicle essential for highland access',
            'Best time to visit: July-September',
            'Camping gear and safety equipment required'
          ]
        },
        {
          timestamp: '3:10',
          title: 'First Hidden Spot - Secret Waterfall',
          takeaways: [
            'GPS coordinates: 64.1265° N, 21.8174° W',
            '2-hour hike from nearest road',
            'Bring waterproof gear - lots of mist and spray'
          ]
        },
        {
          timestamp: '6:45',
          title: 'Highland Hot Springs Discovery',
          takeaways: [
            'Natural geothermal pools at perfect temperature',
            'No facilities - wild camping experience',
            'Respect nature - leave no trace principles'
          ]
        },
        {
          timestamp: '9:20',
          title: 'Glacier Lagoon Off the Beaten Path',
          takeaways: [
            'Alternative to crowded Jökulsárlón',
            'Incredible ice formations and crystal caves',
            'Photography tips for capturing ice and light'
          ]
        },
        {
          timestamp: '12:15',
          title: 'Northern Lights Planning & Tips',
          takeaways: [
            'Best aurora viewing spots away from light pollution',
            'Aurora forecast apps and timing strategies',
            'Camera settings for northern lights photography'
          ]
        }
      ]
    }
  },
  {
    id: '5',
    title: 'Easy Cooking Hacks Every Beginner Should Know',
    channel: 'Chef\'s Corner',
    views: '1.2M',
    uploadTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    thumbnail: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98',
    duration: '8:15',
    verified: false,
    description: 'Master these 15 cooking hacks and you\'ll cook like a pro chef in no time!',
    recap: {
      sections: [
        {
          timestamp: '0:00',
          title: 'Kitchen Setup & Knife Skills',
          takeaways: [
            'Sharp knives are safer than dull ones',
            'Proper cutting board selection and care',
            'Basic knife grip and cutting techniques'
          ]
        },
        {
          timestamp: '2:20',
          title: 'Time-Saving Prep Hacks',
          takeaways: [
            'Mise en place - prep everything before cooking',
            'Garlic peeling trick using two bowls',
            'Quick tomato peeling with boiling water method'
          ]
        },
        {
          timestamp: '4:15',
          title: 'Cooking Temperature Secrets',
          takeaways: [
            'When to use high, medium, and low heat',
            'Visual cues for oil temperature without thermometer',
            'Resting meat is crucial for juiciness'
          ]
        },
        {
          timestamp: '6:30',
          title: 'Seasoning & Flavor Building',
          takeaways: [
            'Salt early and often for better flavor penetration',
            'Layer flavors throughout cooking process',
            'Fresh herbs vs dried herbs - when to use each'
          ]
        }
      ]
    }
  },
  {
    id: '6',
    title: 'Dual Monitor Gaming Setup - Complete Guide',
    channel: 'Setup Masters',
    views: '945K',
    uploadTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    thumbnail: 'https://images.unsplash.com/photo-1675049626914-b2e051e92f23',
    duration: '14:30',
    verified: true,
    description: 'Everything you need to know about setting up the perfect dual monitor gaming station.',
    recap: {
      sections: [
        {
          timestamp: '0:00',
          title: 'Monitor Selection Criteria',
          takeaways: [
            'Match refresh rates for smooth experience',
            'Consider size differences - 27" + 24" combo works well',
            'Panel type importance: IPS vs VA vs TN'
          ]
        },
        {
          timestamp: '3:15',
          title: 'Hardware Requirements & Setup',
          takeaways: [
            'Graphics card needs multiple display outputs',
            'Monitor arm vs desk stands comparison',
            'Cable management solutions for clean setup'
          ]
        },
        {
          timestamp: '7:00',
          title: 'Software Configuration Windows',
          takeaways: [
            'Display settings optimization',
            'Gaming on primary, utilities on secondary',
            'Multi-monitor wallpaper setup tips'
          ]
        },
        {
          timestamp: '10:45',
          title: 'Gaming Optimization & Performance',
          takeaways: [
            'Which games benefit from dual monitors',
            'Performance impact analysis',
            'Best practices for competitive gaming'
          ]
        }
      ]
    }
  },
  {
    id: '7',
    title: 'Best Budget Gaming PC Build 2025',
    channel: 'Budget Builds',
    views: '2.5M',
    uploadTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    thumbnail: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b',
    duration: '16:45',
    verified: false,
    description: 'Building an amazing gaming PC for under $800 - you won\'t believe the performance!',
    recap: {
      sections: [
        {
          timestamp: '0:00',
          title: 'Budget Breakdown & Goals',
          takeaways: [
            'Total budget: $750 target price',
            '1080p gaming at 60+ FPS goal',
            'Future upgrade path considered'
          ]
        },
        {
          timestamp: '2:45',
          title: 'Component Selection Strategy',
          takeaways: [
            'AMD Ryzen 5 5600 - best budget CPU',
            'RTX 3060 or RX 6600 graphics options',
            'B450 motherboard for cost savings'
          ]
        },
        {
          timestamp: '6:20',
          title: 'Assembly Process & Tips',
          takeaways: [
            'Anti-static precautions during build',
            'RAM installation - ensure proper seating',
            'Cable management on budget case'
          ]
        },
        {
          timestamp: '11:30',
          title: 'Performance Testing & Games',
          takeaways: [
            'Modern games at medium-high settings',
            '60+ FPS achieved in most popular titles',
            'Upgrade priorities for future improvements'
          ]
        },
        {
          timestamp: '14:15',
          title: 'Money-Saving Tips',
          takeaways: [
            'When to buy used vs new components',
            'Best times of year for PC part sales',
            'Free software alternatives to expensive programs'
          ]
        }
      ]
    }
  },
  {
    id: '8',
    title: 'Sunset Cooking Over Campfire - Peaceful Vibes',
    channel: 'Outdoor Life',
    views: '623K',
    uploadTime: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    thumbnail: 'https://images.unsplash.com/photo-1579917571494-9b6f74f6e07d',
    duration: '22:10',
    verified: true,
    description: 'Join me for a peaceful evening cooking over an open fire as the sun sets over the mountains.',
    recap: {
      sections: [
        {
          timestamp: '0:00',
          title: 'Setting Up Camp & Fire Safety',
          takeaways: [
            'Choose safe location away from overhanging branches',
            'Fire ring setup and safety equipment needed',
            'Local fire regulations and permit requirements'
          ]
        },
        {
          timestamp: '4:30',
          title: 'Campfire Cooking Equipment',
          takeaways: [
            'Cast iron cookware advantages for open fire',
            'Tripod cooking setup vs grill grates',
            'Essential tools: long handles, heat-resistant gloves'
          ]
        },
        {
          timestamp: '8:15',
          title: 'Fire Management & Temperature Control',
          takeaways: [
            'Wood selection: hardwood vs softwood',
            'Creating cooking coals vs flames',
            'Adjusting heat by moving coals and cookware'
          ]
        },
        {
          timestamp: '12:45',
          title: 'Preparing the Sunset Feast',
          takeaways: [
            'Simple one-pot meals work best',
            'Prep ingredients before starting fire',
            'Cooking timing with sunset for perfect ambiance'
          ]
        },
        {
          timestamp: '18:20',
          title: 'Cleanup & Leave No Trace',
          takeaways: [
            'Proper fire extinguishing techniques',
            'Pack out all trash and food scraps',
            'Restore campsite to natural state'
          ]
        }
      ]
    }
  }
];

// Header Component
export const Header = ({ onMenuClick, onSearchChange, searchTerm, onOpenLogin, onOpenRegister }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-14">
        <div className="flex items-center justify-between px-4 h-full">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <Play size={16} className="text-white ml-0.5" />
              </div>
              <span className="text-xl font-semibold text-black">YouTube</span>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex items-center max-w-2xl flex-1 mx-8">
            <div className={`flex items-center flex-1 border rounded-full overflow-hidden transition-all ${
              isSearchFocused ? 'border-blue-500 shadow-md' : 'border-gray-300'
            }`}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="flex-1 px-4 py-2 outline-none"
              />
              <button className="px-6 py-2 bg-gray-50 border-l border-gray-300 hover:bg-gray-100 transition-colors">
                <Search size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Upload video"
                >
                  <Upload size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                  <Bell size={20} />
                  {user.notifications?.filter(n => !n.read).length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
                  )}
                </button>
                <UserMenu 
                  user={user} 
                  onLogout={logout}
                  onOpenSettings={() => console.log('Open settings')}
                />
              </>
            ) : (
              <>
                <button 
                  onClick={onOpenLogin}
                  className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  <LogIn size={16} />
                  <span className="text-sm font-medium">Sign in</span>
                </button>
                <button 
                  onClick={onOpenRegister}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  <UserPlus size={16} />
                  <span className="text-sm font-medium">Sign up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </>
  );
};

// Sidebar Component
export const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();
  
  const mainItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: TrendingUp, label: 'Trending' },
    { icon: Radio, label: 'Subscriptions' },
  ];

  const libraryItems = user ? [
    { icon: Library, label: 'Library' },
    { icon: History, label: 'History' },
    { icon: PlaySquare, label: 'Your videos' },
    { icon: Clock, label: 'Watch later', count: user.watchLater?.length },
    { icon: ThumbsUp, label: 'Liked videos', count: user.likedVideos?.length },
  ] : [];

  const subscriptions = user ? mockVideos
    .filter(video => user.subscribedChannels?.includes(video.id))
    .map(video => video.channel)
    .filter((channel, index, self) => self.indexOf(channel) === index)
    .slice(0, 6) : [];

  return (
    <aside className={`fixed left-0 top-14 h-[calc(100vh-56px)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
      isOpen ? 'w-60' : 'w-16'
    }`}>
      <div className="overflow-y-auto h-full py-3">
        {/* Main navigation */}
        <div className="px-3 mb-2">
          {mainItems.map((item, index) => (
            <motion.div
              key={item.label}
              whileHover={{ backgroundColor: '#f3f4f6' }}
              className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                item.active ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} className="text-gray-700" />
              {isOpen && <span className="ml-6 text-sm">{item.label}</span>}
            </motion.div>
          ))}
        </div>

        {isOpen && user && (
          <>
            <div className="border-t border-gray-200 my-3"></div>

            {/* Library section */}
            <div className="px-3 mb-2">
              {libraryItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon size={20} className="text-gray-700" />
                    <span className="ml-6 text-sm">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {subscriptions.length > 0 && (
              <>
                <div className="border-t border-gray-200 my-3"></div>

                {/* Subscriptions */}
                <div className="px-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2 px-3">
                    Subscriptions ({user.subscribedChannels?.length || 0})
                  </h3>
                  {subscriptions.map((channel, index) => (
                    <motion.div
                      key={channel}
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-semibold">
                          {channel.charAt(0)}
                        </span>
                      </div>
                      <span className="ml-6 text-sm truncate">{channel}</span>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {isOpen && !user && (
          <>
            <div className="border-t border-gray-200 my-3"></div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                Sign in to like videos, comment, and subscribe.
              </p>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                  <LogIn size={16} />
                  <span className="text-sm font-medium">Sign in</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

// Dynamic Recap Component
export const DynamicRecap = ({ video, onTimestampClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTimestampClick = (timestamp) => {
    if (onTimestampClick) {
      onTimestampClick(timestamp);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 overflow-hidden mb-6"
    >
      {/* Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                🔁 Dynamic Recap — AI-Powered Video Summary
              </h3>
              <p className="text-sm text-gray-600">
                Watch smarter. Skip the fluff. • {video.recap?.sections.length || 0} key sections
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} className="text-gray-600" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4">
          <div className="border-t border-blue-200 pt-4">
            {video.recap?.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4 last:mb-0 group"
              >
                <div className="flex items-start space-x-4">
                  {/* Timestamp */}
                  <button
                    onClick={() => handleTimestampClick(section.timestamp)}
                    className="flex-shrink-0 bg-white border border-blue-300 hover:border-blue-500 hover:bg-blue-50 px-3 py-1 rounded-full text-sm font-medium text-blue-700 transition-colors group-hover:shadow-md"
                  >
                    📍 {section.timestamp}
                  </button>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                      {section.title}
                    </h4>
                    <ul className="space-y-1">
                      {section.takeaways.map((takeaway, takeawayIndex) => (
                        <li key={takeawayIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                          <span className="text-blue-500 mt-1">🔑</span>
                          <span className="group-hover:text-gray-900 transition-colors">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {index < video.recap.sections.length - 1 && (
                  <div className="border-b border-blue-100 mt-4"></div>
                )}
              </motion.div>
            ))}
            
            {/* Footer */}
            <div className="mt-6 p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Zap size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">AI-Powered Summary</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    <SkipForward size={14} />
                    <span>Jump to highlights</span>
                  </button>
                  <div className="text-xs text-gray-500">
                    Generated in 2.3s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Video Card Component
export const VideoCard = ({ video, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="cursor-pointer group"
      onClick={() => onClick(video)}
    >
      <div className="relative">
        <img
          src={`${video.thumbnail}?w=320&h=180&fit=crop`}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      
      <div className="mt-3 flex space-x-3">
        <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm text-white font-semibold">
            {video.channel.charAt(0)}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {video.title}
          </h3>
          <div className="mt-1">
            <p className="text-xs text-gray-600 hover:text-gray-900 cursor-pointer">
              {video.channel} {video.verified && <span className="text-gray-400">✓</span>}
            </p>
            <p className="text-xs text-gray-600">
              {video.views} views • {formatDistanceToNow(video.uploadTime)} ago
            </p>
          </div>
        </div>
        
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all">
          <MoreVertical size={16} className="text-gray-600" />
        </button>
      </div>
    </motion.div>
  );
};

// Video Grid Component
export const VideoGrid = ({ videos, onVideoClick, searchTerm }) => {
  // Filter videos based on search term
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {filteredVideos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={onVideoClick}
        />
      ))}
    </div>
  );
};

// Video Player Component
export const VideoPlayer = ({ video, onBack }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: 'TechEnthusiast2025',
      comment: 'Amazing setup! That RGB lighting is insane 🔥',
      time: '2 hours ago',
      likes: 45
    },
    {
      id: 2,
      user: 'GamerGirl_X',
      comment: 'This is exactly the setup I\'ve been dreaming of. Great video!',
      time: '5 hours ago',
      likes: 23
    },
    {
      id: 3,
      user: 'PCBuilder_Pro',
      comment: 'Love the cable management! So clean 👌',
      time: '1 day ago',
      likes: 12
    }
  ];

  // Generate YouTube embed URL (mock)
  const videoId = 'dQw4w9WgXcQ'; // Mock video ID
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&rel=0`;

  // Handle timestamp clicks from Dynamic Recap
  const handleTimestampClick = (timestamp) => {
    // Convert timestamp to seconds (this is a mock implementation)
    const [minutes, seconds] = timestamp.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    
    // In a real implementation, you would seek the video to this time
    console.log(`Seeking to ${totalSeconds} seconds (${timestamp})`);
    
    // Show a notification to user (mock)
    alert(`Jumping to ${timestamp} - ${video.recap?.sections.find(s => s.timestamp === timestamp)?.title || 'Unknown section'}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Back to videos
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main video section */}
        <div className="lg:col-span-2">
          {/* Video player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Video info */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-3">
              {video.title}
            </h1>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {video.channel.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {video.channel} {video.verified && <span className="text-gray-400">✓</span>}
                  </p>
                  <p className="text-sm text-gray-600">{Math.floor(Math.random() * 500 + 100)}K subscribers</p>
                </div>
                <button
                  onClick={() => setSubscribed(!subscribed)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    subscribed 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                  <button
                    onClick={() => {
                      setLiked(!liked);
                      if (disliked) setDisliked(false);
                    }}
                    className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                      liked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsUp size={16} />
                    <span className="text-sm">{Math.floor(Math.random() * 50 + 10)}K</span>
                  </button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <button
                    onClick={() => {
                      setDisliked(!disliked);
                      if (liked) setLiked(false);
                    }}
                    className={`px-4 py-2 transition-colors ${
                      disliked ? 'bg-red-100 text-red-600' : 'hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsDown size={16} />
                  </button>
                </div>
                
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex items-center space-x-2">
                  <Share size={16} />
                  <span className="text-sm">Share</span>
                </button>
                
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex items-center space-x-2">
                  <Download size={16} />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
            
            {/* Video description */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span>{video.views} views</span>
                <span>{formatDistanceToNow(video.uploadTime)} ago</span>
              </div>
              <p className="text-gray-800">{video.description}</p>
            </div>

            {/* Dynamic Recap Component */}
            {video.recap && (
              <DynamicRecap 
                video={video} 
                onTimestampClick={handleTimestampClick}
              />
            )}
            
            {/* Comments section */}
            <div className="mt-8">
              <div className="flex items-center space-x-4 mb-6">
                <h3 className="text-lg font-medium">Comments</h3>
                <span className="text-gray-600">{comments.length}</span>
              </div>
              
              {/* Add comment */}
              <div className="flex space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full border-b border-gray-300 focus:border-gray-900 outline-none py-2 bg-transparent"
                  />
                </div>
              </div>
              
              {/* Comments list */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {comment.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{comment.user}</span>
                        <span className="text-xs text-gray-600">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-2">{comment.comment}</p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                          <ThumbsUp size={14} />
                          <span className="text-xs">{comment.likes}</span>
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                          <ThumbsDown size={14} />
                        </button>
                        <button className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommendations sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-medium mb-4">Recommended</h3>
          <div className="space-y-3">
            {mockVideos.filter(v => v.id !== video.id).slice(0, 10).map((relatedVideo) => (
              <motion.div
                key={relatedVideo.id}
                whileHover={{ scale: 1.02 }}
                className="flex space-x-2 cursor-pointer group"
                onClick={() => window.location.reload()}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={`${relatedVideo.thumbnail}?w=168&h=94&fit=crop`}
                    alt={relatedVideo.title}
                    className="w-42 h-24 object-cover rounded"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {relatedVideo.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {relatedVideo.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">{relatedVideo.channel}</p>
                  <p className="text-xs text-gray-600">
                    {relatedVideo.views} views • {formatDistanceToNow(relatedVideo.uploadTime)} ago
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};