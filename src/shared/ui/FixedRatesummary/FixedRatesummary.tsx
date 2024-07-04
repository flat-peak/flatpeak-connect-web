import styles from "./FixedRatesummary.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import {roundRateValue} from "../../lib/util.ts";

type FixedRatesummaryProps = {
  currency: string;
  cost?: number | string;
}
export default function FixedRatesummary(props: FixedRatesummaryProps) {
  const {cost = 0, currency} = props;

  return (
    <View className={styles.host}>
      <View className={styles.frame_313294}>
        <Typography color="black" variant="rp_300_72">
          {currency}{roundRateValue(cost) || '0.00'}
        </Typography>
        <Typography color="black" variant="button__forms32_book">
          /kWh
        </Typography>
      </View>
    </View>
  );
}
