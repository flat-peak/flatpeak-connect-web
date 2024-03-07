import styles from "./Viewport.module.scss";
import View from "../View/View.tsx";
import {PropsWithChildren} from "react";
import {useTheme} from "../../../features/theme/ThemeProvider.tsx";

type ViewportProps = {}
export const Viewport = (props: PropsWithChildren<ViewportProps>) => {
    const {children} = props;
    const {theme} = useTheme();
    const classList = [styles.host];
    if (theme && styles['theme-' + theme]) {
        classList.push(styles['theme-' + theme])
    }
    return (
        <View className={classList.join(' ')}>
            <View className={styles.wrapper}>{children}</View>
        </View>
    )
}
