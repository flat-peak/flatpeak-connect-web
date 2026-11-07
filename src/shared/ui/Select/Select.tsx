import styles from "./Select.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import Box from "../Box/Box.tsx";
import {InputHTMLAttributes} from "react";

type InputTextProps = {
    options: Array<{label: string, value: string}>;
    secondaryText?: string
    primaryText?: string;
    placeholder?: string;
    allowEmpty?: boolean;
    emptyLabel?: string;
    error?: string;
} &  InputHTMLAttributes<HTMLSelectElement>
export default function Select(props: InputTextProps) {
  const {
    secondaryText: label,
    defaultValue,
    options,
    placeholder,
    allowEmpty = false,
    emptyLabel = "",
    error,
    ...inputAttributes
  } = props
  return (
      <Box rg={8}>
          <View className={`${styles.host} ${error ? styles.hostError : ''}`}>
              <select
                  defaultValue={defaultValue}
                  className={styles.control}
                  aria-invalid={error ? true : undefined}
                  {...inputAttributes}
              >
                  {allowEmpty ? (
                      <option value="">{emptyLabel}</option>
                  ) : placeholder ? (
                      <option value="" disabled>{placeholder}</option>
                  ) : null}
                  {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
              </select>

              <Typography
                  color={'black_a60'}
                  variant="button__forms16_book"
                  component={"label"}
                  className={styles.label}
              >{label}</Typography>
          </View>
          {error && (
              <Typography className={styles.error} color="red" variant="button__forms12_book">
                  {error}
              </Typography>
          )}
      </Box>
  );
}
