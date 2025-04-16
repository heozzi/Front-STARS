// src/hooks/useCountUp.ts
import { useEffect, useRef, useCallback } from 'react';
import { CountUp } from 'countup.js';

export const useCountUp = (endValue: number, options = {}) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const countUpInstance = useRef<CountUp | null>(null);

    useEffect(() => {
        if (ref.current) {
            countUpInstance.current = new CountUp(ref.current, endValue, options);
            if (!countUpInstance.current.error) {
                countUpInstance.current.start();
            } else {
                console.error(countUpInstance.current.error);
            }
        }
    }, [endValue, options]);

    const start = useCallback(() => {
        countUpInstance.current?.start();
    }, []);

    const reset = useCallback(() => {
        countUpInstance.current?.reset();
    }, []);

    const update = useCallback((newEndValue: number) => {
        countUpInstance.current?.update(newEndValue);
    }, []);

    return { ref, start, reset, update };
};