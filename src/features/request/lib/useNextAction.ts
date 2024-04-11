import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

type NextActionProps = {
    replace?: boolean
}
export function useNextAction(props: NextActionProps = {}) {
    const navigate = useNavigate();
    const {replace = false} = props;

    const [ready, setReady] = useState(false);
    const [token, setToken] = useState<string | undefined>();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const inputToken = queryParams.get('fp_cot');
        if (inputToken) {
            setToken(inputToken)
        }
        setReady(true);
    }, [])


    const proceed = useCallback(async <T>(action: Promise<T>): Promise<T> => {
        const response = await action;
        navigate(`/?fp_cot=${token || ''}`, {
            state: {response},
            replace
        });
        return response;
    }, [navigate, token, replace])


    return {
        ready, token, proceed
    }
}
