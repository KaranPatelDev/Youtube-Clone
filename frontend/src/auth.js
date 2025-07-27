import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Mock users data
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@youtube.com',
    password: 'demo123',
    username: 'DemoUser',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    subscribedChannels: ['2', '3'],
    likedVideos: ['1', '3'],
    dislikedVideos: [],
    watchHistory: ['1', '2', '3'],
    watchLater: ['4', '5'],
    playlists: [
      {
        id: '1',
        name: 'Gaming Favorites',
        videos: ['1', '3', '7'],
        isPublic: true
      }
    ],
    notifications: [
      {
        id: '1',
        type: 'new_video',
        message: 'TechGamer Pro uploaded a new video',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false
      }
    ]
  }
];

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('youtube_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Don't store password in session
      setUser(userData);
      localStorage.setItem('youtube_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  // Register function
  const register = (userData) => {
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password,
      username: userData.username,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      subscribedChannels: [],
      likedVideos: [],
      dislikedVideos: [],
      watchHistory: [],
      watchLater: [],
      playlists: [],
      notifications: []
    };

    MOCK_USERS.push(newUser);
    const userForSession = { ...newUser };
    delete userForSession.password;
    setUser(userForSession);
    localStorage.setItem('youtube_user', JSON.stringify(userForSession));
    return { success: true };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('youtube_user');
  };

  // Update user data
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('youtube_user', JSON.stringify(updatedUser));
  };

  // Like video
  const toggleLikeVideo = (videoId) => {
    if (!user) return;

    const likedVideos = [...(user.likedVideos || [])];
    const dislikedVideos = [...(user.dislikedVideos || [])];

    // Remove from disliked if present
    const dislikedIndex = dislikedVideos.indexOf(videoId);
    if (dislikedIndex > -1) {
      dislikedVideos.splice(dislikedIndex, 1);
    }

    // Toggle liked status
    const likedIndex = likedVideos.indexOf(videoId);
    if (likedIndex > -1) {
      likedVideos.splice(likedIndex, 1);
    } else {
      likedVideos.push(videoId);
    }

    updateUser({ likedVideos, dislikedVideos });
  };

  // Dislike video
  const toggleDislikeVideo = (videoId) => {
    if (!user) return;

    const likedVideos = [...(user.likedVideos || [])];
    const dislikedVideos = [...(user.dislikedVideos || [])];

    // Remove from liked if present
    const likedIndex = likedVideos.indexOf(videoId);
    if (likedIndex > -1) {
      likedVideos.splice(likedIndex, 1);
    }

    // Toggle disliked status
    const dislikedIndex = dislikedVideos.indexOf(videoId);
    if (dislikedIndex > -1) {
      dislikedVideos.splice(dislikedIndex, 1);
    } else {
      dislikedVideos.push(videoId);
    }

    updateUser({ likedVideos, dislikedVideos });
  };

  // Subscribe to channel
  const toggleSubscription = (channelId) => {
    if (!user) return;

    const subscribedChannels = [...(user.subscribedChannels || [])];
    const index = subscribedChannels.indexOf(channelId);
    
    if (index > -1) {
      subscribedChannels.splice(index, 1);
    } else {
      subscribedChannels.push(channelId);
    }

    updateUser({ subscribedChannels });
  };

  // Add to watch history
  const addToWatchHistory = (videoId) => {
    if (!user) return;

    const watchHistory = [...(user.watchHistory || [])];
    const index = watchHistory.indexOf(videoId);
    
    // Remove if already present (to move to front)
    if (index > -1) {
      watchHistory.splice(index, 1);
    }
    
    // Add to beginning
    watchHistory.unshift(videoId);
    
    // Keep only last 50 videos
    if (watchHistory.length > 50) {
      watchHistory.splice(50);
    }

    updateUser({ watchHistory });
  };

  // Toggle watch later
  const toggleWatchLater = (videoId) => {
    if (!user) return;

    const watchLater = [...(user.watchLater || [])];
    const index = watchLater.indexOf(videoId);
    
    if (index > -1) {
      watchLater.splice(index, 1);
    } else {
      watchLater.push(videoId);
    }

    updateUser({ watchLater });
  };

  // Add comment
  const addComment = (videoId, commentText) => {
    if (!user) return null;

    const newComment = {
      id: Date.now().toString(),
      videoId,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      text: commentText,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      likedBy: []
    };

    // In a real app, this would be sent to backend
    // For now, we'll store in localStorage
    const comments = JSON.parse(localStorage.getItem('youtube_comments') || '[]');
    comments.push(newComment);
    localStorage.setItem('youtube_comments', JSON.stringify(comments));

    return newComment;
  };

  // Get comments for video
  const getCommentsForVideo = (videoId) => {
    const comments = JSON.parse(localStorage.getItem('youtube_comments') || '[]');
    return comments.filter(comment => comment.videoId === videoId);
  };

  // Like comment
  const toggleLikeComment = (commentId) => {
    if (!user) return;

    const comments = JSON.parse(localStorage.getItem('youtube_comments') || '[]');
    const commentIndex = comments.findIndex(c => c.id === commentId);
    
    if (commentIndex > -1) {
      const comment = comments[commentIndex];
      const likedBy = comment.likedBy || [];
      const userIndex = likedBy.indexOf(user.id);
      
      if (userIndex > -1) {
        likedBy.splice(userIndex, 1);
        comment.likes = Math.max(0, comment.likes - 1);
      } else {
        likedBy.push(user.id);
        comment.likes = (comment.likes || 0) + 1;
      }
      
      comment.likedBy = likedBy;
      localStorage.setItem('youtube_comments', JSON.stringify(comments));
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    toggleLikeVideo,
    toggleDislikeVideo,
    toggleSubscription,
    addToWatchHistory,
    toggleWatchLater,
    addComment,
    getCommentsForVideo,
    toggleLikeComment,
    isVideoLiked: (videoId) => user?.likedVideos?.includes(videoId) || false,
    isVideoDisliked: (videoId) => user?.dislikedVideos?.includes(videoId) || false,
    isSubscribed: (channelId) => user?.subscribedChannels?.includes(channelId) || false,
    isInWatchLater: (videoId) => user?.watchLater?.includes(videoId) || false
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};