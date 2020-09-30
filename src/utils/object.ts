/**
 * Get object values
 * Object values is not available in IE11
 * @param object
 */
export const objectValues = <ObjectType>(instance: {
  [key: string]: ObjectType;
}): ObjectType[] =>
  Object.keys(instance).map((key: string): ObjectType => instance[key]);

/**
 * Get object entries
 * Object entries is not available in IE11
 * @param object
 */
export const objectEntries = <ObjectType>(instance: {
  [key: string]: ObjectType;
}): Array<[string, ObjectType]> =>
  Object.keys(instance).map((key: string): [string, ObjectType] => [
    key,
    instance[key],
  ]);
