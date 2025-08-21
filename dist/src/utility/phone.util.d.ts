import { CountryInfo } from "src/constant/country.constant";
export declare function extractCountryCode(phoneNumber: string): {
    countryCode: string;
    localNumber: string;
    countryInfo?: CountryInfo;
    isValid: boolean;
};
export declare function formatPhoneNumberWithCountryCode(countryCode: string, localNumber: string): string;
export declare function validatePhoneNumber(phoneNumber: string, countryCode?: string): {
    isValid: boolean;
    error?: string;
    countryInfo?: CountryInfo;
};
