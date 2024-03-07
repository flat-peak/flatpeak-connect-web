import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {Exception} from "../CommonViews/Exception.tsx";
import {Fragment} from "react";
import Typography from "../../shared/ui/Typography/Typography.tsx";

export const UnknownView = () => {
    const {action} = useConnect();
    return <Exception message={
        <Fragment>
            Unknown route:{" "}
            <Typography decoration={"underline"}>{action?.route}</Typography>
        </Fragment>
    } />
}
