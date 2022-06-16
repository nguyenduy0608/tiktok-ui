import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from '~/hooks';
import { useEffect, useRef, useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/poper';

import AccountItem from '../AccountsItem';
import request from '~/utils/reques';
import styles from './search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);
    const Ref = useRef();
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        const fetchApi = async () => {
            try {
                const res = await request.get('users/search', {
                    params: {
                        q: encodeURIComponent(debounced),
                        type: 'less',
                    },
                });
                setSearchResults(res.data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchApi();
    }, [debounced]);
    const hanldeHideResults = () => {
        setShowResult(false);
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResults.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-tittle')}>Accounts</h4>
                        {searchResults.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={hanldeHideResults}
        >
            <div className={cx('search')}>
                <input
                    ref={Ref}
                    value={searchValue}
                    placeholder="search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => {
                        setShowResult(true);
                    }}
                />
                {!!searchValue && !loading && (
                    <FontAwesomeIcon
                        className={cx('clear')}
                        icon={faCircleXmark}
                        onClick={() => {
                            setSearchValue('');
                            Ref.current.focus();
                            setSearchResults([]);
                        }}
                    />
                )}

                {loading && <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}
export default Search;
