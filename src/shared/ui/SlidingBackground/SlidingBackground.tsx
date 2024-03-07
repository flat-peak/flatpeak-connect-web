import styles from "./SlidingBackground.module.scss";
import View from "../View/View.tsx";

type SelectorTabsBlockSlidingBackground = {
  index: number,
  total: number
}
export default function SelectorTabsBlockSlidingBackground(props: SelectorTabsBlockSlidingBackground) {
  const {index, total = 1} = props;
  const perOne = (100 / total) ;

  const cssProps: Record<string, string | number | undefined> = { };

  cssProps['--sliding-per-one'] = `${perOne.toFixed(4)}%`;
  cssProps['--sliding-offset'] = `${(perOne * index).toFixed(4)}%`;
  return (
      <View className={styles.host} style={cssProps}>
        {/*<SlidingIcon width={"100%"} height={"100%"}/>*/}
      </View>
  );
}
