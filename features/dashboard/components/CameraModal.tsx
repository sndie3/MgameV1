import type { RefObject } from 'react';

interface CameraModalProps {
  showCamera: boolean;
  cameraError: string | null;
  videoRef: RefObject<HTMLVideoElement | null>;
  onCapture: () => void;
  onCancel: () => void;
}

export default function CameraModal({
  showCamera,
  cameraError,
  videoRef,
  onCapture,
  onCancel,
}: CameraModalProps) {
  if (!showCamera) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black rounded-lg overflow-hidden max-w-2xl w-full flex flex-col border border-[#333]">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />
          {cameraError && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
              <p className="text-red-500 text-center text-sm">{cameraError}</p>
            </div>
          )}
        </div>
        <div className="p-4 flex justify-center gap-4 bg-black">
          <button
            onClick={onCapture}
            className="bg-[#1a1a1a] text-white px-8 py-3 rounded hover:bg-[#333] transition-colors"
          >
            Capture
          </button>
          <button
            onClick={onCancel}
            className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
