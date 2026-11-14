/**
 * The `paperless` extension's typed binding: document upload with OCR, and workspace initialisation.
 *
 * The typed contract is available now. Calls are not served yet: every method rejects with an error that says so.
 */

/** Document upload + OCR result shape. */
export type UploadAndOcrResult = {
  documentId: string;
  ocrText: string;
  pages: number;
  language: string | null;
};

/** The workspace-init response. The `version: 2` marker is required; the rest of the shape is set by the extension. */
export type WorkspaceInitResponse = {
  version: 2;
  [key: string]: unknown;
};

/** Typed binding interface for the `paperless` extension. */
export interface PaperlessExtension {
  documents: {
    uploadAndOcr(params: {
      buffer: Uint8Array | ArrayBuffer;
      filename: string;
      language?: string;
    }): Promise<UploadAndOcrResult>;
  };
  workspace: {
    init(): Promise<WorkspaceInitResponse>;
  };
}

/** Runtime stub: every method rejects until per-method runtime calls are implemented. */
const stub = (op: string): (() => Promise<never>) => {
  return (): Promise<never> =>
    Promise.reject(
      new Error(
        `paperless.${op} is not available yet: the extension runtime is not implemented in this version of @k9o/extension-client.`,
      ),
    );
};

export const paperlessExtension: PaperlessExtension = {
  documents: {
    uploadAndOcr: stub("documents.uploadAndOcr") as PaperlessExtension["documents"]["uploadAndOcr"],
  },
  workspace: {
    init: stub("workspace.init") as PaperlessExtension["workspace"]["init"],
  },
};
