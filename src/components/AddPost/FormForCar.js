import React from 'react'
import { Button, Col, Input, Row, Select } from 'antd';

function FormForCar({ post, handlePostData, handleSelect }) {
    return (
        <>
            <Col xs={24} span={6} className='pt-3'>
                <label>Brand *</label><br></br>
                <Input value={post.brand} name='brand' onChange={handlePostData} />
            </Col>
            <Col xs={24} span={6} className='pt-3'>
                <label>Year *</label><br></br>
                <Input value={post.year} name='year' type='Number' onChange={handlePostData} />
            </Col>
            <Col xs={24} span={6} className='pt-3'>
                <label>Fuel *</label><br></br>
                <Input value={post.fuel} name='fuel' onChange={handlePostData} />
            </Col>
            <Col xs={24} span={6} className='pt-3'>
                <label>KM driven *</label><br></br>
                <Input value={post.kmDriver} name='kmDriver' type='Number' onChange={handlePostData} />
            </Col>
            <Col xs={24} span={6} className='pt-3'>
                <label>No. of Owners *</label><br></br>
                <Select
                    name='owner'
                    onChange={(e) => handleSelect(e, 'owner')}
                    value={post.owner}
                    style={{
                        width: '45%',
                    }}
                    options={
                        [
                            {
                                value: '1',
                                label: '1st',
                            },
                            {
                                value: '2',
                                label: '2nd',
                            },
                            {
                                value: '3',
                                label: '3rd',
                            },
                            {
                                value: '4',
                                label: '4th',
                            }
                        ]
                    }
                />
            </Col>
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

export default FormForCar