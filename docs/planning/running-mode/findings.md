# Running Mode Findings

Findings are durable design-memory entries for Running Mode. They record what was
learned, why it matters, and what it changes for future work. A finding may
record a successful direction, a failed direction, or a decision that is stable
enough to guide future work.

Keep findings chronological. Do not delete or rewrite an older finding when it stops being relevant. When a new finding genuinely replaces a recorded older one, add a linked **Supersedes** section to the new finding and a linked **Superseded by** section to the old finding so navigation works in both directions:

```md
**Supersedes:** [F001 - Earlier finding](#f001---earlier-finding)

**Superseded by:** [F007 - Later finding](#f007---later-finding), which changed/replaced the earlier finding by ...
```

Use **Alternatives considered** only for alternative solutions to the same problem that were seriously considered and whose rejection remains useful context. It is not a required section.

## F001 - Use a design memory system for Running Mode planning

**When:** After R1 layout prototyping and feedback review.

**Finding:** Running Mode planning uses a design memory system: a small set of
living documents that offload the project's evolving reasoning into findings,
hypotheses, open questions, and current/task entry points.

**Why:**

The project is complex enough that ad hoc drafts and task artifacts are no
longer enough. Returning to weekend work requires reconstructing what is current,
what was tried, what failed, and what should be picked up next.

A classic decision log alone does not fit the prototype-heavy phase because many
useful records are not implementation decisions yet. The useful split is:

- **Findings:** durable records of what was learned and why it matters.
- **Hypotheses:** shaped answers worth testing; removed once tested.
- **Open questions:** unresolved prompts and task seeds.
- **Current/task docs:** entry points for what to work on now.

This system starts scoped to Running Mode. Elevating it into a whole-project
system can wait until the Running Mode version has been used enough to evaluate.

**Implications:**

- Store Running Mode findings, hypotheses, and open questions under
  `docs/planning/running-mode/`.
- Keep hypotheses and open questions lighter and ephemeral.
- Always produce one or more findings when a hypothesis is tested, whether it
  worked or failed.
- Keep durable reasoning in findings rather than only linking to session
  artifacts.
- Because the files are not grouped by narrower topics, each task must scan all
  three design-memory documents for relevant context and entries it may resolve.
- Review AI-generated records before relying on them.

**Alternatives considered:**

- **A classic ADR/decision log only:** rejected for now because it creates an
  awkward home for untested hypotheses and unresolved questions.
- **A deeper hierarchy by component or topic:** deferred because boundaries are
  still unstable and cross-cutting ideas would be difficult to place.

## F002 - Importance, permanence, and physical dimensions are separate layout axes

**When:** After R1 feedback.

**Finding:** Running Mode layout decisions should distinguish importance,
permanence, and required width or height. A piece of information can be important
without deserving permanent screen space, and a permanent scan zone can still
need a specific size based on its data shape.

**Why:**

R1 often allocated fixed layout space to zones because they were important at
some moment. Feedback clarified that importance may decay quickly, while other
information needs repeated scanning throughout play.

Width and height also depend on data shape. Card-like participant rows may work
in narrow columns where cards grow vertically. Action-oriented lists with
expandable detail may need wider columns. Free text and controls cannot be
narrowed or widened indefinitely without harming readability and usability.

**Implications:**

- Do not reserve permanent grid space only because information is initially
  important.
- Consider duration of relevance alongside access tier.
- Give width-sensitive zones fixed or minimum dimensions where necessary.
- Let card columns, collapsible rows, and reference surfaces use different
  sizing rules.

## F003 - Participant selection and participant detail should stay spatially close

**When:** After R1 feedback.

**Finding:** Selecting a participant and inspecting or acting from that
participant should require one short eye movement. Unrelated room or prep content
should not sit between the roster and participant/actor detail.

**Why:**

Layout J exposed the failure clearly: changing the active participant and then
looking for their detail required jumping through prep-scene data. This breaks
the relationship between selection and result regardless of whether the roster
is vertical or horizontal.

This finding does not settle whether the roster belongs on the left, in the
center, or in a horizontal strip. That remains a layout hypothesis.

**Implications:**

- Keep roster and participant/actor detail adjacent in future layouts.
- Judge horizontal participant treatments partly by how directly they connect to
  selected detail.
- Avoid layouts where participant selection changes a distant surface across
  unrelated content.

## F004 - Threat level is setup/prep information, not live running context

**When:** After R1 feedback.

**Finding:** Threat level should not be displayed as a persistent Running Mode
encounter badge once play is live.

**Why:**

Threat level is useful while preparing or initiating an encounter, but it loses
accuracy and relevance during a living session. Additional participants, random
events, environmental changes, and the party's choices can quickly make the
original encounter estimate misleading.

**Implications:**

- Keep threat level in setup/initiation surfaces where it helps the GM prepare.
- Do not reserve live Running Mode space for it.
- Use live conflict-source and participant state instead of prep-time encounter
  severity during play.

## F005 - Targets are on-demand resolver context

**When:** After R1 feedback.

**Finding:** Targets should not be a persistent Running Mode layout zone.
Relevant or full defensive statistics of selected targets should be available on
demand while resolving an action.

**Why:**

Target data is temporary resolver context. It matters while resolving a specific
action, but not as something the GM needs to periodically scan during room
exploration or general tactical flow.

**Implications:**

- Do not reserve permanent layout space for Targets.
- Explore target data as a modal, popover, temporary overlay, or in-place
  resolver state.
- Find the right trigger for opening Targets from an action, participant row, or
  resolver interaction.

## F006 - Breadcrumbs are not worth live Running Mode space

**When:** After R1 feedback.

**Finding:** High-level setting/location/adventure breadcrumbs should not reserve
space on the Running Mode screen.

**Why:**

The GM is not usually switching between settings or adventures during a session.
Breadcrumbs provide orientation, but not enough live value to compete with
participants, prompts, triggers, conflict state, and reference surfaces.

**Implications:**

- Do not add high-level breadcrumbs to the live Running Mode layout.
- Solve high-level navigation through a menu, route switcher, or separate
  navigation surface.
- Keep room/scene identity visible without the full hierarchy.

## F007 - Running Mode uses an approximately 320px compact roster

**When:** After Participant and Roster Internals feedback.

**Finding:** The participant roster should target approximately `320px` width and keep its normal cards compact.

**Why:**

The width study found that approximately `320px` gives names and tactical controls enough room without overspending layout width. Around `300px` to `340px` remains comfortable. A `240px` exploration roster is possible under pressure but handles long names worse; `400px` provides little additional value, but increases eyes movement.

Full A/M lists do not belong in normal participant cards. Common creature aspects and inherited group A/Ms repeat across similar participants, make cards much taller, and make exceptional participant-specific information harder to notice. Whether rare individual motivations remain inline is still a hypothesis to test against the shared A/M surface.

**Implications:**

- Give future Running Mode layouts a roster slot around `320px`.
- Keep tactical actor detail adjacent to that slot.
- Keep full aspect and motivation lists out of normal participant cards.
- Keep exploration grouping informal: the primary group (in-conflict in an encounter, non-conflicting out of one) has no title, non-conflicting gets a title only when needed (there's an active encounter, and there are participants that do not oppose an answer to the dramatic question), and out-of-game participants are collapsed and de-emphasized.
- Merge tactical Flow into an initiative-ordered roster UI that interleaves PCs and creatures. Omit participants without initiative, show only round controls above it, and use explicit flag buttons to change actor.
- Keep tactical state dense: HP adjustment, conditions, and reaction controls stay close to the name row and add vertical space only when conditions are present.

**Alternatives considered:**

- **A `240px` default roster:** rejected because long creature names become cramped, though it remains a viable constrained exploration fallback.
- **A `400px` roster:** rejected because the card content gains little while eye movement and layout cost increase.
- **Full inline A/M lists:** rejected because repeated shared information makes cards tall and obscures participant-specific differences.

## F008 - Groups use an adjacent popup and colored membership dots

**When:** After Participant and Roster Internals feedback.

**Finding:** Groups appear in a complete popup adjacent to the roster, while small colored dots mark group membership on participant cards.

**Why:**

The intent behind opening groups is to see the available groups and what they carry while retaining creature context. An adjacent popup supports direct comparison without replacing the roster or moving rows below a long list.

Small colored dots preserve name-row space and support overlapping memberships. The adjacent popup acts as the legend by showing the same colors with group names.

**Implications:**

- Open the full group set beside the roster using an appropriate positioned popup primitive.
- Use small color dots for overlapping group memberships; do not spend name-row width on lettered marks.
- Treat group colors as part of the Running Mode presentation model, subject to the remaining runtime-ownership hypothesis.

**Alternatives considered:**

- **Independent group rows:** rejected because groups have no ordinary tactical state and little compact content beyond A/Ms.
- **Replacing roster rows with groups:** rejected because it prevents side-by-side comparison, which is valuable for the selected color-dot membership indication strategy.
- **Inserting groups into roster flow:** rejected because it shifts participant positions and becomes awkward with long rosters.
- **Large lettered group circles:** rejected because they consume too much of the participant name row.

## F009 - Creature participant controls use compact explicit actions

**When:** After Participant and Roster Internals feedback, carrying forward interaction work from Iteration 3.

**Finding:** Creature participant cards use a compact set of explicit controls: a statblock button, HP display with adjustment input, condition button, reaction toggle, and tactical turn button.

**Why:**

The statblock needs a dedicated button. Earlier name-click and name-hover treatments were unreliable: the name did not communicate the action clearly, hover was too incidental, and clicking the name competed with other possible participant actions.

HP is universal creature state and changes frequently. An adjustment input supports the table action directly ("take 12 damage", "heal 8") better than repeated `+`/`-` clicks or replacing the exact current value.

Reaction availability is also universal creature state and important enough during tactics to stay on the card. Conditions are common enough to need fast access but often absent, so a `C` button opens condition entry instead of reserving permanent input space.

The turn action belongs with the other explicit controls on the right. A flag button is easier to click than a small status dot and keeps the card's control alignment coherent.

**Implications:**

- Keep statblock access as an explicit button rather than overloading the participant name.
- Edit HP through a signed adjustment input while displaying the resulting current and maximum values.
- Keep reaction availability directly toggleable on tactical creature cards.
- Use a compact condition action that reveals entry only when requested; do not render a persistent condition input.
- Use an explicit flag button to set the actor and indicate the current turn.
- Preserve the compact right-aligned control rhythm when refining icons or adopting shared button primitives.

**Alternatives considered:**

- **Clickable or hoverable participant name for statblock access:** rejected because discoverability and interaction clarity were poor.
- **HP `+`/`-` buttons:** rejected because common damage and healing amounts require too many clicks.
- **Editing exact HP directly:** rejected because the GM usually thinks in deltas during play.
- **Persistent condition input:** rejected because most creatures have no conditions most of the time.
- **Turn dot on the left:** rejected because it was difficult to click and created awkward spacing.
