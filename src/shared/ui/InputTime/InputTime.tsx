import { useState, useId } from "react";
import styles from "./InputTime.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";

type InputTimeProps = {
    label: string;
    variant: "primary" | "secondary";
    name: string;
    value: string;
    onChange: (e: { target: { name: string; value: string } }) => void;
};

const generateTimeOptions = () => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const hh = String(h).padStart(2, "0");
            const mm = String(m).padStart(2, "0");
            times.push(`${hh}:${mm}`);
        }
    }
    return times;
};

export default function InputTime({ label, variant, name, value, onChange }: InputTimeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const inputId = useId(); // unique id for label/input association
    const timeOptions = generateTimeOptions();

    return (
        <View className={[styles.host, styles[`variant-${variant}`]].join(" ")}>
            {/* Hidden native input to participate in form submission */}
            <input type="hidden" name={name} value={value} />

            {/* Visible fake input UI */}
            <div
                className={styles.fakeInput}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={`${inputId}-dropdown`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {value}
            </div>

            <View className={styles.overlay}>
                <Typography className={styles.label} color="black_a40" variant="button__forms12_book">
                    {label}
                </Typography>
            </View>

            {isOpen && (
                <div className={styles.dropdown} id={`${inputId}-dropdown`} role="listbox">
                    {timeOptions.map((time) => (
                        <div
                            key={time}
                            className={styles.option}
                            role="option"
                            onClick={() => {
                                onChange({ target: { name, value: time } });
                                setIsOpen(false);
                            }}
                        >
                            {time}
                        </div>
                    ))}
                </div>
            )}
        </View>
    );
}
