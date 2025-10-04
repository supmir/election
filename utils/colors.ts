function getLuminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map(v => {
        const c = v / 255;
        return c <= 0.03928
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(L1: number, L2: number): number {
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Returns either "black" or "white" based on which
 * has better contrast against the given background color.
 * 
 * @param hex - background color in hex (#RRGGBB or #RGB)
 */
export function bestTextColor(hex: string): "#000" | "#fff" {
    // Expand shorthand like #abc → #aabbcc
    if (hex.length === 4) {
        hex = "#" + [...hex.slice(1)].map(x => x + x).join("");
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const Lbg = getLuminance(r, g, b);

    const contrastBlack = getContrastRatio(Lbg, 0); // black luminance = 0
    const contrastWhite = getContrastRatio(Lbg, 1); // white luminance = 1

    return contrastBlack > contrastWhite ? "#000" : "#fff";
}
