# Next Session Prompt: Technical Direction and Repository Setup

## Goal

Use this session to discuss technical direction for the project, separate from product/domain architecture.

The aim is not to lock every choice immediately. The aim is to:

- identify which technical decisions must be made now;
- identify which technical decisions should be intentionally deferred;
- choose a repo structure that supports early UI prototyping;
- preserve flexibility for multiple prototypes and future backend changes.

## Existing Context to Read First

- [ttrpg-app-architecture-draft.md](../ttrpg-app-architecture-draft.md)
- [ttrpg-app-interaction-architecture-draft.md](../ttrpg-app-interaction-architecture-draft.md)

## Scope for the Session

Focus on technical and implementation-facing topics such as:

- frontend stack;
- repo layout;
- prototype strategy;
- local-first architecture;
- storage options and when to defer them;
- import pipeline boundaries;
- how to keep early code flexible while avoiding chaos.

Do not re-open product architecture unless a technical choice clearly depends on it.

## Questions to Discuss

Add the concrete questions for this session below before starting:

- Electron vs Web. maybe both. I don't have experience with Electron, but it makes sense to have a local app for a task like that. on the other hand, it might be useful to get access to some screens from my phone (without bothering with a native app deployment, so I'd rely on a simple web interface or a PWA) while I step away from my PC yet still want to see some notes
- TanStack Start vs whatever different setup. I'd like to play with TSS in this effectively pet project, but I don't know if it fits the ultimate goal. I have no idea if it'll play with Electron nice, or if both are just different frameworks
- I'm not sure about DB, and it's not to decide now, but I'd like to try Convex. If you think there's a better local-first solution, it might work. But Convex should play nice with the phone+PC usage scenario that we might add later
- I like monorepos. I don't have a lot of experience with them, but I find good lib splitting useful. I have experience with Nx, and I have a working repo I'm setting up right now. I solved a bunch of configuration issues there (Nx never works 100%), so we can reuse them here. Especially some basic generators. We can start with a single app and then extract into libs as we see need for that. Or we can start with a single lib (delay the platform question) and wire components up later. What do you think?

## Suggested Discussion Structure

1. Restate the product constraints that matter technically.
2. Identify decisions that are required before prototyping.
3. Identify decisions that should be deferred.
4. Propose a practical initial repo structure.
5. Propose a technical slice for the first UI prototype.
6. Note technical risks and reversible choices.

## Important Constraints

- This is a solo local project.
- The source of truth may eventually be a database, but prototyping should not be blocked on full backend design.
- The architecture should support multiple UI prototypes.
- Import/export with Markdown matters for migration and backups.
- The near-term priority is UI/workflow prototyping, not backend completeness.

## Expected Output

By the end of the session, produce:

- a short list of chosen technical decisions;
- a short list of intentionally deferred decisions;
- a proposed repo structure;
- a proposed first prototype target;
- any setup tasks needed to start implementation.
