export interface ScCountry {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface PhoneChangeEvent {
  isValid: boolean;
  phoneNumber: string;
  formattedNumber: string;
  countryFlag: string;
  nationalNumber: string;
}
