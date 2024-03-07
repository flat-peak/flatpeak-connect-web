import {HTMLAttributes} from "react";
const NightIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={37}
        height={40}
        fill="none"
        viewBox={"0 0 37 40"}
        {...props}
    >
        <path
            fill="#0096F7"
            d="M27.125 25.36c1.875 0 3.938-.344 5.094-.829.297-.11.453-.125.656-.125.406 0 .828.344.828.875 0 .14-.031.407-.172.719-2.468 5.656-8.031 9.219-14.593 9.219-9.344 0-16.141-6.813-16.141-16.157 0-6.453 3.984-12.484 9.64-14.734.36-.14.626-.172.735-.172.531 0 .89.453.89.875 0 .235-.046.438-.218.813-.625 1.281-1 3.312-1 5.687 0 8.531 5.469 13.828 14.281 13.828ZM4.687 18.983c0 8.297 6.047 14.36 14.329 14.36 5.203 0 9.937-2.625 12.375-6.875-1.297.453-2.828.656-4.5.656-9.891 0-15.86-5.797-15.86-15.453 0-1.86.313-3.672.86-5.203-4.391 2.468-7.204 7.36-7.204 12.515Z"
        />
    </svg>
)
export default NightIcon
