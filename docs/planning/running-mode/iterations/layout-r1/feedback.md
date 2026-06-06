# General thoughts

- Meaningful content doesn't take up more than 4/9 of the screen, or it will require too much horizontal movement
- Sidebars work good. They might contain lists or multiple smaller widgets
- Card-like lists work best in narrow columns, i.e. a roster with cards that have a lot of info that has different kinds of data and some actions on top. Collapsible lists work better in wider columns, i.e. a list of scene's skill checks that has an action-oriented description (which is the main data by default) and a bigger chunk of data (a more detailed description, DC, effects and other info) shown in a collapsible section, on the sidebar, or in a popup
- Scroll is a minor interaction, but it's an interaction. It should be reasonably avoided for the immediate tier. It works for (potentially) truly big lists with info that might not be needed all at once: roster, scene treasures or skill checks. It should be avoided (although I'm not 100% sure) for a more critical data that might need periodical scanning: room prompts, triggers/interrupts
- An optional sidebar will change the available full width. Some areas can't really be narrowed without losing readability. They might need either a fixed width or a minimum width (potentially with `minmax(min, [n]fr)`)
- somehow I feel that more important info belongs to the left of the screen. the rightmost part should be preserved for less important things. a map, links, notes, a sidebar with pinned statblocks, etc. participant roster shouldn't go to the right
- room start reminders and the flavor text feel more and more like lenses, popups or snackbars. something visible by default but easily dismissable and recoverable in a case of an accidental closure. I wouldn't like to preserve space for that info, because it's important, but for a very limited amount of time

# Ideas that I like

- putting a dramatic question into the page header right to the title (B) is an interesting idea. I'm worried that it'll be jumping around if I go to different rooms. I like this idea only if we can somehow stabilize its positioning without breaking at edge cases with a long title and a long dramatic question. Up to the point where we can put a room name to the right (it's usually shorter, and the right top corner feels less focusable than the left one), and a dramatic question to the left, and we play around with smart rules for truncation later (I think about keeping the question on one line up to 3/4, then wrap; the room name takes all the space it has and truncates with a tooltip without wrapping, or something like this)
- literal split into two columns is weird but interesting (I, P). it might work well if we find a way to arrange sections inside each column. given the section width problem, P looks more promising, but we need to see. we need at least one prototype like this in the next iteration
- a horizontal list for participants can be tried, although it can be hard to work with if it gets long enough to scroll. we can try it in the next iteration
- I like the shared A/M surface preview from M and P as a collection of all A/Ms for active participants. it feels like a participant-centered trigger section (for situations like "oh, this guy wouldn't like this PC's action"). it's not a necessary immediate tier data (although we can try to fit), it might be a click-away thing, like a modal or a lens
- I'd love to make M work, but I have concerns. a good background image needs free space to be visible. we could make cards on that have transparent background, but then we have to solve a readability issue on different backgrounds. we need one prototype like this, but whether it'll work is an open question
- N is almost "everything's a lens", but it's a tab instead. it might actually work, but we have to carefully decide what stays in the frame and how is info grouped into tabs. we can try this, but it's a low-confidence path for now

# Ideas I don't like

- D is too dashboardy. it doesn't give proper weight difference to different widgets. I'm ok with giving up to 1/3 of the screen width to an area with free text (descriptions, skill conditions, etc.), but I a participant card should be scannable even quicker, and probably 1/6 of the screen should be the maximum width. each card can grow vertically rather than horizontally
- J makes me jump from through prep scene data when I switch an actor and then want to look at details.
- K as an "everything's a lens" setup is very interesting, but very hard to design right. it can be an idea to trie if others won't work. constant lens switching might make UI powerful, but it has its cost, especially if we have too many lenses, which effectively become different layouts (a drawer doesn't work for everything imo). we can remember this option but probably defer
- O feels a bit more awkward than F for a tactical overlay, but this lo-fi makes it hard to feel. I've seen a lot of no-overlay solutions worth investigating, so we can de-prioritize the overlay solution for now

# More questions

- interrupts and triggers are very similar conceptually. they're "oh, let me quickly see if something should be triggered now". does it mean we can treat them similarly or merge into a single widget? I can imagine trap reactions be in the scene triggers, but if a tactical encounter starts, their reactions transition into interrupts. I don't know if this pattern scales well to other types of triggers/interrupts

# Not needed elements

- now I think that a threat level badge might not make sense during play. it fits well into prep data (as a reminder when I prepare an encounter or as an indicator when I initiate an encounter from setup), but in a living game it might lose relevance pretty quickly. another party enters play, a random event changes the battlefield, and it doesn't account for the environment. I added it in v3, but now I think that it's only worth it for the setup display, not when an encounter starts
- the "targets" view of data is needed **on demand**. it doesn't need to take space on the screen all the time. its temporary nature makes it a perfect example of a dismissable modal. finding the right place to put a trigger for it is a different question. don't display it in the layout for now
- let's just exclude breadcrumbs. they take up space and don't serve any real purpose (I'm not going between settings or adventures during a session). this high-level navigation can be solved via a menu or something like this. I wouldn't like to keep space for them
- I don't understand how you all misunderstood "A/M highlights". I meant "when I hover over a conflict source, highlight related participants". a literal outline, bg color change or something like that. I don't even know what data could be put into a widget like this
