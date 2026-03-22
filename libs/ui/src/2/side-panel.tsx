import type {ReactNode} from 'react';
import Fpo from './fpo.tsx';

export type SidePanelProps = {
  open: boolean;
  title?: string;
  contentLabel?: string;
  onClose?: () => void;
  children?: ReactNode;
};

export default function SidePanel({
  open,
  title = '',
  contentLabel = 'Panel content',
  onClose,
  children,
}: SidePanelProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: open ? '1fr 380px' : '1fr',
        height: '100vh',
        background: '#12170f',
        color: 'var(--lair-text, #d4cbb8)',
        fontFamily: 'var(--lair-font, "Rubik", sans-serif)',
        overflow: 'hidden',
      }}
    >
      <div style={{padding: '20px', overflow: 'auto'}}>
        {children ?? (
          <Fpo style={{height: '100%', minHeight: '80vh'}}>Main content</Fpo>
        )}
      </div>

      {open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid #384236',
            background: '#172015',
            height: '100vh',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderBottom: '1px solid #2c3428',
            }}
          >
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#e8e4d8',
                letterSpacing: '0.02em',
              }}
            >
              {title}
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: '1px solid #384236',
                borderRadius: '3px',
                color: 'var(--lair-text-dim, #7a7e88)',
                cursor: 'pointer',
                fontSize: '13px',
                padding: '2px 8px',
                fontFamily: 'inherit',
              }}
            >
              ✕
            </button>
          </div>
          <div style={{flex: 1, overflow: 'auto', padding: '18px'}}>
            <Fpo style={{height: '100%', minHeight: '60vh'}}>
              {contentLabel}
            </Fpo>
          </div>
        </div>
      )}
    </div>
  );
}
