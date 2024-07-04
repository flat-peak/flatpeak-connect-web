import Typography from "../Typography/Typography.tsx";
import WarningIcon from "../icons/WarningIcon.tsx";
import styles from  "./DemoDisclaimer.module.css";

const DISPLAY_DEMO_DISCLAIMER = true;

export default function DemoDisclaimer() {
  return DISPLAY_DEMO_DISCLAIMER && (
        <div className={styles.host}>
          <WarningIcon color={'black'} opacity={1} width={16} height={16}/>
          <Typography variant={"rp_300_11"}>
            Connect-web demo. Not for customer use. To remove, see{" "}
            <a href={"https://docs.flatpeak.com/guides/integration-test"} target={"_blank"}>
              <Typography variant={"rp_300_11"} decoration={"underline"} component={"span"}>Docs.</Typography>
            </a>.
          </Typography>
        </div>
  )
}
