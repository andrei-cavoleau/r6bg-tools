"use client";

import Image from "next/image";
import styles from "../../../page.module.css";

interface DiceInputNumberProps {
  value: number;
  onIncrementClick: (increment: number) => void;
}

export default function DiceInputNumber(props: DiceInputNumberProps) {
  const { value, onIncrementClick } = props;

  return (
    <div className={styles.diceInputNumber}>
      <button className={styles.increment} onClick={() => onIncrementClick(-1)}>
        <Image
          src="/minus.svg"
          alt={"decrement"}
          width={25}
          height={25}
          priority
        />
      </button>
      <span className={styles.number}>{value}</span>
      <button className={styles.increment} onClick={() => onIncrementClick(1)}>
        <Image
          src="/plus.svg"
          alt={"increment"}
          width={25}
          height={25}
          priority
        />
      </button>
    </div>
  );
}
