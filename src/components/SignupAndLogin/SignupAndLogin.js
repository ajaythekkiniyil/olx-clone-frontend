import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import loginQuote from '../../assets/images/login-quote.jpg'
import olxLogo from '../../assets/images/olx-logo.png'
import { BsPhone, BsGoogle } from "react-icons/bs";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import CountDownTimer from '../../components/CountDownTimer/CountDown.jsTimer'
import axiosInstance from '../../axiosInstance'
import { toast } from 'react-toastify';
import BackButton from '../Reusable/BackButton';

function SignupAndLogin({ isModalOpen, handleCancel }) {
    const [phone, setPhone] = useState()
    const [phoneNumberError, setPhoneNumberError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [isDisabledOtp, setIsDisabledOtp] = useState(true)
    const [otpError, setOtpError] = useState(false)
    const [otp, setotp] = useState()
    const [password, setPassword] = useState()
    const [passwordShow, setPasswordShow] = useState(false)
    const [credentialError, setCredentialError] = useState(false)

    const initialTime = 5 * 60;
    const [seconds, setSeconds] = useState(initialTime)

    const [stepOne, setStepOne] = useState(true)
    const [stepTwo, setStepTwo] = useState(false)
    const [stepThree, setStepThree] = useState(false)
    const [stepFour, setStepFour] = useState(false)
    const [stepFive, setStepFive] = useState(false)

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
        if (action === 'step5') {
            setIsDisabled(true)
            setStepFive(true)
            setStepOne(false)
            setStepTwo(false)
            setStepThree(false)
            setStepFour(false)
            setPasswordShow(false)
        }
    }

    const handleModalCloseButton = () => {
        setPassword('')
        setotp('')
        setIsDisabledOtp(true)
        setPhone('')
        setPasswordShow(false)
        setStepOne(true)
        setStepTwo(false)
        setStepThree(false)
        setStepFour(false)
        setStepFive(false)
        setIsDisabled(true)
        setSeconds(null)
        handleCancel()
    }

    const handleSendotp = () => {
        axiosInstance.post('/user/signup-phone', { phone: phone })
            .then(resp => {
                // already registered phone number
                if (resp.data.registered) {
                    handleNextBack('step5')
                    return
                }
                handleNextBack('step3')
            })
            .catch(err => {
                setPhoneNumberError(true)
                setTimeout(() => {
                    setPhoneNumberError(false)
                }, 5000)
            })
    }

    const handleVerifyOtp = () => {
        axiosInstance.post('/user/verify-otp', { phone: phone, otp: otp })
            .then(resp => {
                if (resp.data.status) {
                    toast.success('OTP verified')
                    setTimeout(() => {
                        handleNextBack('step4')
                    }, 2000);
                }
                else {
                    setOtpError(true)
                    setTimeout(() => {
                        setOtpError(false)
                    }, 5000)
                }
            })
            .catch(err => {
                setOtpError(true)
            })
    }

    const handleCreateAccount = () => {
        axiosInstance.post('/user/create-account', { phone: phone, password: password })
            .then(resp => {
                if (resp.data.status) {
                    toast.success('Account created successfully. Login and continue')
                    setPassword('')
                    handleNextBack('step5')
                }
                else toast.error('Something went to wrong, account not created')
            })
            .catch(err => {
                toast.error('Something went to wrong, account not created')
            })
    }

    const handleLogin = () => {
        axiosInstance.post('/user/login-phone', { phone: phone, password: password })
            .then(resp => {
                if (resp.data.status) {
                    localStorage.setItem('token', resp.data.token)
                    localStorage.setItem('userLoggedIn', true)
                    toast.success('Successfully loggedIn')
                    setTimeout(() => {
                        window.location = '/'
                    }, 2000);
                }
                else {
                    setCredentialError(true)
                    setTimeout(() => {
                        setCredentialError(false)
                    }, 3000);
                }
            })
            .catch(err => {
                setCredentialError(true)
                setTimeout(() => {
                    setCredentialError(false)
                }, 3000);
            })
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
                        {phoneNumberError && <p className='pt-3 mb-0 pb-0 text-danger'>Phone number already registered</p>}
                        <button
                            className='phone-next-btn'
                            type="button"
                            disabled={isDisabled}
                            style={{ background: isDisabled ? 'gray' : '' }}
                            onClick={() => handleSendotp()}
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
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if(e.target.value > 4){
                                    setIsDisabled(false)
                                }
                                else{
                                    setIsDisabled(true)
                                }
                            }}
                        />

                        {!passwordShow && <EyeOutlined style={{ fontSize: '18px' }} onClick={() => setPasswordShow(true)} />}
                        {passwordShow && <EyeInvisibleOutlined style={{ fontSize: '18px' }} onClick={() => setPasswordShow(false)} />}

                        <button
                            disabled={isDisabled}
                            style={{background: isDisabled ? 'gray' : ''}}
                            className='phone-next-btn mt-4'
                            type="button"
                            onClick={handleCreateAccount}
                        >Create account
                        </button>
                    </div>
                }

                {
                    stepFive &&
                    <div className='fifth-step'>
                        {/* login section phone number and password */}
                        <img src={olxLogo} width={50} />
                        <p className='pt-4' style={{ fontSize: '18px', fontWeight: '600', color: '#002f34' }}>Login</p>
                        <input className='enter-phone' type="tel" maxLength={10} value={phone} placeholder='Enter phone number' value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                        />
                        {/* some spaces */}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                            className='enter-phone mt-3'
                            type={passwordShow === false ? 'password' : 'text'}
                            value={password}
                            placeholder='Enter password'
                            onChange={(e) =>
                                {
                                    setPassword(e.target.value)
                                    if(e.target.value > 4){
                                        setIsDisabled(false)
                                    }
                                    else{
                                        setIsDisabled(true)
                                    }
                                }
                            }
                        />

                        {!passwordShow && <EyeOutlined style={{ fontSize: '18px' }} onClick={() => setPasswordShow(true)} />}
                        {passwordShow && <EyeInvisibleOutlined style={{ fontSize: '18px' }} onClick={() => setPasswordShow(false)} />}

                        {credentialError && <span className='text-danger d-block pt-3'>Incorrect username or password</span>}
                        <button
                            disabled={isDisabled}
                            className='phone-next-btn ml-5'
                            style={{ width: '300px', background: isDisabled ? 'gray' : ''  }}
                            type="button"   
                            onClick={handleLogin}
                        >Login
                        </button>
                    </div>
                }


            </Modal>
        </>
    )
}

export default SignupAndLogin