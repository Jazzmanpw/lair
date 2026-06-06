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
