/**
 * `@k9o/extension-client` — typed bindings for Kilimanjaro platform extensions.
 *
 * `k9o.extension(slug)` returns the typed binding for an extension, resolved by slug:
 *
 * ```typescript
 * import { k9o } from "@k9o/extension-client";
 *
 * const paperless = k9o.extension("paperless");
 * const result = await paperless.documents.uploadAndOcr({ buffer, filename });
 * ```
 *
 * The bindings define the typed contract. Calls are not served yet: every method rejects with an error before any
 * request is sent. To write an extension, use `@k9o/extension-runtime`.
 */

import { paperlessExtension, type PaperlessExtension } from "./extensions/paperless.ts";

/** The slugs of the extensions this package has typed bindings for. */
export type ExtensionSlug = "paperless";

/** The typed binding for a slug. */
export type Extension<S extends ExtensionSlug> = S extends "paperless" ? PaperlessExtension : never;

const REGISTRY: { readonly [K in ExtensionSlug]: Extension<K> } = {
  paperless: paperlessExtension,
};

export const k9o = {
  /** The typed binding for an extension, resolved by slug (for example `paperless`). Throws an `Error` for a slug this package has no binding for. */
  extension<S extends ExtensionSlug>(slug: S): Extension<S> {
    const bound = REGISTRY[slug];
    if (bound === undefined) {
      throw new Error(`Extension "${slug}" not found in @k9o/extension-client baked-in catalogue.`);
    }
    return bound;
  },
} as const;

export type { PaperlessExtension } from "./extensions/paperless.ts";
