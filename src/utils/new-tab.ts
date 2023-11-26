export const newTab = (name: string, width?: number, options?: string[]) => {
  const features = [`width=${width ?? window.innerWidth}`, options]
    .filter((item) => typeof item === "string")
    .flat()
    .join(",");
  const tab = window.open("", name, features);
  tab?.document.write("<h1>Loading .... </h1>");

  return (url?: string | boolean) => {
    if (typeof url === "string") tab?.window.location?.replace(url);
    else tab?.window.close();
  };
};
