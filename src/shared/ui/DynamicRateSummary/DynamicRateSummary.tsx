import styles from "./DynamicRateSummary.module.scss";
import View from "../View/View.tsx";
import Box from "../Box/Box.tsx";
import TabsSelector from "../TabsSelector/TabsSelector.tsx";
import {PeakType, RateEntry, RateEntryDecorated, RatePeriodType} from "../../../features/connect/lib/types.ts";
import TimePeriodTable from "../TariffPeriodTable/TimePeriodTable.tsx";
import {useState} from "react";
import {BarChart} from "../BarChart/BarChart.tsx";
import Typography from "../Typography/Typography.tsx";

type DynamicRateSummaryProps = {
  currency: string;
  rates: Record<RatePeriodType, Array<RateEntry>>;
  tiered: boolean;
}
export default function DynamicRateSummary(props: DynamicRateSummaryProps) {
  const { currency, rates, tiered} = props;

    const [activeTab, setTab] = useState<RatePeriodType>("today");
    const [currentRates, setCurrentRates] = useState(decoratePeaks(rates.today));

    const handleTabChanged = (tabId: "today"|"yesterday"|"tomorrow") => {
        setTab(tabId);
        setCurrentRates(decoratePeaks(rates[tabId]));
    }

    return (
      <View className={styles.host}>
          <BarChart rates={currentRates} currency={currency}/>
          <Box mt={24} rg={tiered ? 16 : 32}>
              <Box rg={8} ai={"center"} d={"column"}>
                  <TabsSelector currentTab={activeTab} changeTab={(tab) => handleTabChanged(tab)}/>
                  {tiered && (
                      <Typography color="black_a40" variant="button__forms16_book">
                          Tiered tariff, lowest tier displayed
                      </Typography>
                  )}
              </Box>
            <TimePeriodTable rates={currentRates} currency={currency}/>
          </Box>
      </View>
  );
}


export const decoratePeaks = (values: Array<RateEntry>): Array<RateEntryDecorated> => {
    if (!values?.length) {
        return [];
    }
    let min = Infinity;
    let max = -Infinity;

    const averageValue =
        values.reduce((acc, p) => {
            const value = Number(p.tariff.cost);
            min = Math.min(value, min);
            max = Math.max(value, max);
            return acc + value;
        }, 0) / values.length;

    return values.map((entry) => {
        const value = Number(entry.tariff.cost);

        let type: PeakType = "Medium"; // MID by default

        if (values.length > 2) {
            const off = Math.pow(value - min, 2);
            const peak = Math.pow(value - max, 2);
            const mid = Math.pow(value - averageValue, 2);
            const lowestDeviation = Math.min(off, peak, mid);

            if (lowestDeviation !== mid) {
                type = lowestDeviation === peak ? "High" : "Low";
            }
        } else if (value === max) {
            type = "High";
        }

        if (values.length === 1) {
            type = "Medium";
        }

        return {
            ...entry,
            peak: type,
        };
    });
};
