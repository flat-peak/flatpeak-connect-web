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
import ForkIcon from "../../shared/ui/icons/ForkIcon.tsx";
import DemoDisclaimer from "../../shared/ui/DemoDisclaimer/DemoDisclaimer.tsx";

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
            <MainHeading text="Tariff summary"  />

            <Box mt={16} rg={24} d={"column"} f={1}>
                <InfoMessage>
                    <Box pb={24} jc={"center"} d={"row"}><ForkIcon /></Box>
                    <Typography color="black" variant="button__forms28_book">
                        Occasionally, it takes a little longer to retrieve a tariff.
                        <br/>
                        <br/>
                        Click “OK” and we will automatically notify you when it's done.
                        <br/>
                        <br/>
                        Don’t want to wait? You can also {" "}
                        <a href={"#"} onClick={handleDismissDirect}>set your tariff manually.</a>
                    </Typography>
                </InfoMessage>
                <DemoDisclaimer/>
            </Box>
        </Layout>
    )
}
