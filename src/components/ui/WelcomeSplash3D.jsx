import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import {
  CheckCircle2,
  Sparkles,
  Target,
  Zap,
  Clock,
  Trophy,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export function WelcomeSplash3D() {
  const { userProfile, is3DRefreshing, stop3DRefresh } = useTasks();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Determine time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: 'Bonjour', emoji: '☀️' };
    if (hour >= 12 && hour < 18) return { text: 'i can see you', emoji: '⚡' };
    return { text: 'Bonne soirée', emoji: '🌙' };
  };

  const greeting = getGreeting();

  useEffect(() => {
    if (is3DRefreshing) {
      setIsVisible(true);
      setProgress(0);
    }
  }, [is3DRefreshing]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (stop3DRefresh) stop3DRefresh();
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [isVisible, stop3DRefresh]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in text-white select-none">
      
      {/* 3D Space & Ambient Lights */}
      <div className="absolute w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute w-[350px] h-[350px] bg-indigo-500/20 rounded-full blur-2xl pointer-events-none -translate-y-12 translate-x-12" />

      {/* Main 3D Container Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl animate-scale-up">
        
        {/* 3D Rotating Isometric Cube with Orbit */}
        <div className="relative my-6 flex items-center justify-center h-32 w-32 perspective-1000">
          
          {/* Glowing orbital ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-brand-400/40 animate-orbit-spin pointer-events-none" />
          <div className="absolute -inset-3 rounded-full border border-indigo-400/20 animate-pulse pointer-events-none" />

          {/* Isometric 3D Cube */}
          <div className="cube-wrapper animate-cube-rotate">
            <div className="cube-face cube-front">
              <CheckCircle2 className="w-9 h-9 text-brand-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            </div>
            <div className="cube-face cube-back">
              <Trophy className="w-9 h-9 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            </div>
            <div className="cube-face cube-right">
              <Target className="w-9 h-9 text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            </div>
            <div className="cube-face cube-left">
              <Zap className="w-9 h-9 text-yellow-300 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            </div>
            <div className="cube-face cube-top">
              <Sparkles className="w-9 h-9 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
            <div className="cube-face cube-bottom">
              <Clock className="w-9 h-9 text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            </div>
          </div>
        </div>

        {/* Personalized Welcome Header */}
        <div className="space-y-1.5 mt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>To-Do List Pro 3D</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {greeting.text},{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-300">
              {userProfile.name}
            </span>{' '}
            {greeting.emoji}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
            {userProfile.motto || 'Optimisez votre journée avec une productivité sans faille.'}
          </p>
        </div>

        {/* 3D Progress Bar */}
        <div className="w-full mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              <span>Synchronisation 3D de l'espace</span>
            </span>
            <span className="text-brand-300 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-400 to-cyan-400 transition-all duration-200 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick Skip Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            if (stop3DRefresh) stop3DRefresh();
          }}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all group cursor-pointer"
        >
          <span>Accéder directement</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
}
