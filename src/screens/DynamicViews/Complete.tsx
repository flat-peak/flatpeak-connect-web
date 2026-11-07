import {FormEventHandler, useCallback, useEffect} from "react";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import WarningIcon from "../../shared/ui/icons/WarningIcon.tsx";

export const CompleteView = () => {

    const redirect = useCallback(() => {
        location.href =  `/`;
    }, []);


    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        redirect();
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            redirect()
        }, 30000);
        return () => {
            clearTimeout(timer);
        }
    }, [redirect]);


    return (
        <Layout component={"form"}
                footer={<FooterActions><ButtonBig label={"Next"} type="submit"></ButtonBig></FooterActions>}
                onSubmit={handleSubmit} noValidate>
            <MainHeading text="Complete" />
            <LeadingText>
                <Typography color="black_a40" variant="leading_string">
                    Now, you will be redirected to <a href="/"> original callback url</a>.<br/>
                    If it doesn't happen automatically, please click on the "Next" button.
                </Typography>
            </LeadingText>

            <Box pt={88} ai={"center"}>
                <WarningIcon color={'var(--color-fill-black)'}/>
            </Box>
        </Layout>
    )
}
