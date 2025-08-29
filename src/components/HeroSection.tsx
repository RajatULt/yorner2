import React from "react";
import { Play, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onNavigate?: (page: "home" | "login" | "signup") => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const handleLoginClick = () => {
    if (onNavigate) {
      onNavigate("login");
    } else {
      // Scroll to features section
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleWatchExperience = () => {
    // In a real app, this would open a video modal
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - Ocean/Cruise Theme */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg"
      >
        <source src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4" type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/857195/857195-hd_1920_1080_24fps.mp4" type="video/mp4" />
        {/* Fallback image if video fails to load */}
        <img 
          src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg" 
          alt="Ocean cruise background" 
          className="w-full h-full object-cover"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Glassmorphic Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl animate-in fade-in duration-1000">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            Discover Luxury
            <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              at Sea
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto animate-in slide-in-from-bottom-8 duration-1000 delay-500">
            Your gateway to unforgettable journeys across oceans, skies, and
            cities. Experience world-class luxury with personalized service.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-8 duration-1000 delay-700">
            <button
              onClick={handleLoginClick}
              className="group bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-200"
                size={20}
              />
            </button>

            <button
              onClick={handleWatchExperience}
              className="group text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <Play size={20} />
              Watch Experience
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-in slide-in-from-bottom-8 duration-1000 delay-1000">
            <div className="text-white/80">
              <div className="text-2xl font-bold text-white">100K+</div>
              <div className="text-sm">Happy Travelers</div>
            </div>
            <div className="text-white/80">
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-sm">Awards Won</div>
            </div>
            <div className="text-white/80">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-sm">Customer Rating</div>
            </div>
            <div className="text-white/80">
              <div className="text-2xl font-bold text-white">120+</div>
              <div className="text-sm">Global Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Video Controls Overlay (Optional - for debugging) */}
      <div className="absolute top-4 right-4 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
          Video: Ocean Cruise Background
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
