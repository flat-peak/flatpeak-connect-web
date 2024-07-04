import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler} from "react";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import InputText from "../../shared/ui/InputText/InputText.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import DemoDisclaimer from "../../shared/ui/DemoDisclaimer/DemoDisclaimer.tsx";

export const PostalAddressCapture = () => {
    const {proceed, action} = useConnect<"postal_address_capture">();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const {
            address_line1: {value: address_line1},
            address_line2: {value: address_line2},
            city: {value: city},
            state: {value: state},
            country_code: {value: country_code},
            post_code: {value: post_code},
        } = event.target as unknown as { [key: string]: { value: string } };

        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            data: {
                postal_address: {
                    address_line1,
                    address_line2,
                    city,
                    country_code,
                    post_code,
                    state
                }
            }
        }))
    }


    return (
        <Layout component={"form"} footer={<FooterActions><ButtonBig label={"Next"} type="submit"/></FooterActions>} onSubmit={handleSubmit} noValidate>
            <MainHeading text="Add your address"/>

            <LeadingText>
                <Typography component={"p"} color="black_a40" variant="leading_string">
                    Please enter your address. <br/>We don’t have enough information
                    about your location to list electricity providers in your area.
                </Typography>
            </LeadingText>

            <Box rg={12}>
                <InputText
                    secondaryText="Street address line 1"
                    id="address_line1"
                    name="address_line1"
                    autoComplete="address_line1"
                    defaultValue={action.data.postal_address.address_line1}
                    autoFocus
                />
                <InputText
                    secondaryText="Street address line 2"
                    id="address_line2"
                    name="address_line2"
                    autoComplete="address_line2"
                    defaultValue={action.data.postal_address.address_line2}
                />
                <InputText
                    secondaryText="City"
                    id="city"
                    name="city"
                    autoComplete="city"
                    defaultValue={action.data.postal_address.city}
                />
                <InputText
                    secondaryText="State"
                    id="state"
                    name="state"
                    primaryText=""
                    defaultValue={action.data.postal_address.state}
                />
                <InputText
                    secondaryText="Country"
                    id="country_code"
                    name="country_code"
                    autoComplete="country_code"
                    defaultValue={action.data.postal_address.country_code}
                />

                <InputText
                    secondaryText="Postcode / Zip"
                    id="post_code"
                    name="post_code"
                    autoComplete="post_code"
                    defaultValue={action.data.postal_address.post_code}
                />

            </Box>
        </Layout>
    )
}
