export const SOURCE_OF_INCOME_OPTIONS = [
  'BUSINESS',
  'EMPLOYMENT',
  'COMMISSION',
  'OTHER EARNINGS',
] as const;

export const CIVIL_STATUS_OPTIONS = [
  'SINGLE',
  'MARRIED',
  'SEPARATED',
  'WIDOWED',
] as const;

export const GAME_VENUE_OPTIONS = [
  'GMALL',
  'BINGO BEE MANDAUE',
  'LAFUERZA BULACAN',
  'NEWALLSTAR ANTIPOLO',
  'PAULJS ANTIPOLO',
  'PAULJS SAN JUAN',
  'TREGS BAGUIO',
  'TREGS PANGASINAN',
  'TREGS CALAMBA',
  'TREGS TARLAC',
] as const;

export const REQUIRED_FIELDS = [
  'city',
  'province',
  'maritalStatus',
  'gameVenue',
  'email',
  'sourceOfIncome',
] as const;

export const FIELD_LABELS: Record<string, string> = {
  city: 'City',
  province: 'Province',
  maritalStatus: 'Marital Status',
  gameVenue: 'Game Venue',
  email: 'Email',
  sourceOfIncome: 'Source of Income',
} as const;

export const FORM_FIELDS_CONFIG = [
  { field: 'firstName', label: 'First Name', readonly: true },
  { field: 'middleName', label: 'Middle Name', readonly: true },
  { field: 'lastName', label: 'Last Name', readonly: true },
  { field: 'phoneNumber', label: 'Mobile Number', readonly: true },
  { field: 'street', label: 'Street', readonly: false },
  { field: 'city', label: 'Mun/City', readonly: false },
  { field: 'province', label: 'Province', readonly: false },
  { field: 'maritalStatus', label: 'Civil Status', readonly: false, isDropdown: true, options: CIVIL_STATUS_OPTIONS },
  { field: 'gameVenue', label: 'Game Venue', readonly: false, isDropdown: true, options: GAME_VENUE_OPTIONS },
  { field: 'email', label: 'Email', readonly: false },
  { field: 'sourceOfIncome', label: 'Source of Income', readonly: false, isDropdown: true, options: SOURCE_OF_INCOME_OPTIONS },
] as const;
