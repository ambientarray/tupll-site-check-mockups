# Coffee Corner — Tupll Light design concept

Open `coffee-corner.html`. This is a new, standalone landing-page concept alongside the existing mockup.

## Direction

A neighborhood coffee shop you can imagine opening. Warm ivory framing, restrained orange action, large open typography, and an editorial photograph with a shaded left side for legible text. One visible address input, no business selector. Mobile keeps the same address bar, with an arrow button whose accessible name remains “Explore this location.”

The headline describes choosing a location to open a coffee shop, rather than finding somewhere to buy coffee. Supporting content is deliberately brief: nearby coffee shops, residents and workers, and the location decision.

## Research used

Reviewed the local competitor-address-widgets INDEX and the Walk Score and LoopNet homepage captures, plus the site-check UI findings and current index/stage1b mockups. Borrowed the inviting environmental backdrop and prominent location field from Walk Score, and the generous input treatment from LoopNet. Removed the category navigation and glass-panel wrapper. The prior Placer findings reinforced placing the address field before detailed explanations.

## Follow-up: original research locations supplied by Jed

Reviewed the following original research after Jed supplied the directories:

- `C:/Users/jed/Dropbox/00000 JLytics/99 Utilities/00 Research Bot/geo-app/output/00-summary.md`: data feasibility and coverage, not a visual competitor study.
- `C:/Users/jed/Dropbox/00000 JLytics/99 Utilities/00 Research Bot/geo-app-phase2/output/02-market-scan.md` and its CSV: 66-product competitive scan; the relevant entries include Walk Score, AreaVibes, NeighborhoodScout, Claritas Spotlight, Placer.ai, SiteZeus, and LoopNet. The small-operator opportunity is explicitly described in Gap 4. Reviewed the recommendation's B2B Area Brief and Corner Scout sections as well.
- `C:/Users/jed/Dropbox/00000 JLytics/99 Utilities/00 Research Bot/geo-app-phase-2a/METHOD.md` and `explorations/B-tupll-self-serve/exploration-b.md`: data classification and self-serve site-selection feasibility. The older multi-business-type intake is superseded for this design by Jed's explicit coffee-only request.

These sources reinforce the current concept: address-first entry, an approachable presentation for independent operators, and neighborhood evidence after entry. The visual treatment is a creative interpretation, not a claim that the research prescribed these colors or this photograph. Keep historical research prices and proposed model capabilities out of this landing-page concept. No visual change was necessary after this review.

## Prototype behavior (implementation)

Submitting a nonempty address opens a keyboard-accessible dialog that preserves the entered text and explicitly explains that live lookup is not connected. Its sample link opens the existing South Austin lookup. The existing mockup files are unchanged. Autocomplete and live address validation require a real lookup integration.

## Image

Generated with the built-in imagegen tool, saved locally as `coffee-corner-hero.png`. Depicts an imagined cafe, not an actual address or a researched business.

Final prompt:

> Use case: photorealistic-natural. Asset type: full-bleed website background photograph, landscape 16:9. Create a beautiful editorial architectural photograph of a small independent coffee shop on a leafy Austin neighborhood street in warm early morning sunlight. View from sidewalk across the corner terrace, large dark bronze framed windows, pale limestone and aged warm cream plaster, understated terracotta pots, olive green plants, small round outdoor cafe tables and woven chairs, inviting amber interior with espresso counter. The cafe occupies right two thirds, leafy branch canopy at top, sidewalk leading in from lower left. Upper left and center left must be visually quiet shadowed cream plaster and soft tree shadows so white website headline can overlay. Elegant real architectural photography, soft film grain, natural lived-in detail, earthy warm colors, no exaggerated orange filter, sophisticated hospitality editorial. Wide shot showing a place someone dreams of opening, not close up of coffee cups. No text, no signage lettering, no logos, no watermarks, no UI. Save image for use in local website project.

Google Fonts supplies DM Sans and Manrope, with local sans-serif fallbacks. The background and existing Tupll logo are local assets.
