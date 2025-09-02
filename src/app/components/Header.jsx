"use client";

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function HeaderNav() {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);

    return (
        <div className="max-w-screen-4xl px-4 bg-black Manu-font transition-colors duration-300">
            <div className="flex items-center justify-between min-h-16 text-white transition-colors duration-300">
                <div className="flex items-center space-x-4 cursor-pointer">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                    />
                    <div className="text-lg font-bold">
                        To-Do App
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    {status === 'authenticated' && (
                        <div key="profile" className="relative flex items-center gap-4 py-2 rounded-lg">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center px-2 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition hover:cursor-pointer"
                            >
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={session.user?.image || "/default-avatar.png"}
                                        alt="User Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </button>
                            {open && (
                                <div className="absolute right-0 mt-30 w-44 bg-slate-800 text-white rounded-lg shadow-lg z-50 py-2">
                                    <button onClick={() => signOut({ callbackUrl: '/' })}
                                        className="block w-full text-left px-4 py-2 text-base hover:bg-gray-200 hover:cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {status === 'unauthenticated' && (
                        <div>
                            <button
                                onClick={() => signIn('google', { callbackUrl: '/' })}
                                className="px-6 py-2 rounded-2xl text-xl font-semibold bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white"
                            >
                                Sign In
                            </button>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}