// global.d.ts
declare global {
    interface Window {
        fullpage_api?: {
            moveSlideLeft: () => void;
            moveSlideRight: () => void;
            moveSectionUp: () => void;
            moveSectionDown: () => void;
            setAllowScrolling(b: boolean): void;
            setKeyboardScrolling(b: boolean): void;
        };
    }
}

export {};