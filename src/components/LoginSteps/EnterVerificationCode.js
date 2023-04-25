import React from 'react'

// we get Phone number from props 
// send request to backend, backend send otp to user
// when user type otp and enter verify button, the verification process happen
// after successfull verification of otp redirected to home page with user profile
function EnterVerificationCode({setIsPhoneNumberVerifyClicked, phoneNumber}) {
  return (
    <div id='third-step' className='verify pb-5'>
      <span className='back-arrow' onClick={()=>setIsPhoneNumberVerifyClicked(false)}>&#8592;</span>

      <img src={require('../../assets/images/olx-logo.png')} alt="" width={60} />
      <br /><br />
      <h5 className='pb-3'>Enter verification code</h5>
      <p>We sent a 4-digit code to +91{phoneNumber}</p>
      <input className='enter-phone' type="text" maxLength={4} placeholder='Enter OTP' />
      <br /><br /><br />
      <button
        className='phone-next-btn'
        type="button"
      >Verify</button>
    </div>
  )
}

export default EnterVerificationCode