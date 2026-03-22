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
      className="grid h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden"
      style={{gridTemplateColumns: open ? '1fr 380px' : '1fr'}}
    >
      <div className="p-5 overflow-auto">
        {children ?? <Fpo className="h-full min-h-[80vh]">Main content</Fpo>}
      </div>

      {open && (
        <div className="flex flex-col border-l border-[#384236] bg-[#172015] h-screen">
          <div className="flex items-center justify-between px-4.5 py-3.5 border-b border-[#2c3428]">
            <span className="text-[15px] font-bold text-[#e8e4d8] tracking-[0.02em]">
              {title}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="bg-transparent border border-[#384236] rounded-[3px] text-(--lair-text-dim) cursor-pointer text-[13px] px-2 py-0.5 font-(--lair-font) hover:border-[#8b6c3e] transition-colors duration-150"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4.5">
            <Fpo className="h-full min-h-[60vh]">{contentLabel}</Fpo>
          </div>
        </div>
      )}
    </div>
  );
}
