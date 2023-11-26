export const debounce = (callback: (...args: any[]) => any, wait: number) => {
  let timeoutId: any = null;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
