import {HTMLAttributes} from "react";
const ClockIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number, color?: string}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={38}
        height={40}
        fill="none"
        viewBox={"0 0 38 40"}
        {...props}
    >
        <path
            fill={props.color || "#0096F7"}
            d="M18.469 35.39c-8.578 0-15.672-7.093-15.672-15.671 0-8.594 7.078-15.672 15.656-15.672 8.594 0 15.688 7.078 15.688 15.672 0 8.578-7.094 15.672-15.672 15.672Zm0-2.03c7.562 0 13.656-6.094 13.656-13.641 0-7.563-6.11-13.657-13.672-13.657-7.547 0-13.625 6.094-13.625 13.657 0 7.547 6.078 13.64 13.64 13.64Zm-8.5-12.11c-.485 0-.844-.375-.844-.86a.83.83 0 0 1 .844-.843h7.64V9.437a.83.83 0 0 1 .844-.843c.5 0 .875.36.875.844V20.39a.85.85 0 0 1-.875.859H9.97Z"
        />
    </svg>
)
export default ClockIcon
