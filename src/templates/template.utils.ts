import { CSSProperties } from "react";
import { DATA_SKILL_LEVELS } from "../constants/input-data";

export const getSkillRange = (skill_level = 0): CSSProperties => ({
  // @ts-ignore
  "--i": (skill_level / DATA_SKILL_LEVELS.length) * 100 + 5,
});
