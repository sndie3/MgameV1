import { useState } from 'react';
import type { UserProfile, VerificationImages } from '../types/profile.types';
import {
  getVerificationStatus,
  getUsername,
  getRegisterFormData,
  getUserProfile,
  loadAllVerificationImages,
} from '../services/profileStorage.service';

export function useProfileData() {
  const [verificationStatus, setVerificationStatus] = useState<string>(() => {
    const status = getVerificationStatus();
    return status ? status.toUpperCase() : '';
  });
  
  const [username] = useState<string>(() => {
    return getUsername() || '';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const defaultProfile = {
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      city: '',
      province: '',
      maritalStatus: '',
      locationOfWork: '',
      email: '',
      businessType: '',
      sourceOfIncome: '',
      gameVenue: '',
    };
    
    const registerFormData = getRegisterFormData();
    let initialProfile = { ...defaultProfile };
    
    if (registerFormData) {
      initialProfile = {
        ...initialProfile,
        firstName: registerFormData.firstName || '',
        middleName: registerFormData.middleName || '',
        lastName: registerFormData.lastName || '',
        email: registerFormData.email || '',
        phoneNumber: registerFormData.mobileNumber || '',
      };
    }
    
    const storedProfile = getUserProfile();
    if (storedProfile) {
      initialProfile = { ...initialProfile, ...storedProfile };
    }
    
    return initialProfile;
  });

  const [images, setImages] = useState<VerificationImages>(() => {
    return loadAllVerificationImages();
  });

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const updateImages = (images: Partial<VerificationImages>) => {
    setImages(prev => ({ ...prev, ...images }));
  };

  return {
    verificationStatus,
    setVerificationStatus,
    username,
    profile,
    updateProfile,
    images,
    updateImages,
  };
}
