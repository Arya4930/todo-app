"use client";

import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function HeaderNav() {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            const firstLogin = localStorage.getItem('firstLoginDone');
            if (!firstLogin) {
                setShowTooltip(true);
                localStorage.setItem('firstLoginDone', 'true');
            }
        }
    }, [status]);

    useEffect(() => {
        if (!isAnimating) return;
        const overlay = document.getElementById('transition-overlay');
        if (overlay) overlay.classList.remove('active');

        const timeout = setTimeout(() => {
            setIsAnimating(false);
            setCurrentAnimation(null);
        }, 400);

        return () => clearTimeout(timeout);
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 bg-white dark:bg-black Manu-font transition-colors duration-300">
            <div className="flex items-center justify-between min-h-12 sm:min-h-16 text-black dark:text-white transition-colors duration-300">
                <div className="flex items-center space-x-2 sm:space-x-4 cursor-pointer">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-6 w-6 sm:h-10 sm:w-10 object-contain"
                    />
                    <div className="text-lg sm:text-2xl font-bold hidden xs:block sm:block">
                        To-Do App
                    </div>
                </div>

                <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
                    {status === 'authenticated' && (
                        <div key="profile" className="relative flex items-center gap-2 lg:gap-4 py-2 rounded-lg">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition hover:cursor-pointer"
                            >
                                <div className="w-6 h-6 lg:w-8 lg:h-8 relative rounded-full overflow-hidden">
                                    <Image
                                        src={
                                            session.user?.image ||
                                            '/default-avatar.png'
                                        }
                                        alt="User Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </button>
                            {open && (
                                <div className="absolute right-0 mt-30 w-44 bg-slate-800 text-white rounded-lg shadow-lg z-50 py-2">
                                    <button
                                        onClick={() =>
                                            signOut({ callbackUrl: '/' })
                                        }
                                        className="block w-full text-left px-3 lg:px-4 py-2 text-sm lg:text-base hover:bg-gray-200 dark:hover:bg-gray-600"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {status === 'loading' && (
                        <div
                            key="loading"
                            className="flex items-center justify-center gap-1 lg:gap-2 py-2 px-3 lg:px-4 rounded-full bg-black w-[180px] lg:w-[240px] h-10 lg:h-12"
                        >
                            Loading
                        </div>
                    )}
                    {status === 'unauthenticated' && (
                        <div
                            key="auth"
                            className="flex gap-2 lg:gap-4"
                        >
                            <button
                                onClick={() => signIn('google', { callbackUrl: '/' })}
                                className="px-3 lg:px-6 py-2 rounded-2xl text-sm lg:text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => signIn('google', { callbackUrl: '/' })}
                                className="px-3 lg:px-6 py-2 rounded-2xl text-sm lg:text-xl font-semibold bg-yellow-400 hover:bg-yellow-500 text-white"
                            >
                                Sign In
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}