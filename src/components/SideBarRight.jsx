import React from 'react'
import { SlUser } from "react-icons/sl";
import { TiUserAddOutline } from "react-icons/ti";
import { HiMiniXMark } from "react-icons/hi2";

const SideBarRight = () => {
  return (
    <div className='sidebar-r'>
      <div className="side-nav">
        <h3>Friend Activity</h3>
        <div><TiUserAddOutline size={25} />
        <HiMiniXMark size={30} /></div>
      </div>
      <p>Let friends and followers on Spotify see what you’re listening to.</p>
      <div className='users'>
        <div>
          <SlUser className='user-img' size={60} />
          <p>Lorem, ipsum dolor.</p>
        </div>
        <div>
          <SlUser className='user-img' size={60}   />
          <p>Lorem, ipsum dolor.</p>
        </div>
        <div>
          <SlUser className='user-img' size={60}   />
          <p>Lorem, ipsum dolor.</p>
        </div> 
      </div>
      <p>Go to Settings Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
      <div className='user-btn'><button>SETTINGS</button></div>
    </div>
  )
}

export default SideBarRight