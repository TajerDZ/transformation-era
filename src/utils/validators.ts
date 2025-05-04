import { t } from "i18next";
import { isEmpty, isEmptyArray, isNullOrUndefined } from "./helpers";

// 👉 Required Validator
export const requiredValidator = (value: unknown) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return t("validators.required");

  return String(value).trim().length ? "" : t("validators.required");
};

// 👉 Email Validator
export const emailValidator = (value: unknown) => {
  if (isEmpty(value)) return "";

  const re =
    /^(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*|".+")@(?:\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]|(?:[a-z\-\d]+\.)+[a-z]{2,})$/i;

  if (Array.isArray(value))
    return value.every((val) => re.test(String(val)))
      ? ""
      : t("validators.email");

  return re.test(String(value)) ? "" : t("validators.email");
};

// 👉 Password Validator
export const passwordValidator = (password: string) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;

  const validPassword = regExp.test(password);

  return validPassword ? "" : t("validators.passwordValidator");
};

// 👉 Confirm Password Validator
export const confirmedValidator = (value: string, target: string) => {
  return value === target ? "" : t("validators.confirmedValidator");
};

// 👉 Between Validator
export const betweenValidator = (value: unknown, min: number, max: number) => {
  const valueAsNumber = Number(value);

  return Number(min) <= valueAsNumber && Number(max) >= valueAsNumber
    ? ""
    : t("validators.enterNumberBetween", { min: min, max: max });
};

// 👉 Integer Validator
export const integerValidator = (value: unknown) => {
  if (isEmpty(value)) return "";

  if (Array.isArray(value))
    return value.every((val) => /^-?\d+$/.test(String(val)))
      ? ""
      : t("validators.integerValidator");

  return /^-?\d+$/.test(String(value)) ? "" : t("validators.integerValidator");
};

// 👉 Numeric Validator
export const numericValidator = (value: unknown) => {
  if (isEmpty(value)) return "";

  if (Array.isArray(value))
    return value.every((val) => /^-?\d*\.?\d+$/.test(String(val)))
      ? ""
      : t("validators.numericValidator");

  return /^-?\d*\.?\d+$/.test(String(value))
    ? ""
    : t("validators.numericValidator");
};

// 👉 Regex Validator
export const regexValidator = (
  value: unknown,
  regex: RegExp | string
): string | boolean => {
  if (isEmpty(value)) return "";

  let regeX = regex;
  if (typeof regeX === "string") regeX = new RegExp(regeX);

  if (Array.isArray(value))
    return value.every((val) => regexValidator(val, regeX));

  return regeX.test(String(value)) ? "" : t("validators.regexValidator");
};

// 👉 Alpha Validator
export const alphaValidator = (value: unknown) => {
  if (isEmpty(value)) return "";

  return /^[A-Z]*$/i.test(String(value)) ? "" : t("validators.alphaValidator");
};

// 👉 URL Validator
export const urlValidator = (value: unknown) => {
  if (isEmpty(value)) return "";

  const re = /^https?:\/\/[^\s$.?#].\S*$/;

  return re.test(String(value)) ? "" : t("validators.urlValidator");
};

// 👉 Length Validator
export const lengthValidator = (value: unknown, length: number) => {
  if (isEmpty(value)) return "";

  return String(value).length === length
    ? ""
    : t("validators.lengthValidator", { length: length });
};

// 👉 Length Validator
export const minlengthValidator = (value: unknown, min: number) => {
  if (isEmpty(value)) return "";

  return String(value).length >= min
    ? ""
    : t("validators.minlengthValidator", { length: length });
};

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: unknown) => {
  if (isEmpty(value)) return "";

  const valueAsString = String(value);

  return /^[\w-]*$/.test(valueAsString) ? "" : t("All Character are not valid");
};

export const positiveValidator = (value: number) => {
  if (isEmpty(value)) return "";
  return value > 0 ? "" : t("validators.positiveValidator");
};

export const greaterValidator = (value: unknown, min: number) => {
  if (isEmpty(value)) return "";

  return Number(value) > min
    ? ""
    : t("validators.greaterValidator", { greater: min });
};

export const greaterOrEqualValidator = (value: unknown, min: number) => {
  if (isEmpty(value)) return "";

  return Number(value) >= min
    ? ""
    : t("validators.greaterOrEqualValidator", { greaterOrEqual: min });
};
