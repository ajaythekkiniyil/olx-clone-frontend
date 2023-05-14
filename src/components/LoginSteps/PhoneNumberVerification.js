import React, { useState } from 'react'
import EnterVerificationCode from './EnterVerificationCode'
import axios from 'axios'
import { backendUrl } from '../../constants'

// if user enter 10 digit phone number then go to otp verification page
// if 10 digit number enterd only then next button active 
function PhoneNumberVerification({ setIsContinueWithPhoneClicked }) {
    const [isPhoneNumberVerifyClicked, setIsPhoneNumberVerifyClicked] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState('')


    const handlePhoneNumberType = (event) => {
        setPhoneNumber(event.target.value)
        phoneNumber && checkPhoneNumberLength(phoneNumber)
    }
    const checkPhoneNumberLength = (number) => {
        let length = number.length + 1
        if (length == 10) {
            setIsDisabled(false)
        }
        else
            setIsDisabled(true)
    }
    // onclick of next button send a api call with phone number and generate otp
    // send to user phone number
    const handleNext = () => {
        const url = backendUrl + '/user/send-otp'

        axios.post(url, { "phone": phoneNumber }).then(resp => {
            if (resp.data.success) {
                setIsPhoneNumberVerifyClicked(true)
            }
        })

    }
    return (
        <>
            {
                !isPhoneNumberVerifyClicked &&
                <div id='second-step' className='verify pb-5'>
                    <span className='back-arrow' onClick={() => setIsContinueWithPhoneClicked(false)}>&#8592;</span>

                    <img src={require('../../assets/images/olx-logo.png')} alt="" width={60} />
                    <br /><br />
                    <h5 className='pb-3'>Enter your phone number</h5>
                    <label style={{ fontSize: 18 }}>+91</label>
                    <input className='enter-phone' value={phoneNumber} type="tel" maxLength={10} placeholder='Phone Number'
                        onChange={handlePhoneNumberType}
                    />
                    <br /><br /><br />
                    <button
                        className='phone-next-btn'
                        type="button"
                        disabled={isDisabled}
                        style={{ background: isDisabled ? 'gray' : '' }}
                        onClick={handleNext}
                    >Next</button>
                </div>
            }
            {/* third step - OTP verification*/}
            {
                isPhoneNumberVerifyClicked &&
                <EnterVerificationCode setIsPhoneNumberVerifyClicked={setIsPhoneNumberVerifyClicked} phoneNumber={phoneNumber} />
            }
        </>
    )
}

export default PhoneNumberVerification