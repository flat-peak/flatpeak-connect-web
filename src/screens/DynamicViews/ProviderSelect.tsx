import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import SupplierBlock from "../../shared/ui/SupplierBlock/SupplierBlock.tsx";
import Search from "../../shared/ui/Search/Search.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import TouchableOpacity from "../../shared/TouchahbleOpacity/TouchableOpacity.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {useEffect, useState} from "react";
import {submitAction} from "../../features/connect/lib/service.ts";
import {ProviderSummary} from "../../features/connect/lib/types.ts";
import AddressCheckBlock from "../../shared/ui/AddressCheckBlock/AddressCheckBlock.tsx";

export const ProviderSelect = () => {
    const {action, proceed} = useConnect<'provider_select'>();
    const {providers, postal_address} = action.data;
    const [keyword, setKeyword] = useState("");
    const [matchedProviders, setMatchedProviders] = useState(providers);

    useEffect(() => {
        setMatchedProviders(providers.filter((p) => p.display_name.toLowerCase().includes(keyword.toLowerCase())))
    }, [providers, keyword])

    const onSelectProvider = (provider: Pick<ProviderSummary, 'id'>) => {
        proceed(submitAction({
            route: action.route,
            type: "submit",
            session_id: action.session_id,
            data: {
                provider: {
                    id: provider.id as string
                }
            }
        }));
    }

    const onMissingProvider = () => {
        proceed(submitAction({
            route: action.route,
            type: "submit",
            session_id: action.session_id,
            action: "PROVIDER_MISSING"
        }));
    }

    const onChangeAddress = () => {
        proceed(submitAction({
            route: action.route,
            type: "submit",
            session_id: action.session_id,
            action: "ADDRESS_CHANGE"
        }));
    }


    return (
        <Layout component={"main"} footer={<FooterActions><ButtonBig label={"My provider is not listed"} variant={'secondary'}  onClick={onMissingProvider}/></FooterActions>}>
            <MainHeading text="Select your provider" />
            <Search
                onInput={(e) => setKeyword((e.target as HTMLInputElement).value)}
                value={keyword}
                autoCapitalize="none"
                autoCorrect={"off"}
            />
            {(action.actions || []).includes("ADDRESS_CHANGE") && postal_address && (
                <Box mt={24}>
                    <AddressCheckBlock
                        address={Object.values(postal_address).filter(Boolean).join(', ')}
                        onClick={onChangeAddress}
                    />
                </Box>
            )}
            <Box mt={24}>
                {matchedProviders.map((provider) => (
                    <TouchableOpacity key={provider.id} onClick={() => onSelectProvider(provider)}>
                        <SupplierBlock
                            src={provider.logo_url}
                            title={provider.display_name}
                        />
                    </TouchableOpacity>
                ))}
            </Box>
        </Layout>
    );
}
