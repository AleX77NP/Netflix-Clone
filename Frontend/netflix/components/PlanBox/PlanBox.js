import styles from './PlanBox.module.css'
import PropTypes from 'prop-types';

const PlanBox = ({ plan, selected, onPress }) => {
    return (
        <>
        <div className={selected ? styles.container : styles.container_off} onClick={onPress}>
            <p className={styles.title}>{plan}</p>
        </div>
        {selected ? <div className={styles.selected}></div> : null }
        </>
    )
}

PlanBox.propTypes = {
    plan: PropTypes.string,
    selected: PropTypes.bool,
    onPress: PropTypes.func
}

export default PlanBox
