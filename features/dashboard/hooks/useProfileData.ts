import { useState, useEffect } from 'react';
import type { UserProfile, VerificationImages } from '../types/profile.types';
import {
  getVerificationStatus,
  getUsername,
  getRegisterFormData,
  getUserProfile,
  loadAllVerificationImages,
} from '../services/profileStorage.service';

export function useProfileData() {
  const [verificationStatus, setVerificationStatus] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile>({
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
  });
  const [images, setImages] = useState<VerificationImages>({
    selfieWithId: null,
    frontId: null,
    backId: null,
  });

  useEffect(() => {
    const status = getVerificationStatus();
    if (status) {
      setVerificationStatus(status.toUpperCase());
    }

    const storedUsername = getUsername();
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const registerFormData = getRegisterFormData();
    if (registerFormData) {
      setProfile(prev => ({
        ...prev,
        firstName: registerFormData.firstName || '',
        middleName: registerFormData.middleName || '',
        lastName: registerFormData.lastName || '',
        email: registerFormData.email || '',
        phoneNumber: registerFormData.mobileNumber || '',
      }));
    }

    const storedProfile = getUserProfile();
    if (storedProfile) {
      setProfile(prev => ({ ...prev, ...storedProfile }));
    }

    const loadedImages = loadAllVerificationImages();
    setImages(loadedImages);
  }, []);

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
