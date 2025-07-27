import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider } from './auth';
import { Header, Sidebar, VideoGrid, VideoPlayer, mockVideos } from './components';
import { LoginModal, RegisterModal } from './modals';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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
    // Reset to grid view when searching
    if (selectedVideo) {
      setSelectedVideo(null);
    }
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
        <Sidebar isOpen={sidebarOpen} />
        
        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 pt-14 ${
          sidebarOpen ? 'ml-60' : 'ml-16'
        }`}>
          <div className="p-6">
            {selectedVideo ? (
              <VideoPlayer 
                video={selectedVideo} 
                onBack={handleBack}
              />
            ) : (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    {searchTerm ? `Search results for "${searchTerm}"` : 'Recommended'}
                  </h1>
                  {searchTerm && (
                    <p className="text-gray-600">
                      Found {mockVideos.filter(video =>
                        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        video.channel.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length} results
                    </p>
                  )}
                </div>
                <VideoGrid 
                  videos={mockVideos} 
                  onVideoClick={handleVideoClick}
                  searchTerm={searchTerm}
                />
              </>
            )}
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