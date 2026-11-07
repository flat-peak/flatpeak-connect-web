import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler, useState} from "react";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import InputText from "../../shared/ui/InputText/InputText.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import {ActionException, CommonRenderRoute, RenderError} from "../../features/connect/lib/types.ts";
import Select from "../../shared/ui/Select/Select.tsx";
import {COUNTRIES} from "../../shared/lib/countries.ts";
import {
    COUNTRIES_REQUIRING_STATE,
    COUNTRIES_WITH_STATES,
    STATES_BY_COUNTRY,
    findStateCode,
} from "../../shared/lib/states.ts";

const STATE_REQUIRED_MESSAGE = "Please select your state";

// The API rejects a US address with a missing or invalid state with an error that
// names the `state` field (ENR-3058). Surface that next to the field instead of
// failing the whole session.
const getStateErrorMessage = (response: unknown): string | undefined => {
    const exception = response as Partial<ActionException>;
    if (exception?.object === "error") {
        const text = `${exception.code ?? ""} ${exception.message ?? ""}`;
        return /\bstate\b/i.test(text) ? exception.message : undefined;
    }
    const errorRoute = response as Partial<RenderError>;
    if (errorRoute?.route === "error") {
        const text = `${errorRoute.error_code ?? ""} ${errorRoute.error_message ?? ""}`;
        return /\bstate\b/i.test(text) ? errorRoute.error_message : undefined;
    }
    return undefined;
};

export const PostalAddressCapture = () => {
    const {proceed, action} = useConnect<"postal_address_capture">();

    const [selectedCountry, setSelectedCountry] = useState(
        action.data.postal_address.country_code ?? ""
    );
    const [stateError, setStateError] = useState<string | undefined>();
    const needsStateDropdown = COUNTRIES_WITH_STATES.includes(selectedCountry);
    const isStateRequired = COUNTRIES_REQUIRING_STATE.includes(selectedCountry);

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const form = event.target as unknown as {
            address_line1: {value: string};
            city: {value: string};
            country_code: {value: string};
            post_code: {value: string};
            state?: {value: string};
        };
        const {
            address_line1: {value: address_line1},
            city: {value: city},
            country_code: {value: country_code},
            post_code: {value: post_code},
        } = form;

        const stateTrimmed = (form.state?.value ?? "").trim();

        if (isStateRequired && !stateTrimmed) {
            setStateError(STATE_REQUIRED_MESSAGE);
            (form.state as unknown as HTMLSelectElement | undefined)?.focus();
            return;
        }
        setStateError(undefined);

        const request: Promise<CommonRenderRoute> = submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            data: {
                postal_address: {
                    address_line1,
                    city,
                    country_code,
                    post_code,
                    ...(stateTrimmed ? {state: stateTrimmed} : {}),
                }
            }
        });

        request.then(
            (response) => {
                const message = getStateErrorMessage(response);
                if (message) {
                    setStateError(message);
                } else {
                    proceed(request);
                }
            },
            // Network failures keep the existing full-screen error handling in `proceed`.
            () => proceed(request)
        );
    }


    return (
        <Layout component={"form"} footer={<FooterActions><ButtonBig label={"Next"} type="submit"/></FooterActions>} onSubmit={handleSubmit} noValidate>
            <MainHeading text="Add your address"/>

            <LeadingText>
                <Typography component={"p"} color="black_a40" variant="leading_string">
                    Please enter your address. <br/>We don't have enough information
                    about your location to list electricity providers in your area.
                </Typography>
            </LeadingText>

            <Box rg={12}>
                <Select secondaryText="Country"
                        id="country_code"
                        name="country_code"
                        autoComplete="country_code"
                        defaultValue={action.data.postal_address.country_code}
                        options={COUNTRIES}
                        onChange={(event) => {
                            setSelectedCountry(event.target.value);
                            setStateError(undefined);
                        }}/>
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
                {needsStateDropdown && (
                    <Select
                        key={selectedCountry}
                        secondaryText="State"
                        id="state"
                        name="state"
                        autoComplete="address-level1"
                        allowEmpty={!isStateRequired}
                        placeholder="Select your state"
                        required={isStateRequired}
                        defaultValue={findStateCode(selectedCountry, action.data.postal_address.state)}
                        options={STATES_BY_COUNTRY[selectedCountry] ?? []}
                        error={stateError}
                        onChange={() => setStateError(undefined)}
                    />
                )}
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
