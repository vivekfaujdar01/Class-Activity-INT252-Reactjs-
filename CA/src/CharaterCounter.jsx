import React, { useState } from "react";
import styles from "./CharaterCounter.module.css";

export default function CharacterCounter({ maxLength = 10, warnThreshold = 0.2 }) {
  const [text, setText] = useState("");

  const remaining = maxLength - text.length;
  
  const remainingRatio = remaining / maxLength; 
  let stateClass = styles.green;
  if (remaining <= 0) stateClass = styles.red;
  else if (remainingRatio <= warnThreshold) stateClass = styles.orange;


  return (
    <div className={styles.container}>
      <label className={styles.label}>
        Type something (max {maxLength} chars)
      </label>

      <textarea id="live-text" className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing..."/>

      <div className={styles.info}>
        <div
          className={`${styles.counter} ${stateClass}`}
          id="charcount"
        >
          {remaining >= 0 ? `${remaining} characters remaining` : `${-remaining} over limit`}
        </div>
      </div>

      <div className={styles.hint}>
        <span>Character usage: {text.length} / {maxLength}</span>
      </div>
    </div>
  );
}