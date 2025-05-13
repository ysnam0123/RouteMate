import { create } from 'zustand';
import like from '../assets/icons/like.svg';
import liked from '../assets/icons/liked.svg';
import { useState } from 'react';

type LikeStore = {
  likes: number;
  increaseLikes: () => void;
};

export const useLikeStore = create<LikeStore>((set) => ({
  likes: 0,
  increaseLikes: () => set((state) => ({ likes: state.likes + 1 })),
}));
