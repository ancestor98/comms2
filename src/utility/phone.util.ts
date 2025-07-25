import { error } from "console";
import { COUNTRY_CODES, CountryCode, CountryInfo, DEFAULT_COUNTRY_CODE } from "src/constant/country.constant";

export function extractCountryCode(phoneNumber: string): {
  countryCode: string;
  localNumber: string;
  countryInfo?: CountryInfo;
  isValid: boolean;
} {
  try {
    // Remove any spaces, dashes, parentheses, and other formatting
    const cleanedNumber = phoneNumber.replace(/[\s\-\(\)\.]/g, '');

    // Validate input
    if (!cleanedNumber || cleanedNumber.length < 7) {
      return {
        countryCode: DEFAULT_COUNTRY_CODE,
        localNumber: phoneNumber,
        isValid: false,
      };
    }

    // Check if number starts with + (international format)
    if (cleanedNumber.startsWith('+')) {
      // Try to match with known country codes (longest first to avoid partial matches)
      const sortedCodes = Object.keys(COUNTRY_CODES).sort(
        (a, b) => b.length - a.length,
      ) as CountryCode[];

      for (const code of sortedCodes) {
        if (cleanedNumber.startsWith(code)) {
          const localNumber = cleanedNumber.substring(code.length);

          // Basic validation for local number length
          const countryInfo = COUNTRY_CODES[code];
          const isValidLength =
            localNumber.length >= countryInfo.length - code.length + 1;

          return {
            countryCode: code,
            localNumber,
            countryInfo,
            isValid: isValidLength && /^\d+$/.test(localNumber),
          };
        }
      }

      // If no specific country code found, try to guess based on length
      const unknownCode = cleanedNumber.match(/^\+(\d{1,4})/)?.[1];
      if (unknownCode) {
        return {
          countryCode: `+${unknownCode}`,
          localNumber: cleanedNumber.substring(unknownCode.length + 1),
          isValid: false,
        };
      }

      // Default to Nigeria for unknown international numbers
      return {
        countryCode: DEFAULT_COUNTRY_CODE,
        localNumber: cleanedNumber.substring(1),
        countryInfo: COUNTRY_CODES[DEFAULT_COUNTRY_CODE],
        isValid: false,
      };
    }

    // If no + prefix, try to match with known country codes first
    const sortedCodes = Object.keys(COUNTRY_CODES).sort(
      (a, b) => b.length - a.length,
    ) as CountryCode[];

    for (const code of sortedCodes) {
      const codeWithoutPlus = code.substring(1); // Remove the + prefix
      if (cleanedNumber.startsWith(codeWithoutPlus)) {
        const localNumber = cleanedNumber.substring(codeWithoutPlus.length);

        // Basic validation for local number length
        const countryInfo = COUNTRY_CODES[code];
        const isValidLength =
          localNumber.length >= countryInfo.length - code.length + 1;

        return {
          countryCode: code,
          localNumber,
          countryInfo,
          isValid: isValidLength && /^\d+$/.test(localNumber),
        };
      }
    }

    // If no country code match found, check if it's a Nigerian local number
    // Nigerian mobile numbers typically start with 07, 08, 09, or 01 and are 11 digits total
    if (cleanedNumber.match(/^(07|08|09|01)\d{9}$/)) {
      // This is a valid Nigerian local number
      return {
        countryCode: DEFAULT_COUNTRY_CODE,
        localNumber: cleanedNumber,
        countryInfo: COUNTRY_CODES[DEFAULT_COUNTRY_CODE],
        isValid: true,
      };
    }

    // For other local numbers, require explicit country code
    return {
      countryCode: DEFAULT_COUNTRY_CODE,
      localNumber: cleanedNumber,
      countryInfo: COUNTRY_CODES[DEFAULT_COUNTRY_CODE],
      isValid: false, // Require explicit country code for non-Nigerian local numbers
    };
  } catch (error) {
    // Fallback for any errors
    return {
      countryCode: DEFAULT_COUNTRY_CODE,
      localNumber: phoneNumber,
      countryInfo: COUNTRY_CODES[DEFAULT_COUNTRY_CODE],
      isValid: false,
    };
  }
}




/**
 * Formats a phone number with country code
 * @param countryCode - The country code
 * @param localNumber - The local number
 * @returns Formatted phone number
 */

export function formatPhoneNumberWithCountryCode(
  countryCode: string,
  localNumber: string,
): string {
  // For Nigerian numbers, remove the leading 0 when adding +234
  // For other countries, remove all leading zeros
  let cleanedLocalNumber;
  if (countryCode === '+234' && localNumber.startsWith('0')) {
    cleanedLocalNumber = localNumber.substring(1);
  } else {
    cleanedLocalNumber = localNumber.replace(/^0+/, '');
  }
  return `${countryCode}${cleanedLocalNumber}`;
}

/**
 * Validates a phone number format
 * @param phoneNumber - The phone number to validate
 * @param countryCode - Optional country code for validation
 * @returns Validation result
 */
export function validatePhoneNumber(
  phoneNumber: string,
  countryCode?: string,
): {
  isValid: boolean;
  error?: string;
  countryInfo?: CountryInfo;
} {
  try {
    const {
      countryCode: extractedCode,
      localNumber,
      countryInfo,
      isValid,
    } = extractCountryCode(phoneNumber);

    // If specific country code was requested, check if it matches
    if (countryCode && extractedCode !== countryCode) {
      return {
        isValid: false,
        error: `Expected country code ${countryCode}, but found ${extractedCode}`,
      };
    }

    // Check if the number is too short or too long
    if (localNumber.length < 7) {
      return {
        isValid: false,
        error: 'Phone number is too short',
        countryInfo,
      };
    }

    if (localNumber.length > 12) {
      return {
        isValid: false,
        error: 'Phone number is too long',
        countryInfo,
      };
    }

    // Check if local number contains only digits
    if (!/^\d+$/.test(localNumber)) {
      return {
        isValid: false,
        error: 'Phone number contains invalid characters',
        countryInfo,
      };
    }

    // If the number is invalid and we couldn't match a country code, provide a helpful error
    let errorMessage = undefined;
    if (!isValid) {
      const { countryCode: extractedCode } = extractCountryCode(phoneNumber);
      if (
        extractedCode === DEFAULT_COUNTRY_CODE &&
        !phoneNumber.startsWith('+')
      ) {
        // Check if it looks like a Nigerian number but doesn't match the pattern
        const cleanedNumber = phoneNumber.replace(/[\s\-\(\)\.]/g, '');
        if (cleanedNumber.match(/^(07|08|09|01)/)) {
          errorMessage =
            'Invalid Nigerian phone number format. Please use 11 digits starting with 07, 08, 09, or 01';
        } else {
          errorMessage =
            'Please provide the phone number with country code (e.g., +234 for Nigeria, +1 for US/Canada) or specify the country code separately';
        }
      } else {
        errorMessage = 'Invalid phone number format';
      }
    }

    return {
      isValid,
      error: errorMessage,
      countryInfo,
    };
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid phone number format',
    };
  }
}