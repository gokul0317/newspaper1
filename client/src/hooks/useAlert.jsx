import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ALERT_CLEAR_DELAY } from "../utils/constant"

const initialState = {
    message: "",
    severity: ""
}
export default function useAlert() {
    let alertTimeOut = useRef(null);
    const [alert, setAlert] = useState({
        ...initialState
    });

    const resetAlert = useCallback(() => {
        setAlert({ ...initialState })
    }, [setAlert])

    const showAlert = useCallback(({ message, severity = "success", timeOut = 3000 }) => {
        setAlert({
            message,
            severity
        })
        alertTimeOut.current = setTimeout(() => {
            resetAlert();
        }, timeOut)
    }, [setAlert, resetAlert])


    const alertItem = useMemo(() => {
        return (
            <>
                {!!alert?.message && <Stack sx={{ width: '100%' }} position="fixed" spacing={2}>
                    <Alert severity={alert.severity} onClose={() => {
                        resetAlert();
                        alertTimeOut.current && clearTimeout(alertTimeOut.current);
                    }}>{alert.message}</Alert>
                </Stack>}
            </>
        );
    }, [alert, resetAlert])

    useEffect(() => {
        alertTimeOut.current = setTimeout(() => {
            resetAlert()
        }, ALERT_CLEAR_DELAY);
        return () => {
            alertTimeOut.current && clearTimeout(alertTimeOut.current);
        }
    }, [resetAlert])

    return {
        showAlert,
        alertItem
    }
}
