import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent} from 'storybook/test';
import {averageRoster, crowdedRoster} from './roster-fixtures.ts';
import RosterPrototype, {
  type RosterPrototypeProps,
} from './roster-prototype.tsx';

type StoryArgs = RosterPrototypeProps & {width: 240 | 320 | 400};

const meta = {
  title: 'Iteration 4/Running Mode Roster',
  component: RosterPrototype,
  parameters: {layout: 'centered'},
  args: {
    roster: averageRoster,
    mode: 'exploration',
    groupPopupOpen: false,
    width: 320,
  },
  argTypes: {
    width: {control: 'inline-radio', options: [240, 320, 400]},
    mode: {control: 'inline-radio', options: ['exploration', 'tactics']},
  },
  decorators: [
    (Story, context) => (
      <div
        className="bg-[#0d110c] p-6"
        style={{width: context.args.width + 48}}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Exploration: Story = {
  args: {mode: 'exploration', width: 320},
};

export const Groups: Story = {
  args: {mode: 'exploration', groupPopupOpen: true, width: 320},
};

export const TacticalRoster: Story = {
  args: {mode: 'tactics', width: 320},
  play: async ({canvas}) => {
    await userEvent.click(
      canvas.getByRole('button', {
        name: /make Окаменевшая собака 1 the actor/i,
      }),
    );
    await expect(
      canvas.getByRole('button', {
        name: /make Окаменевшая собака 1 the actor/i,
      }),
    ).toHaveAttribute('aria-pressed', 'true');
  },
};

export const TacticalNarrow: Story = {
  args: {mode: 'tactics', width: 240},
};

export const CrowdedWorstCase: Story = {
  args: {roster: crowdedRoster, mode: 'exploration', width: 320},
};
