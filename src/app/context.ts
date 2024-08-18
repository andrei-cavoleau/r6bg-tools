import { DICE_SET } from "r6bg-damage-probabilities/dist/constants";
import { createContext } from "react";

export const defaultDiceSet: DICE_SET = {
  yellow: 0,
  orange: 1,
  red: 2,
};

export const DiceSetContext = createContext<DICE_SET>(defaultDiceSet);
