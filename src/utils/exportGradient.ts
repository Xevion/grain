import html2canvas from "html2canvas";

export interface ExportData {
  backgrounds: string[];
  svg: string;
  noiseIntensity: number;
}

/**
 * Export the current gradient as a PNG image
 */
export async function exportAsPNG(elementId: string = "gradient-container"): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Gradient element not found");
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher quality
      logging: false,
    });

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `grain-gradient-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    console.error("Failed to export PNG:", error);
    throw error;
  }
}

/**
 * Generate CSS code for the current gradient
 */
export function generateCSS(data: ExportData): string {
  const { backgrounds, svg } = data;

  const backgroundLayers = [`url("${svg}")`, ...backgrounds].join(",\n    ");

  return `/* Grain Gradient CSS */
.gradient-background {
  background: ${backgroundLayers};
  filter: contrast(150%) brightness(90%);
  background-blend-mode: overlay;
}

/* Additional overlay (optional) */
.gradient-overlay {
  background: rgba(40, 40, 40, 0.5);
  background-blend-mode: overlay;
}`;
}

/**
 * Copy CSS code to clipboard
 */
export async function copyCSSToClipboard(css: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(css);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    throw error;
  }
}

/**
 * Download CSS code as a file
 */
export function downloadCSS(css: string): void {
  const blob = new Blob([css], { type: "text/css" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `grain-gradient-${Date.now()}.css`;
  link.click();
  URL.revokeObjectURL(url);
}
