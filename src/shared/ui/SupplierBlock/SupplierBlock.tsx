import styles from "./SupplierBlock.module.scss";
import View from "../View/View.js";
import Logotypes from "../Logotypes/Logotypes.js";
import Typography from "../Typography/Typography.js";
import SmallArrowRightIcon from "../icons/SmallArrowRightIcon.tsx";

type SupplierBlockProps = {
    src?: string;
    title: string;
    description?: string;
}
export default function SupplierBlock(props: SupplierBlockProps) {
    const {src, title,description} = props;
    return (
        <View className={styles.host}>
            {src &&<View className={styles.logo}>
                <Logotypes src={src} title={title} />
            </View>}
            <View className={styles.title}>
              <Typography color="black" variant="leading_string">
                  {title}
              </Typography>
                {description && (<Typography color="black_a40" variant="button__forms14_book" className={styles.description}>
                    {description}
                </Typography>)}
            </View>
            <View className={styles.icon}>
                <SmallArrowRightIcon/>
            </View>
        </View>
    );
}
