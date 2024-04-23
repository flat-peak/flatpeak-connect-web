import styles from "./InputTime.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";
import {InputHTMLAttributes} from "react";

type InputTimeTimeProps = {
    label: string;
    variant: "primary" | "secondary"
} &  InputHTMLAttributes<HTMLInputElement>
export default function InputTime(props: InputTimeTimeProps) {
    const { label, variant, ...inputAttributes } = props

  return (
      <View className={[styles.host, styles['variant-'+variant]].join(' ')}>
          <input
                 className={styles.control}
                 type="time"
                 {...inputAttributes}
          />
          <View className={styles.overlay}>
              <Typography className={styles.label} color="black_a40" variant="button__forms12_book">
                  {label}
              </Typography>
          </View>
      </View>
  );
}
