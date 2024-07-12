import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler, useRef} from "react";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import BlockHeading from "../../shared/ui/BlockHeading/BlockHeading.tsx";
import InputRate, {InputRateHandle} from "../../shared/ui/InputRate/InputRate.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import CoinsIcon from "../../shared/ui/icons/CoinsIcon.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import {getCurrencySymbol} from "../../shared/lib/util.ts";
import RegionPicker from "../../shared/ui/RegionPicker/RegionPicker.tsx";

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

    const handleReset = () => {
        if (fixedCostInputRef.current) {
            fixedCostInputRef.current.reset()
        }
        if (percentCostInputRef.current) {
            percentCostInputRef.current.reset()
        }
    }

    return (
      <Layout
        component={'form'}
        footer={
          <FooterActions>
            <ButtonBig label={'Next'} type="submit" />
          </FooterActions>
        }
        onSubmit={handleSubmit}
        noValidate
      >
        <MainHeading text="Additional Costs & Fees" />
        <LeadingText>
          <Typography color="black_a40" variant="leading_string">
            If your electricity cost includes additional charges or fees from your provider, such as a fee on top of the market rate your tariff is based on, please add them here.
          </Typography>
        </LeadingText>
        <Box rg={16} ai={'center'}>
          <BlockHeading text="Fee per kWh incl. VAT" icon={<CoinsIcon width={24} height={32} />} />
          <InputRate ref={fixedCostInputRef} name="fixed" defaultValue={action.data.surcharge.fixed} autoFocus={true} prefix={getCurrencySymbol(action.data.currency_code)} useDefault={false} />
          <InputRate ref={percentCostInputRef} name="percentage" defaultValue={action.data.surcharge.percentage} autoFocus={false} suffix={"%"} useDefault={false} layoutRightOffset={44} />
          <ButtonBig label={'Reset all additional costs'} type="button" variant={'link'} size={'small'} onClick={handleReset} />
        </Box>
        {Boolean(action.data.regions?.length) && (
          <Box mt={32}>
            <RegionPicker name={'region'} defaultValue={action.data.region || ''} options={action.data.regions || []} />
          </Box>
        )}
      </Layout>
    )
}
