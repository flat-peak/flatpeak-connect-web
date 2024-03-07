import {HTMLAttributes} from "react";
const SearchIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={17}
        fill="none"
        {...props}
    >
        <path
            fill="#000"
            fillOpacity={0.53}
            d="M.797 6.89A6.242 6.242 0 0 1 7.03.657a6.242 6.242 0 0 1 6.235 6.235 6.162 6.162 0 0 1-1.282 3.773l3.82 3.844c.165.164.258.39.258.64 0 .524-.367.922-.898.922a.92.92 0 0 1-.664-.265l-3.844-3.852a6.18 6.18 0 0 1-3.625 1.172A6.242 6.242 0 0 1 .797 6.891Zm1.336 0a4.901 4.901 0 0 0 4.898 4.9 4.901 4.901 0 0 0 4.899-4.9A4.901 4.901 0 0 0 7.03 1.993a4.901 4.901 0 0 0-4.898 4.899Z"
        />
    </svg>
)
export default SearchIcon
