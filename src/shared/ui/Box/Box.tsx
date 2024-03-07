import {PropsWithChildren} from "react";
import styles from "./Box.module.scss"
import classNames from "classnames";
const dynamicAttributes = ['mt', 'w', 'rg', 'cg', 'ml', 'mw','mih', 'pt',  'pb', 'ph', 'mg']
type BoxProps = {
	className?: string;
    rg?: number;
    cg?: number;
    mt?: number;
	mw?: number;
	mih?: number | string;
	w?: number | string;
	pt?: number;
	pb?: number;
	ph?: number;
	mg?: number;
	f?: 1 | 0;
	jc?: "flex-end" | "center" | "space-between";
	ai?: "flex-end" | "center";
	d?: "row" | "column";
}
export default function Box(props: PropsWithChildren<BoxProps>) {
    const {children, className, ...style} = props;
	const cssProps: Record<string, string | number | undefined> = { };
    const cssClasses = Object.keys(style || {}).reduce((data, key) => {
		const classNameIndexKey = key as keyof typeof styles;
		const stylesIndexKey = key as keyof typeof style;
		if (dynamicAttributes.includes(key)) {
			data[styles[classNameIndexKey]] = true;
			cssProps[`--box-${key}`] = typeof style[stylesIndexKey] === 'number' ? style[stylesIndexKey] + 'px' : style[stylesIndexKey];
		} else {
			const compoundKey = [key , style[stylesIndexKey]].join('--') as keyof typeof styles;
			data[styles[compoundKey as keyof typeof styles]] = true;
		}
        return data;
    }, {} as Record<string, boolean>);

    return <div className={classNames(styles.host, className, cssClasses)} style={cssProps}>{children}</div>
}
