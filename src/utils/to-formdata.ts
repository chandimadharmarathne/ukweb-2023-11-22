export const toFormData = (data: { [key: string]: any }) => {
  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return fd.append(key, "");
    if (typeof value === "object" && !(value instanceof File))
      return fd.append(key, JSON.stringify(value));
    return fd.append(key, value);
  });

  return fd;
};
