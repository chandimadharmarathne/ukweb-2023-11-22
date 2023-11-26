/** Used to sort array of Objects by key
 * @param key - Key of Object
 * @param data - the data you need to sort
 * @param order - order of how you need to sort `asc` - Ascending, `dsc` - Descending
 */
export const sort = <T extends { [key: string]: any } = Record<string, any>>(
  key: keyof T,
  data: T[] = [],
  order: "asc" | "dsc" = "asc"
) => {
  const sorted = data.sort((a, b) =>
    order === "asc"
      ? a[key] < b[key]
        ? -1
        : 1
      : order === "dsc"
      ? a[key] < b[key]
        ? 1
        : -1
      : 0
  );
  return sorted;
};
