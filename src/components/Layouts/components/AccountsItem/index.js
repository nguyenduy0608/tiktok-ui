import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
const cx = classNames.bind(styles)
function AccountItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src = "https://kynguyenlamdep.com/wp-content/uploads/2019/12/hinh-anh-hoa-hong-dep-va-y-nghia.jpg" alt = "Hoa" />
            <div className={cx('infor')} > 
                <h4 className={cx('name')}> 
                    <span> Nguyen Thi Hoa</span>
                    
                    <FontAwesomeIcon className={cx('check')} icon = {faCheckCircle}/>
                </h4>
                <span className={cx('username')}>nguyenthihoa </span>
            </div>
        </div>
     );
}

export default AccountItem;