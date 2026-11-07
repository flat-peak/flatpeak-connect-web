import {HTMLAttributes} from "react";
const SmallArrowRightIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={7}
        height={11}
        fill="none"
        {...props}
    >
        <path
            fill="#000"
            fillOpacity={0.4}
            d="M6.115 5.77a.534.534 0 0 1-.17.386l-4.64 4.541a.526.526 0 0 1-.387.159.524.524 0 0 1-.533-.534c0-.152.058-.281.152-.38L4.803 5.77.537 1.598a.556.556 0 0 1-.152-.381c0-.305.234-.533.533-.533.152 0 .281.052.387.152l4.64 4.547c.112.105.17.24.17.387Z"
        />
    </svg>
)
export default SmallArrowRightIcon
