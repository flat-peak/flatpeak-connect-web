import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler, MouseEventHandler} from "react";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import InfoMessage from "../../shared/ui/InfoMessage/InfoMessage.tsx";
import ClockAltIcon from "../../shared/ui/icons/ClockAltIcon.tsx";

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
    const handleDismissDirect:MouseEventHandler = (event) => {
        event.preventDefault();
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            action: "DISMISS_DIRECT"
        }));
    }

    return (
        <Layout component={"form"} onSubmit={handleSubmit} noValidate
                footer={(
                    <FooterActions variant={"secondary"}>
                        <ButtonBig label={"Cancel"} type="button" variant={'link'} size={"small"} onClick={handleDisconnect}/>
                        <ButtonBig label={"OK"} type="submit" size={"small"}/>
                    </FooterActions>
                )}>
            <MainHeading text="Connecting your tariff"  />

            <Box mt={16} rg={24} pb={30} d={"column"} f={1} ai={"center"} jc={"space-between"}>
                <InfoMessage>
                    <Box pb={30} jc={"center"} d={"row"}><ClockAltIcon /></Box>
                    <Typography color="black" variant="button__forms24_book">
                        Sometimes it takes a little longer to retrieve the tariff.
                        <br/>
                        <br/>
                        Click “OK” and we will automatically notify you when it’s done.
                    </Typography>
                </InfoMessage>
                <Box mw={300}>
                    <Typography color="black_a40" variant="leading_string" align={"center"} >
                        Don’t want to wait? We don’t recommend it but you can also{" "}<br/>
                        <a href={"#"} onClick={handleDismissDirect}><Typography variant={"leading_string"} decoration={"underline"} component={"span"}>set your tariff manually</Typography></a>.
                    </Typography>
                </Box>
            </Box>
        </Layout>
    )
}
