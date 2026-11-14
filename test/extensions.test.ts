/**
 * `@k9o/extension-client` factory and type-resolution tests: a slug resolves to its typed binding, every method rejects
 * with a clear error before any request is sent, and an unknown slug throws.
 */

import { describe, expect, it } from "bun:test";
import { k9o, type PaperlessExtension } from "../src/index.ts";

describe("k9o.extension(slug) factory", () => {
  it("resolves `paperless` slug to a PaperlessExtension instance", () => {
    const paperless = k9o.extension("paperless");
    const _typeCheck: PaperlessExtension = paperless;
    void _typeCheck;
    expect(typeof paperless.documents.uploadAndOcr).toBe("function");
    expect(typeof paperless.workspace.init).toBe("function");
  });

  it("returns the same instance on repeated calls", () => {
    expect(k9o.extension("paperless")).toBe(k9o.extension("paperless"));
  });

  it("paperless.documents.uploadAndOcr rejects with a clear error", async () => {
    const paperless = k9o.extension("paperless");
    await expect(
      paperless.documents.uploadAndOcr({ buffer: new Uint8Array(0), filename: "x.pdf" }),
    ).rejects.toThrow(/is not available yet/);
  });

  it("throws synchronously for an unknown slug", () => {
    expect(() => {
      // @ts-expect-error — `not-in-catalogue` is not in the ExtensionSlug union.
      k9o.extension("not-in-catalogue");
    }).toThrow(/not found in @k9o\/extension-client baked-in catalogue/);
  });
});
