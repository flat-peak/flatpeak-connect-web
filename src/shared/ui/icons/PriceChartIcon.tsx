import {HTMLAttributes} from "react";

const PriceChartIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number}) => (
    <svg 
        width={props.width || 33} 
        height={props.height || 32} 
        viewBox="0 0 33 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_3780_13652)">
            <path d="M30.4 16.4L27.4 22.4L24.4 28.4C24.2 28.7 23.9 29 23.5 29H10.5C9.9 29 9.5 28.6 9.5 28C9.5 27.4 9.9 27 10.5 27H22.9L28.4 16L22.9 5H10.5C9.9 5 9.5 4.6 9.5 4C9.5 3.4 9.9 3 10.5 3H23.5C23.9 3 24.2 3.2 24.4 3.6L30.4 15.6C30.5 15.9 30.5 16.2 30.4 16.5V16.4ZM10.5 22C10.5 22.6 10.9 23 11.5 23H22.5V21H11.5C10.9 21 10.5 21.4 10.5 22ZM18.5 15H7.5C6.9 15 6.5 15.4 6.5 16C6.5 16.6 6.9 17 7.5 17H18.5V15ZM22.5 11V9H11.5C10.9 9 10.5 9.4 10.5 10C10.5 10.6 10.9 11 11.5 11H22.5ZM3.5 15C2.9 15 2.5 15.4 2.5 16C2.5 16.6 2.9 17 3.5 17C4.1 17 4.5 16.6 4.5 16C4.5 15.4 4.1 15 3.5 15ZM6.5 21C5.9 21 5.5 21.4 5.5 22C5.5 22.6 5.9 23 6.5 23C7.1 23 7.5 22.6 7.5 22C7.5 21.4 7.1 21 6.5 21ZM6.5 11C7.1 11 7.5 10.6 7.5 10C7.5 9.4 7.1 9 6.5 9C5.9 9 5.5 9.4 5.5 10C5.5 10.6 5.9 11 6.5 11Z" fill="black"/>
        </g>
        <defs>
            <clipPath id="clip0_3780_13652">
                <rect width="32" height="32" fill="white" transform="translate(0.5)"/>
            </clipPath>
        </defs>
    </svg>
)

export default PriceChartIcon
