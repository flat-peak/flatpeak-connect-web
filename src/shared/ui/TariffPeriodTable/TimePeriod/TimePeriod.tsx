import styles from "./TimePeriod.module.scss";
import View from "../../View/View.tsx";
import Typography from "../../Typography/Typography.tsx";
import ColorDot from "../../icons/ColorDot.tsx";
import TextArrowRight from "../../icons/TextArrowRight.tsx";
import {PeakType} from "../../../../features/connect/lib/types.ts";

type TimePeriodTableRowProps = {
    validFrom: string;
    validTo: string;
    peak: PeakType;
}

export default function TimePeriod(props: TimePeriodTableRowProps) {
  const {validFrom, validTo, peak} = props;
  const [validFromHours, validFromMinutes] = validFrom.substring(11, 16).split(":");
  const [validToHours, validToMinutes] = validTo.substring(11, 16).split(":");
  return (
    <View className={styles.host}>
        <View className={styles.dot}>
            <ColorDot peak={peak} />
        </View>
        <View>
          <Typography color="black" variant="basic_string" className={styles.numeric}>
              {validFromHours}
          </Typography>
          <Typography color="black" variant="basic_string" className={styles.colon}>
              :
          </Typography>
          <Typography color="black" variant="basic_string" className={styles.numeric}>
              {validFromMinutes}
          </Typography>
        </View>
        <TextArrowRight/>
        <View>
            <Typography color="black" variant="basic_string" className={styles.numeric}>
                {validToHours}
            </Typography>
            <Typography color="black" variant="basic_string" className={styles.colon}>
                :
            </Typography>
            <Typography color="black" variant="basic_string" className={styles.numeric}>
                {validToMinutes}
            </Typography>
        </View>
    </View>
  );
}
