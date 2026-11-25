import { useCallback, useState } from 'react';
import {
  resolvePdfEndpointUrl,
  sanitizePdfFilename,
} from './googleDrivePdf';

export interface PdfDownloadTarget {
  sourceUrl?: string | null;
  googleDriveUrl?: string | null;
  fileName: string;
}

/**
 * Fetches a PDF endpoint, verifies HTTP status, `application/pdf` MIME type, and
 * the binary `%PDF-` magic header before triggering a file save so HTML preview/error
 * pages are never disguised or downloaded as `.pdf`.
 */
export async function downloadVerifiedPdf({
  sourceUrl,
  googleDriveUrl,
  fileName,
}: PdfDownloadTarget): Promise<void> {
  const safeName = sanitizePdfFilename(fileName);
  const { endpointUrl, fileId, invalidDriveUrl } = resolvePdfEndpointUrl(sourceUrl, safeName, googleDriveUrl);

  if (invalidDriveUrl) {
    throw new Error(
      'This Google Drive link does not contain a valid downloadable PDF file ID.'
    );
  }

  if (!endpointUrl) {
    throw new Error('No PDF download source is configured for this document.');
  }

  if (fileId) {
    window.location.assign(endpointUrl);
    return;
  }

  let response: Response;
  try {
    response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/pdf',
      },
    });
  } catch {
    throw new Error(
      'Unable to reach the download server. Please check your connection and try again.'
    );
  }

  const contentType = (response.headers.get('content-type') || '').toLowerCase();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('The requested PDF file could not be found.');
    }
    throw new Error(`Download failed (status ${response.status}). Please try again later.`);
  }

  if (!contentType.includes('application/pdf')) {
    throw new Error(
      'Download blocked: the server returned non-PDF content (such as an HTML preview page) instead of a valid PDF file.'
    );
  }

  const rawBlob = await response.blob();
  if (rawBlob.size < 5) {
    throw new Error('The downloaded PDF file is empty or incomplete.');
  }

  const headerSlice = await rawBlob.slice(0, 5).text();
  if (headerSlice !== '%PDF-') {
    throw new Error(
      'Invalid PDF binary format detected. Refusing to save a non-PDF file as .pdf.'
    );
  }

  const pdfBlob =
    rawBlob.type === 'application/pdf'
      ? rawBlob
      : new Blob([rawBlob], { type: 'application/pdf' });

  const objectUrl = URL.createObjectURL(pdfBlob);
  try {
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = safeName;
    anchor.rel = 'noopener noreferrer';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } finally {
    window.setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 1500);
  }
}

export function usePdfDownload() {
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const clearDownloadError = useCallback(() => {
    setDownloadError(null);
  }, []);

  const handleDownload = useCallback(
    async (key: string, target: PdfDownloadTarget) => {
      setDownloadError(null);
      setDownloadingKey(key);
      try {
        await downloadVerifiedPdf(target);
      } catch (err) {
        const message =
          err instanceof Error && err.message
            ? err.message
            : 'Unable to download this PDF file right now.';
        setDownloadError(message);
      } finally {
        setDownloadingKey((current) => (current === key ? null : current));
      }
    },
    []
  );

  return {
    downloadingKey,
    downloadError,
    clearDownloadError,
    handleDownload,
  };
}
