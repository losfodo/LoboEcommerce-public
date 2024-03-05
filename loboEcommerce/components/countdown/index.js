import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { calcaulateDiff } from "./utils";
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};
export default function Countdown({ date }) {
    // console.log("date>", date)//ver a data 
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState();
  useEffect(() => {
    setTimeInMs(date.getTime());
  }, [date]);
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeInMs]);
  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calcaulateDiff(timeInMs));
  };
  let isFirstIteration = true;//aparecer palavra dias
  return (
    <div className={styles.countdown}>
      {/*quantidade de dias que falta na contagem regressiva */}
      {[...Array(remainingTime?.days.length).keys()].map((d, i) => {
        if (remainingTime?.days == 0) {
          return;
        }
        const renderDias = isFirstIteration ? <b>days</b> : null;
        isFirstIteration = false;
        return (
          <React.Fragment key={i}>
            {i === 0 && renderDias} <span>{remainingTime?.days.slice(i, i + 1)}</span> {/*<b>:</b>*/}
          </React.Fragment>
        );
      })}

      <b>:</b>
      <span>{remainingTime?.hours.slice(0, 1)}</span>
      <span>{remainingTime?.hours.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.minutes.slice(0, 1)}</span>
      <span>{remainingTime?.minutes.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.seconds.slice(0, 1)}</span>
      <span>{remainingTime?.seconds.slice(1, 2)}</span>
    </div>
  );
}
