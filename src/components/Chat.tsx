/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Moon, Sun, Loader2, AlertCircle } from 'lucide-react';
import { Components } from 'botframework-webchat';
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme';
import { ConnectionSettings, CopilotStudioClient, CopilotStudioWebChat, CopilotStudioWebChatConnection } from '@microsoft/agents-copilotstudio-client';

import { acquireToken } from '../utils/acquireToken';

const { BasicWebChat, Composer } = Components;

interface ChatProps {
  onBack: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Chat: React.FC<ChatProps> = ({ onBack, isDark, toggleTheme }) => {
  const [connection, setConnection] = useState<CopilotStudioWebChatConnection | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let agentsSettings: ConnectionSettings;

  try {
    agentsSettings = require('../settings').credSettings;
  } catch (error) {
    console.error(error + '\nsettings.js Not Found. Rename settings.EXAMPLE.js to settings.js and fill out necessary fields');
    agentsSettings = {
      appClientId: '',
      tenantId: '',
      environmentId: '',
      agentIdentifier: '',
      directConnectUrl: '',
    } as ConnectionSettings;
  }

  const webchatSettings = { 
    showTyping: true,
    // Add dark theme support
    styleSet: isDark ? {
      backgroundColor: '#1f2937',
      primaryFont: 'Inter, system-ui, sans-serif',
      bubbleBackground: '#374151',
      bubbleTextColor: '#f9fafb',
      bubbleFromUserBackground: '#3b82f6',
      bubbleFromUserTextColor: '#ffffff',
      subtle: '#6b7280',
      accent: '#3b82f6'
    } : {
      backgroundColor: '#ffffff',
      primaryFont: 'Inter, system-ui, sans-serif',
      bubbleBackground: '#f3f4f6',
      bubbleTextColor: '#1f2937',
      bubbleFromUserBackground: '#3b82f6',
      bubbleFromUserTextColor: '#ffffff',
      subtle: '#6b7280',
      accent: '#3b82f6'
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if settings are configured
        if (!agentsSettings.appClientId || !agentsSettings.tenantId) {
          throw new Error('Please configure your settings.js file with the required values');
        }

        const token = await acquireToken(agentsSettings);
        const client = new CopilotStudioClient(agentsSettings, token);
        const webChatConnection = CopilotStudioWebChat.createConnection(client, webchatSettings);
        
        setConnection(webChatConnection);
        
      } catch (err) {
        console.error('Failed to initialize chat:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize chat');
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-lg'
              }`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>
        </header>

        {/* Loading State */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <Loader2 className={`h-6 w-6 animate-spin absolute -top-1 -right-1 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Initializing AI Assistant
            </h2>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Please wait while we connect you to your AI assistant...
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <button
              onClick={onBack}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span>Back to Home</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-lg'
              }`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>
        </header>

        {/* Error State */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Connection Error
            </h2>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {error}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Try Again
              </button>
              <button
                onClick={onBack}
                className={`w-full px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  AI Assistant
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-lg'
            }`}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>
      </header>
      
      {/* Chat Container */}
      <div className="container mx-auto px-4 pb-6">
        <div className={`max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`} style={{ height: 'calc(100vh - 180px)' }}>
          {connection ? (
            <FluentThemeProvider>
              <Composer directLine={connection}>
                <div className="h-full">
                  <BasicWebChat />
                </div>
              </Composer>
            </FluentThemeProvider>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Bot className={`h-16 w-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-lg mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Chat interface ready!
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Start typing to begin your conversation...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;