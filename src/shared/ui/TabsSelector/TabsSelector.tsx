import styles from "./TabsSelector.module.scss";
import View from "../View/View.js";
import SelectorTab from "../SelectorTab/SelectorTab.tsx";
import SelectorTabsBlockSlidingBackground from "../SlidingBackground/SlidingBackground.tsx";
import TouchableOpacity from "../../TouchahbleOpacity/TouchableOpacity.tsx";
import {RatePeriodType} from "../../../features/connect/lib/types.ts";

type TabsSelectorProps = {
    currentTab: RatePeriodType;
    changeTab: (tab: RatePeriodType) => void;
}
export default function TabsSelector(props: TabsSelectorProps) {
    const {currentTab, changeTab} = props;
    const index = ["yesterday", "today", "tomorrow"].indexOf(currentTab)
  return (
    <View className={styles.host}>
        <View className={styles.wrapper}>
            <SelectorTabsBlockSlidingBackground index={index} total={3} />
            <TouchableOpacity className={styles.caption} onClick={() => changeTab("yesterday")}><SelectorTab label="Yesterday" /></TouchableOpacity>
            <TouchableOpacity className={styles.caption} onClick={() => changeTab("today")}><SelectorTab label="Today" /></TouchableOpacity>
            <TouchableOpacity className={styles.caption} onClick={() => changeTab("tomorrow")}><SelectorTab label="Tomorrow" /></TouchableOpacity>
        </View>
    </View>
  );
}
