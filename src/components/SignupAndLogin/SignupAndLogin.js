import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import loginQuote from '../../assets/images/login-quote.jpg'
import olxLogo from '../../assets/images/olx-logo.png'
import { BsPhone, BsGoogle } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import CountDownTimer from '../../components/CountDownTimer/CountDown.jsTimer'
import axiosInstance from '../../axiosInstance'

function SignupAndLogin({ isModalOpen, handleCancel }) {
    const [phone, setPhone] = useState()
    const [isDisabled, setIsDisabled] = useState(true)
    const [isDisabledOtp, setIsDisabledOtp] = useState(true)
    const [otpError, setOtpError] = useState(false)
    const [otp, setotp] = useState()
    const [password, setPassword] = useState()
    const [passwordShow, setPasswordShow] = useState(false)

    const initialTime = 5*60;
    const [seconds, setSeconds] = useState(initialTime)

    const [stepOne, setStepOne] = useState(true)
    const [stepTwo, setStepTwo] = useState(false)
    const [stepThree, setStepThree] = useState(false)
    const [stepFour, setStepFour] = useState(false)


    const handleNext = () => {
        console.log(phone);
    }

    const handleVerifyOtp = () => {
        console.log(otp);
        handleNextBack('step4')
    }

    const handleCreateAccount = () => {
        console.log('account created');
    }

    const handleNextBack = (action) => {
        if (action === 'step1') {
            setStepOne(true)
            setStepTwo(false)
            setStepThree(false)
            setStepFour(false)
        }
        if (action === 'step2') {
            setStepTwo(true)
            setStepOne(false)
            setStepThree(false)
            setStepFour(false)
            setSeconds(initialTime)
        }
        if (action === 'step3') {
            setStepThree(true)
            setStepOne(false)
            setStepTwo(false)
            setStepFour(false)
        }
        if (action === 'step4') {
            setStepFour(true)
            setStepOne(false)
            setStepTwo(false)
            setStepThree(false)
        }
    }

    const handleModalCloseButton = () => {
        setPassword('')
        setotp('')
        setPhone('')
        setPasswordShow(false)
        setStepOne(true)
        setStepTwo(false)
        setStepThree(false)
        setStepFour(false)
        setIsDisabled(true)
        setSeconds(null)
        handleCancel()
    }

    // arrow back button
    const BackButton = () => {
        return (
            <BiArrowBack style={{ fontSize: '20px', float: 'left', cursor: 'pointer' }} />
        )
    }

    return (
        <>
            <Modal
                className='text-center'
                open={isModalOpen}
                onCancel={handleModalCloseButton}
                width={400}
                okButtonProps={{ hidden: true }}
                cancelButtonProps={{ hidden: true }}
            >
                {
                    stepOne &&
                    <div className='first-step'>
                        <img src={loginQuote} width={100} />
                        <p style={{ fontSize: '16px', fontWeight: '500' }}>Close deals from the comfort of your home.</p>
                        <p
                            className='login-with'
                            onClick={() => handleNextBack('step2')}
                        >
                            <BsPhone style={{ fontSize: 20 }} />Coninue with Phone
                        </p>
                        <p className='login-with'><BsGoogle /> Coninue with Google</p>
                        <br />
                        <p className='pt-5'>All your personal details are safe with us.</p>
                    </div>
                }

                {
                    stepTwo &&
                    <div className='seoncd-step'>
                        <span onClick={() => handleNextBack('step1')}>
                            <BackButton />
                        </span>

                        <img src={olxLogo} width={50} />
                        <p className='pt-4' style={{ fontSize: '18px', fontWeight: '600', color: '#002f34' }}>Enter your phone number</p>
                        <label style={{ fontSize: 18 }}>+91</label>
                        <input className='enter-phone' type="tel" maxLength={10} value={phone} placeholder='Phone Number' value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value)
                                if (e.target.value.length === 10) {
                                    setIsDisabled(false)
                                }
                                else {
                                    setIsDisabled(true)
                                }
                            }}
                        />
                        <button
                            className='phone-next-btn'
                            type="button"
                            disabled={isDisabled}
                            style={{ background: isDisabled ? 'gray' : '' }}
                            onClick={() => handleNextBack('step3')}
                        >Next</button>
                    </div>
                }

                {
                    stepThree &&
                    <div className='third-step'>
                        <span onClick={() => handleNextBack('step2')}>
                            <BackButton />
                        </span>

                        <img src={olxLogo} width={50} />
                        <p className='pt-4' style={{ fontSize: '18px', fontWeight: '600', color: '#002f34' }}>Enter verification code</p>
                        <p className='pt-1' style={{ fontSize: '15px', color: '#002f34' }}>We sent a 4-digit code to <strong>+91 {phone}</strong></p>
                        <input className='enter-phone' type="text" maxLength={4} placeholder='Enter OTP' value={otp}
                            onChange={(e) => {
                                setotp(e.target.value)
                                if (e.target.value.length === 4) {
                                    setIsDisabledOtp(false)
                                }
                                else {
                                    setIsDisabledOtp(true)
                                }
                            }}
                        />
                        <br />
                        <br />
                        
                        <CountDownTimer seconds={seconds} setSeconds={setSeconds} handleModalCloseButton={handleModalCloseButton} />

                        {otpError && <span className='text-danger'>Invalid verification code</span>}
                        <button
                            className='phone-next-btn'
                            disabled={isDisabledOtp}
                            style={{ background: isDisabledOtp ? 'gray' : '' }}
                            type="button"
                            onClick={handleVerifyOtp}
                        >Verify
                        </button>
                    </div>
                }

                {
                    stepFour &&
                    <div className='fourth-step'>
                        {/* <span onClick={() => handleNextBack('step3')}>
                            <BackButton />
                        </span> */}

                        <img src={olxLogo} width={50} />
                        <p className='pt-4' style={{ fontSize: '18px', fontWeight: '600', color: '#002f34' }}>Create your password</p>
                        <input
                            className='enter-phone mt-3'
                            type={passwordShow === false ? 'password' : 'text'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {!passwordShow && <EyeOutlined style={{ fontSize: '18px' }} onClick={() => setPasswordShow(true)} />}
                        {passwordShow && <EyeInvisibleOutlined style={{ fontSize: '18px' }} onClick={() => setPasswordShow(false)} />}

                        <button
                            className='phone-next-btn mt-4'
                            type="button"
                            onClick={handleCreateAccount}
                        >Create account
                        </button>
                    </div>
                }


            </Modal>
        </>
    )
}

export default SignupAndLogin