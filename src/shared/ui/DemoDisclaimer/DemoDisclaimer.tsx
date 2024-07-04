import WarningMessage from "../WarningMessage/WarningMessage.tsx";
import Typography from "../Typography/Typography.tsx";

const DISPLAY_DEMO_DISCLAIMER = true;

export default function DemoDisclaimer() {
  return (
    DISPLAY_DEMO_DISCLAIMER && (
      <WarningMessage color={'grey'}>
        <div>
          <Typography variant={'rp_300_14'} color={'black'}>
            Demo, not for live use.{' '}
            <a href={'https://docs.flatpeak.com/guides/integration-test'} target={'_blank'}>
              <Typography variant={'rp_300_14'} color={'black'} decoration={'underline'} component={'span'}>Docs to remove</Typography>
            </a>
            .
          </Typography>
        </div>
      </WarningMessage>
    )
  )
}
