import {HTMLAttributes} from "react";

const DropdownArrow = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={8}
        viewBox="0 0 12 8"
        fill="none"
        {...props}
    >
        <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="#666666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default DropdownArrow;
