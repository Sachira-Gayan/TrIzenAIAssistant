/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from 'react';
import { MessageCircle, Sparkles, Zap, Moon, Sun, ArrowRight, Bot, Users, Shield, Star, Globe, Lock } from 'lucide-react';

interface HomePageProps {
  onStartChat: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartChat, isDark, toggleTheme }) => {
  /*const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Get instant responses powered by advanced AI technology with enterprise-grade performance"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your conversations are protected with enterprise-grade security and privacy controls"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "24/7 Available",
      description: "Your AI assistant is always ready to help, providing consistent support anytime"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-Language",
      description: "Communicate in your preferred language with global language support"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Smart Learning",
      description: "AI that adapts and learns from interactions to provide better assistance"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Protection",
      description: "Complete data privacy with no storage of personal conversations"
    }
  ];*/

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse ${
          isDark ? 'bg-blue-500' : 'bg-purple-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 animate-pulse delay-75 ${
          isDark ? 'bg-purple-500' : 'bg-blue-300'
        }`}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Assistant
              </h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Powered by Copilot Studio
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              isDark 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-lg hover:shadow-xl'
            }`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-800/50 text-blue-400 border border-gray-700/50' 
                : 'bg-white/50 text-blue-800 border border-blue-200/50'
            }`}>
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Powered by Microsoft Copilot Studio</span>
            </div>
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Meet Your
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block animate-gradient">
              AI Assistant
            </span>
          </h2>
          
          <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience the future of conversation with our intelligent AI assistant. 
            Get instant answers, creative solutions, and personalized help whenever you need it.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button
              onClick={onStartChat}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3 min-w-[220px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <MessageCircle className="h-6 w-6 relative z-10" />
              <span className="relative z-10">Start Chatting</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            
            <div className={`flex items-center space-x-3 px-6 py-5 rounded-2xl backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-800/50 text-gray-300 border border-gray-700/50' 
                : 'bg-white/50 text-gray-600 shadow-lg border border-gray-200/50'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">AI is online</span>
              </div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-sm">Ready to help</span>
            </div>
          </div>
        </div>


      
      </main>
    </div>
  );
};

export default HomePage;