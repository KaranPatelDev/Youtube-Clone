import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider } from './auth';
import { Header, Sidebar, VideoGrid, VideoPlayer, mockVideos } from './components';
import { LoginModal, RegisterModal } from './modals';
import {
  HomeSection,
  TrendingSection,
  SubscriptionsSection,
  LibrarySection,
  HistorySection,
  YourVideosSection,
  WatchLaterSection,
  LikedVideosSection
} from './sections';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  // Handle video selection
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  // Handle going back to video grid
  const handleBack = () => {
    setSelectedVideo(null);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle search
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    // Always return to home section when searching
    if (currentSection !== 'home') {
      setCurrentSection('home');
    }
    // Reset to grid view when searching
    if (selectedVideo) {
      setSelectedVideo(null);
    }
  };

  // Handle section change
  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setSelectedVideo(null); // Reset video selection when changing sections
    setSearchTerm(''); // Clear search when changing sections
  };

  // Open login modal
  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  // Open register modal
  const openRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  // Close all modals
  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  // Render current section
  const renderCurrentSection = () => {
    if (selectedVideo) {
      return <VideoPlayer video={selectedVideo} onBack={handleBack} />;
    }

    switch (currentSection) {
      case 'trending':
        return <TrendingSection onVideoClick={handleVideoClick} />;
      case 'subscriptions':
        return <SubscriptionsSection onVideoClick={handleVideoClick} />;
      case 'library':
        return <LibrarySection onVideoClick={handleVideoClick} />;
      case 'history':
        return <HistorySection onVideoClick={handleVideoClick} />;
      case 'your-videos':
        return <YourVideosSection onVideoClick={handleVideoClick} />;
      case 'watch-later':
        return <WatchLaterSection onVideoClick={handleVideoClick} />;
      case 'liked-videos':
        return <LikedVideosSection onVideoClick={handleVideoClick} />;
      case 'home':
      default:
        return <HomeSection onVideoClick={handleVideoClick} searchTerm={searchTerm} />;
    }
  };

  // Get section title for display
  const getSectionTitle = () => {
    switch (currentSection) {
      case 'trending':
        return 'Trending';
      case 'subscriptions':
        return 'Subscriptions';
      case 'library':
        return 'Library';
      case 'history':
        return 'History';
      case 'your-videos':
        return 'Your Videos';
      case 'watch-later':
        return 'Watch Later';
      case 'liked-videos':
        return 'Liked Videos';
      case 'home':
      default:
        return searchTerm ? `Search results for "${searchTerm}"` : 'Home';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        onMenuClick={toggleSidebar}
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        onOpenLogin={openLoginModal}
        onOpenRegister={openRegisterModal}
      />
      
      {/* Main content area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />
        
        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 pt-14 ${
          sidebarOpen ? 'ml-60' : 'ml-16'
        }`}>
          <div className="p-6">
            {renderCurrentSection()}
          </div>
        </main>
      </div>

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={closeModals}
      />
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={closeModals}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;