"use client"

import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function DarkModeButton() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
            className="rounded-full p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hover:cursor-pointer"
            aria-label="Toggle dark mode"
        >
            {theme == "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}