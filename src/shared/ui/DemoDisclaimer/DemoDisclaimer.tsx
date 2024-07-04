import WarningMessage from "../WarningMessage/WarningMessage.tsx";
import Typography from "../Typography/Typography.tsx";

const DISPLAY_DEMO_DISCLAIMER = true;

export default function DemoDisclaimer() {
  return DISPLAY_DEMO_DISCLAIMER && (
      <WarningMessage color={"grey"}>
        <div>
          <Typography variant={"rp_300_14"} color={"black"}>
            Hosted Connect-web demo. Not for customer use. To remove, see{" "}
            <a href={"https://docs.flatpeak.com/guides/integration-test"} target={"_blank"}>
              <Typography variant={"rp_300_14"} color={"black"} decoration={"underline"} component={"span"}>Docs.</Typography>
            </a>.
          </Typography>
        </div>
      </WarningMessage>
  )
}
