import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler} from "react";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import InfoMessage from "../../shared/ui/InfoMessage/InfoMessage.tsx";
import WarningIcon from "../../shared/ui/icons/WarningIcon.tsx";

export const SummaryTaiffFailed = () => {
    const { action, proceed} = useConnect<'summary_tariff_failed'>();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            action: "RECONNECT"
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
                        <ButtonBig label={"Disconnect tariff"} type="button" variant={'link'} size={"small"} onClick={handleDisconnect}/>
                        <ButtonBig label={"Reconnect"} type="submit" size={"small"}/>
                    </FooterActions>
                )}>
            <MainHeading text="Reconnect your tariff"  />

            <Box mt={16} rg={24} pb={30} d={"column"} f={1} ai={"center"} jc={"space-between"}>
                <InfoMessage severity={"error"}>
                    <Box pb={30} jc={"center"} d={"row"}><WarningIcon color={'var(--color-fill-red)'} width={40} height={40} opacity={1} /></Box>
                    <Typography color="red" variant="button__forms24_book">
                        We are unable to read your tariff from your provider account or it is out of date.
                    </Typography>
                </InfoMessage>
                <Box mw={300}>
                    <Typography color="black_a40" variant="leading_string" align={"center"}>
                        This could happen if you have switch your energy provider, your contract renewal is up
                        or if your provider has changed their IT systems.
                    </Typography>
                </Box>
            </Box>
        </Layout>
    )
}
