import { useState, useCallback } from 'react';
import Footer from '../../../components/common/Footer';
import ProfileHeader from '../components/ProfileHeader';
import PersonalInformationForm from '../components/PersonalInformationForm';
import VerificationDocuments from '../components/VerificationDocuments';
import CameraModal from '../components/CameraModal';
import SaveActivateButton from '../components/SaveActivateButton';
import { useProfileData } from '../hooks/useProfileData';
import { useCamera } from '../hooks/useCamera';
import { useDropdown } from '../hooks/useDropdown';
import { useProfileActions } from '../hooks/useProfileActions';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    verificationStatus,
    setVerificationStatus,
    username,
    profile,
    updateProfile,
    images,
    updateImages,
  } = useProfileData();

  const {
    showCamera,
    cameraError,
    videoRef,
    startCamera,
    stopCamera,
    capturePhoto,
  } = useCamera();

  const {
    openDropdown,
    toggleDropdown,
  } = useDropdown();

  const {
    handleImageUpload,
    handleImageRemove,
    handleSaveAndActivate,
  } = useProfileActions(profile, images, verificationStatus, setVerificationStatus, updateImages);

  const handleUpdateNow = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  const handleProfileChange = useCallback((field: keyof typeof profile, value: string) => {
    updateProfile(field, value);
  }, [updateProfile]);

  const handleCapturePhoto = useCallback(() => {
    capturePhoto((dataUrl) => {
      updateImages({ selfieWithId: dataUrl });
    });
  }, [capturePhoto, updateImages]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <ProfileHeader
        username={username}
        verificationStatus={verificationStatus}
        isEditing={isEditing}
        onUpdateNow={handleUpdateNow}
      />

      <div className="flex-1">
        <PersonalInformationForm
          profile={profile}
          isEditing={isEditing}
          openDropdown={openDropdown}
          onProfileChange={handleProfileChange}
          onDropdownToggle={toggleDropdown}
        />

        <VerificationDocuments
          images={images}
          verificationStatus={verificationStatus}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          onStartCamera={startCamera}
        />

        <CameraModal
          showCamera={showCamera}
          cameraError={cameraError}
          videoRef={videoRef}
          onCapture={handleCapturePhoto}
          onCancel={stopCamera}
        />

        <SaveActivateButton onSaveAndActivate={handleSaveAndActivate} />
      </div>

      <div className="px-5 py-4 border-none">
        <Footer />
      </div>
    </div>
  );
}
