import Typography from "../Typography/Typography.tsx";
import styles from  "./DemoDisclaimer.module.css";

const DISPLAY_DEMO_DISCLAIMER = false;

export default function DemoDisclaimer() {
  return (
    DISPLAY_DEMO_DISCLAIMER && (
      <div className={styles.host}>
        <Typography variant={'rp_300_14'}>
          This Connect-web demo is not suitable for production use. Go to{' '}
          <a href={'https://docs.flatpeak.com/guides/connect-web-tariff#removing-demo-warning-message'} target={'_blank'}>
            <Typography variant={'rp_300_14'} decoration={'underline'} component={'span'}>
              connect guides
            </Typography>
          </a>{' '}
          for more info.
        </Typography>
      </div>
    )
  )
}
