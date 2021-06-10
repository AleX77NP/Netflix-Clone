import React from 'react'
import styles from './MyProfile.module.css'

const MyProfile = ({profile}) => {
    return (
        <div className={styles.content_part} key={profile.name} style={{marginBottom: '10px'}}>
            <img src={profile.image} className={styles.profile_img} alt="profile-img" />
            <p>{profile.name}</p>
            <img src="/images/delete.png" className={styles.delete}  alt="profile-delete" />
        </div>
    )
}

export default MyProfile
