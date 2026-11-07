import styles from "./Layout.module.scss";
import View from "../View/View.tsx";
import {FormHTMLAttributes, PropsWithChildren, ReactElement} from "react";
import ScrollableArea from "../ScrollableArea/ScrollableArea.tsx";
import Box from "../Box/Box.tsx";


type LayoutProps = {
    footer?: ReactElement;
    component: 'main' | 'form';
} & FormHTMLAttributes<HTMLFormElement>
export default function Layout(props: PropsWithChildren<LayoutProps>) {
    const {footer, component, children, ...formAttributes} = props;

    const containerAttributes = component === 'form' ? formAttributes : {};

    return (
        <View component={component as 'form'} className={styles.host} {...containerAttributes as any}>
            <ScrollableArea>
                <Box ph={24} mih={"100%"}>
                    {children}
                </Box>
            </ScrollableArea>
            {footer}
        </View>
    );
}
