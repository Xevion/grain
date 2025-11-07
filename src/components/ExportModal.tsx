import { useState } from "preact/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Download, Copy, Check } from "lucide-preact";
import { GlassButton } from "./GlassButton";
import { exportAsPNG, generateCSS, copyCSSToClipboard, downloadCSS, type ExportData } from "../utils/exportGradient";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
  exportData: ExportData;
}

export function ExportModal({ open, onClose, exportData }: ExportModalProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const cssCode = generateCSS(exportData);

  const handleCopyCSS = async () => {
    try {
      await copyCSSToClipboard(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDownloadCSS = () => {
    downloadCSS(cssCode);
  };

  const handleExportPNG = async () => {
    setExporting(true);
    try {
      await exportAsPNG("gradient-container");
    } catch (error) {
      console.error("Failed to export PNG:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
          <div className="glass-panel p-6 m-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-space-grotesk text-2xl font-bold text-zinc-900">
                Export Gradient
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="glass-button rounded-lg p-2 text-zinc-900"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            {/* PNG Export Section */}
            <div className="space-y-3">
              <h3 className="font-space-grotesk text-sm font-semibold uppercase tracking-wide text-zinc-900">
                Export as Image
              </h3>
              <GlassButton
                onClick={handleExportPNG}
                disabled={exporting}
                className="w-full flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>{exporting ? "Exporting..." : "Download PNG"}</span>
              </GlassButton>
            </div>

            {/* CSS Export Section */}
            <div className="space-y-3">
              <h3 className="font-space-grotesk text-sm font-semibold uppercase tracking-wide text-zinc-900">
                Export as CSS
              </h3>

              {/* CSS Code Preview */}
              <div className="glass-input rounded-lg p-4 overflow-x-auto max-h-48 overflow-y-auto">
                <pre className="font-mono text-xs text-zinc-900 leading-relaxed">
                  {cssCode}
                </pre>
              </div>

              {/* CSS Actions */}
              <div className="flex gap-2">
                <GlassButton
                  onClick={handleCopyCSS}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copied ? "Copied!" : "Copy CSS"}</span>
                </GlassButton>
                <GlassButton
                  onClick={handleDownloadCSS}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  <span>Download CSS</span>
                </GlassButton>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
