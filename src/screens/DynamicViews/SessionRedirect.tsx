import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {useCallback, useEffect} from "react";
import Box from "../../shared/ui/Box/Box.tsx";
import WarningIcon from "../../shared/ui/icons/WarningIcon.tsx";

export const SessionRedirect = () => {
    const {action} = useConnect<"session_redirect">();
    const {redirect_url} = action.data;

    const redirect = useCallback(() => {
        location.href = `${redirect_url}?token=${action.session_id}`;
    }, [action.session_id, redirect_url]);

    useEffect(() => {
        const timer = setTimeout(() => {
            redirect()
        }, 3000);
        return () => {
            clearTimeout(timer);
        }
    }, [redirect]);


    return (
        <Layout component={"main"} footer={<FooterActions><ButtonBig label={"Next"} type="submit" onClick={redirect}/></FooterActions>}>
            <MainHeading text="Redirect"/>
            <LeadingText>
                <Typography color="black_a40" variant="leading_string">
                    Now, you will be redirected to external integration app.
                    If it doesn't happen automatically, please click on the "Next" button.
                </Typography>
            </LeadingText>
            <Box pt={88} ai={"center"}>
                <WarningIcon color={'var(--color-fill-black)'}/>
            </Box>
        </Layout>
    )
}
