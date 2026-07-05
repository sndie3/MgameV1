export interface UserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  province: string;
  maritalStatus: string;
  locationOfWork: string;
  email: string;
  businessType: string;
  sourceOfIncome: string;
  gameVenue: string;
  street?: string;
}

export interface VerificationImages {
  selfieWithId: string | null;
  frontId: string | null;
  backId: string | null;
}

export type VerificationImageType = 'frontId' | 'backId' | 'selfieWithId';

export type UserProfileField = keyof UserProfile;

export interface FormFieldConfig {
  field: string;
  label: string;
  readonly: boolean;
  isDropdown?: boolean;
  options?: readonly string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
