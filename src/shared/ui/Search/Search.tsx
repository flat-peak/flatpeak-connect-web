import styles from "./Search.module.scss";
import View from "../View/View.tsx";
import {InputHTMLAttributes} from "react";
import SearchIcon from "../icons/SearchIcon.tsx";

type SearchProps = {
    secondaryText?: string
    primaryText?: string;
} &  InputHTMLAttributes<HTMLInputElement>
export default function Search(props: SearchProps) {
    const {...inputAttributes } = props

    return (
        <View className={styles.search}>
            <SearchIcon className={styles.icon}></SearchIcon>
            <input type="text" className={styles.control} placeholder={"Search"} {...inputAttributes}/>
        </View>
    );
}
