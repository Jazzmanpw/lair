// encounter can be in 3 states
// 1. prepared during build (keyword setup)
// 2. initiated during play (keyword encounter? exploration mode?)
// 3. initiative mode (keyword run? encounter? encounter mode?)
// the second one already already has to have some states,
// but no need for flow. these states should be persisted in some sense during a session. 2 should be able to transition into 3 seamlessly
// another question is how to distinguish different forces potentially participating in 3. they share the flow, but are they different encounters? maybe. although the potential question is the same, only sources of conflict are different
// another question is that maybe encounter states (participants and their states, dramatic question and conflict sources) should be one sub-state in a higher-level **session state**, while flow for "encounter mode" is just another state with initiative order that can pull different participants from initiated encounters
// then we roughly have 2 big slices of the app: Setup data created in Building and State data created and manipulated in Running. and this State just handles it all, not just an encounter. it needs some persistense (to be safe from page refresh), but translating State into canonical Setup needs to be an explicit action
// one thing that's not 100% clear is the difference between canonical Setup and Compendium. especially given that in a given setting, I can override certain options to diverge from Compendium. and of course canonical and run data will be referencing Compendium, but the nature of this relationship is unclear for now
// it's not about building data model. it's about building mental model. maybe visualising it a bit might help

export type EncounterRunState = {
  participants: Record<string, Participant>;
  participantStates: Record<string, ParticipantRunState>;
};

type Participant = {
  id: string;
  label: string;
  templateId: string;
  variationId: string | null;
};

export type EncounterFlowState = {
  initiativeOrder: Participant['id'][];
  activeParticipantId: Participant['id'];
  round: number;
};

type ParticipantRunState = {
  currentHp: number;
  maxHp: number;
  conditions: string[];
  reactionAvailable: boolean;
  // missing fields:
  // - consumables/points/slots tracker
};
