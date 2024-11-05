"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import HomePagePostsScreen from './pages/HomePagePostsScreen';
import LoginScreen from './pages/loginScreen';


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Instagram Clone</h1>
          <Button onClick={() => {
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');
          }}>Disconnect</Button>
      </div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <HomePagePostsScreen />
      </Suspense>
    </main>
  );
}
