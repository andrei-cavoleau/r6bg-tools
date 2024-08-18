import { DICE_TYPE } from "r6bg-damage-probabilities/dist/constants";
import styles from "../../page.module.css";

export const diceImageConfig = {
  [DICE_TYPE.YELLOW]: {
    className: styles.diceYellow,
    alt: "Yellow Dice",
  },
  [DICE_TYPE.ORANGE]: {
    className: styles.diceOrange,
    alt: "Orange Dice",
  },
  [DICE_TYPE.RED]: {
    className: styles.diceRed,
    alt: "Red Dice",
  },
};
