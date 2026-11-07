import {HTMLAttributes} from "react";
const CloseIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox={"0 0 32 32"}
        fill="none"
        {...props}
    >
        <circle cx={16} cy={16} r={16} fill="#F5F5F5"/>
        <path stroke="var(--color-icon-primary100)" strokeWidth={1.5} d="m12 20 8-8M20 20l-8-8"/>
    </svg>
)
export default CloseIcon
