import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler, MouseEventHandler} from "react";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import TariffBadges from "../../shared/ui/TariffBadges/TariffBadges.tsx";
import FixedRatesummary from "../../shared/ui/FixedRatesummary/FixedRatesummary.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import TariffDetails from "../../shared/ui/TariffBadges/TariffDetails.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import {getCurrencySymbol} from "../../shared/util.ts";
import WarningMessage from "../../shared/ui/WarningMessage/WarningMessage.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import DemoDisclaimer from "../../shared/ui/DemoDisclaimer/DemoDisclaimer.tsx";

export const SummaryFixedConfirm = () => {
    const { action, proceed} = useConnect<'summary_fixed_confirm'>();

    const {tariff, cost} = action.data;
    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            action: "SAVE"
        }));
    }

    const handleEdit = () => {
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            action: "EDIT"
        }));
    }
    const handleDisconnect = () => {
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            action: "DISCONNECT"
        }));
    }

    const handleReconnect:MouseEventHandler = (event) => {
        event.preventDefault();
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            action: "RECONNECT"
        }));
    }

    return (
        <Layout component={"form"} onSubmit={handleSubmit} noValidate
                footer={(
                    <FooterActions variant={"secondary"}>
                        <ButtonBig label={"Edit tariff"} type="button" variant={'link'} size={"small"} onClick={handleEdit}/>
                        <ButtonBig label={"Save"} type="submit" size={"small"}/>
                    </FooterActions>
                )}>
            <MainHeading text="Tariff summary" />
            {tariff.reconnect_required && (
                <WarningMessage>
                    <Typography variant={"rp_300_14"} color={"red"}>
                        Unable to connect to your online account. Tariff is outdated.{" "}
                        <a href={"#"} onClick={handleReconnect}>
                            <Typography variant={"rp_300_14"} color={"red"} decoration={"underline"} component={"span"}>Reconnect</Typography>
                        </a>.
                    </Typography>
                </WarningMessage>
            )}
            <TariffBadges
                contract_type={action.direction}
                structure_type={'FIXEDRATE'}
            />
            <Box mt={16} rg={24} d={"column"} f={1}>
                <TariffDetails name={tariff.name} endDate={tariff.contract_end_date}/>
                <FixedRatesummary currency={getCurrencySymbol(action.data.currency_code)} cost={cost} />
                <ButtonBig label={"Change Provider or Disconnect tariff"} variant="critical" type={"button"} onClick={handleDisconnect} />
                <DemoDisclaimer/>
            </Box>
        </Layout>
    )
}
