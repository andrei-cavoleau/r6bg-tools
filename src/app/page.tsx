"use client";

import styles from "./page.module.css";
import DiceInput from "./components/DiceInput";
import { DICE_SET, DICE_TYPE } from "r6bg-damage-probabilities/dist/constants";
import { defaultDiceSet, DiceSetContext } from "context";
import { FormEventHandler, useState } from "react";
import Graph from "components/Graph";

export default function DamageProbabilitiesModale() {
  const [diceSet, setDiceSet] = useState(defaultDiceSet);

  const getOnDiceIncrementClick = (type: DICE_TYPE) => (increment: number) => {
    const newDiceSet: DICE_SET = {
      ...diceSet,
      [type]: Math.max(0, diceSet[type] + increment),
    };
    setDiceSet(newDiceSet);
  };

  const types = [DICE_TYPE.YELLOW, DICE_TYPE.ORANGE, DICE_TYPE.RED];

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <DiceSetContext.Provider value={diceSet}>
      <form onSubmit={onSubmit} className={styles.form}>
        {types.map((type) => (
          <DiceInput
            type={type}
            key={type}
            value={diceSet[type]}
            onIncrementClick={getOnDiceIncrementClick(type)}
          />
        ))}
      </form>
      <Graph />
    </DiceSetContext.Provider>
  );
}
