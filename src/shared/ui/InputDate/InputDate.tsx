import styles from "./InputDate.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import HandIcon from "../icons/HandIcon.tsx";
import {InputHTMLAttributes, useState} from "react";

type InputDateProps = {

} &  InputHTMLAttributes<HTMLInputElement>

export default function InputDate(props: InputDateProps) {
    const { ...inputAttributes } = props

    const [value, setValue] = useState('');
    const classList =  [styles.control];

    if (value) {
        classList.push(styles.controlFilled)
    }
  return (
      <View className={styles.host}>
          <input
              className={classList.join(' ')}
              type="date"
              value={value}
              {...inputAttributes}
              onChange={(v) => setValue(v.target.value)}
          />
          <View className={styles.overlay}>
              <HandIcon width={24} height={32}/>
              <Typography color="black" variant="button__forms18_book">
                  Choose expiry date
              </Typography>
          </View>
      </View>
  );
}
