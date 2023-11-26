import { SpecialMessage } from "../inbox.types";
import ShareProfile from "./SHARE_PROFILE";

type Special = Record<string, SpecialMessage>;

const SPECIAL_MSGS: Special = {
  SHARE_PROFILE: ShareProfile,
};

export default SPECIAL_MSGS;
