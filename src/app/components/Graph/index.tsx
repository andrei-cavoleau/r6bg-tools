"use client";

import Chart from "chart.js/auto";
import { CategoryScale, ChartData, ChartOptions } from "chart.js";
import { DiceSetContext } from "context";
import styles from "../../page.module.css";
import { getProbabilitiesFromDiceSet } from "r6bg-damage-probabilities";
import { useContext } from "react";
import {
  DICE_SET,
  Probabilities,
} from "r6bg-damage-probabilities/dist/constants";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function Graph() {
  const diceSet = useContext(DiceSetContext);
  const chartOptions = getChartOptions();
  const chartData = getChartData(diceSet);
  const chartPlugins = getChartPlugins();
  return (
    <figure className={styles.graph}>
      <Line options={chartOptions} data={chartData} plugins={chartPlugins} />
    </figure>
  );
}

const getChartOptions = (): any => ({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Damage probabilities",
    },
    legend: {
      display: false,
    },
    customCanvasBackgroundColor: {
      color: "white",
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "damages",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Percent chances",
      },
      ticks: {
        callback: (value: number) => `${value}%`,
      },
      min: 0,
    },
  },
});

const getChartData = (
  diceSet: DICE_SET,
): ChartData<"line", number[], number> => {
  const probabilities = getProbabilitiesFromDiceSet(diceSet);
  const highestDamage = getHighestDamage(probabilities);

  const labels = [];
  const data = [];
  let probabilityLeft = 1;

  for (let i = 0; i <= highestDamage; i++) {
    labels.push(i);
    data.push(probabilityLeft);
    const probability = getDamageProbability(probabilities, i);
    probabilityLeft -= probability;
  }

  const dataAsPercent = data.map((data) => Math.round(data * 100));

  return {
    labels,
    datasets: [
      {
        label: "Damage percent chances",
        data: dataAsPercent,
        backgroundColor: "white",
        borderColor: "#0883ff",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
};

const getHighestDamage = (probabilities: Probabilities): number =>
  Math.max(...Object.keys(probabilities).map((damage) => +damage));

const getDamageProbability = (probabilities: Probabilities, damage: number) =>
  probabilities[damage] || 0;

const getChartPlugins = () => [
  {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart: Chart, args: any, options: any) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  },
];
