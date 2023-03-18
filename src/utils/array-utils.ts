import { ValidationError } from 'class-validator';

export const convertValidationErrorsToRecord = (
  list: ValidationError[],
): Record<string, string> => {
  const map = {} as Record<string, string>;
  for (const ele of list) {
    const key = ele.property;
    map[key] = ele.value;
  }

  return map;
};
