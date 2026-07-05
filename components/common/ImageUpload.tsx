import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { compressImage, isImageFile, formatFileSize } from '../../utils/imageCompression';

interface ImageUploadProps {
  label: string;
  value: string | null;
  onChange: (compressedDataUrl: string, compressedFile: File) => void;
  onRemove?: () => void;
  width?: string;
  height?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/webp' | 'image/png';
  objectFit?: 'cover' | 'contain';
  disabled?: boolean;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  onRemove,
  width = '100%',
  height = '180px',
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.85,
  format = 'image/jpeg',
  objectFit = 'cover',
  disabled = false,
}: ImageUploadProps) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!isImageFile(file)) {
      setError('Please select a valid image file');
      return;
    }

    // Check file size (100MB limit)
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 100MB limit');
      return;
    }

    setError(null);
    setIsCompressing(true);

    try {
      // Compress image
      const result = await compressImage(file, {
        maxWidth,
        maxHeight,
        quality,
        format,
      });

      console.log(`Image compressed: ${formatFileSize(result.originalSize)} → ${formatFileSize(result.compressedSize)} (${result.compressionRatio.toFixed(2)}x reduction)`);

      // Pass compressed data and file to parent
      onChange(result.compressedDataUrl, result.compressedFile);
    } catch (err) {
      console.error('Compression error:', err);
      setError('Failed to compress image. Please try a different file.');
    } finally {
      setIsCompressing(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
    setError(null);
  };

  return (
    <div className="flex flex-col" style={{ width }}>
      <p className="text-sm font-medium mb-2 text-left">{label}</p>
      
      {/* Fixed-size container */}
      <div 
        className="relative bg-[#2a2a2a] rounded-lg overflow-hidden"
        style={{ 
          width: '100%',
          height,
          minHeight: height,
        }}
      >
        {value ? (
          <>
            {/* Display compressed image */}
            <img
              src={value}
              alt={label}
              className="w-full h-full"
              style={{ objectFit }}
            />
            
            {/* Remove button overlay */}
            {!disabled && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 rounded-full p-2 transition-colors"
                type="button"
              >
                <X size={16} className="text-white" />
              </button>
            )}
          </>
        ) : (
          <>
            {/* Upload placeholder */}
            <label
              className={`w-full h-full flex items-center justify-center cursor-pointer transition-colors ${
                disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#333]'
              } ${isCompressing ? 'cursor-wait' : ''}`}
            >
              <div className="text-center px-4">
                {isCompressing ? (
                  <>
                    <Loader2 size={24} className="text-gray-400 mx-auto animate-spin" />
                    <p className="text-gray-400 text-sm mt-2">Compressing...</p>
                  </>
                ) : (
                  <>
                    <Upload size={24} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Click to upload</p>
                    <p className="text-gray-500 text-xs mt-1">{label}</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={disabled || isCompressing}
              />
            </label>
          </>
        )}

        {/* Loading overlay during compression */}
        {isCompressing && value && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 size={32} className="text-white animate-spin" />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
    </div>
  );
}
