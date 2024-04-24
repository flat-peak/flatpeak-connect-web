import styles from "./InfoMessage.module.scss";
import View from "../View/View.tsx";
import {PropsWithChildren} from "react";

export default function InfoMessage(props: PropsWithChildren) {
    const {children} = props;
  return (
    <View className={styles.host}>
        {children}
    </View>
  );
}
