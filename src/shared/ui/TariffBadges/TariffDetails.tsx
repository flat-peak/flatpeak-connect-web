import styles from "./TariffDetails.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";

type TariffDetailsProps = {
    name: string;
    endDate?: string;
}
export default function TariffDetails(props: TariffDetailsProps) {
  const {name, endDate} = props;
  return (
    <View className={styles.host}>
        <Typography color="mine-shaft_a50" variant="basic_string">
            Tariff name: <Typography color="black" variant="basic_string">{name}</Typography>
        </Typography>
        <Typography color="mine-shaft_a50" variant="basic_string">
            Contract end date: <Typography color="black" variant="basic_string">{endDate || 'Until terminated'}</Typography>
        </Typography>
    </View>
  );
}
