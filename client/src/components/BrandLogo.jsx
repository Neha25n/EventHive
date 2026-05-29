import React from 'react';

const sizeClasses = {
    sm: {
        wrapper: 'gap-2',
        mark: 'h-9 w-9',
        title: 'text-lg',
        subtitle: 'text-[10px]',
    },
    md: {
        wrapper: 'gap-3',
        mark: 'h-11 w-11',
        title: 'text-xl',
        subtitle: 'text-[11px]',
    },
    lg: {
        wrapper: 'gap-3',
        mark: 'h-12 w-12',
        title: 'text-2xl',
        subtitle: 'text-xs',
    },
};

const variants = {
    light: {
        title: 'text-white',
        subtitle: 'text-slate-300',
        accent: 'text-amber-300',
        mark: 'bg-transparent',
        hex: '#ffffff',
        inset: '#fbbf24',
        monogram: '#111827',
    },
    dark: {
        title: 'text-gray-950',
        subtitle: 'text-gray-500',
        accent: 'text-amber-500',
        mark: 'bg-white shadow-md shadow-gray-200',
        hex: '#111827',
        inset: '#f59e0b',
        monogram: '#ffffff',
    },
};

const BrandLogo = ({ variant = 'dark', size = 'md', showTagline = false, className = '' }) => {
    const sizing = sizeClasses[size] || sizeClasses.md;
    const theme = variants[variant] || variants.dark;

    return (
        <div className={`inline-flex items-center ${sizing.wrapper} ${className}`}>
            <div className={`${sizing.mark} ${theme.mark} grid shrink-0 place-items-center rounded-2xl`}>
                <svg viewBox="0 0 44 44" aria-hidden="true" className="h-9 w-9">
                    <path
                        d="M22 6.8 35.2 14.4v15.2L22 37.2 8.8 29.6V14.4L22 6.8Z"
                        fill={theme.hex}
                    />
                    <path
                        d="M22 11.7 30.7 16.8v10.4L22 32.3l-8.7-5.1V16.8L22 11.7Z"
                        fill="none"
                        stroke={theme.inset}
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                    <path
                        d="M19.3 17.5h-4.5v9h4.5M14.8 22h4M22.6 17.5v9M29.2 17.5v9M22.6 22h6.6"
                        fill="none"
                        stroke={theme.monogram}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                    />
                </svg>
            </div>
            <div className="leading-none">
                <div className={`${sizing.title} ${theme.title} font-black tracking-wide`}>
                    Event<span className={theme.accent}>Hive</span>
                </div>
                {showTagline && (
                    <div className={`${sizing.subtitle} ${theme.subtitle} mt-1 font-bold uppercase tracking-wider`}>
                        Gather. Book. Buzz.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandLogo;
