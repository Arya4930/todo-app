"use client"

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'

export default function DarkModeButton() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const theme = localStorage.getItem('hs_theme');

        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (theme === 'dark' || (theme === 'auto' && systemPrefersDark)) {
            root.classList.add('dark');
            setIsDark(true);
        } else {
            root.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.remove('dark');
            localStorage.setItem('hs_theme', 'light');
            setIsDark(false);
        } else {
            root.classList.add('dark');
            localStorage.setItem('hs_theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hover:cursor-pointer"
            aria-label="Toggle dark mode"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}