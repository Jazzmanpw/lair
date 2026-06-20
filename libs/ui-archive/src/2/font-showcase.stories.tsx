import type {Meta, StoryObj} from '@storybook/react-vite';
import type {CSSProperties} from 'react';

const googleFontsUrl = [
  'https://fonts.googleapis.com/css2?',
  'family=PT+Sans:wght@400;700&',
  'family=Source+Sans+3:wght@400;600;700&',
  'family=Nunito+Sans:wght@400;600;700&',
  'family=Rubik:wght@400;500;700&',
  'family=IBM+Plex+Sans:wght@400;500;700&',
  'family=Vollkorn:wght@400;600;700&',
  'family=Fira+Sans:wght@400;500;700&',
  'display=swap',
].join('');

const sampleText =
  'Химера Тяньгу — величественный зверь с драконьей головой. Encounter: Средняя угроза 3.';
const sampleShort = 'Вход в лабораторию';
const sampleNumbers = 'AC 18 · HP 40 · Fort +5 / Ref +11 / Will +8';

type FontDef = {
  name: string;
  family: string;
  note: string;
};

const fonts: FontDef[] = [
  {
    name: 'Century Gothic',
    family: '"Century Gothic", sans-serif',
    note: 'PF2e statblock plugin font (system)',
  },
  {
    name: 'PT Sans',
    family: '"PT Sans", sans-serif',
    note: 'Designed for Cyrillic, ParaType',
  },
  {
    name: 'Source Sans 3',
    family: '"Source Sans 3", sans-serif',
    note: 'Adobe open source, neutral',
  },
  {
    name: 'Nunito Sans',
    family: '"Nunito Sans", sans-serif',
    note: 'Rounded, friendly, humanist',
  },
  {
    name: 'Rubik',
    family: '"Rubik", sans-serif',
    note: 'Slightly rounded, geometric',
  },
  {
    name: 'IBM Plex Sans',
    family: '"IBM Plex Sans", sans-serif',
    note: 'Technical, precise, neutral',
  },
  {
    name: 'Fira Sans',
    family: '"Fira Sans", sans-serif',
    note: 'Mozilla, humanist, great x-height',
  },
  {
    name: 'Vollkorn',
    family: '"Vollkorn", Georgia, serif',
    note: 'Current choice (serif)',
  },
  {
    name: 'Segoe UI',
    family: '"Segoe UI", sans-serif',
    note: 'Windows system font',
  },
];

const textColors = [
  {label: 'Current (#c8c4b8)', value: '#c8c4b8'},
  {label: 'Warmer (#d4cbb8)', value: '#d4cbb8'},
  {label: 'Cooler (#c0c4cc)', value: '#c0c4cc'},
  {label: 'Brighter (#dcd8cc)', value: '#dcd8cc'},
  {label: 'High contrast (#e8e4d8)', value: '#e8e4d8'},
];

const dimColors = [
  {label: 'Current dim (#6a6658)', value: '#6a6658'},
  {label: 'Lighter dim (#8a8678)', value: '#8a8678'},
  {label: 'Warm dim (#9a9080)', value: '#9a9080'},
  {label: 'Cool dim (#7a7e88)', value: '#7a7e88'},
];

const cellStyle: CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid #1e1e28',
  verticalAlign: 'top',
};

const headerCell: CSSProperties = {
  ...cellStyle,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#8b6c3e',
  borderBottom: '2px solid #2a2a36',
  fontFamily: 'system-ui, sans-serif',
};

function FontShowcaseComponent() {
  return (
    <>
      <link rel="stylesheet" href={googleFontsUrl} />
      <div
        style={{
          background: '#0f0f17',
          color: '#c8c4b8',
          padding: '24px',
          fontFamily: 'system-ui, sans-serif',
          minHeight: '100vh',
        }}
      >
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#e8e4d8',
            marginBottom: '8px',
          }}
        >
          Font Comparison
        </h2>
        <p
          style={{
            fontSize: '12px',
            color: '#7a7668',
            marginBottom: '24px',
          }}
        >
          Sans-serif fonts with Cyrillic support against the lair dark palette
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '40px',
          }}
        >
          <thead>
            <tr>
              <th style={{...headerCell, width: '140px'}}>Font</th>
              <th style={headerCell}>14px body</th>
              <th style={headerCell}>12px small</th>
              <th style={headerCell}>18px heading</th>
              <th style={headerCell}>11px stats</th>
            </tr>
          </thead>
          <tbody>
            {fonts.map((font) => (
              <tr key={font.name}>
                <td style={cellStyle}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#b8944a',
                    }}
                  >
                    {font.name}
                  </div>
                  <div style={{fontSize: '10px', color: '#6a6658'}}>
                    {font.note}
                  </div>
                </td>
                <td
                  style={{
                    ...cellStyle,
                    fontFamily: font.family,
                    fontSize: '14px',
                  }}
                >
                  {sampleText}
                </td>
                <td
                  style={{
                    ...cellStyle,
                    fontFamily: font.family,
                    fontSize: '12px',
                  }}
                >
                  {sampleText}
                </td>
                <td
                  style={{
                    ...cellStyle,
                    fontFamily: font.family,
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#e8e4d8',
                  }}
                >
                  {sampleShort}
                </td>
                <td
                  style={{
                    ...cellStyle,
                    fontFamily: font.family,
                    fontSize: '11px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {sampleNumbers}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#e8e4d8',
            marginBottom: '8px',
          }}
        >
          Text Color Comparison
        </h2>
        <p
          style={{
            fontSize: '12px',
            color: '#7a7668',
            marginBottom: '24px',
          }}
        >
          Primary and dim text colors on #0f0f17 and #1a1a24 backgrounds
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {['#0f0f17', '#1a1a24'].map((bg) => (
            <div
              key={bg}
              style={{background: bg, borderRadius: '6px', padding: '16px'}}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8b6c3e',
                  marginBottom: '12px',
                }}
              >
                Background: {bg}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#7a7668',
                  marginBottom: '6px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Primary text
              </div>
              {textColors.map((tc) => (
                <div
                  key={tc.value}
                  style={{
                    color: tc.value,
                    fontSize: '14px',
                    fontFamily: '"PT Sans", "Century Gothic", sans-serif',
                    marginBottom: '6px',
                    display: 'flex',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      color: '#6a6658',
                      width: '140px',
                      flexShrink: 0,
                      fontFamily: 'system-ui',
                    }}
                  >
                    {tc.label}
                  </span>
                  {sampleText}
                </div>
              ))}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#7a7668',
                  marginTop: '16px',
                  marginBottom: '6px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Dim / secondary text
              </div>
              {dimColors.map((dc) => (
                <div
                  key={dc.value}
                  style={{
                    color: dc.value,
                    fontSize: '13px',
                    fontFamily: '"PT Sans", "Century Gothic", sans-serif',
                    marginBottom: '6px',
                    display: 'flex',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      color: '#6a6658',
                      width: '140px',
                      flexShrink: 0,
                      fontFamily: 'system-ui',
                    }}
                  >
                    {dc.label}
                  </span>
                  {sampleText}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const meta = {
  title: 'Iteration 2/Font Showcase',
  component: FontShowcaseComponent,
  parameters: {layout: 'fullscreen'},
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {};
