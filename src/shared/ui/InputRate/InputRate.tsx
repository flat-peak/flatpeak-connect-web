import styles from "./InputRate.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";
import { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef, useState } from "react";
import Box from "../Box/Box.js";

type InputRateTimeProps = {
    variant?: "primary" | "secondary",
    prefix?: string;
    prefixPosition?: "start" | "end";
    suffix?: boolean;
    useDefault?: boolean;
    layoutRightOffset?: number;
    showDecimals?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export type InputRateHandle = {
    reset: () => void;
};

const InputRate = forwardRef<InputRateHandle, InputRateTimeProps>((props, ref) => {
    const { variant, prefix = "", prefixPosition = "start", suffix = true, defaultValue, useDefault = true, layoutRightOffset = 0, showDecimals = true, ...inputAttributes } = props

    const [value, setValue] = useState(() => {
        if (defaultValue !== undefined) {
            return defaultValue === 0 ? (showDecimals ? '0.00' : '0') : String(defaultValue);
        }
        return useDefault ? (showDecimals ? '0.00' : '0') : "";
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            if (defaultValue !== undefined) {
                setValue(defaultValue === 0 ? (showDecimals ? '0.00' : '0') : String(defaultValue));
            } else {
                setValue(useDefault ? (showDecimals ? '0.00' : '0') : "");
            }
        },
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
        <View className={[styles.host, styles['variant-' + variant]].join(' ')}>
            <Box className={styles.placeholder}>
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
                        <Typography color="black" variant="button__forms32_book" className={styles.value}>
                            {String(value)}
                        </Typography>

                        {Boolean(prefix) && prefixPosition === "start" && (
                            <View className={styles.leftDock}>
                                <Typography color="black" variant="button__forms32_book" className={styles.prefix}>
                                    {prefix}
                                </Typography>
                            </View>
                        )}
                        {(prefixPosition === "end" && Boolean(prefix)) || suffix ? (
                            <View className={styles.rightDock}>
                                {prefixPosition === "end" && Boolean(prefix) && (
                                    <Typography color="black" variant="button__forms32_book" className={styles.prefix}>
                                        {prefix}
                                    </Typography>
                                )}
                                {suffix && (
                                    <Typography color="black" variant="button__forms16_book_kwh" className={styles.suffix}>
                                        /kWh
                                    </Typography>
                                )}
                            </View>
                        ) : null}
                    </View>
                </View>
            </Box>
            {Boolean(layoutRightOffset) && <Box pr={layoutRightOffset} />}
        </View>
    );
});

export default InputRate;
