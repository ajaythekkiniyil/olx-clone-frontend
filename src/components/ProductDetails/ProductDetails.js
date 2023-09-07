import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Button, Col, Input, Row, Select } from 'antd';
import BackButton from '../Reusable/BackButton';


function ProductDetails() {
  const productInfo = useSelector((state) => state.product.value)
  const datePosted = new Date(productInfo.datePosted)
  const date = datePosted.getDate()
  const month = datePosted.getMonth() + 1
  const year = datePosted.getFullYear()
  const formatedDate = `${date < 10 ? '0' + date : date}/${month < 10 ? '0' + month : month}/${year}`
  
  const sellerId = productInfo.sellerId


  return (
    <>
      <Row className='m-2 add-post'>
        <span style={{ padding: '10px', border: '1px solid #ededed' }} ><Link to='/' style={{ color: 'black' }}><BackButton /></Link></span>

        <Col span={24} className='pt-4'>
          <h3 className='text-center'>Product Details</h3>
        </Col>
      </Row>
      <Row className='details'>
        <Col xs={24}>
          <h5 className='pb-3'>Product information</h5>
        </Col>
        <Col xs={24} md={12}>
          <img src={productInfo?.image[0]} width={400} style={{ borderRadius: '10px' }} />
        </Col>
        <Col xs={24} md={12}>
          <h1>₹ {productInfo.price}</h1>
          <p>Title: <b>{productInfo.title}</b></p>

          {productInfo.brand && <p>Brand: <b>{productInfo.brand}</b></p>}
          {productInfo.owner && <p>Owner: <b>{productInfo.owner}</b></p>}
          {productInfo.year && <p>Modal: <b>{productInfo.year}</b></p>}
          {productInfo.fuel && <p>Fuel: <b>{productInfo.fuel}</b></p>}

          <p>Description: <b>{productInfo.description}</b></p>
          <p>Location: <b>{productInfo.location}</b></p>
          <p>Date posted: <b>{formatedDate}</b></p>
          <Link to='hdkdk' className='btn' style={{backgroundColor:'#002f34',color:'#fff'}}>Chat with Seller</Link>
        </Col>
      </Row>
    </>
  )
}

export default ProductDetails