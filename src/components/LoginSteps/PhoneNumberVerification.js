import React, { useState } from 'react'
import EnterVerificationCode from './EnterVerificationCode'

// if user enter 10 digit phone number then go to otp verification page
// if 10 digit number enterd only then next button active 
function PhoneNumberVerification({ setIsContinueWithPhoneClicked }) {
    const [isPhoneNumberVerifyClicked, setIsPhoneNumberVerifyClicked] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState(null)


    const handlePhoneNumberType = (event)=>{
        setPhoneNumber(event.target.value)
        phoneNumber && checkPhoneNumberLength(phoneNumber)
    }
    const checkPhoneNumberLength = (number) =>{
        let length=number.length + 1
        if(length==10){
            setIsDisabled(false)
        }
        else
            setIsDisabled(true)
    }
    const handleNext = ()=>{
        setIsPhoneNumberVerifyClicked(true)
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
                        style={{background: isDisabled? 'gray' : ''}}
                        onClick={handleNext}
                    >Next</button>
                </div>
            }
            {/* third step - OTP verification*/}
            {
                isPhoneNumberVerifyClicked &&
                <EnterVerificationCode setIsPhoneNumberVerifyClicked={setIsPhoneNumberVerifyClicked} phoneNumber={phoneNumber}/>
            }
        </>
    )
}

export default PhoneNumberVerification