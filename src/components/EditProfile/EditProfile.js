
import { Button, Col, Input, Row, Select } from 'antd';
import { Link } from 'react-router-dom';
import BackButton from '../Reusable/BackButton';
import { useState } from 'react';
function EditProfile() {
    const [post, setPost] = useState({})
    return (
        <>
            <>
                <Row className='m-2 add-post'>
                    <span style={{ padding: '10px', border: '1px solid #ededed' }} ><Link to='/' style={{ color: 'black' }}><BackButton /></Link></span>

                    <Col span={24} className='pt-4'>
                        <h3 className='text-center'>Edit Profile</h3>
                    </Col>
                </Row>
                <Row className='details'>
                    <Col xs={24}>
                        <h5 className='pb-3'>Basic information</h5>
                    </Col>

                    {/* for car fill these form */}
                    {/* {post.category === 'car' && <FormForCar post={post} handlePostData={handlePostData} handleSelect={handleSelect} />} */}

                    {/* for other product fill these form */}
                    {/* {post.category === 'otherProduct' && <FormForOtherProduct post={post} handlePostData={handlePostData} handleSelect={handleSelect} />} */}

                    <Col xs={24} span={6} className='pt-3'>
                        <Button
                            className='post-now'
                            disabled={false}
                            // onClick={handlePostNow}
                        >
                            Post now
                        </Button>
                    </Col>
                </Row>
            </>
        </>
    )
}
export default EditProfile