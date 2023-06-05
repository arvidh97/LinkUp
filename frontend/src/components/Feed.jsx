import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect, Link } from 'react-router-dom';
import NavBar from './NavBar';

function Feed() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const handleLogout = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.logout())
    }

    if (!sessionUser) return <Redirect to="/" />;
    return (
        <>
        <NavBar />
        {/* <button onClick={handleLogout}>Logout</button> */}
        </>
        
    )
}

export default Feed;