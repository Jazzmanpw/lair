import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, fn, userEvent, within} from 'storybook/test';
import {
  sessionDog,
  sessionKennelAnimalsGroup,
} from '@lair/domain/fixtures/participants';
import {
  dogSetup,
  dogSetupWithVariation,
  kennelAnimalsGroupSetup,
  pitomnikEncounterSetup,
  ratSetup,
} from '@lair/domain/fixtures/setups';
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
    availableSetups: [
      dogSetup,
      dogSetupWithVariation,
      ratSetup,
      kennelAnimalsGroupSetup,
    ],
    statblocks: {
      [petrifiedDogStatblock.id]: petrifiedDogStatblock,
      [petrifiedRatStatblock.id]: petrifiedRatStatblock,
    },
    sessionParticipants: [sessionDog, sessionKennelAnimalsGroup],
    onSubmit: fn(),
    onCancel: fn(),
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const FillsAndSubmits: Story = {
  args: {
    availableSetups: [dogSetup, ratSetup, kennelAnimalsGroupSetup],
    sessionParticipants: [],
  },
  play: async ({canvas, args}) => {
    await userEvent.type(
      canvas.getByRole('textbox', {name: /dramatic question/i}),
      'Can the party escape the kennel?',
    );

    await userEvent.selectOptions(
      canvas.getByRole('combobox', {name: /from setup library/i}),
      dogSetup.id,
    );
    await userEvent.click(
      canvas.getByRole('button', {name: /add from setup/i}),
    );

    const participantsList = canvas.getByRole('group', {name: /participants/i});
    const participantScope = within(participantsList);

    await userEvent.click(
      participantScope
        .getAllByRole('button', {name: /add motivation/i})
        .at(-1)!,
    );
    await userEvent.type(
      participantScope.getAllByRole('textbox', {name: /motivation/i}).at(-1)!,
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
        participants: expect.arrayContaining([
          expect.objectContaining({
            setupId: dogSetup.id,
            name: dogSetup.name,
            variationId: null,
            groupIds: [kennelAnimalsGroupSetup.id],
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

export const R2FillsAndSubmits: Story = {
  play: async ({canvas, args}) => {
    await userEvent.type(
      canvas.getByRole('textbox', {name: /dramatic question/i}),
      'Will the creatures escape the kennel?',
    );

    await userEvent.selectOptions(
      canvas.getByRole('combobox', {name: /from setup library/i}),
      dogSetupWithVariation.id,
    );
    await userEvent.click(
      canvas.getByRole('button', {name: /add from setup/i}),
    );

    const participantsList = canvas.getByRole('group', {name: /participants/i});
    const participantScope = within(participantsList);

    const nameInput = participantScope
      .getAllByRole('textbox', {
        name: /participant name/i,
      })
      .at(-1)!;
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Aggressive Dog');

    await userEvent.selectOptions(
      participantScope.getByRole('combobox', {name: /variation/i}),
      'var-aggro',
    );

    await userEvent.click(
      participantScope
        .getAllByRole('button', {name: /add motivation/i})
        .at(-1)!,
    );
    await userEvent.type(
      participantScope.getAllByRole('textbox', {name: /motivation/i}).at(-1)!,
      'Protect territory',
    );

    await userEvent.selectOptions(
      canvas.getByRole('combobox', {name: /from session/i}),
      sessionDog.id,
    );
    await userEvent.click(
      canvas.getByRole('button', {name: /add from session/i}),
    );

    await userEvent.click(
      canvas.getByRole('button', {name: /add conflict source/i}),
    );
    await userEvent.type(
      canvas.getByRole('textbox', {name: /opposition/i}),
      'Stone beasts guarding the room',
    );

    const conflictSourcesList = canvas.getByRole('group', {
      name: /conflict sources/i,
    });
    const conflictScope = within(conflictSourcesList);

    await userEvent.selectOptions(
      conflictScope.getByRole('combobox', {name: /link reason/i}),
      dogSetupWithVariation.concept.theme.aspects[0].id,
    );
    await userEvent.click(conflictScope.getByRole('button', {name: /^link$/i}));

    await userEvent.click(canvas.getByRole('button', {name: /confirm/i}));

    await expect(args.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        encounter: expect.objectContaining({
          dramaticQuestion: 'Will the creatures escape the kennel?',
          conflictSources: [
            expect.objectContaining({
              opposition: 'Stone beasts guarding the room',
              reasons: [
                {
                  type: 'aspect',
                  id: dogSetupWithVariation.concept.theme.aspects[0].id,
                },
              ],
            }),
          ],
        }),
        participants: expect.arrayContaining([
          expect.objectContaining({
            setupId: dogSetupWithVariation.id,
            name: 'Aggressive Dog',
            variationId: 'var-aggro',
            type: 'creature',
            state: expect.objectContaining({
              maxHp: petrifiedDogStatblock.hitPoints.value,
              currentHp: petrifiedDogStatblock.hitPoints.value,
            }),
          }),
          expect.objectContaining({
            id: sessionDog.id,
            setupId: sessionDog.setupId,
            name: sessionDog.name,
            variationId: null,
            type: 'creature',
            state: expect.objectContaining({
              maxHp: 44,
              currentHp: 30,
            }),
            motivations: expect.arrayContaining([
              expect.objectContaining({value: 'Охраняет вход'}),
            ]),
          }),
        ]),
      }),
    );
  },
};

export const R3SeededFromSetup: Story = {
  args: {
    availableSetups: [dogSetup, ratSetup, kennelAnimalsGroupSetup],
    sessionParticipants: [sessionKennelAnimalsGroup],
    encounterSetup: pitomnikEncounterSetup,
  },
  play: async ({canvas, args}) => {
    await expect(
      canvas.getByDisplayValue(
        pitomnikEncounterSetup.potentialDramaticQuestion,
      ),
    ).toBeInTheDocument();

    await expect(
      canvas.getByDisplayValue(
        pitomnikEncounterSetup.participants[0].name ?? '',
      ),
    ).toBeInTheDocument();

    const participantsList = canvas.getByRole('group', {name: /participants/i});
    const participantScope = within(participantsList);

    const seededMotivation = participantScope.getByDisplayValue(
      'Прекратить шум в питомнике',
    );
    await userEvent.clear(seededMotivation);
    await userEvent.type(seededMotivation, 'Keep the room quiet');

    const groupMemberships = participantScope.getAllByRole('checkbox', {
      name: kennelAnimalsGroupSetup.name,
    });
    await userEvent.click(groupMemberships[0]);

    await userEvent.click(
      canvas.getByRole('button', {name: /add conflict source/i}),
    );
    await userEvent.type(
      canvas.getByRole('textbox', {name: /opposition/i}),
      'The panicked pack blocks the passage',
    );

    const conflictSourcesList = canvas.getByRole('group', {
      name: /conflict sources/i,
    });
    const conflictScope = within(conflictSourcesList);
    await userEvent.selectOptions(
      conflictScope.getByRole('combobox', {name: /link reason/i}),
      kennelAnimalsGroupSetup.concept.theme.aspects[0].id,
    );
    await userEvent.click(conflictScope.getByRole('button', {name: /^link$/i}));

    await userEvent.click(canvas.getByRole('button', {name: /confirm/i}));

    await expect(args.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        encounter: expect.objectContaining({
          dramaticQuestion: pitomnikEncounterSetup.potentialDramaticQuestion,
          conflictSources: [
            expect.objectContaining({
              opposition: 'The panicked pack blocks the passage',
              reasons: [
                {
                  type: 'aspect',
                  id: kennelAnimalsGroupSetup.concept.theme.aspects[0].id,
                },
              ],
            }),
          ],
        }),
        participants: expect.arrayContaining([
          expect.objectContaining({
            id: sessionKennelAnimalsGroup.id,
            setupId: kennelAnimalsGroupSetup.id,
            name: kennelAnimalsGroupSetup.name,
            motivations: sessionKennelAnimalsGroup.motivations,
            type: 'group',
            state: null,
          }),
          expect.objectContaining({
            id: pitomnikEncounterSetup.participants[0].id,
            setupId: dogSetup.id,
            motivations: [
              expect.objectContaining({value: 'Keep the room quiet'}),
            ],
            groupIds: [],
          }),
          expect.objectContaining({
            id: pitomnikEncounterSetup.participants[1].id,
            setupId: dogSetup.id,
            groupIds: [sessionKennelAnimalsGroup.id],
          }),
        ]),
      }),
    );
  },
};
