import Box from "../../Box/Box.tsx";
import Typography, {FontVariant} from "../../Typography/Typography.tsx";
import styles from "./Rate.module.scss";
import {roundRateValue} from "../../../lib/util.ts";

type RateProps = {
    currency: string;
    cost: number;
    units?: string;
    textVariant?: FontVariant;
}

export default function Rate(props:RateProps) {
  const {cost, currency, textVariant = "basic_string",  units} = props;
  const [base, decimals = "00"] = String(roundRateValue(cost)).split('.')
  return (
    <Box cg={1} d="row">
      <Typography color="black" variant={textVariant}>
          {currency}
      </Typography>
      <Typography color="black" variant={textVariant} className={styles.numeric}>
          {base}
      </Typography>
      <Typography color="black" variant={textVariant} className={styles.dot}>
          .
      </Typography>
      <Typography color="black" variant={textVariant} className={styles.numeric}>
          {decimals}
      </Typography>
      {units && (<Typography color="black" variant="basic_string">{units}</Typography>)}
    </Box>
  );
}
