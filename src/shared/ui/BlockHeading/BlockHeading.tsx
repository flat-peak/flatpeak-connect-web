import styles from "./BlockHeading.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import {ReactElement} from "react";

type HeadingforBlockProps = {
    icon: ReactElement;
    text: string;
}
export default function BlockHeading(props: HeadingforBlockProps) {
  const {icon, text} = props;
  return (
    <View className={styles.host}>
        {icon}
        <Typography color="black" variant="heading_h2_text">
            {text}
        </Typography>
    </View>
  );
}
