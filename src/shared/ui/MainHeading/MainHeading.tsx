import styles from "./MainHeading.module.scss";
import View from "../View/View.js";
import Typography from "../Typography/Typography.js";

type MainHeadingProps = {
    text: string;
}
export default function MainHeading(props: MainHeadingProps) {
    const {text} = props;
  return (
    <View className={styles.host}>
      <Typography color="black" variant="heading_h1_string">
          {text}
      </Typography>
    </View>
  );
}
