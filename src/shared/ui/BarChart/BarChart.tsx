


import styles from "./BarChart.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import {RateEntryDecorated} from "../../../features/connect/lib/types.ts";
import Legend from "../Legend/Legend.tsx";
import {useEffect, useMemo, useState} from "react";
import {expandRates} from "./util.ts";
import {roundRateValue} from "../../util.ts";

type BarChartProps = {
    currency: string;
    rates: Array<RateEntryDecorated>;
}

const placeholderBars = new Array(24).fill(0);
export const BarChart = (props: BarChartProps) => {
    const {currency, rates} = props;
    const [animated, setAnimated] = useState(false);

    const classNames = [styles.bars];
    if (animated) {
        classNames.push(styles.animated);
    }

    useEffect(() => {
        setAnimated(true);
    }, []);

    const data = useMemo(() => {
        if (!rates?.length) {
            return {
                max: 0,
                rates: []
            }
        }
        return {
            max: Math.max(...rates.map((r) => Number(r.tariff.cost))),
            rates: expandRates(rates)
        };
    }, [rates]);


    return (
        <View className={styles.host}>
            <View className={styles.chartWrapper}>
                <View className={styles.chartContent}>
                    {data.rates.length ? <View className={classNames.join(" ")}>
                        {data.rates.map((col, index) => {
                            const cssProps: Record<string, string | number | undefined> = { };

                            cssProps['--bar-progress'] = `${(Number(col.tariff.cost) / data.max * 100).toFixed(2)}%`;
                            cssProps['--bar-color'] = `var(--bar-color-${col.peak.toLowerCase()})`;
                            return (
                             <View key={index.toString()} className={styles.bar} style={cssProps}></View>
                            )
                        })}
                    </View> : (
                        <View className={styles.bars}>
                            {placeholderBars.map((_, index) => {
                                const cssProps: Record<string, string | number | undefined> = { };
                                cssProps['--bar-progress'] = `100%`;
                                return (
                                    <View key={index.toString()} className={styles.bar} style={cssProps}/>
                                )
                            })}
                            <View className={styles.noDataWarning}>
                                <Typography variant={"heading_h2_text"}  align={"center"}>No data</Typography>
                                <Typography variant={"button__forms16_book"} align={"center"}>Tariff information is not available yet. Please check back later</Typography>
                            </View>
                        </View>
                    )}
                    <View className={styles.xAxis}>
                        <Typography color="black" variant="rp_300_11">
                            00<sup>:00</sup>
                        </Typography>
                        <Typography color="black" variant="rp_300_11">
                            04<sup>:00</sup>
                        </Typography>
                        <Typography color="black" variant="rp_300_11">
                            08<sup>:00</sup>
                        </Typography>
                        <Typography color="black" variant="rp_300_11">
                            12<sup>:00</sup>
                        </Typography>
                        <Typography color="black" variant="rp_300_11">
                            16<sup>:00</sup>
                        </Typography>
                        <Typography color="black" variant="rp_300_11">
                            20<sup>:00</sup>
                        </Typography>
                    </View>
                </View>
                <View className={styles.yAxis}>
                    <Typography color="black" variant="rp_300_11">
                        {currency}{data.max ? roundRateValue(data.max) : "0.00"}
                    </Typography>
                        <Typography color="black" variant="rp_300_11">
                            {currency}{data.max ? roundRateValue(data.max / 2) : "0.00"}
                        </Typography>

                        <Typography color="black" variant="rp_300_11">
                            {currency}0.00
                        </Typography>
                </View>
            </View>
            <Legend />
    </View>
    )
}
