import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

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
    description: 'Welcome to the most insane gaming setup tour you\'ve ever seen! In this video, I\'ll show you my complete 2025 gaming battlestation...'
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
    description: 'This simple pasta recipe has been passed down through generations in my Italian family...'
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
    description: 'Building the ultimate RGB gaming PC with custom water cooling loop. This beast can handle anything!'
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
    description: 'Join me as I explore the most beautiful hidden spots in Iceland that tourists never see!'
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
    description: 'Master these 15 cooking hacks and you\'ll cook like a pro chef in no time!'
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
    description: 'Everything you need to know about setting up the perfect dual monitor gaming station.'
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
    description: 'Building an amazing gaming PC for under $800 - you won\'t believe the performance!'
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
    description: 'Join me for a peaceful evening cooking over an open fire as the sun sets over the mountains.'
  }
];

// Header Component
export const Header = ({ onMenuClick, onSearchChange, searchTerm }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
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
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar = ({ isOpen }) => {
  const mainItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: TrendingUp, label: 'Trending' },
    { icon: Radio, label: 'Subscriptions' },
  ];

  const libraryItems = [
    { icon: Library, label: 'Library' },
    { icon: History, label: 'History' },
    { icon: PlaySquare, label: 'Your videos' },
    { icon: Clock, label: 'Watch later' },
    { icon: ThumbsUp, label: 'Liked videos' },
  ];

  const subscriptions = [
    'TechGamer Pro',
    'QuickCook Kitchen', 
    'PC Master Race',
    'Adventure Seekers',
    'Chef\'s Corner',
    'Setup Masters'
  ];

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

        {isOpen && (
          <>
            <div className="border-t border-gray-200 my-3"></div>

            {/* Library section */}
            <div className="px-3 mb-2">
              {libraryItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <item.icon size={20} className="text-gray-700" />
                  <span className="ml-6 text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            {/* Subscriptions */}
            <div className="px-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2 px-3">Subscriptions</h3>
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
      </div>
    </aside>
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
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span>{video.views} views</span>
                <span>{formatDistanceToNow(video.uploadTime)} ago</span>
              </div>
              <p className="text-gray-800">{video.description}</p>
            </div>
            
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