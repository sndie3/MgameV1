import type { UserProfile, VerificationImages, ValidationResult } from '../types/profile.types';
import { REQUIRED_FIELDS, FIELD_LABELS } from '../constants/profileConstants';

export function validateProfile(profile: UserProfile): ValidationResult {
  const errors: string[] = [];
  
  const emptyFields = REQUIRED_FIELDS.filter(
    field => {
      const value = profile[field as keyof UserProfile];
      return !value || (typeof value === 'string' && value.trim() === '');
    }
  );

  if (emptyFields.length > 0) {
    const missingFields = emptyFields.map(field => FIELD_LABELS[field]).join(', ');
    errors.push(`Please fill in all required fields: ${missingFields}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateImages(images: VerificationImages, verificationStatus: string): ValidationResult {
  const errors: string[] = [];

  if (!images.frontId || !images.backId) {
    errors.push('Please upload both front and back of your ID.');
  }

  if (verificationStatus.includes('*') && !images.selfieWithId) {
    errors.push('Please upload your selfie with ID.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateProfileAndImages(
  profile: UserProfile,
  images: VerificationImages,
  verificationStatus: string
): ValidationResult {
  const profileValidation = validateProfile(profile);
  const imagesValidation = validateImages(images, verificationStatus);

  return {
    isValid: profileValidation.isValid && imagesValidation.isValid,
    errors: [...profileValidation.errors, ...imagesValidation.errors],
  };
}
