import Box from "../../Box/Box.tsx";
import Typography from "../../Typography/Typography.tsx";
import styles from "./Rate.module.scss";
import {roundRateValue} from "../../../util.ts";

type RateProps = {
    currency: string;
    cost: number;
}

export default function Rate(props:RateProps) {
  const {cost, currency} = props;
  const [base, decimals = "00"] = String(roundRateValue(cost)).split('.')
  return (
    <Box cg={2} d="row">
      <Typography color="black" variant="basic_string">
          {currency}
      </Typography>
      <Typography color="black" variant="basic_string" className={styles.numeric}>
          {base}
      </Typography>
      <Typography color="black" variant="basic_string" className={styles.dot}>
          .
      </Typography>
      <Typography color="black" variant="basic_string" className={styles.numeric}>
          {decimals}
      </Typography>
      <Typography color="black" variant="basic_string">
        /kWh
      </Typography>
    </Box>
  );
}
