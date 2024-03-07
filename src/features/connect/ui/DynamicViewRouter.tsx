import {useConnect} from "../lib/ConnectProvider.tsx";
import {ComponentType, useEffect} from "react";
import {useTheme} from "../../theme/ThemeProvider.tsx";
import {RenderRouteKey} from "../lib/types.ts";

export type DynamicViewRouterProps = Record<RenderRouteKey | "unknown" | "error", ComponentType>

export const DynamicViewRouter = (props: DynamicViewRouterProps) => {
    const {action} = useConnect();
    const {setTheme} = useTheme();

    const routeName =  action?.route || 'unknown';

    useEffect(() => {
        if ((routeName as RenderRouteKey | "unknown") === 'unknown' || !props.hasOwnProperty(routeName)) {
            setTheme('failure');
        } else {
            setTheme('light');
        }
    }, [routeName])
    const Tag = props.hasOwnProperty(routeName) ? props[routeName] : props.unknown;
    return <Tag />;
}
