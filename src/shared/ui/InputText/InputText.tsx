import styles from "./InputText.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import Box from "../Box/Box.tsx";
import {InputHTMLAttributes} from "react";

type InputTextProps = {
    secondaryText?: string
    primaryText?: string;
} &  InputHTMLAttributes<HTMLInputElement>
export default function InputText(props: InputTextProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {secondaryText: label, primaryText: value, ...inputAttributes } = props;
  return (
      <Box rg={8}>
          <View className={styles.host}>
              <input type="text" placeholder={label} className={styles.control} {...inputAttributes}/>
              <Typography
                  color={'black_a60'}
                  variant="button__forms16_book"
                  component={"label"}
                  className={styles.label}
              >{label}</Typography>
          </View>
      </Box>
  );
}
