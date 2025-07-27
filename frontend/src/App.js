import React, { useState, useEffect } from 'react';
import './App.css';
import { Header, Sidebar, VideoGrid, VideoPlayer, mockVideos } from './components';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        onMenuClick={toggleSidebar}
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
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
    </div>
  );
}

export default App;