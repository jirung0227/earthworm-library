import React from "react";
import styles from "./ControlMenu.module.css";
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};
export default React.memo(ControlMenu);
