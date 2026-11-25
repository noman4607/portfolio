const GOOGLE_DRIVE_FILE_ID_REGEX = /^[a-zA-Z0-9_-]{10,120}$/;

const GOOGLE_DRIVE_HOSTNAMES = new Set([
  'drive.google.com',
  'drive.usercontent.google.com',
  'docs.google.com',
]);

/**
 * Checks whether a string points to a Google Drive / Google Docs host.
 */
export function isGoogleDriveUrl(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return (
      (parsed.protocol === 'https:' || parsed.protocol === 'http:') &&
      GOOGLE_DRIVE_HOSTNAMES.has(parsed.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

/**
 * Validates that a string is a clean Google Drive file ID.
 */
export function isValidGoogleDriveFileId(value: string): boolean {
  return GOOGLE_DRIVE_FILE_ID_REGEX.test(value.trim());
}

/**
 * Extracts a Google Drive FILE_ID from common sharing or download URLs:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/edit
 * - https://drive.google.com/file/d/FILE_ID/preview
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID&export=download
 * - https://drive.google.com/uc?export=download&id=FILE_ID
 * - https://drive.usercontent.google.com/download?id=FILE_ID&export=download
 * - https://docs.google.com/file/d/FILE_ID/edit
 * - Or a raw validated FILE_ID string
 *
 * Returns null for folders or native Google Docs/Sheets/Slides editor links that
 * require Drive UI export rather than raw binary file download.
 */
export function extractGoogleDriveFileId(urlOrId: string): string | null {
  const trimmed = urlOrId.trim();
  if (!trimmed) return null;

  if (isValidGoogleDriveFileId(trimmed)) {
    return trimmed;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return null;
  }

  const host = parsed.hostname.toLowerCase();
  if (!GOOGLE_DRIVE_HOSTNAMES.has(host)) {
    return null;
  }

  // Reject folders and native workspace editors that are not raw Drive PDF files
  if (
    parsed.pathname.includes('/folders/') ||
    parsed.pathname.startsWith('/document/') ||
    parsed.pathname.startsWith('/spreadsheets/') ||
    parsed.pathname.startsWith('/presentation/')
  ) {
    return null;
  }

  // Match /file/d/<FILE_ID>/... or /d/<FILE_ID>/...
  const pathMatch = parsed.pathname.match(/\/(?:file\/)?d\/([a-zA-Z0-9_-]{10,120})(?:\/|$)/);
  if (pathMatch && isValidGoogleDriveFileId(pathMatch[1])) {
    return pathMatch[1];
  }

  // Match ?id=<FILE_ID> (used by /open?id=..., /uc?id=..., /download?id=...)
  const queryId = parsed.searchParams.get('id')?.trim();
  if (queryId && isValidGoogleDriveFileId(queryId)) {
    return queryId;
  }

  return null;
}

/**
 * Converts a Google Drive sharing URL or file ID into the official direct-download URL:
 * https://drive.google.com/uc?export=download&id=FILE_ID
 */
export function getGoogleDriveDirectDownloadUrl(urlOrId: string): string | null {
  const fileId = extractGoogleDriveFileId(urlOrId);
  if (!fileId) return null;
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

/**
 * Ensures downloaded PDFs always carry a clean, descriptive `.pdf` filename
 * without unsafe path or header characters.
 */
export function sanitizePdfFilename(filename: string | undefined | null, fallback = 'Document.pdf'): string {
  const raw = (filename || fallback).trim();
  const base = raw
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  const safeBase = base || fallback.replace(/\.pdf$/i, '');
  return safeBase.toLowerCase().endsWith('.pdf') ? safeBase : `${safeBase}.pdf`;
}

/** Resolves a static PDF asset or a direct Google Drive download link. */
export function resolvePdfEndpointUrl(
  sourceUrl: string | null | undefined,
  _fileName: string,
  googleDriveUrl?: string | null
): { endpointUrl: string | null; fileId: string | null; invalidDriveUrl: boolean } {
  const preferredSource = (googleDriveUrl && googleDriveUrl.trim()) || (sourceUrl && sourceUrl.trim()) || '';

  if (!preferredSource) {
    return { endpointUrl: null, fileId: null, invalidDriveUrl: false };
  }

  if (isGoogleDriveUrl(preferredSource)) {
    const fileId = extractGoogleDriveFileId(preferredSource);
    if (!fileId) {
      return { endpointUrl: null, fileId: null, invalidDriveUrl: true };
    }
    return {
      endpointUrl: getGoogleDriveDirectDownloadUrl(fileId),
      fileId,
      invalidDriveUrl: false,
    };
  }

  return {
    endpointUrl: preferredSource,
    fileId: null,
    invalidDriveUrl: false,
  };
}
