import {useLocation} from "react-router-dom";
import {Exception} from "./CommonViews/Exception.tsx";
import NavHeader from "../shared/ui/NavHeader/NavHeader.tsx";
import {ConnectProvider} from "../features/connect/lib/ConnectProvider.tsx";
import {useTheme} from "../features/theme/ThemeProvider.tsx";
import {useEffect} from "react";

export const FailureView = () => {
    const {state: {message}} = useLocation();
    const {setTheme} = useTheme();

    useEffect(() => {
        setTheme("failure")
    }, []);
    return (
        <ConnectProvider>
            <NavHeader showRightButton={false}/>
            <Exception message={message}/>
        </ConnectProvider>
    )
}
