import type {CSSProperties, ReactNode} from 'react';

export type FpoProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Fpo({
  children = 'For placement only',
  className = '',
  style,
}: FpoProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(139, 69, 19, 0.03) 10px,
            rgba(139, 69, 19, 0.03) 11px
          ),
          #f5ecd7
        `,
        color: '#96783a',
        fontSize: '11px',
        fontFamily: '"Cinzel", Georgia, serif',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        border: '1.5px dashed #c4a96a',
        borderRadius: '2px',
        padding: '12px',
        minHeight: '40px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
