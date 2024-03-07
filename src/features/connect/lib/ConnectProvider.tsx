import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {useNextAction} from "../../request/lib/useNextAction.ts";
import {CommonRenderRoute, RenderRouteKey} from "./types.ts";


type ConnectContextType<T extends RenderRouteKey = RenderRouteKey> = {
    action?: CommonRenderRoute<T>;
    proceed: <K>(action: Promise<K>) => Promise<K>
}

const ConnectContext = createContext<ConnectContextType>({
    proceed: (r) => Promise.resolve(r),
});

export const useConnect = <T extends RenderRouteKey = RenderRouteKey>() => useContext(ConnectContext) as Required<ConnectContextType<T>>;

export type ConnectProviderProps = {
    response?: CommonRenderRoute
}
export const ConnectProvider = (props: PropsWithChildren<ConnectProviderProps>) => {
    const { proceed} = useNextAction();
    const {children, response} = props;
    const [action, setAction] = useState<CommonRenderRoute>();

    useEffect(() => {
        if (response) {
            setAction(response);
        }
    }, [response])

    return (
        <ConnectContext.Provider
            value={{
                action,
                proceed
            }}
        >
            {children}
        </ConnectContext.Provider>
    );
}
