import {PropsWithChildren} from "react";
import View from "../View/View.tsx";
import styles from "./RegionPicker.module.scss";
import Typography from "../Typography/Typography.tsx";
import Select from "../Select/Select.tsx";

type RegionPickerProps = {
    options: string[];
    name: string;
    defaultValue: string;
}
export default function RegionPicker(props: PropsWithChildren<RegionPickerProps>) {
    const {name, options, defaultValue} = props;
    return (
        <View className={styles.host}>
            <Typography variant={"rp_300_14"} color={"yellow"}>
                We were unable to automatically detect your tariff zone, please select it from list below:
            </Typography>
            <Select
                secondaryText="Tariff zone"
                id="region"
                autoComplete="region"
                options={options.map((opt) => ({label: opt, value: opt}))} name={name} defaultValue={defaultValue}/>
        </View>
    );
}
