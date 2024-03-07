import styles from "./TimePeriodTableRow.module.scss";
import View from "../../View/View.tsx";
import TimePeriod from "../TimePeriod/TimePeriod.tsx";
import Rate from "../Rate/Rate.tsx";
import { RateEntryDecorated} from "../../../../features/connect/lib/types.ts";

type TimePeriodTableRowProps = {
    currency: string;
    rate: RateEntryDecorated;
}

export default function TimePeriodTableRow(props: TimePeriodTableRowProps) {
    const {currency, rate: {valid_from,valid_to, peak, tariff: {cost}},} = props;
  return (
    <View className={styles.host}>
      <TimePeriod
          peak={peak}
          validFrom={valid_from}
          validTo={valid_to}
      />
        <View className={styles.rateCol}>
            <Rate cost={cost} currency={currency} />
        </View>
    </View>
  );
}
