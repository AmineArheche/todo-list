import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import {
  User,
  Sparkles,
  Edit2,
  X,
  Check,
  Smile,
  Zap,
  Target,
  Brain,
  Coffee,
} from 'lucide-react';

const STATUS_PRESETS = [
  { label: 'Mode Focus', emoji: '🎯', color: 'indigo' },
  { label: 'Créatif & Productif', emoji: '💡', color: 'amber' },
  { label: 'Pleine Énergie', emoji: '⚡', color: 'cyan' },
  { label: 'En Mode Zen', emoji: '🧘', color: 'emerald' },
  { label: 'Pause Café', emoji: '☕', color: 'rose' },
];

const AVATAR_GRADIENTS = [
  { id: 'indigo', from: 'from-brand-600', to: 'to-indigo-500', ring: 'ring-brand-500' },
  { id: 'emerald', from: 'from-emerald-600', to: 'to-teal-500', ring: 'ring-emerald-500' },
  { id: 'rose', from: 'from-rose-600', to: 'to-pink-500', ring: 'ring-rose-500' },
  { id: 'amber', from: 'from-amber-600', to: 'to-orange-500', ring: 'ring-amber-500' },
  { id: 'purple', from: 'from-purple-600', to: 'to-violet-500', ring: 'ring-purple-500' },
];

export function UserProfileBadge() {
  const { userProfile, openProfileModal } = useTasks();

  const currentGradient =
    AVATAR_GRADIENTS.find((g) => g.id === userProfile.avatarColor) || AVATAR_GRADIENTS[0];

  return (
    <button
      onClick={openProfileModal}
      className="group flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-600 shadow-xs hover:shadow-md transition-all text-left cursor-pointer"
      title="Personnaliser votre espace personnel"
    >
      {/* 3D Glass Avatar Sphere */}
      <div
        className={`relative w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr ${currentGradient.from} ${currentGradient.to} flex items-center justify-center text-white text-xs font-black shadow-md ring-2 ${currentGradient.ring}/20 group-hover:scale-105 group-hover:rotate-6 transition-all`}
      >
        <span>{userProfile.name.charAt(0).toUpperCase()}</span>
        <span className="absolute -bottom-1 -right-1 text-[10px]">
          {userProfile.statusEmoji || '🎯'}
        </span>
      </div>

      {/* Name & Status */}
      <div className="hidden sm:flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {userProfile.name}
          </span>
          <Edit2 className="w-2.5 h-2.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[100px]">
          {userProfile.statusText || 'Mode Focus'}
        </span>
      </div>
    </button>
  );
}

export function UserProfileModal() {
  const { isProfileModalOpen, closeProfileModal, userProfile, updateUserProfile } = useTasks();

  const [name, setName] = useState(userProfile.name || 'Amine');
  const [statusText, setStatusText] = useState(userProfile.statusText || 'Mode Focus');
  const [statusEmoji, setStatusEmoji] = useState(userProfile.statusEmoji || '🎯');
  const [motto, setMotto] = useState(userProfile.motto || '');
  const [avatarColor, setAvatarColor] = useState(userProfile.avatarColor || 'indigo');

  if (!isProfileModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || 'Amine',
      statusText,
      statusEmoji,
      motto: motto.trim(),
      avatarColor,
    });
    closeProfileModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Espace Personnel 3D
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personnalisez votre identité et votre humeur du jour
              </p>
            </div>
          </div>
          <button
            onClick={closeProfileModal}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* User Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Votre Prénom / Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="ex: Amine"
              required
            />
          </div>

          {/* Daily Motto / Quote */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Devise / Mantra de productivité
            </label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="ex: Chaque petite étape compte vers le succès."
            />
          </div>

          {/* Status presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Humeur & Statut actuel
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STATUS_PRESETS.map((preset) => {
                const isSelected = statusText === preset.label;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setStatusText(preset.label);
                      setStatusEmoji(preset.emoji);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-base">{preset.emoji}</span>
                    <span className="truncate">{preset.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-brand-600 dark:text-brand-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Avatar Color Themes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Couleur de l'Avatar 3D
            </label>
            <div className="flex items-center gap-3">
              {AVATAR_GRADIENTS.map((grad) => {
                const isSelected = avatarColor === grad.id;
                return (
                  <button
                    key={grad.id}
                    type="button"
                    onClick={() => setAvatarColor(grad.id)}
                    className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${grad.from} ${grad.to} ring-2 transition-all flex items-center justify-center text-white ${
                      isSelected ? `${grad.ring} scale-110 shadow-md` : 'ring-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={closeProfileModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30"
            >
              Enregistrer
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
