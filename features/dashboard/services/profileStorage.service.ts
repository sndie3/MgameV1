import type { UserProfile, VerificationImages } from '../types/profile.types';

const STORAGE_KEYS = {
  VERIFICATION_STATUS: 'verificationStatus',
  USERNAME: 'username',
  REGISTER_FORM_DATA: 'registerFormData',
  USER_PROFILE: 'userProfile',
  SELFIE_WITH_ID: 'selfieWithId',
  FRONT_ID: 'frontId',
  BACK_ID: 'backId',
} as const;

export function getVerificationStatus(): string | null {
  return localStorage.getItem(STORAGE_KEYS.VERIFICATION_STATUS);
}

export function setVerificationStatus(status: string): void {
  localStorage.setItem(STORAGE_KEYS.VERIFICATION_STATUS, status);
}

export function getUsername(): string | null {
  return localStorage.getItem(STORAGE_KEYS.USERNAME);
}

export function getRegisterFormData(): any | null {
  const data = localStorage.getItem(STORAGE_KEYS.REGISTER_FORM_DATA);
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing registration data:', error);
    return null;
  }
}

export function getUserProfile(): Partial<UserProfile> | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing user profile data:', error);
    return null;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export function getSelfieWithId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.SELFIE_WITH_ID);
}

export function setSelfieWithId(dataUrl: string): void {
  localStorage.setItem(STORAGE_KEYS.SELFIE_WITH_ID, dataUrl);
}

export function getFrontId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.FRONT_ID);
}

export function setFrontId(dataUrl: string): void {
  localStorage.setItem(STORAGE_KEYS.FRONT_ID, dataUrl);
}

export function getBackId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.BACK_ID);
}

export function setBackId(dataUrl: string): void {
  localStorage.setItem(STORAGE_KEYS.BACK_ID, dataUrl);
}

export function saveVerificationImages(images: VerificationImages): void {
  if (images.frontId) {
    setFrontId(images.frontId);
  }
  if (images.backId) {
    setBackId(images.backId);
  }
  if (images.selfieWithId) {
    setSelfieWithId(images.selfieWithId);
  }
}

export function loadAllVerificationImages(): VerificationImages {
  return {
    selfieWithId: getSelfieWithId(),
    frontId: getFrontId(),
    backId: getBackId(),
  };
}
