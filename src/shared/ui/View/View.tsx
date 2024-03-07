import {HTMLAttributes, PropsWithChildren} from "react";

type ViewTypes = HTMLAttributes<HTMLDivElement> & {
    component?: string;
};
export default function View(props: PropsWithChildren<ViewTypes>) {
    const {children, component, ...rest} = props;
    const Tag = component || 'div';
    return <Tag {...rest}>{children}</Tag>
}
