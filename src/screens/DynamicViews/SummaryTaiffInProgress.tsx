import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler} from "react";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import InfoMessage from "../../shared/ui/InfoMessage/InfoMessage.tsx";

export const SummaryTaiffInProgress = () => {
    const { action, proceed} = useConnect<'summary_tariff_inprogress'>();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            action: "SAVE"
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

    return (
        <Layout component={"form"} onSubmit={handleSubmit} noValidate
                footer={(
                    <FooterActions variant={"secondary"}>
                        <ButtonBig label={"Cancel"} type="button" variant={'link'} size={"small"} onClick={handleDisconnect}/>
                        <ButtonBig label={"Next"} type="submit" size={"small"}/>
                    </FooterActions>
                )}>
            <MainHeading text="Tariff summary"  />
            <LeadingText>
                <Typography color="black_a40" variant="leading_string">
                    Connection in progress
                </Typography>
            </LeadingText>

            <Box mt={16} rg={24} d={"column"} f={1}>
                <InfoMessage>
                    <Typography color="black" variant="button__forms32_book">
                        We are connecting your tariff. This process shall take no longer than 24 hours to complete.
                    </Typography>
                    <br/>
                    <br/>
                    <Typography color="black" variant="button__forms32_book">
                        Check back to explore your tariff summary.
                    </Typography>
                </InfoMessage>
            </Box>
        </Layout>
    )
}
