import {HTMLAttributes} from "react";
const TextArrowRight = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={15}
        height={7}
        fill="none"
        {...props}
    >
        <path
            fill="#000"
            d="M.84 3.892V2.828h7v1.064h-7Zm10.992-3.5 2.982 2.968-2.982 2.968h-1.4l2.436-2.436H7.422V2.828l5.46.014-2.45-2.45h1.4Z"
        />
    </svg>
)
export default TextArrowRight
