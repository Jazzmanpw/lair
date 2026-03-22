import type {Scene} from '@lair/domain/scene';
import Fpo from './fpo.tsx';

export type ScenePageLayoutProps = {
  scene: Scene;
};

export default function ScenePageLayout({scene}: ScenePageLayoutProps) {
  const {meta, skillChecks, encounter, traps, treasures, linkedSceneIds} =
    scene;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: '20px',
        fontFamily: '"Crimson Text", "Times New Roman", serif',
        color: '#2c1810',
        padding: '24px',
        minHeight: '100vh',
        background: '#faf6ee',
      }}
    >
      {/* Main column */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <Fpo style={{height: '56px', fontSize: '14px'}}>
          {meta.title} — {meta.setting.label} › {meta.location.label}
        </Fpo>

        <Fpo style={{height: '100px'}}>Flavor text</Fpo>

        <Fpo style={{height: '140px'}}>Room description</Fpo>

        <Fpo style={{height: skillChecks.length > 2 ? '120px' : '80px'}}>
          Skill checks ({skillChecks.length})
        </Fpo>

        {encounter && (
          <Fpo style={{height: '180px'}}>
            Encounter — {encounter.threatLevel} ({encounter.creatures.length}{' '}
            types)
          </Fpo>
        )}

        <Fpo style={{height: traps.length > 1 ? '160px' : '80px'}}>
          Traps ({traps.length})
        </Fpo>

        <Fpo style={{height: treasures.length > 2 ? '100px' : '60px'}}>
          Treasures ({treasures.length})
        </Fpo>
      </div>

      {/* Sidebar rail */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <Fpo style={{height: '120px'}}>
          Linked scenes ({linkedSceneIds.length})
        </Fpo>

        {encounter && <Fpo style={{height: '100px'}}>Encounter quick ref</Fpo>}

        <Fpo style={{flex: 1, minHeight: '200px'}}>Map placeholder</Fpo>
      </div>
    </div>
  );
}
