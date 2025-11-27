import { useEffect, useRef } from 'react';

export function useIframeStyles(iframeSrc, fontSize, lineHeight, marginMode, theme, isNavigatingBack, setIsNavigatingBack) {
    const iframeRef = useRef(null);

    const applyStyles = () => {
        if (iframeRef.current && iframeRef.current.contentDocument) {
            const body = iframeRef.current.contentDocument.body;
            if (body) {
                const html = iframeRef.current.contentDocument.documentElement;
                html.style.height = 'auto';
                html.style.width = '100%';
                html.style.margin = '0';
                html.style.padding = '0';
                html.style.overflowY = 'auto';

                body.style.height = 'auto';
                body.style.minHeight = '100%';
                body.style.width = '100%';
                body.style.maxWidth = '100%';
                body.style.margin = '0';
                body.style.padding = '40px 20px';
                body.style.boxSizing = 'border-box';
                body.style.overflowX = 'hidden';
                body.style.overflowY = 'visible';

                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                    body.style.columnCount = '1';
                } else {
                    body.style.columnCount = '2';
                }
                body.style.columnGap = '40px';
                body.style.columnFill = 'balance';
                body.style.columnRule = '1px solid rgba(0,0,0,0.1)';
                body.style.fontSize = `${fontSize}%`;
                body.style.fontFamily = 'Arial, sans-serif';
                body.style.lineHeight = lineHeight;
                if (marginMode === 'narrow') body.style.padding = '40px 15%';
                else if (marginMode === 'wide') body.style.padding = '40px 5%';
                else body.style.padding = '40px 10%';

                if (theme === 'dark') {
                    body.style.backgroundColor = '#1a1a1a';
                    body.style.color = '#e0e0e0';
                } else if (theme === 'sepia') {
                    body.style.backgroundColor = '#f4ecd8';
                    body.style.color = '#5b4636';
                } else {
                    body.style.backgroundColor = '#ffffff';
                    body.style.color = '#000000';
                }

                if (iframeRef.current && iframeRef.current.contentWindow) {
                    iframeRef.current.contentWindow.scrollTo(0, 0);
                }
            }

            const styleId = 'reader-custom-styles';
            let styleTag = iframeRef.current.contentDocument.getElementById(styleId);
            if (!styleTag) {
                styleTag = iframeRef.current.contentDocument.createElement('style');
                styleTag.id = styleId;
                iframeRef.current.contentDocument.head.appendChild(styleTag);
            }
            styleTag.textContent = `
                img { 
                    max-width: 100%; 
                    height: auto !important;
                    display: block;
                    margin: 1em auto;
                    break-inside: avoid;
                }
                [epub\\:type="pagebreak"], [role="doc-pagebreak"], .page-break, .pagebreak { display: none !important; }
                a[href^="#"] { text-decoration: none; color: inherit; pointer-events: none; } 
            `;
        }
    };

    useEffect(() => {
        const timer = setTimeout(applyStyles, 100);
        return () => clearTimeout(timer);
    }, [iframeSrc, fontSize, lineHeight, marginMode, theme]);

    return { iframeRef, applyStyles };
}