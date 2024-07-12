import styles from "./InputRate.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";
import {forwardRef, InputHTMLAttributes, useImperativeHandle, useRef, useState} from "react";

type InputRateTimeProps = {
    variant?: "primary" | "secondary",
    prefix?: string;
    suffix?: string;
    useDefault?: boolean
} & InputHTMLAttributes<HTMLInputElement>;

export type InputRateHandle = {
    reset: () => void;
};

const InputRate = forwardRef<InputRateHandle, InputRateTimeProps>((props, ref) => {
    const { variant, prefix="", suffix = "", defaultValue, useDefault = true, ...inputAttributes } = props

    const [value, setValue] = useState(defaultValue || useDefault ? '0.00' : "");

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setValue(useDefault ? '0.00' : ""),
        input: inputRef.current
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        value = value.replace(/,/g, '.');
        if (/^\d*\.?\d{0,4}$/.test(value)) {
            setValue(value);
        }
    };

    return (
      <View className={[styles.host, styles['variant-'+variant]].join(' ')}>
          <input
              ref={inputRef}
                 className={styles.control}
                 type="text"
                 pattern="[0-9.,]*"
                 inputMode="decimal"
                 step={0.01}
                 value={value}
                 {...inputAttributes}
                 onChange={handleChange}
          />
          <View className={styles.overlay}>
              <View className={styles.wrapper}>
                  <Typography color="black" variant="button__forms32_book" className={styles.prefix}>
                      {prefix}
                  </Typography>
                  <Typography color="black" variant="button__forms32_book" className={styles.value}>
                      {String(value)}
                  </Typography>

                  <Typography color="black"  variant="button__forms32_book" className={styles.suffix}>
                      {suffix}
                      <Typography color="black" variant="button__forms16_book_kwh">
                          /kWh
                      </Typography>
                  </Typography>
              </View>
          </View>
      </View>
  );
});

export default InputRate;
