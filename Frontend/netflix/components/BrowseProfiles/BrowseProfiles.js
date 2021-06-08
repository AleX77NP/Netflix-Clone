import React from 'react'
import styles from './BrowseProfiles.module.css'
import PropTypes from 'prop-types';

const BrowseProfiles = ({profiles, setProfile}) => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Who's watching?</p>
            <div className={styles.profiles_wrapper}>
                {profiles && profiles.map((profile) => (
                    <div key={profile.image} onClick={() => setProfile(profile.image)}>
                        <img src={profile.image} alt="image-profile" className={styles.avatar} />
                        <p className={styles.name}>{profile.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

BrowseProfiles.propTypes = {
    profiles: PropTypes.array,
    setProfile: PropTypes.func
}

export default BrowseProfiles
