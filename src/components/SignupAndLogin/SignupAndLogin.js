import React, { useState } from 'react'
import { BsPhone } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import PhoneNumberVerification from '../LoginSteps/PhoneNumberVerification';

// model element will popup when user click login button 
// continue with phone and Google
// isContinueWithPhoneClicked then go to next step PhoneNumberVerification
function SignupAndLogin() {
    const [isContinueWithPhoneClicked, setIsContinueWithPhoneClicked] = useState(false)
    
    return (
        <div className="model-wrap">
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            {/* signup and login - first-step*/}
                            {
                                !isContinueWithPhoneClicked &&
                                <div id='first-step' className='pb-5'>
                                    <img src={require('../../assets/images/login-quote.jpg')} alt="login-quote-img" height={100} />
                                    <p className='login-quote pb-4'>Close deals from the comfort of your home.</p>
                                    <p>If you are not signup with us!</p>
                                    <span onClick={()=> setIsContinueWithPhoneClicked(true)}>
                                        <BsPhone style={{ fontSize: 20 }} />Coninue with Phone
                                    </span>
                                    <span><BsGoogle /> Coninue with Google</span>
                                    OR
                                    <br />
                                    <a href='#' className='login-with-email'>Login with Email</a>
                                </div>
                            }

                            {/* phone number verification - second step */}
                            {
                                isContinueWithPhoneClicked &&
                                <PhoneNumberVerification setIsContinueWithPhoneClicked={setIsContinueWithPhoneClicked}/>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupAndLogin