import Image from "next/image";
import styles from "../../page.module.css";
import { DICE_TYPE } from "r6bg-damage-probabilities/dist/constants";
import { diceImageConfig } from "./constants";
import DiceInputNumber from "./Number";
import { ChangeEvent } from "react";

interface DiceInputProps {
  type: DICE_TYPE;
  value: number;
  onIncrementClick: (increment: number) => void;
}

export default function DiceInput(props: DiceInputProps) {
  const { type, value, onIncrementClick } = props;
  const { className, alt } = diceImageConfig[type];

  return (
    <div className={styles.diceInput}>
      <Image
        className={[styles.dice, className].join(" ")}
        src="/dice.png"
        alt={alt}
        width={50}
        height={50}
        priority
      />
      <DiceInputNumber value={value} onIncrementClick={onIncrementClick} />
    </div>
  );
}
