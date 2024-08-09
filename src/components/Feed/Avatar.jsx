import React from 'react';
import '../../css/feed.css';
import  useGetUserProfileById from '../../hooks/useGetUserProfileById';

const Avatar = ({user}) => {
  const { userProfile } = useGetUserProfileById(user)

  return (
    <a href={`/profile/${userProfile?.username}`}>
      <section className='avatar-detail'>
        <div className='avatar-box'>
          <img className="avatar-profile-image" src={userProfile?.profilePictureUrl} alt="" />
        </div>
        <p className='avatar-name'>{userProfile?.username}</p>
      </section>
    </a>
  )
}

export default Avatar;