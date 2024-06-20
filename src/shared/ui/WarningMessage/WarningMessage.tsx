import styles from "./WarningMessage.module.scss";
import View from "../View/View.tsx";
import {PropsWithChildren} from "react";
import WarningIcon from "../icons/WarningIcon.tsx";

export default function WarningMessage(props: PropsWithChildren) {
  const {children} = props;
  return (
    <View className={styles.host}>
        <WarningIcon color={'var(--color-fill-red)'} opacity={1} width={24} height={24}/>
        {children}
    </View>
  );
}
