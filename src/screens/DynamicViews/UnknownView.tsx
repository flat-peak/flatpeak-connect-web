import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {Exception} from "../CommonViews/Exception.tsx";
import {Fragment} from "react";
import Typography from "../../shared/ui/Typography/Typography.tsx";

export const UnknownView = () => {
    const {action} = useConnect();
    return <Exception token={action.connect_token} message={
        <Fragment>
            Unknown route:{" "}
            <Typography decoration={"underline"}>{action?.route}</Typography>
        </Fragment>
    } />
}
