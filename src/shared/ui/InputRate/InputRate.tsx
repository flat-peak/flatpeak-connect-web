import styles from "./InputRate.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";
import {forwardRef, InputHTMLAttributes, useImperativeHandle, useRef, useState} from "react";
import Box from "../Box/Box.js";

type InputRateTimeProps = {
    // "plain" places the value like the Anode field: closer to the bottom, used on the surcharge screen.
    variant?: "primary" | "secondary" | "plain",
    prefix?: string;
    suffix?: string;
    useDefault?: boolean;
    layoutRightOffset?: number;
    allowNegative?: boolean;
    showUnit?: boolean;
    placeholderText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type InputRateHandle = {
    reset: () => void;
};

const InputRate = forwardRef<InputRateHandle, InputRateTimeProps>((props, ref) => {
    const { variant, prefix="", suffix = "", defaultValue, useDefault = true, layoutRightOffset = 0, allowNegative = false, showUnit = true, placeholderText = "", onFocus, onBlur, ...inputAttributes } = props

    const [value, setValue] = useState(defaultValue || useDefault ? '0.00' : "");

    const [isFocused, setIsFocused] = useState(false);
    const showPlaceholder = Boolean(placeholderText) && value === "" && !isFocused;

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => setValue(useDefault ? '0.00' : ""),
        input: inputRef.current
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        value = value.replace(/,/g, '.');
        const valuePattern = allowNegative ? /^-?\d*\.?\d{0,4}$/ : /^\d*\.?\d{0,4}$/;
        if (valuePattern.test(value)) {
            setValue(value);
        }
    };

    // The iOS decimal keypad has no minus key, so negative values are entered with a sign toggle.
    const handleSignToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setValue((current) => String(current).startsWith('-') ? String(current).slice(1) : `-${current}`);
        inputRef.current?.focus();
    };

    return (
      <View className={[styles.host, styles['variant-'+variant]].join(' ')}>
          <Box className={styles.placeholder}>
              <input
                  ref={inputRef}
                     className={styles.control}
                     type="text"
                     pattern={allowNegative ? "-?[0-9.,]*" : "[0-9.,]*"}
                     inputMode="decimal"
                     step={0.01}
                     value={value}
                     {...inputAttributes}
                     onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
                     onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
                     onChange={handleChange}
              />
              <View className={styles.overlay}>
                  <View className={styles.wrapper}>
                      <Typography color="black" variant="button__forms32_book" className={styles.prefix}>
                          {prefix}
                      </Typography>
                      <Typography color={showPlaceholder ? "black_a40" : "black"} variant="button__forms32_book" className={styles.value}>
                          {showPlaceholder ? placeholderText : String(value)}
                      </Typography>

                      <Typography color="black" variant="button__forms32_book" className={styles.suffix}>
                          {suffix}
                          {showUnit && (
                              <Typography color="black" variant="button__forms16_book_kwh">
                                  /kWh
                              </Typography>
                          )}
                      </Typography>
                  </View>
                  {/*<Typography color="black" variant="button__forms32_book" className={styles.fakeSuffix}>*/}
                  {/*    {suffix}*/}
                  {/*</Typography>*/}
              </View>
          </Box>
          {allowNegative && (
              <button
                  type="button"
                  className={styles.signToggle}
                  onClick={handleSignToggle}
                  aria-label="Toggle sign"
                  tabIndex={-1}
              >
                  ±
              </button>
          )}
          {Boolean(layoutRightOffset) && <Box pr={layoutRightOffset}/>}
      </View>
  );
});

export default InputRate;
