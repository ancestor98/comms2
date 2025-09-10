"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCountryCode = extractCountryCode;
exports.formatPhoneNumberWithCountryCode = formatPhoneNumberWithCountryCode;
exports.validatePhoneNumber = validatePhoneNumber;
exports.normalizePhoneNumber = normalizePhoneNumber;
const common_1 = require("@nestjs/common");
const country_constant_1 = require("../constant/country.constant");
function extractCountryCode(phoneNumber) {
    try {
        const cleanedNumber = phoneNumber.replace(/[\s\-\(\)\.]/g, '');
        if (!cleanedNumber || cleanedNumber.length < 7) {
            return {
                countryCode: country_constant_1.DEFAULT_COUNTRY_CODE,
                localNumber: phoneNumber,
                isValid: false,
            };
        }
        if (cleanedNumber.startsWith('+')) {
            const sortedCodes = Object.keys(country_constant_1.COUNTRY_CODES).sort((a, b) => b.length - a.length);
            for (const code of sortedCodes) {
                if (cleanedNumber.startsWith(code)) {
                    const localNumber = cleanedNumber.substring(code.length);
                    const countryInfo = country_constant_1.COUNTRY_CODES[code];
                    const isValidLength = localNumber.length >= countryInfo.length - code.length + 1;
                    return {
                        countryCode: code,
                        localNumber,
                        countryInfo,
                        isValid: isValidLength && /^\d+$/.test(localNumber),
                    };
                }
            }
            const unknownCode = cleanedNumber.match(/^\+(\d{1,4})/)?.[1];
            if (unknownCode) {
                return {
                    countryCode: `+${unknownCode}`,
                    localNumber: cleanedNumber.substring(unknownCode.length + 1),
                    isValid: false,
                };
            }
            return {
                countryCode: country_constant_1.DEFAULT_COUNTRY_CODE,
                localNumber: cleanedNumber.substring(1),
                countryInfo: country_constant_1.COUNTRY_CODES[country_constant_1.DEFAULT_COUNTRY_CODE],
                isValid: false,
            };
        }
        const sortedCodes = Object.keys(country_constant_1.COUNTRY_CODES).sort((a, b) => b.length - a.length);
        for (const code of sortedCodes) {
            const codeWithoutPlus = code.substring(1);
            if (cleanedNumber.startsWith(codeWithoutPlus)) {
                const localNumber = cleanedNumber.substring(codeWithoutPlus.length);
                const countryInfo = country_constant_1.COUNTRY_CODES[code];
                const isValidLength = localNumber.length >= countryInfo.length - code.length + 1;
                return {
                    countryCode: code,
                    localNumber,
                    countryInfo,
                    isValid: isValidLength && /^\d+$/.test(localNumber),
                };
            }
        }
        if (cleanedNumber.match(/^(07|08|09|01)\d{9}$/)) {
            return {
                countryCode: country_constant_1.DEFAULT_COUNTRY_CODE,
                localNumber: cleanedNumber,
                countryInfo: country_constant_1.COUNTRY_CODES[country_constant_1.DEFAULT_COUNTRY_CODE],
                isValid: true,
            };
        }
        return {
            countryCode: country_constant_1.DEFAULT_COUNTRY_CODE,
            localNumber: cleanedNumber,
            countryInfo: country_constant_1.COUNTRY_CODES[country_constant_1.DEFAULT_COUNTRY_CODE],
            isValid: false,
        };
    }
    catch (error) {
        return {
            countryCode: country_constant_1.DEFAULT_COUNTRY_CODE,
            localNumber: phoneNumber,
            countryInfo: country_constant_1.COUNTRY_CODES[country_constant_1.DEFAULT_COUNTRY_CODE],
            isValid: false,
        };
    }
}
function formatPhoneNumberWithCountryCode(countryCode, localNumber) {
    let cleanedLocalNumber;
    if (countryCode === '+234' && localNumber.startsWith('0')) {
        cleanedLocalNumber = localNumber.substring(1);
    }
    else {
        cleanedLocalNumber = localNumber.replace(/^0+/, '');
    }
    return `${countryCode}${cleanedLocalNumber}`;
}
function validatePhoneNumber(phoneNumber, countryCode) {
    try {
        const { countryCode: extractedCode, localNumber, countryInfo, isValid, } = extractCountryCode(phoneNumber);
        if (countryCode && extractedCode !== countryCode) {
            return {
                isValid: false,
                error: `Expected country code ${countryCode}, but found ${extractedCode}`,
            };
        }
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
        if (!/^\d+$/.test(localNumber)) {
            return {
                isValid: false,
                error: 'Phone number contains invalid characters',
                countryInfo,
            };
        }
        let errorMessage = undefined;
        if (!isValid) {
            const { countryCode: extractedCode } = extractCountryCode(phoneNumber);
            if (extractedCode === country_constant_1.DEFAULT_COUNTRY_CODE &&
                !phoneNumber.startsWith('+')) {
                const cleanedNumber = phoneNumber.replace(/[\s\-\(\)\.]/g, '');
                if (cleanedNumber.match(/^(07|08|09|01)/)) {
                    errorMessage =
                        'Invalid Nigerian phone number format. Please use 11 digits starting with 07, 08, 09, or 01';
                }
                else {
                    errorMessage =
                        'Please provide the phone number with country code (e.g., +234 for Nigeria, +1 for US/Canada) or specify the country code separately';
                }
            }
            else {
                errorMessage = 'Invalid phone number format';
            }
        }
        return {
            isValid,
            error: errorMessage,
            countryInfo,
        };
    }
    catch (error) {
        return {
            isValid: false,
            error: 'Invalid phone number format',
        };
    }
}
function normalizePhoneNumber(phoneNumber) {
    const { countryCode, localNumber, isValid } = extractCountryCode(phoneNumber);
    if (!isValid) {
        throw new common_1.BadRequestException("unable to parse format");
    }
    return formatPhoneNumberWithCountryCode(countryCode, localNumber);
}
//# sourceMappingURL=phone.util.js.map