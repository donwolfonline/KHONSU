"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: 'none',
                border: '1px solid var(--border)',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--foreground)'
            }}
            aria-label="Toggle theme"
        >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}
