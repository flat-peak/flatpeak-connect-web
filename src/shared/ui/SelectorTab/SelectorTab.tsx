import styles from "./SelectorTab.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";

type SelectorTabProps = {
    label: string;
}
export default function SelectorTab(props: SelectorTabProps) {
    const {label} = props;
  return (
    <View className={styles.host}>
      <Typography color="primary" variant="body">
          {label}
      </Typography>
    </View>
  );
}
