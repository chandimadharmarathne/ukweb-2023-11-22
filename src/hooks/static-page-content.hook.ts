import React, { useMemo } from "react";
import { useLanguage } from "../store/providers/lang.provider";

/**
 *
 * @param id -  The path ID of the static file. located in `/src/docs/static-pages/[id]/[code]`
 * `code` is the language code **en, si**, ...

 */
const useStaticContent = (id: string) => {
  const { code } = useLanguage();
  const Content = useMemo(
    () =>
      React.lazy(async () => {
        try {
          return await import(`../docs/static-pages/${id}/${code}`);
        } catch {
          return await import(`../docs/static-pages/${id}/en`);
        }
      }),
    [code]
  );

  return Content;
};

export default useStaticContent;
