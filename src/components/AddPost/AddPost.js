import React, { useState } from 'react'
import { Button, Col, Input, Row, Select } from 'antd';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';
import FormForCar from './FormForCar';
import FormForOtherProduct from './FormForOtherProduct';
import BackButton from '../Reusable/BackButton'
import { Link } from 'react-router-dom';
import Spinner from '../Reusable/Spinner'

function AddPost() {
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({
    category: 'car',
  })

  const [images, setImages] = useState([])

  const handleSelect = (e, name) => {
    setPost((prevS) => {
      return (
        {
          ...prevS,
          [name]: e,
        }
      )
    })
  }

  const handlePostData = (e) => {
    const { name, value } = e.target
    setPost((prevS) => {
      return (
        {
          ...prevS,
          [name]: value,
        }
      )
    })
  }

  const handleImage = (e) => {
    setImages(prevS => {
      return (
        [
          ...prevS,
          e.target.files[0]
        ]
      )
    })
  }

  const handlePostNow = () => {
    let checked = false
    if (post.category === 'car') {
      checked = CheckAllFilledFormForCar()
    }
    else {
      checked = CheckAllFilledFormForOtherProduct()
    }

    if (checked) {
      const formData = new FormData();
      formData.append('postInfo', JSON.stringify(post))

      for (const eachImage of images) {
        formData.append('image', eachImage);
      }

      setLoading(true)
      axiosInstance.post('/product/add-car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(resp => {
          if (resp.data.status) {
            setLoading(false)
            toast.success('New product added.')
            window.location = '/'
          }
        })
        .catch(err => {
          toast.error('Something went to wrong')
        })
    }
  }

  const CheckAllFilledFormForCar = () => {
    if (post.brand === undefined || post.brand === '') {
      toast.warning('Enter brand')
      return false
    }
    else if (post.year === undefined || post.year === '') {
      toast.warning('Enter year')
      return false
    }
    else if (post.fuel === undefined || post.fuel === '') {
      toast.warning('Enter fuel')
      return false
    }
    else if (post.kmDriver === undefined || post.kmDriver === '') {
      toast.warning('Enter KM driven')
      return false
    }
    else if (post.owner === undefined || post.owner === '') {
      toast.warning('Enter No. of Owners')
      return false
    }
    else if (post.title === undefined || post.title === '') {
      toast.warning('Enter title')
      return false
    }
    else if (post.description === undefined || post.description === '') {
      toast.warning('Enter description')
      return false
    }
    else if (post.price === undefined || post.price === '') {
      toast.warning('Enter price')
      return false
    }
    else if (post.location === undefined || post.location === '') {
      toast.warning('Enter location')
      return false
    }
    else if (images.length === 0) {
      toast.warning('Select atleast one image')
      return false
    }
    return true
  }

  const CheckAllFilledFormForOtherProduct = () => {
    if (post.title === undefined || post.title === '') {
      toast.warning('Enter title')
      return false
    }
    else if (post.description === undefined || post.description === '') {
      toast.warning('Enter description')
      return false
    }
    else if (post.price === undefined || post.price === '') {
      toast.warning('Enter price')
      return false
    }
    else if (post.location === undefined || post.location === '') {
      toast.warning('Enter location')
      return false
    }
    else if (images.length === 0) {
      toast.warning('Select atleast one image')
      return false
    }
    return true
  }

  return (
    <>
      {loading && <Spinner />}
      <Row className='m-2 add-post'>
        <span style={{padding:'10px',border:'1px solid #ededed'}} ><Link to='/' style={{color:'black'}}><BackButton /></Link></span>

        <Col span={24} className='pt-4'>
          <h3 className='text-center'>Post your ads</h3>
        </Col>
        <Col span={24} className='select-category'>
          <label className='m-2'>Select category</label>
          <Select
            name='category'
            value={post.category}
            defaultValue="car"
            style={{
              width: '200px',
            }}
            options={
              [
                {
                  value: 'car',
                  label: 'Car',
                },
                {
                  value: 'otherProduct',
                  label: 'Other Product',
                },
              ]
            }
            onChange={(e) => handleSelect(e, 'category')}
          />
        </Col>
      </Row>
      <Row className='details'>
        <Col xs={24}>
          <h5 className='pb-3'>Include some details</h5>
        </Col>

      {/* for car fill these form */}
      {post.category === 'car' && <FormForCar post={post} handlePostData={handlePostData} handleSelect={handleSelect} />}

      {/* for other product fill these form */}
      {post.category === 'otherProduct' && <FormForOtherProduct post={post} handlePostData={handlePostData} handleSelect={handleSelect} />}

        <Col xs={24} span={6} className='pt-3'>
          <label>Upload image *</label><br></br>
          <Input type='file' onChange={handleImage} />
        </Col>
        <Col xs={24} span={6} className='pt-3'>
          <label>Upload image *</label><br></br>
          <Input type='file' onChange={handleImage} />
        </Col>
        <Col xs={24} span={6} className='pt-3'>
          <Button
            className='post-now'
            disabled={false}
            onClick={handlePostNow}
          >
            Post now
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default AddPost