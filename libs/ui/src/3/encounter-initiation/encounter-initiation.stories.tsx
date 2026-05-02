import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, fn, userEvent, within} from 'storybook/test';
import {dogSetup, ratSetup} from '@lair/domain/fixtures/setups';
import {
  petrifiedDogStatblock,
  petrifiedRatStatblock,
} from '@lair/domain/fixtures/statblocks';
import EncounterInitiation, {
  type EncounterInitiationProps,
} from './encounter-initiation.tsx';

type StoryArgs = EncounterInitiationProps;

const meta = {
  title: 'Iteration 3/Encounter Initiation',
  component: EncounterInitiation,
  parameters: {layout: 'centered'},
  args: {
    availableSetups: [dogSetup, ratSetup],
    statblocks: {
      [petrifiedDogStatblock.id]: petrifiedDogStatblock,
      [petrifiedRatStatblock.id]: petrifiedRatStatblock,
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const FillsAndSubmits: Story = {
  play: async ({canvas, args}) => {
    await userEvent.type(
      canvas.getByRole('textbox', {name: /dramatic question/i}),
      'Can the party escape the kennel?',
    );

    await userEvent.selectOptions(
      canvas.getByRole('combobox', {name: /participant setup/i}),
      dogSetup.id,
    );
    await userEvent.click(
      canvas.getByRole('button', {name: /add participant/i}),
    );

    const participantsList = canvas.getByRole('group', {name: /participants/i});
    const participantScope = within(participantsList);

    await userEvent.click(
      participantScope.getByRole('button', {name: /add motivation/i}),
    );
    await userEvent.type(
      participantScope.getByRole('textbox', {name: /motivation/i}),
      'Guard the doorway',
    );

    await userEvent.click(
      canvas.getByRole('button', {name: /add conflict source/i}),
    );
    await userEvent.type(
      canvas.getByRole('textbox', {name: /opposition/i}),
      'Petrified creatures blocking the exit',
    );

    await userEvent.click(canvas.getByRole('button', {name: /confirm/i}));

    await expect(args.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        encounter: expect.objectContaining({
          dramaticQuestion: 'Can the party escape the kennel?',
          conflictSources: expect.arrayContaining([
            expect.objectContaining({
              opposition: 'Petrified creatures blocking the exit',
              reasons: [],
            }),
          ]),
        }),
        newParticipants: expect.arrayContaining([
          expect.objectContaining({
            setupId: dogSetup.id,
            name: dogSetup.name,
            type: 'creature',
            state: expect.objectContaining({
              maxHp: petrifiedDogStatblock.hitPoints.value,
            }),
            motivations: [
              expect.objectContaining({value: 'Guard the doorway'}),
            ],
          }),
        ]),
      }),
    );
  },
};
