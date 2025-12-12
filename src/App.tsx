/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useState, useEffect } from 'react';
import HomePage from './components/Homepage';
import Chat from './components/Chat';

type Page = 'home' | 'chat';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemPrefersDark);
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const startChat = () => {
    setCurrentPage('chat');
  };

  const goHome = () => {
    setCurrentPage('home');
  };

  return (
    <>
      {currentPage === 'home' ? (
        <HomePage 
          onStartChat={startChat} 
          isDark={isDark} 
          toggleTheme={toggleTheme}
        />
      ) : (
        <Chat 
          onBack={goHome} 
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      )}
    </>
  );
};

export default App;