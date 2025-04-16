// 👇 window.fullpage_api 타입 보강
declare global {
    interface Window {
      fullpage_api: {
        moveSectionUp: () => void;
        moveSectionDown?: () => void;
        moveSlideRight?: () => void;
        moveSlideLeft: () => void;
        setAllowScrolling: (value: boolean) => void;
        setKeyboardScrolling: (value: boolean) => void;
      };
    }
  }

export {};