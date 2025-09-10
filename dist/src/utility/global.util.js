"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmailOrPhone = IsEmailOrPhone;
const class_validator_1 = require("class-validator");
const helper_util_1 = require("./helper.util");
function IsEmailOrPhone(validatorOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.Validate)((value) => {
            if (!value)
                return false;
            return (0, helper_util_1.isValidEmail)(value) || /^\+?[\d\s\-\(\)]+$/.test(value);
        }, {
            message: "identifier must be a valied email or password",
            ...validatorOptions
        })(object, propertyName);
    };
}
//# sourceMappingURL=global.util.js.map