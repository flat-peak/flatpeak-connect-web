import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler} from "react";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import BlockHeading from "../../shared/ui/BlockHeading/BlockHeading.tsx";
import InputRate from "../../shared/ui/InputRate/InputRate.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import CoinsIcon from "../../shared/ui/icons/CoinsIcon.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import {getCurrencySymbol} from "../../shared/util.ts";
import RegionPicker from "../../shared/ui/RegionPicker/RegionPicker.tsx";
import DemoDisclaimer from "../../shared/ui/DemoDisclaimer/DemoDisclaimer.tsx";

export const MarketSurchargeCapture = () => {
    const {action, proceed} = useConnect<"market_surcharge_capture">();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const {
            cost: {value: cost},
            region: regionControl,
        } = event.target as unknown as {[PostalAddressKey: string]: {value: string}};

        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            data: {
                surcharge: {
                    fixed: Number(cost)
                },
                region: regionControl?.value
            }
        }));
    }

    return (
        <Layout component={"form"} footer={<FooterActions><ButtonBig label={"Next"} type="submit"/><DemoDisclaimer/></FooterActions>} onSubmit={handleSubmit} noValidate>
            <MainHeading text="Surcharge Rate" />
            <LeadingText>
                <Typography color="black_a40" variant="leading_string">
                    Does your provider add an extra fee, on top of the market price, for
                    every kilowatt-hour (kWh) you use?
                </Typography>
            </LeadingText>
            <Box rg={16}>
                <BlockHeading text="Surcharge fee" icon={<CoinsIcon width={24} height={32}/>}/>
                <InputRate name="cost" defaultValue={action.data.surcharge.fixed} autoFocus={true} currency={getCurrencySymbol(action.data.currency_code)}/>
                <Typography color="black_a40" variant="basic_string">
                    * Leave unchanged if you don’t know
                </Typography>
            </Box>
            {
                Boolean(action.data.regions?.length) && (
                    <Box mt={48}>
                        <RegionPicker name={"region"} defaultValue={action.data.region || ''} options={action.data.regions || []} />
                    </Box>
                )
            }

        </Layout>
    )
}
