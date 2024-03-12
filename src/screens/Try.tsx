import {useNavigate} from "react-router-dom";
import {FormEventHandler, Fragment, useEffect} from "react";
import Layout from "../shared/ui/Layout/Layout.tsx";
import FooterActions from "../shared/ui/FooterActions/FooterActions.tsx";
import ButtonBig from "../shared/ui/ButtonBig/ButtonBig.tsx";
import MainHeading from "../shared/ui/MainHeading/MainHeading.tsx";
import {LeadingText} from "../shared/ui/LeadingText/LeadingText.tsx";
import Typography from "../shared/ui/Typography/Typography.tsx";
import InputText from "../shared/ui/InputText/InputText.tsx";
import Logotypes from "../shared/ui/Logotypes/Logotypes.tsx";
import Box from "../shared/ui/Box/Box.tsx";
import {useTheme} from "../features/theme/ThemeProvider.tsx";
import LogoPng from "/src/assets/images/flatpeak-logo.png";


export const Try = () => {
    const navigate = useNavigate();
    const {setTheme} = useTheme();
    useEffect(() => {
        setTheme("light")
    }, []);
    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const {
            token: {value: token},
        } = event.target as unknown as {[key: string]: {value: string}};

        navigate(`/?fp_cot=${token}&start=true`);
    }

    return (
        <Fragment>
            <Box ph={24} pt={12}>
                <Logotypes src={LogoPng} title={'FlatPeak'} size={"big"} />
            </Box>
            <Layout component={"form"} footer={<FooterActions><ButtonBig label={"Next"} type="submit"/></FooterActions>} onSubmit={handleSubmit} noValidate>
                <MainHeading text="Try Connect experience" />
                <LeadingText>
                    <Typography color="black_a40" variant="leading_string">
                        Please input a connect_token. If you don't have one,
                        <a href={"https://docs.flatpeak.energy/docs/getting-started/integration-test"} target="blank"> follow this guide</a>.
                    </Typography>
                </LeadingText>
                <InputText
                    secondaryText="Connect Token"
                    primaryText="Connect Token"
                    id="token"
                    name="token"
                    defaultValue={""}
                    autoFocus
                />
            </Layout>
        </Fragment>
    )
}
