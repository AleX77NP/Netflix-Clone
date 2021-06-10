import React from 'react'
import styles from './MyProfile.module.css'
import PropTypes from 'prop-types';

const MyProfile = ({profile}) => {
    return (
        <div className={styles.content_part} key={profile.name} style={{marginBottom: '10px'}}>
            <img src={profile.image} className={styles.profile_img} alt="profile-img" />
            <p>{profile.name}</p>
            <img src="/images/delete.png" className={styles.delete}  alt="profile-delete" />
        </div>
    )
}

MyProfile.propTypes = {
    profile: PropTypes.object,
}

export default MyProfile
