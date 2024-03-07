import {HTMLAttributes} from "react";
const MarketIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number, color?: string}) => (
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
            d="M4.063 22.5c-.485 0-.875-.375-.875-.844 0-.484.39-.875.874-.875h6.407l3.36-15.297c.187-.906 1.468-.89 1.608 0l4.329 25.703 4.156-18.437c.203-.89 1.437-.89 1.64-.031l1.875 8.062H33c.5 0 .875.375.875.875 0 .469-.39.844-.875.844h-5.953c-.61 0-.953-.281-1.078-.875l-1.157-5.36-4.203 19.266c-.187.89-1.547.907-1.687 0L14.594 9.97 12 21.703c-.11.547-.469.797-1.063.797H4.064Z"
        />
    </svg>
)
export default MarketIcon
