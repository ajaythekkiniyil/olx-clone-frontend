import React from 'react'
import { Button, Col, Input, Row, Select } from 'antd';

function FormForOtherProduct({post,handlePostData,handleSelect}) {
    return (
        <>
            <Col xs={24} span={6} className='pt-3'>
                <label>Ad title *</label><br></br>
                <Input value={post.title} name='title' onChange={handlePostData} />
            </Col>
            <Col xs={24} span={6} className='pt-3'>
                <label>Description *</label><br></br>
                <Input value={post.description} name='description' onChange={handlePostData} />
            </Col>
            <Col xs={24} span={6} className='pt-3'>
                <label>Price *</label><br></br>
                <Input value={post.price} name='price' type='Number' onChange={handlePostData} />
            </Col>
            <Col xs={24} span={6} className='pt-3'>
                <label>Location *</label><br></br>
                <Input value={post.location} name='location' onChange={handlePostData} placeholder='Enter your district' />
            </Col>
        </>
    )
}

export default FormForOtherProduct