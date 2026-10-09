import styles from "./InputTime.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";
import {InputHTMLAttributes, useEffect, useRef} from "react";

type InputTimeTimeProps = {
    label: string;
    variant: "primary" | "secondary"
} &  InputHTMLAttributes<HTMLInputElement>

const PICKER_DEBOUNCE_MS = 300;

const isIosDevice = () => {
    if (typeof navigator === "undefined") {
        return false;
    }

    return /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
};

const openTimePicker = (input: HTMLInputElement) => {
    input.focus({preventScroll: true});

    if (typeof input.showPicker === "function") {
        try {
            input.showPicker();
            return;
        } catch {
            // showPicker can throw when not triggered by a user gesture.
        }
    }

    input.click();
};

export default function InputTime(props: InputTimeTimeProps) {
    const {
        label,
        variant,
        value,
        onClick,
        onTouchEnd,
        onFocus,
        onBlur,
        onChange,
        ...inputAttributes
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const lastOpenRef = useRef(0);
    const focusedRef = useRef(false);

    useEffect(() => {
        const input = inputRef.current;
        if (!input || focusedRef.current || typeof value !== "string") {
            return;
        }

        if (input.value !== value) {
            input.value = value;
        }
    }, [value]);

    useEffect(() => {
        if (!isIosDevice()) {
            return;
        }

        const dismissIfOutside = (event: Event) => {
            const input = inputRef.current;
            if (!input || document.activeElement !== input) {
                return;
            }

            const target = event.target;
            if (target instanceof Node && input.parentElement?.contains(target)) {
                return;
            }

            input.blur();
        };

        document.addEventListener("touchstart", dismissIfOutside, true);
        document.addEventListener("pointerdown", dismissIfOutside, true);
        return () => {
            document.removeEventListener("touchstart", dismissIfOutside, true);
            document.removeEventListener("pointerdown", dismissIfOutside, true);
        };
    }, []);

    const handleOpenPicker = () => {
        if (isIosDevice()) {
            return;
        }

        const now = Date.now();
        if (now - lastOpenRef.current < PICKER_DEBOUNCE_MS) {
            return;
        }
        lastOpenRef.current = now;

        if (inputRef.current) {
            openTimePicker(inputRef.current);
        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        focusedRef.current = true;
        onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        focusedRef.current = false;
        onBlur?.(event);
    };

    return (
      <View
          className={[styles.host, styles['variant-'+variant]].join(' ')}
          onClick={(event) => {
              if (event.target === inputRef.current) {
                  return;
              }
              handleOpenPicker();
          }}
      >
          <input
                 ref={inputRef}
                 className={styles.control}
                 type="time"
                 {...inputAttributes}
                 defaultValue={typeof value === "string" ? value : undefined}
                 onClick={(event) => {
                     onClick?.(event);
                     handleOpenPicker();
                 }}
                 onTouchEnd={onTouchEnd}
                 onFocus={handleFocus}
                 onBlur={handleBlur}
                 onChange={onChange}
          />
          <View className={styles.overlay}>
              <Typography className={styles.label} color="black_a40" variant="button__forms12_book">
                  {label}
              </Typography>
          </View>
      </View>
  );
}
