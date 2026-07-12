# Running Mode Workflow

## Product And Prototype Alignment

For each Running Mode task, clarify the product value before implementation: what user problem the surface solves, what UX it should provide, how the GM is expected to interact with it, and what alternatives the prototype should compare.

For component-internal prototype tasks between full layout rounds, focus on one content area at a time. Compare multiple shapes or interaction treatments for that content area, using real content examples to stress the alternatives. Switching fixtures, rooms, scenes, or density states can be part of the prototype, but it should support evaluating the content area's shape rather than turning the task into a broad layout pass.

Prototype UI behavior first with local view models or fixture-only models when the domain shape is not settled. Keep domain modeling and production data integration as separate follow-up work unless the task explicitly says the domain question is part of the current scope.

## Workflow

When working on Running Mode:

1. Read `docs/planning/running-mode/README.md` first, followed by the referenced task and relevant design-memory documents.
2. Add "Status: in progress" at the beginning of the referenced task file. The content doesn't really matter, but it makes the task file show up in uncommitted changes, which makes it more likely for dev to remember to remove it before committing work.
3. Treat task files as discussion briefs unless they explicitly say implementation is ready.
   - Task files are disposable working briefs. The developer normally removes them when the work is complete; agents should not remove task files unless explicitly asked. Before completion, make sure every durable decision, finding, hypothesis, open question, or follow-up task has been promoted into its owning artifact instead of living only in the task file.
   - When a task absorbs an existing hypothesis, include it in the task's questions, alternatives, or prototype assumptions, and remove or narrow the original `hypotheses.md` entry so the idea has one active home.
4. Inspect the existing context, then ask only the specific unresolved questions that require developer input before implementation. Do not answer open product or domain questions on the developer's behalf.
   - The developer has already reviewed the task document thoroughly and knows the context it contains. Do not restate settled requirements or propose a full scope for approval.
   - Start with "Here are the decisions I need from you" or similarly direct framing, followed by focused questions. If no genuinely open decisions remain, say so and begin implementation. Prototype tasks usually contain unresolved questions, so verify carefully before concluding that none remain.
5. Do not edit implementation until the developer and agent agree on what to prototype, which alternatives to compare, and what the prototype should test. Agreement may come from the task document plus answers to focused questions; do not ask the developer to reconfirm requirements already stated in the task.
6. After each edit round, stop and discuss the result before changing implementation again. Treat questions and comments as discussion prompts: reach agreement, make the next agreed edit round, then return to discussion.
7. The developer decides when the task and feedback cycle are complete. Until then, do not mark tasks complete or promote provisional conclusions into findings, hypotheses, framing, or other durable planning artifacts.
   - Treat `docs/planning/running-mode/README.md` as developer-owned personal project memory. Read it for context, but do not edit `Current work` or any other section unless the developer explicitly names that file or requests the exact README change. General permission to update docs does not include this file.
   - Writing down side task docs immediately is fine. Make sure you include all the relevant context, so that it can be taken into work in a fresh thread.
8. Do not rush to archive UI work. Archiving usually happens after an explicit developer request. Both unpolished prototypes and completed current-direction work stay in `@lair/ui` as a base for future work.
   - Move UI work to archive only when the whole implementation iteration wraps up, or when a smaller prototype did not work out or was superseded but remains useful as future reference.
   - Everything else either remains active or is deleted.

The workflow text in `docs/planning/running-mode/README.md` is primarily the developer's personal project reminder. Interpret “you” there as the developer unless the text explicitly addresses agents.

## Component Study Notes

Keep a local component-study `README.md` as a compact artifact index rather than a second design-memory document:

- identify the Storybook surface and summarize what its stories exercise;
- record only implementation or prototype caveats needed to interpret or reuse the artifact;
- use an `Outcomes` section to link to findings, hypotheses, and open questions instead of repeating their reasoning;
- keep durable content or authoring rules in their cross-mode source and link to it;
- repeat a stable constraint locally only when it was direct prototype input that explains the artifact's shape, and name its canonical source.

The usual shape is `Stories`, `Prototype Caveats` or `Implementation Caveats`, and `Outcomes`. Omit a section when it has nothing useful to preserve.

## Visual Verification

After each agreed Running Mode UI prototype edit round, use `$verify-storybook-ui` to inspect the affected Storybook stories before returning to discussion.
