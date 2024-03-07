import {useEffect} from "react";
import {useTheme} from "../../features/theme/ThemeProvider.tsx";
import {Exception} from "../CommonViews/Exception.tsx";
import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {RenderError} from "../../features/connect/lib/types.ts";

export const ErrorRoute = () => {
    const {action} = useConnect<"error">();

    const {setTheme} = useTheme();

    useEffect(() => {
        setTheme("failure")
    }, []);
    return (
        <Exception message={(action as unknown as RenderError).error_message}/>
    )
}
