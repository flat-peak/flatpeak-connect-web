import styles from "./FooterActions.module.scss";
import View from "../View/View.tsx";
import {PropsWithChildren} from "react";

type FooterActionsProps = {
    variant?: 'primary' | 'secondary',
    transparent?: boolean;
}
export default function FooterActions(props: PropsWithChildren<FooterActionsProps>) {
    const {children, variant = 'primary', transparent = true} = props;

    const classList = [styles.host];
    if (variant && styles['variant-' + variant]) {
        classList.push(styles['variant-' + variant])
    }
    if(!transparent) {
        classList.push(styles.filled)
    }
    return (
        <View component={"footer"} className={classList.join(' ')}>
            {children}
        </View>
    );
}
