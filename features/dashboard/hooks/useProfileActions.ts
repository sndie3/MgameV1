import { useCallback } from 'react';
import type { UserProfile, VerificationImages, VerificationImageType } from '../types/profile.types';
import { validateProfileAndImages } from '../utils/profileValidation';
import { saveUserProfile, saveVerificationImages, setVerificationStatus as setVerificationStatusStorage } from '../services/profileStorage.service';

export function useProfileActions(
  profile: UserProfile,
  images: VerificationImages,
  verificationStatus: string,
  setVerificationStatus: (status: string) => void,
  updateImages: (images: Partial<VerificationImages>) => void
) {
  const handleImageUpload = useCallback((type: VerificationImageType, compressedDataUrl: string) => {
    updateImages({ [type]: compressedDataUrl });
  }, [updateImages]);

  const handleImageRemove = useCallback((type: VerificationImageType) => {
    updateImages({ [type]: null });
  }, [updateImages]);

  const handleSaveAndActivate = useCallback(() => {
    const validation = validateProfileAndImages(profile, images, verificationStatus);

    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }

    saveUserProfile(profile);
    saveVerificationImages(images);

    setVerificationStatusStorage('fully-verified');
    setVerificationStatus('fully-verified');
    alert('Verification submitted successfully! You are now fully verified.');
  }, [profile, images, verificationStatus, setVerificationStatus]);

  return {
    handleImageUpload,
    handleImageRemove,
    handleSaveAndActivate,
  };
}
