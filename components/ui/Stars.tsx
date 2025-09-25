import { memo } from 'react';

type StarsProps = {
    value?: number;
    max?: number;
    className?: string;
    ariaLabel?: string;
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function _Stars({ value = 0, max = 5, className = '', ariaLabel }: StarsProps) {
    const v = clamp(Math.floor(value ?? 0), 0, max);
    const stars = Array.from({ length: max }, (_, i) => (i < v ? '★' : '☆')).join('');

    return (
        <span
            aria-label={ariaLabel ?? `${v} von ${max} Sternen`}
            title={ariaLabel ?? `${v} von ${max} Sternen`}
            className={`font-medium tracking-tight ${className}`}
        >
            {stars}
        </span>
    );
}

//Ich nutze memo damit nicht jedes mal alles neu gerendert wird, sondern nur wenn sich die props ändern.
export default memo(_Stars);
