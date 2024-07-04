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
import Select from "../../shared/ui/Select/Select.tsx";
import {COUNTRIES} from "../../shared/lib/countries.ts";

export const PostalAddressCapture = () => {
    const {proceed, action} = useConnect<"postal_address_capture">();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const {
            address_line1: {value: address_line1},
            city: {value: city},
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
                    city,
                    country_code,
                    post_code,
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
                <Select secondaryText="Country"
                        id="country_code"
                        name="country_code"
                        autoComplete="country_code"
                        defaultValue={action.data.postal_address.country_code} options={COUNTRIES}/>
                <InputText
                    secondaryText="Street address"
                    id="address_line1"
                    name="address_line1"
                    autoComplete="address_line1"
                    defaultValue={action.data.postal_address.address_line1}
                    autoFocus
                />
                <InputText
                    secondaryText="City"
                    id="city"
                    name="city"
                    autoComplete="city"
                    defaultValue={action.data.postal_address.city}
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
