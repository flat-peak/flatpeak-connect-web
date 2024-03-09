import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {submitAction} from "../features/connect/lib/service.ts";
import {useTheme} from "../features/theme/ThemeProvider.tsx";
import {useNextAction} from "../features/request/lib/useNextAction.ts";

export const Home = () => {
    const navigate = useNavigate();

    const {token, isStart, ready, proceed} = useNextAction();
    const {setTheme} = useTheme();
    useEffect(() => {
        setTheme("light")
    }, []);


    useEffect(() => {
        if (!ready) {
            return;
        }

        if (!token) {
            navigate('/try');
            return;
        }

        proceed(
            submitAction({
                route: isStart ? 'start_tariff' : "session_restore",
                connect_token: token,
                type: "submit",
            })
        )

    }, [token, ready, proceed, navigate]);

    return null;
}
