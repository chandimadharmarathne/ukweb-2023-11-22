import { useState } from "react";

export const useToggle = (defaultState?: boolean) => {
  const [toggle, setToggle] = useState<boolean>(defaultState ?? false);
  const toggler = () => {
    setToggle((prev) => !prev);
  };
  return [toggle, toggler] as const;
};
