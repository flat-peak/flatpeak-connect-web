import {PropsWithChildren} from "react";
import View from "../View/View.tsx";
import styles from "./FormSlide.module.scss";

type FormSlideProps = {
    color: "yellow" | "blue";
}
export default function FormSlide(props: PropsWithChildren<FormSlideProps>) {
    const {color = "yellow", children} = props;
    return (
        <View className={[styles.host, styles['color-'+color]].join(' ')}>
            {children}
        </View>
    );
}
