import {PropsWithChildren} from "react";
import View from "../View/View.tsx";
import styles from "./LeadingText.module.scss";

export const LeadingText = (props: PropsWithChildren) => {
    const {children} = props;
    return (
        <View component={"div"} className={styles.host}>
            {children}
        </View>
    )
}
