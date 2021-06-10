import React from 'react'
import styles from './MyProfile.module.css'
import PropTypes from 'prop-types';
import { contains } from '../../utils/strings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = ({profile, onRemove}) => {
    return (
        <>
            <div className={styles.content_part} key={profile.name} style={{marginBottom: '10px'}}>
                <img src={profile.image} className={styles.profile_img} alt="profile-img" />
                <p>{profile.name}</p>
                {!contains(profile.image, "kids","profile1") ? <img onClick={onRemove} src="/images/delete.png" className={styles.delete}  alt="profile-delete" /> : 
                <img src="/images/star.png" className={styles.delete}  alt="profile-star" onClick={() => toast.dark("Required profile",{autoClose: 1000})} />}
            </div>
            <ToastContainer />
        </>
    )
}

MyProfile.propTypes = {
    profile: PropTypes.object,
    onRemove: PropTypes.func
}

export default MyProfile
