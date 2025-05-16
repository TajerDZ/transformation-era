/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

// Utility type to generate all possible paths for deeply nested objects and arrays
type Path<T, P extends string = "", D extends number = 10> = [D] extends [never]
  ? never
  : T extends Record<string, any>
  ? {
    [K in keyof T & string]: T[K] extends Array<infer U>
    ? `${P}${K}[${number}]` | Path<U, `${P}${K}[${number}].`, Prev[D]>
    : T[K] extends Record<string, any>
    ? `${P}${K}` | Path<T[K], `${P}${K}.`, Prev[D]>
    : `${P}${K}`;
  }[keyof T & string]
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type ValidationRule = (value: any) => string | null;

type ValidationSchema<T> = Partial<
  Record<
    Path<T>,
    {
      active?: boolean; // Determines whether the validation is active
      rules: ValidationRule[];
    }
  >
>;

function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }

  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

function useDynamicForm<T extends Record<string, any>>(
  initialState: T,
  validationSchema: ValidationSchema<T> = {}
) {
  const [formState, setFormState] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<Path<T>, string | null>>>({});

  const isChanged = !deepEqual(formState, initialState);

  const validateField = (path: Path<T>, value: any) => {
    const schema = validationSchema[path];
    if (schema && (schema.active ?? true)) { // Only validate if the schema is active
      for (const rule of schema.rules) {
        const error = rule(value);
        if (error) {
          return error; // Return the first validation error
        }
      }
    }
    return null;
  };

  const validateForm = () => {
    const newErrors: Partial<Record<Path<T>, string | null>> = {};

    for (const path in validationSchema) {
      const schema = validationSchema[path as Path<T>];
      if (schema?.active ?? true) { // Skip validation if `active` is false
        const keys = path
          .replace(/\[(\d+)\]/g, ".$1") // Convert array indices to dot notation
          .split(".");
        let current: any = formState;

        for (const key of keys) {
          if (current[key] !== undefined) {
            current = current[key];
          } else {
            current = undefined;
            break;
          }
        }
        newErrors[path as Path<T>] = validateField(path as Path<T>, current);
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleInputChange = (path: any, value: any) => {
    setFormState((prev) => {
      const newState = structuredClone(prev); // Use `structuredClone` for a deep copy
      const keys = path
        .replace(/\[(\d+)\]/g, ".$1") // Convert array indices to dot notation
        .split(".");

      let current: Record<string, any> = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(current as Record<string, any>)[key]) {
          (current as Record<string, any>)[key] = isNaN(Number(keys[i + 1])) ? {} : [];
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;

      // Validate the field
      const error = validateField(path, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [path]: error,
      }));

      return newState;
    });
  };

  const deleteItem = (path: any) => {
    setFormState((prev) => {
      const newState = structuredClone(prev);
      const arrayPath = path.replace(/\[\d+\]$/, "");
      const indexMatch = path.match(/\[(\d+)\]$/);
      if (!indexMatch) return prev;

      const index = Number(indexMatch[1]);
      const keys = arrayPath.split(".");

      let current: Record<string, any> = newState;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!current[key]) return prev;
        current = current[key];
      }

      if (Array.isArray(current)) {
        current.splice(index, 1);
      }

      return newState;
    });
  };

  return {
    formState,
    setFormState,
    handleInputChange,
    deleteItem,
    validateForm,
    errors,
    isChanged,
  };
}
export default useDynamicForm;
