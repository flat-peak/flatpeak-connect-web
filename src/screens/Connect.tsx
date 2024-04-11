import {DynamicViewRouter} from "../features/connect/ui/DynamicViewRouter.tsx";
import {PostalAddressCapture} from "./DynamicViews/PostalAddressCapture.tsx";
import {UnknownView} from "./DynamicViews/UnknownView.tsx";
import {ConnectProvider} from "../features/connect/lib/ConnectProvider.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {ProviderSelect} from "./DynamicViews/ProviderSelect.tsx";
import {CaptureTariffStructure} from "./DynamicViews/CaptureTariffStructure.tsx";
import {RateFixedCapture} from "./DynamicViews/RateFixedCapture.tsx";
import {TariffNameCapture} from "./DynamicViews/TariffNameCapture.tsx";
import {ContractTermCapture} from "./DynamicViews/ContractTermCapture.tsx";
import {SummaryTouConfirm} from "./DynamicViews/SummaryTouConfirm.tsx";
import {TariffSelect} from "./DynamicViews/TariffSelect.tsx";
import NavHeader from "../shared/ui/NavHeader/NavHeader.tsx";
import {SummaryFixedConfirm} from "./DynamicViews/SummaryFixedConfirm.tsx";
import {useTheme} from "../features/theme/ThemeProvider.tsx";
import {useEffect} from "react";
import {Exception} from "./CommonViews/Exception.tsx";
import {RateTodCapture} from "./DynamicViews/RateTodCapture.tsx";
import {MarketSurchargeCapture} from "./DynamicViews/MarketSurchargeCapture.tsx";
import {ProviderNameCapture} from "./DynamicViews/ProviderNameCapture.tsx";
import {CompleteView} from "./DynamicViews/Complete.tsx";
import {ActionException} from "../features/connect/lib/types.ts";
import {useNextAction} from "../features/request/lib/useNextAction.ts";
import {ErrorRoute} from "./DynamicViews/ErrorRoute.tsx";
import {submitAction} from "../features/connect/lib/service.ts";

export const Connect = () => {
    const {state} = useLocation();
    const {response} =  state || {};
    const {setTheme} = useTheme();
    const navigate = useNavigate();
    const {token, ready: tokenParsed, proceed} = useNextAction();
    const maybeException =  (response as ActionException);
    let error = '';
    let isFailed = false;
    if (response) {
        isFailed = maybeException.object === "error";
        if (maybeException.object === "error") {
            error = (maybeException as ActionException).message;
        }
    }

    useEffect(() => {
        if (!response && tokenParsed) {
            proceed(
                submitAction({
                    route: "session_restore",
                    connect_token: token,
                    type: "submit",
                })
            )
        }
    }, [navigate, response, token, tokenParsed])

    useEffect(() => {
        setTheme(isFailed ? "failure" : 'light')
    }, [isFailed])


    if (!response) {
        return null;
    }

    if (response.route === "session_redirect") {
        location.replace(response.data.redirect_uri)
        return null;
    }

    if (response.route === "session_complete") {
        location.replace(response.data.callback_uri)
        return null;
    }

    return (
        <ConnectProvider response={response}>
            <NavHeader />
            {error ? (
                <Exception message={error}/>)
            : (
                <DynamicViewRouter
                    unknown={UnknownView}
                    error={ErrorRoute}
                    postal_address_capture={PostalAddressCapture}
                    provider_select={ProviderSelect}
                    provider_name_capture={ProviderNameCapture}
                    tariff_select={TariffSelect}
                    contract_term_capture={ContractTermCapture}
                    tariff_name_capture={TariffNameCapture}
                    tariff_structure_select={CaptureTariffStructure}
                    rate_fixed_capture={RateFixedCapture}
                    rate_tod_capture={RateTodCapture}
                    market_surcharge_capture={MarketSurchargeCapture}
                    summary_fixed_confirm={SummaryFixedConfirm}
                    summary_tou_confirm={SummaryTouConfirm}
                    complete_tariff={CompleteView} />
                )}
        </ConnectProvider>
    )
}
