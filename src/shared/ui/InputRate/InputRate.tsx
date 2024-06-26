import styles from "./InputRate.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";
import {InputHTMLAttributes, useState} from "react";

type InputRateTimeProps = {
    variant?: "primary" | "secondary",
    currency: string;
} &  InputHTMLAttributes<HTMLInputElement>
export default function InputRate(props: InputRateTimeProps) {
    const { variant, currency, defaultValue, ...inputAttributes } = props

    const [value, setValue] = useState(defaultValue || '0.00')
  return (
      <View className={[styles.host, styles['variant-'+variant]].join(' ')}>
          <input
                 className={styles.control}
                 type="number"
                 step={0.01}
                 value={value}
                 {...inputAttributes}
                 onChange={(v) => setValue(v.target.value)}
          />
          <View className={styles.overlay}>
              <View className={styles.wrapper}>
                  <Typography color="black" variant="button__forms32_book" className={styles.prefix}>
                      {currency}
                  </Typography>
                  <Typography color="black" variant="button__forms32_book" className={styles.value}>
                      {String(value)}
                  </Typography>
                  <Typography color="black" variant="button__forms16_book_kwh" className={styles.suffix}>
                      /kWh
                  </Typography>
              </View>
          </View>
      </View>
  );
}
