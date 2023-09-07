import React from 'react'
import { Spin } from 'antd';


function Spinner() {
  return (
    <div className='spinner-component'>
        <Spin size='large' />
    </div>
  )
}

export default Spinner