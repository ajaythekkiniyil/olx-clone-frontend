import { useEffect } from "react";
import {toast} from 'react-toastify'

function CountDowmTimer({ seconds, setSeconds, handleModalCloseButton }) {
    const minute = Math.floor(seconds / 60)
    const second = seconds % 60;
    
    useEffect(() => {
        let interval = null;
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        }
        else if (seconds === 0) {
            clearInterval(interval);
            handleModalCloseButton()
            toast.error('OTP timeout !');
        }

        return () => clearInterval(interval);
    }, [seconds])

    return (
        <strong style={{display:'block', fontSize:'15px'}}>{minute}:{second < 10 ? 0 : ''}{second}</strong>
    )
}

export default CountDowmTimer