import styles from "./WarningMessage.module.scss";
import View from "../View/View.tsx";
import {PropsWithChildren} from "react";
import WarningIcon from "../icons/WarningIcon.tsx";

export default function WarningMessage(props: PropsWithChildren<{color?: "red" | "grey"}>) {
  const {children, color = "red"} = props;
  const cssColorProp = {
      red: "var(--color-fill-red)",
      grey: "var(--color-fill-black)",
  }[color];
  return (
    <View className={[styles.host, styles[color]].join(" ")}>
        <WarningIcon color={cssColorProp} opacity={1} width={24} height={24}/>
        {children}
    </View>
  );
}
