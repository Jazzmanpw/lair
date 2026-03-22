import type {CSSProperties, ReactNode} from 'react';
import Fpo from './fpo.tsx';

export type SidePanelProps = {
  open: boolean;
  title?: string;
  contentLabel?: string;
  onClose?: () => void;
  children?: ReactNode;
};

const overlay: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 380px',
  gap: '0',
  minHeight: '100vh',
  fontFamily: '"Crimson Text", "Times New Roman", serif',
  color: '#2c1810',
  background: '#faf6ee',
};

const overlayCollapsed: CSSProperties = {
  ...overlay,
  gridTemplateColumns: '1fr',
};

const panelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '2px solid #c4a96a',
  background: '#fdfaf2',
  height: '100vh',
  position: 'sticky',
  top: 0,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: '1px solid #e2d9c2',
  fontFamily: '"Cinzel", Georgia, serif',
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '0.03em',
};

const closeBtnStyle: CSSProperties = {
  background: 'none',
  border: '1px solid #c4a96a',
  borderRadius: '2px',
  color: '#8b7355',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '2px 8px',
  fontFamily: '"Cinzel", Georgia, serif',
};

export default function SidePanel({
  open,
  title = '',
  contentLabel = 'Panel content',
  onClose,
  children,
}: SidePanelProps) {
  return (
    <div style={open ? overlay : overlayCollapsed}>
      <div style={{padding: '24px'}}>
        {children ?? (
          <Fpo style={{height: '100%', minHeight: '80vh'}}>Main content</Fpo>
        )}
      </div>

      {open && (
        <div style={panelStyle}>
          <div style={headerStyle}>
            <span>{title}</span>
            <button type="button" style={closeBtnStyle} onClick={onClose}>
              ✕
            </button>
          </div>
          <div style={{flex: 1, overflow: 'auto', padding: '20px'}}>
            <Fpo style={{height: '100%', minHeight: '60vh'}}>
              {contentLabel}
            </Fpo>
          </div>
        </div>
      )}
    </div>
  );
}
