import styles from "./Logotypes.module.scss";
import View from "../View/View.tsx";

type LogotypesProps = {
    src: string;
    title: string;
    size?: 'normal' | 'big'
}

export default function Logotypes(props: LogotypesProps) {
    const {src, title, size} = props;
    const classList = [styles.host];
    if (size && styles['size-' + size]) {
        classList.push(styles['size-' + size])
    }
      return (
        <View className={classList.join(' ')}>
            <img src={src} alt={title} className={styles.image} />
        </View>
      );
}
