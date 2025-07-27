import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Filter, 
  Grid, 
  List, 
  MoreVertical, 
  Clock, 
  Eye,
  ThumbsUp,
  Share,
  Download,
  Trash2,
  Edit,
  Plus,
  Search,
  Calendar,
  PlayCircle,
  Users,
  Fire,
  Star,
  Settings,
  SortAsc,
  SortDesc,
  CheckSquare,
  X,
  RefreshCw
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from './auth';
import { mockVideos, VideoCard } from './components';

// Home Section (Default video grid)
export const HomeSection = ({ onVideoClick, searchTerm }) => {
  const { user, addToWatchHistory } = useAuth();
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('recent'); // recent, popular, duration
  
  const handleVideoClick = (video) => {
    if (user) {
      addToWatchHistory(video.id);
    }
    onVideoClick(video);
  };

  // Sort videos based on selected criteria
  const sortedVideos = [...mockVideos].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return parseInt(b.views.replace(/[KM]/g, '')) - parseInt(a.views.replace(/[KM]/g, ''));
      case 'duration':
        const aDuration = a.duration.split(':').reduce((acc, time) => (60 * acc) + +time);
        const bDuration = b.duration.split(':').reduce((acc, time) => (60 * acc) + +time);
        return bDuration - aDuration;
      default:
        return b.uploadTime - a.uploadTime;
    }
  });

  // Filter videos based on search term
  const filteredVideos = sortedVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {searchTerm ? `Search results for "${searchTerm}"` : 'Recommended'}
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredVideos.length} videos
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="duration">Longest Duration</option>
          </select>
          
          {/* View mode toggle */}
          <div className="flex items-center bg-gray-100 rounded-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Video grid/list */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={handleVideoClick}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.01 }}
              className="flex space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={`${video.thumbnail}?w=200&h=112&fit=crop`}
                  alt={video.title}
                  className="w-50 h-28 object-cover rounded"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{video.channel}</p>
                <p className="text-xs text-gray-500">
                  {video.views} views • {formatDistanceToNow(video.uploadTime)} ago
                </p>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Trending Section
export const TrendingSection = ({ onVideoClick }) => {
  const [category, setCategory] = useState('all');
  const [timeframe, setTimeframe] = useState('today');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'music', name: 'Music' },
    { id: 'tech', name: 'Technology' },
    { id: 'cooking', name: 'Food & Cooking' },
    { id: 'travel', name: 'Travel' }
  ];

  // Mock trending algorithm - sort by views with some randomization
  const trendingVideos = [...mockVideos]
    .sort((a, b) => {
      const aViews = parseInt(a.views.replace(/[KM]/g, '')) * (a.views.includes('M') ? 1000 : 1);
      const bViews = parseInt(b.views.replace(/[KM]/g, '')) * (b.views.includes('M') ? 1000 : 1);
      return bViews - aViews + Math.random() * 100;
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Fire className="text-red-500" size={24} />
            <h1 className="text-2xl font-semibold text-gray-900">Trending</h1>
          </div>
          
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              category === cat.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Trending videos with rankings */}
      <div className="space-y-4">
        {trendingVideos.slice(0, 10).map((video, index) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.01 }}
            className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer"
            onClick={() => onVideoClick(video)}
          >
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                index === 0 ? 'bg-yellow-500' : 
                index === 1 ? 'bg-gray-400' :
                index === 2 ? 'bg-yellow-700' : 'bg-gray-600'
              }`}>
                #{index + 1}
              </div>
            </div>
            
            <div className="relative flex-shrink-0">
              <img
                src={`${video.thumbnail}?w=120&h=68&fit=crop`}
                alt={video.title}
                className="w-30 h-17 object-cover rounded"
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600">{video.channel}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                <span>{video.views} views</span>
                <span>{formatDistanceToNow(video.uploadTime)} ago</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp size={12} />
                  <span>+{Math.floor(Math.random() * 500 + 100)}% growth</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Subscriptions Section
export const SubscriptionsSection = ({ onVideoClick }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Don't miss new videos</h2>
        <p className="text-gray-600">Sign in to see updates from your favorite YouTube channels</p>
      </div>
    );
  }

  const subscribedVideos = mockVideos.filter(video => 
    user.subscribedChannels?.includes(video.id)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Subscriptions</h1>
          <span className="text-gray-600">({user.subscribedChannels?.length || 0} channels)</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-md transition-colors ${
              filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`px-3 py-2 rounded-md transition-colors ${
              filter === 'today' ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter('unwatched')}
            className={`px-3 py-2 rounded-md transition-colors ${
              filter === 'unwatched' ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Unwatched
          </button>
        </div>
      </div>

      {subscribedVideos.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No subscriptions yet</h2>
          <p className="text-gray-600">Subscribe to channels to see their latest videos here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {subscribedVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={onVideoClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Library Section
export const LibrarySection = ({ onVideoClick }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('recent');
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <PlayCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Enjoy your favorite videos</h2>
        <p className="text-gray-600">Sign in to access your library of saved videos and playlists</p>
      </div>
    );
  }

  const tabs = [
    { id: 'recent', name: 'Recently watched', count: user.watchHistory?.length || 0 },
    { id: 'liked', name: 'Liked videos', count: user.likedVideos?.length || 0 },
    { id: 'watchlater', name: 'Watch later', count: user.watchLater?.length || 0 },
    { id: 'playlists', name: 'Playlists', count: user.playlists?.length || 0 }
  ];

  const getVideosForTab = (tabId) => {
    switch (tabId) {
      case 'recent':
        return mockVideos.filter(video => user.watchHistory?.includes(video.id));
      case 'liked':
        return mockVideos.filter(video => user.likedVideos?.includes(video.id));
      case 'watchlater':
        return mockVideos.filter(video => user.watchLater?.includes(video.id));
      default:
        return [];
    }
  };

  const currentVideos = getVideosForTab(activeTab);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Library</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentVideos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'recent' && <Clock size={24} className="text-gray-400" />}
                {activeTab === 'liked' && <ThumbsUp size={24} className="text-gray-400" />}
                {activeTab === 'watchlater' && <Clock size={24} className="text-gray-400" />}
                {activeTab === 'playlists' && <PlayCircle size={24} className="text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {tabs.find(t => t.id === activeTab)?.name.toLowerCase()} yet
              </h3>
              <p className="text-gray-600">
                {activeTab === 'recent' && 'Videos you watch will appear here'}
                {activeTab === 'liked' && 'Videos you like will appear here'}
                {activeTab === 'watchlater' && 'Videos you save for later will appear here'}
                {activeTab === 'playlists' && 'Create playlists to organize your videos'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {currentVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={onVideoClick}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// History Section
export const HistorySection = ({ onVideoClick }) => {
  const { user } = useAuth();
  const [searchHistory, setSearchHistory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showControls, setShowControls] = useState(false);

  if (!user) {
    return (
      <div className="text-center py-12">
        <Clock size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Keep track of what you watch</h2>
        <p className="text-gray-600">Watch history isn't viewable when signed out</p>
      </div>
    );
  }

  const historyVideos = mockVideos.filter(video => 
    user.watchHistory?.includes(video.id)
  ).filter(video =>
    video.title.toLowerCase().includes(searchHistory.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchHistory.toLowerCase())
  );

  const toggleSelection = (videoId) => {
    setSelectedItems(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const selectAll = () => {
    setSelectedItems(historyVideos.map(v => v.id));
  };

  const clearSelected = () => {
    setSelectedItems([]);
  };

  const deleteSelected = () => {
    // In real app, this would update the backend
    alert(`Deleted ${selectedItems.length} videos from history`);
    setSelectedItems([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Watch history</h1>
          <span className="text-gray-600">({historyVideos.length} videos)</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchHistory}
              onChange={(e) => setSearchHistory(e.target.value)}
              placeholder="Search watch history"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <button
            onClick={() => setShowControls(!showControls)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center space-x-2"
          >
            <Settings size={16} />
            <span>Manage</span>
          </button>
        </div>
      </div>

      {/* Bulk controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {selectedItems.length} selected
                </span>
                <button
                  onClick={selectAll}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Select all
                </button>
                <button
                  onClick={clearSelected}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear selection
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={deleteSelected}
                  disabled={selectedItems.length === 0}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History list */}
      <div className="space-y-4">
        {historyVideos.length === 0 ? (
          <div className="text-center py-12">
            <Clock size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No watch history</h3>
            <p className="text-gray-600">Videos you watch will appear here</p>
          </div>
        ) : (
          historyVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              {showControls && (
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(video.id)}
                    onChange={() => toggleSelection(video.id)}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                </div>
              )}
              
              <div 
                className="flex items-center space-x-4 flex-1 cursor-pointer"
                onClick={() => onVideoClick(video)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={`${video.thumbnail}?w=120&h=68&fit=crop`}
                    alt={video.title}
                    className="w-30 h-17 object-cover rounded"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">{video.channel}</p>
                  <p className="text-xs text-gray-500">
                    Watched {formatDistanceToNow(video.uploadTime)} ago
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// Your Videos Section
export const YourVideosSection = ({ onVideoClick }) => {
  const { user } = useAuth();
  const [tab, setTab] = useState('uploads');
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <PlayCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Share your story</h2>
        <p className="text-gray-600">Sign in to upload and manage your videos</p>
      </div>
    );
  }

  // Mock user's uploaded videos
  const userVideos = mockVideos.slice(0, 3).map(video => ({
    ...video,
    channel: user.username,
    isOwned: true,
    views: Math.floor(Math.random() * 10000),
    status: 'published'
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Your videos</h1>
        
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus size={16} />
            <span>Upload video</span>
          </button>
          
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center space-x-2">
            <Edit size={16} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setTab('uploads')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              tab === 'uploads'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Uploads ({userVideos.length})
          </button>
          <button
            onClick={() => setTab('analytics')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              tab === 'analytics'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {tab === 'uploads' ? (
        <div className="space-y-4">
          {userVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={`${video.thumbnail}?w=120&h=68&fit=crop`}
                  alt={video.title}
                  className="w-30 h-17 object-cover rounded"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900">{video.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center space-x-1">
                    <Eye size={12} />
                    <span>{video.views.toLocaleString()} views</span>
                  </span>
                  <span>Published {formatDistanceToNow(video.uploadTime)} ago</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {video.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <MoreVertical size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Views</h3>
              <Eye className="text-gray-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {userVideos.reduce((sum, v) => sum + v.views, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">+12% from last month</p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Subscribers</h3>
              <Users className="text-gray-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-600">1,247</p>
            <p className="text-sm text-gray-600 mt-2">+8 this week</p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Watch Time</h3>
              <Clock className="text-gray-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-purple-600">2.4K hrs</p>
            <p className="text-sm text-gray-600 mt-2">Average: 4.2 min/view</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Watch Later Section  
export const WatchLaterSection = ({ onVideoClick }) => {
  const { user, toggleWatchLater } = useAuth();
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('added');

  if (!user) {
    return (
      <div className="text-center py-12">
        <Clock size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Save videos for later</h2>
        <p className="text-gray-600">Sign in to create your Watch Later playlist</p>
      </div>
    );
  }

  const watchLaterVideos = mockVideos.filter(video => 
    user.watchLater?.includes(video.id)
  );

  const removeFromWatchLater = (videoId) => {
    toggleWatchLater(videoId);
  };

  const clearAll = () => {
    watchLaterVideos.forEach(video => toggleWatchLater(video.id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Watch later</h1>
          <span className="text-gray-600">({watchLaterVideos.length} videos)</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="added">Date added</option>
            <option value="duration">Duration</option>
            <option value="title">Title</option>
          </select>
          
          {watchLaterVideos.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center space-x-2"
            >
              <Trash2 size={16} />
              <span>Clear all</span>
            </button>
          )}
        </div>
      </div>

      {watchLaterVideos.length === 0 ? (
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No videos saved</h3>
          <p className="text-gray-600">Save videos to watch them later</p>
        </div>
      ) : (
        <div className="space-y-4">
          {watchLaterVideos.map((video, index) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all group"
            >
              <div className="flex-shrink-0 text-gray-400 font-medium">
                #{index + 1}
              </div>
              
              <div 
                className="flex items-center space-x-4 flex-1 cursor-pointer"
                onClick={() => onVideoClick(video)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={`${video.thumbnail}?w=120&h=68&fit=crop`}
                    alt={video.title}
                    className="w-30 h-17 object-cover rounded"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">{video.channel}</p>
                  <p className="text-xs text-gray-500">
                    {video.views} views • {formatDistanceToNow(video.uploadTime)} ago
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => removeFromWatchLater(video.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                title="Remove from Watch Later"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Liked Videos Section
export const LikedVideosSection = ({ onVideoClick }) => {
  const { user, toggleLikeVideo } = useAuth();
  const [sortBy, setSortBy] = useState('liked');
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <ThumbsUp size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Keep track of videos you like</h2>
        <p className="text-gray-600">Sign in to see your liked videos</p>
      </div>
    );
  }

  const likedVideos = mockVideos.filter(video => 
    user.likedVideos?.includes(video.id)
  );

  const removeFromLiked = (videoId) => {
    toggleLikeVideo(videoId);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Liked videos</h1>
          <span className="text-gray-600">({likedVideos.length} videos)</span>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="liked">Date liked</option>
          <option value="published">Date published</option>
          <option value="popular">Most popular</option>
        </select>
      </div>

      {likedVideos.length === 0 ? (
        <div className="text-center py-12">
          <ThumbsUp size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No liked videos yet</h3>
          <p className="text-gray-600">Videos you like will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {likedVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all group"
            >
              <div 
                className="flex items-center space-x-4 flex-1 cursor-pointer"
                onClick={() => onVideoClick(video)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={`${video.thumbnail}?w=120&h=68&fit=crop`}
                    alt={video.title}
                    className="w-30 h-17 object-cover rounded"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">{video.channel}</p>
                  <p className="text-xs text-gray-500">
                    {video.views} views • {formatDistanceToNow(video.uploadTime)} ago
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => removeFromLiked(video.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-blue-600 hover:text-red-600 hover:bg-red-50 rounded transition-all flex items-center space-x-1"
                title="Unlike video"
              >
                <ThumbsUp size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};