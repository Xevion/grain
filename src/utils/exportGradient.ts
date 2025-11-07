import { domToPng } from "modern-screenshot";

/**
 * Export the gradient as a PNG screenshot
 */
export async function exportGradientAsPNG(
  elementId: string = "gradient-container"
): Promise<void> {
  const element = document.querySelector(`#${elementId}`);
  if (!element) {
    throw new Error("Gradient element not found");
  }

  const dataUrl = await domToPng(element as HTMLElement);

  const link = document.createElement("a");
  link.download = `grain-gradient-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}
