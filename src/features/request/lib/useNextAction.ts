import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function useNextAction() {
    const navigate = useNavigate();

    const [ready, setReady] = useState(false);
    const [token, setToken] = useState<string | undefined>();
    const [isStart, setIsStart] = useState<boolean>(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const inputToken = queryParams.get('token');
        setIsStart(queryParams.get('start') === "true");
        if (inputToken) {
            setToken(inputToken)
        }
        setReady(true);
    }, [])


    const proceed = useCallback(async <T>(action: Promise<T>): Promise<T> => {
        const response = await action;
        navigate(`/connect?token=${token}`, {
            state: {response}
        });
        return response;
    }, [navigate, token])


    return {
        ready, isStart, token, proceed
    }
}
