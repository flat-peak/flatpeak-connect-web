import {useNavigate} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Layout from "../shared/ui/Layout/Layout.tsx";
import FooterActions from "../shared/ui/FooterActions/FooterActions.tsx";
import ButtonBig from "../shared/ui/ButtonBig/ButtonBig.tsx";
import MainHeading from "../shared/ui/MainHeading/MainHeading.tsx";
import InputText from "../shared/ui/InputText/InputText.tsx";
import Logotypes from "../shared/ui/Logotypes/Logotypes.tsx";
import Box from "../shared/ui/Box/Box.tsx";
import {useTheme} from "../features/theme/ThemeProvider.tsx";
import LogoPng from "/src/assets/images/flatpeak-logo.png";

export const TryCallback = () => {
    const navigate = useNavigate();

    const {setTheme} = useTheme();
    useEffect(() => {
        setTheme("light")
    }, []);

    return (
        <Fragment>
            <Box ph={24} pt={12}>
                <Logotypes src={LogoPng} title={'FlatPeak'} size={"big"} />
            </Box>
            <Layout component={"form"} footer={<FooterActions><ButtonBig label={"Try again"} type="button" onClick={() => navigate("/try")}/></FooterActions>} noValidate>
                <MainHeading text="Result of the connect flow" />

                <Box rg={12}>
                    <InputText
                        secondaryText="Session"
                        primaryText="Session"
                        id="Session"
                        name="Session"
                        readOnly={true}
                    />

                    <InputText
                        secondaryText="Product"
                        primaryText="Product"
                        id="Product"
                        name="Product"
                      //  defaultValue={product.id}
                        readOnly={true}
                    />

                    <InputText
                        secondaryText="Customer"
                        primaryText="Customer"
                        id="Customer"
                        name="Customer"
                        //defaultValue={customer.id}
                        readOnly={true}
                    />
                </Box>
            </Layout>
        </Fragment>
    )
}
