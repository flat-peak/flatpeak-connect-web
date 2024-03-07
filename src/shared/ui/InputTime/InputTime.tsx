import styles from "./InputTime.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";
import {InputHTMLAttributes, useState} from "react";

type InputTimeTimeProps = {
    label: string;
    variant: "primary" | "secondary"
} &  InputHTMLAttributes<HTMLInputElement>
export default function InputTime(props: InputTimeTimeProps) {
    const { label, variant, ...inputAttributes } = props

    const [value, setValue] = useState('00:00')
  return (
      <View className={[styles.host, styles['variant-'+variant]].join(' ')}>
          <input
                 className={styles.control}
                 type="time"
                 value={value}
                 {...inputAttributes}
                 onChange={(v) => setValue(v.target.value)}
          />
          <View className={styles.overlay}>
              <Typography className={styles.label} color="black_a40" variant="button__forms12_book">
                  {label}
              </Typography>
          </View>
      </View>
  );
}
