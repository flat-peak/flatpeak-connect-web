import styles from "./ScrollableArea.module.scss";
import View from "../View/View.tsx";
import {PropsWithChildren} from "react";

export default function ScrollableArea(props: PropsWithChildren) {
    const {children} = props;
    return (
        <View className={styles.host}>
            {children}
        </View>
    );
}
