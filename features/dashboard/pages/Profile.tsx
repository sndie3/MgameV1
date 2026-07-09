import { useState, useCallback, useEffect } from 'react';
import Footer from '../../../components/common/Footer';
import ProfileHeader from '../components/ProfileHeader';
import PersonalInformationForm from '../components/PersonalInformationForm';
import VerificationDocuments from '../components/VerificationDocuments';
import CameraModal from '../components/CameraModal';
import SaveActivateButton from '../components/SaveActivateButton';
import BasicProfileMenu from '../components/BasicProfileMenu';
import ThemeSelectionView from '../components/ThemeSelectionView';
import ChangePasswordView from '../components/ChangePasswordView';
import { useProfileData } from '../hooks/useProfileData';
import { useCamera } from '../hooks/useCamera';
import { useDropdown } from '../hooks/useDropdown';
import { useProfileActions } from '../hooks/useProfileActions';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(() => {
    return localStorage.getItem('showChangePassword') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('showChangePassword', String(showChangePassword));
  }, [showChangePassword]);

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

  const handleBack = useCallback(() => {
    setShowDetailedForm(false);
    setIsEditing(false);
  }, []);

  const handleProfileChange = useCallback((field: keyof typeof profile, value: string) => {
    updateProfile(field, value);
  }, [updateProfile]);

  const handleCapturePhoto = useCallback(() => {
    capturePhoto((dataUrl) => {
      updateImages({ selfieWithId: dataUrl });
    });
  }, [capturePhoto, updateImages]);

  const handleThemeClick = useCallback(() => {
    setShowThemeModal(true);
  }, []);

  const handleChangePasswordClick = useCallback(() => {
    setShowChangePassword(true);
  }, []);

  if (showThemeModal) {
    return (
      <ThemeSelectionView 
        onBack={() => setShowThemeModal(false)}
        username={username}
        verificationStatus={verificationStatus}
      />
    );
  }

  if (showChangePassword) {
    return <ChangePasswordView onBack={() => setShowChangePassword(false)} />;
  }

  return (
    <div className="min-h-screen text-white flex flex-col">
      <ProfileHeader
        username={username}
        verificationStatus={verificationStatus}
        isEditing={isEditing}
        showDetailedForm={showDetailedForm}
        onUpdateNow={handleUpdateNow}
        onBack={handleBack}
      />

      <div className="flex-1">
        {!showDetailedForm ? (
          <BasicProfileMenu 
            profile={profile}
            onEditProfile={() => {
              setShowDetailedForm(true);
              setIsEditing(false);
            }}
            onThemeClick={handleThemeClick}
            onChangePasswordClick={handleChangePasswordClick}
          />
        ) : (
          <>
            <PersonalInformationForm
              profile={profile}
              isEditing={isEditing}
              openDropdown={openDropdown}
              onProfileChange={handleProfileChange}
              onDropdownToggle={toggleDropdown}
              onToggleEditing={handleUpdateNow}
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
          </>
        )}
      </div>

      <div className="px-5 py-4 border-none">
        <Footer />
      </div>
    </div>
  );
}
