import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const usePath = () => {
  const location = useLocation();
  const path = useMemo(() => {
    const pieces = location.pathname.split("/").filter((piece) => !!piece);
    const piecesWithLink = pieces.map((piece, i) => {
      const linkToPiece = pieces.slice(0, i + 1).join("/");
      return {
        piece,
        link: `/${linkToPiece}`,
      };
    });

    return [{ piece: "home", link: "/" }, ...piecesWithLink];
  }, [location.pathname]);

  return path;
};
export default usePath;
