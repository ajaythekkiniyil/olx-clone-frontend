import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../constants'
// import { useNavigate } from 'react-router-dom'

// we get Phone number from props 
// send request to backend, backend send otp to user
// when user type otp and enter verify button, the verification process happen
// after successfull verification of otp redirected to home page with user profile
function EnterVerificationCode({ setIsPhoneNumberVerifyClicked, phoneNumber }) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [userEnteredOtp, setUserEnteredOtp] = useState('')
  const [otpError, setOtpError] = useState(false)

  // const navigate = useNavigate()

  const handleOtpType = (event) => {
    setUserEnteredOtp(event.target.value)
    userEnteredOtp && checkOtpLength(userEnteredOtp)
  }

  const checkOtpLength = (otp) => {
    let length = otp.length + 1
    if (length === 4) {
      setIsDisabled(false)
    }
    else
      setIsDisabled(true)
  }

  // this function send user entered otp to server and validate
  const handleVerifyOtp = () => {
    const url = backendUrl + '/user/verify-otp'

    axios.post(url, { userEnteredOtp: userEnteredOtp, phone: phoneNumber })
      .then(resp => {
        console.log(resp);
        if (resp.data.success) {
          setOtpError(false)
          // window.location.href = '/'
        }
        else {
          setOtpError(true)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div id='third-step' className='verify pb-5'>
      <span className='back-arrow' onClick={() => setIsPhoneNumberVerifyClicked(false)}>&#8592;</span>

      <img src={require('../../assets/images/olx-logo.png')} alt="" width={60} />
      <br /><br />
      <h5 className='pb-3'>Enter verification code</h5>
      <p>We sent a 4-digit code to +91{phoneNumber}</p>
      <input className='enter-phone' type="text" maxLength={4} placeholder='Enter OTP' onChange={handleOtpType} /><br /><br />
      {/* this is error msg show to user if invalid otp */}
      {otpError && <span className='text-danger'>Invalid verification code</span>}
      <button
        className='phone-next-btn'
        disabled={isDisabled}
        style={{ background: isDisabled ? 'gray' : '' }}
        type="button"
        onClick={handleVerifyOtp}
      >Verify</button>
    </div>
  )
}

export default EnterVerificationCode