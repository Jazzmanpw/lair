---
name: write-maintainable-docs
description: Write or revise repository Markdown so each point has one source, links replace repeated explanations, current guidance stays separate from history and provisional ideas, and wording remains direct. Use for planning docs, tasks, findings, decisions, READMEs, AGENTS.md files, architecture notes, and documentation reviews.
---

# Write Maintainable Docs

Write docs so one change requires one authoritative edit. Use this workflow before writing or retrospectively when reviewing an existing draft.

## Workflow

### 1. Find the right home

- Read the relevant repository instructions and neighboring docs.
- Define the document's single responsibility and intended reader. Move material that serves a different job even when it is individually useful.
- Decide where each fact, decision, rationale, example, and historical record belongs.
- Put information in the narrowest document that fully owns it. Keep global guidance global and local details local.
- Extend an existing source instead of creating another document with the same responsibility.

### 2. Write the current guidance

- Lead with the current behavior, decision, or model.
- Organize sections around what to do and why it matters.
- Keep rejected alternatives and discussion history only when they remain useful evidence.
- State the current conclusion directly when an old comparison adds no value.

### 3. Link instead of copying

- Link to the source of shared information instead of paraphrasing it.
- Add only enough local context to explain why the link matters.
- When local work produces global guidance, put the guidance in the global source and keep the local evidence as a linked record.
- Name the source when guidance was derived from another document.

### 4. Keep certainty clear

- Distinguish stable guidance, findings or decisions, hypotheses, open questions, examples, and temporary task context.
- Keep provisional ideas provisional until the responsible workflow promotes them.
- Match the wording and location to the point's actual certainty and scope.

### 5. Review for maintenance

- Confirm that every durable point has one source.
- Before telling the developer that a document is written, describe the document's intended purpose to yourself and check that the document serves that purpose without mixing unrelated responsibilities.
- Check links, headings, anchors, terms, scope, and certainty after moving content.
- Read the result as someone returning months later without the original conversation.
- Remove a new document or section when an existing source plus a link does the same job.

### 6. Improve this skill during real work

- Treat a new reusable writing rule discovered during a task as feedback for this skill.
- Apply the rule to the current docs and update this skill in the same session instead of using it once and forgetting it.
- Keep additions short, positive-first, and useful beyond the current document.
- Leave one-off preferences in the document or repository area where they belong.

## Guardrail Audit

The following are failure modes. Find and fix them before finishing:

- **Duplicate information:** Replace repeated explanation with a canonical link and one short relevance sentence.
- **Discussion artifacts:** Rewrite obsolete contrasts and rejected wording as the current truth. Keep history only where it remains useful evidence.
- **Unnecessary exclusions:** Remove negative rules unless they prevent a plausible, costly mistake. Group the necessary ones in a guardrails section when practical.
- **Unclear source:** Link or move synthesized guidance so it does not silently become a second authority.
- **Mixed scope:** Move local details to local docs and keep global docs focused on global guidance.
- **Premature certainty:** Return unconfirmed decisions to hypothesis, question, or temporary task form.
- **Documentation sprawl:** Merge or replace a new file when it lacks a distinct owner and lifecycle.
