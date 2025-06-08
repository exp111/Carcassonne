// type of enums as i dont know what to use else
export type Enums = any;

// Gets the value of a number enum entry by the string key
export function getEnumValue(e: Enums, str: string) {
  return e[str as keyof typeof e];
}

export function hasEnumValue(e: Enums, str: string) {
  return Object.values(e).includes(str);
}
