export const dateFormat = (
  date?: string | Date | number,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" }
) => {
  if (!date) return "No Date";
  const FORMATTER = Intl.DateTimeFormat(undefined, options);
  return FORMATTER.format(new Date(date));
};

export const getYear = (date: string) => new Date(date).getFullYear();

/**
 * @returns `true` if date2 is bigger
 */
export const dateDiff = (date1: string | number, date2: string | number) => {
  const Date1ms = new Date(date1).getTime();
  const Date2ms = new Date(date2).getTime();
  const diffInMs = Math.abs(Date2ms - Date1ms);
  if (Date2ms - Date1ms > 0) {
    return true;
  } else {
    return false;
  }
};
