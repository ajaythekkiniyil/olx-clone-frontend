import React from 'react'
import { AiOutlineArrowUp } from "react-icons/ai";

function Footer() {
  return (
    <footer style={{ background: '#002f34', color: '#fff', fontSize: 15, fontWeight: 300, }}>
      <div className="container">
        <div className="row">
          <div className="col-12 pt-3 pb-3">
            All rights reserved
          </div>
        </div>
      </div>
      <button className='scroll-top' onClick={()=>window.scrollTo(0,0)}>
        <AiOutlineArrowUp />
      </button>
    </footer>
  )
}

export default Footer