import { useState } from 'react';

export function useReaderSettings() {
    const [fontSize, setFontSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1.6);
    const [marginMode, setMarginMode] = useState('normal');
    const [theme, setTheme] = useState('light');

    const increaseFontSize = () => setFontSize(s => Math.min(200, s + 10));
    const decreaseFontSize = () => setFontSize(s => Math.max(80, s - 10));

    return {
        fontSize,
        lineHeight,
        marginMode,
        theme,
        setFontSize,
        setLineHeight,
        setMarginMode,
        setTheme,
        increaseFontSize,
        decreaseFontSize
    };
}