import ImageUpload from '../../../components/common/ImageUpload';
import type { VerificationImages, VerificationImageType } from '../types/profile.types';

interface VerificationDocumentsProps {
  images: VerificationImages;
  verificationStatus: string;
  onImageUpload: (type: VerificationImageType, compressedDataUrl: string, compressedFile: File) => void;
  onImageRemove: (type: VerificationImageType) => void;
  onStartCamera: () => void;
}

export default function VerificationDocuments({
  images,
  verificationStatus,
  onImageUpload,
  onImageRemove,
  onStartCamera,
}: VerificationDocumentsProps) {
  return (
    <div className="px-5 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 align-items-stretch">
        <div className="rounded-lg border border-white/10 p-4 flex flex-col" style={{ backgroundColor: 'var(--card-color)' }}>
          <ImageUpload
            label="Front of ID"
            value={images.frontId}
            onChange={(compressedDataUrl, compressedFile) => onImageUpload('frontId', compressedDataUrl, compressedFile)}
            onRemove={() => onImageRemove('frontId')}
            height="180px"
            maxWidth={1920}
            maxHeight={1080}
            quality={0.85}
            format="image/jpeg"
            objectFit="cover"
          />
        </div>

        <div className="rounded-lg border border-white/10 p-4 flex flex-col" style={{ backgroundColor: 'var(--card-color)' }}>
          <ImageUpload
            label="Back of ID"
            value={images.backId}
            onChange={(compressedDataUrl, compressedFile) => onImageUpload('backId', compressedDataUrl, compressedFile)}
            onRemove={() => onImageRemove('backId')}
            height="180px"
            maxWidth={1920}
            maxHeight={1080}
            quality={0.85}
            format="image/jpeg"
            objectFit="cover"
          />
        </div>

        <div className="rounded-lg border border-white/10 p-4 flex flex-col" style={{ backgroundColor: 'var(--card-color)' }}>
          {verificationStatus.includes('*') ? (
            <>
              <p className="text-sm font-medium mb-2 text-left">Selfie with ID</p>
              <div 
                className="w-full h-[180px] border border-white/10 rounded flex items-center justify-center relative overflow-hidden cursor-pointer hover:border-white/30 transition-colors"
                onClick={!images.selfieWithId ? onStartCamera : undefined}
              >
                {images.selfieWithId ? (
                  <div className="w-full h-full relative">
                    <img src={images.selfieWithId} alt="Selfie with ID" className="w-full h-full object-contain transform -scale-x-100 bg-black" />
                    <button
                      onClick={(e) => { e.stopPropagation(); onImageRemove('selfieWithId'); }}
                      className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span className="text-[#666] text-sm">Take Selfie with ID</span>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-medium mb-2 text-left">Selfie with ID</p>
              {images.selfieWithId ? (
                <div className="w-full h-[180px] rounded-lg flex items-center justify-center overflow-hidden flex-1" style={{ backgroundColor: 'var(--input-color)' }}>
                  <img src={images.selfieWithId} alt="Selfie with ID" className="w-full h-full object-cover object-position-center" />
                </div>
              ) : (
                <div className="w-full h-[180px] rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--input-color)' }}>
                  <p className="max-w-[80%] text-center text-sm text-gray-500">
                    Provided during registration
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
