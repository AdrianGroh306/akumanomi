import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeSwitch: React.FC = () => {
    const { theme, setTheme } = useTheme();
    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 ml-10 mr-2 cursor-pointer rounded-full bg-white dark:bg-neutral-900 text-gray-800 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.2)] transition-shadow"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05l-1.414-1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
            )}
        </button>
    );
};