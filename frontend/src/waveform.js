import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  Repeat,
  Shuffle,
  Download,
  Share,
  Heart
} from 'lucide-react';

// Waveform Visualizer Component
export const WaveformVisualizer = ({ 
  isPlaying = false, 
  currentTime = 0, 
  duration = 100,
  onTogglePlay,
  waveformData = [],
  activeColor = '#3B82F6',
  inactiveColor = '#E5E7EB',
  height = 80
}) => {
  const canvasRef = useRef(null);
  const [animationId, setAnimationId] = useState(null);

  // Generate mock waveform data if not provided
  useEffect(() => {
    if (waveformData.length === 0) {
      // Generate some sample waveform data
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const centerY = height / 2;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw waveform bars
        const barWidth = 3;
        const barSpacing = 1;
        const totalBars = Math.floor(width / (barWidth + barSpacing));
        
        for (let i = 0; i < totalBars; i++) {
          const x = i * (barWidth + barSpacing);
          const progress = i / totalBars;
          const isActive = progress <= (currentTime / duration);
          
          // Generate varying heights for waveform effect
          const amplitude = Math.random() * 0.7 + 0.3;
          const barHeight = (height * amplitude) / 2;
          
          ctx.fillStyle = isActive ? activeColor : inactiveColor;
          ctx.fillRect(x, centerY - barHeight/2, barWidth, barHeight);
        }
      }
    }
  }, [currentTime, duration, activeColor, inactiveColor, height, waveformData]);

  // Animation effect when playing
  useEffect(() => {
    if (isPlaying && canvasRef.current) {
      const animate = () => {
        // Add some animation effects here if needed
        setAnimationId(requestAnimationFrame(animate));
      };
      animate();
    } else if (animationId) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying, animationId]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const progress = x / canvas.width;
    const newTime = progress * duration;
    
    // This would typically seek to the clicked position
    console.log(`Seeking to: ${newTime}s`);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        className="w-full cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleCanvasClick}
      />
      {isPlaying && (
        <motion.div
          className="absolute top-0 left-0 w-1 h-full bg-red-500 opacity-75"
          animate={{ x: `${(currentTime / duration) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      )}
    </div>
  );
};

// Audio Player Component with Waveform
export const AudioPlayer = ({ 
  track = {
    title: "Sample Audio Track",
    artist: "Demo Artist",
    duration: 180,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
  }
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  // Simulate audio playback
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= track.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, track.duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Track Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={track.cover}
          alt={track.title}
          className="w-16 h-16 rounded-lg object-cover shadow-md"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{track.title}</h3>
          <p className="text-sm text-gray-600">{track.artist}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-colors ${
              isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
            <Share size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Waveform */}
      <div className="mb-6">
        <WaveformVisualizer
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={track.duration}
          onTogglePlay={togglePlay}
          height={100}
          activeColor="#3B82F6"
          inactiveColor="#E5E7EB"
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(track.duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={() => setIsShuffle(!isShuffle)}
          className={`p-2 rounded-full transition-colors ${
            isShuffle ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Shuffle size={20} />
        </button>

        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
          <SkipBack size={24} />
        </button>

        <motion.button
          onClick={togglePlay}
          className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </motion.button>

        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
          <SkipForward size={24} />
        </button>

        <button
          onClick={() => setIsRepeat(!isRepeat)}
          className={`p-2 rounded-full transition-colors ${
            isRepeat ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Repeat size={20} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            setIsMuted(false);
          }}
          className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

// Multi-track Waveform Component
export const MultiTrackWaveform = () => {
  const [tracks] = useState([
    {
      id: 1,
      title: "Chill Beats",
      artist: "Lo-Fi Producer",
      duration: 195,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Electronic Vibes",
      artist: "Synth Master",
      duration: 240,
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Acoustic Session",
      artist: "Guitar Hero",
      duration: 165,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    }
  ]);

  const [currentTrack, setCurrentTrack] = useState(0);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Audio Waveform Player</h2>
        <p className="text-gray-600">Interactive audio player with waveform visualization</p>
      </div>

      {/* Current Track Player */}
      <AudioPlayer track={tracks[currentTrack]} />

      {/* Track List */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Playlist</h3>
        <div className="space-y-3">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              whileHover={{ backgroundColor: '#F9FAFB' }}
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                index === currentTrack ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              <div className="relative">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-12 h-12 rounded object-cover"
                />
                {index === currentTrack && (
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded flex items-center justify-center">
                    <Play size={16} className="text-blue-600" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-medium ${
                  index === currentTrack ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {track.title}
                </h4>
                <p className="text-sm text-gray-600">{track.artist}</p>
              </div>
              
              <div className="text-sm text-gray-500">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advanced Waveform Demo */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Waveform Visualization</h3>
        <div className="space-y-4">
          <WaveformVisualizer
            isPlaying={true}
            currentTime={45}
            duration={180}
            height={120}
            activeColor="#EF4444"
            inactiveColor="#FEE2E2"
          />
          <WaveformVisualizer
            isPlaying={false}
            currentTime={30}
            duration={120}
            height={80}
            activeColor="#10B981"
            inactiveColor="#D1FAE5"
          />
          <WaveformVisualizer
            isPlaying={true}
            currentTime={90}
            duration={200}
            height={100}
            activeColor="#8B5CF6"
            inactiveColor="#EDE9FE"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiTrackWaveform;