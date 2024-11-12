import {ButtonHTMLAttributes, PropsWithChildren} from "react";
import styles from "./TouchableOpacity.module.scss";

type TouchableOpacityProps = {
	component?: React.ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function TouchableOpacity(props: PropsWithChildren<TouchableOpacityProps>) {
	const {children, className, component, ...buttonProps} = props;
	const Tag = component || 'button';
	if (Tag === 'button' && !buttonProps.type) {
		buttonProps.type = "button"
	}
	return (
		<Tag className={[className, styles.host].filter(Boolean).join(' ')} {...buttonProps}>
			{children}
		</Tag>
	)
}
