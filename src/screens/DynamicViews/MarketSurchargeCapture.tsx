import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler, MouseEventHandler, useRef} from "react";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import BlockHeading from "../../shared/ui/BlockHeading/BlockHeading.tsx";
import InputRate, {InputRateHandle} from "../../shared/ui/InputRate/InputRate.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import FixedSurchargesIcon from "../../shared/ui/icons/FixedSurchargesIcon.tsx";
import PercentageIcon from "../../shared/ui/icons/PercentageIcon.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import {getCurrencySymbol} from "../../shared/lib/util.ts";
import RegionPicker from "../../shared/ui/RegionPicker/RegionPicker.tsx";

// Kept identical to the Anode (main) surcharge screen. Zero-only differences: the fixed fee is entered
// in the major currency unit (Anode uses the minor unit), and the region picker is shown when the
// backend could not detect the tariff zone.
export const MarketSurchargeCapture = () => {
    const {action, proceed} = useConnect<"market_surcharge_capture">();
    const fixedCostInputRef = useRef<InputRateHandle>(null);
    const percentCostInputRef = useRef<InputRateHandle>(null);

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const {
            fixed: {value: fixed},
            percentage: {value: percentage},
            region: regionControl,
        } = event.target as unknown as {[PostalAddressKey: string]: {value: string}};

        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            data: {
                surcharge: {
                    fixed: Number(fixed.trim().replace(",", '.')) || 0,
                    percentage: Number(percentage.trim().replace(",", '.')) || 0
                },
                region: regionControl?.value
            }
        }));
    }

    const handleSkip: MouseEventHandler<HTMLButtonElement> = (event) => {
        const regionControl = event.currentTarget.form?.elements.namedItem("region") as HTMLSelectElement | null;

        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            data: {
                surcharge: {
                    fixed: 0,
                    percentage: 0
                },
                region: regionControl?.value
            }
        }));
    }


    return (
      <Layout
        component={'form'}
        footer={
          <FooterActions variant={'compact'}>
            <ButtonBig label={'Next'} type="submit" />
            <ButtonBig label={'Or skip this step'} type="button" variant={'text'}  onClick={handleSkip} />
          </FooterActions>
        }
        onSubmit={handleSubmit}
        noValidate
      >
        <MainHeading text="Surcharges" />
        <LeadingText>
          <Typography color="black_a40" variant="leading_string">
            Add any extra charges if they are included in your tariff. <br/><br/>
            Import surcharges are added (+).<br/>
            Export surcharges are deducted (−). <br/><br/>
            Fixed fee applied first, then percentage on top.
          </Typography>
        </LeadingText>
        <Box rg={16}>
          <BlockHeading
            text={`Fixed (${getCurrencySymbol(action.data.currency_code)}/kWh)`}
            icon={<FixedSurchargesIcon width={26} height={26} />}
        />
          <InputRate
            ref={fixedCostInputRef}
            name="fixed"
            variant="plain"
            defaultValue={action.data.surcharge.fixed}
            autoFocus={true}
            useDefault={false}
            showUnit={false}
            placeholderText="0.00"
            allowNegative={true}
          />
          <BlockHeading text="Percentage (%/kWh)" icon={<PercentageIcon width={26} height={26} />} />
          <InputRate
            ref={percentCostInputRef}
            name="percentage"
            variant="plain"
            defaultValue={action.data.surcharge.percentage}
            autoFocus={false}
            useDefault={false}
            showUnit={false}
            placeholderText="0.00"
            allowNegative={true}
          />
        </Box>
        {Boolean(action.data.regions?.length) && (
          <Box mt={32}>
            <RegionPicker name={'region'} defaultValue={action.data.region || ''} options={action.data.regions || []} />
          </Box>
        )}
      </Layout>
    )
}
