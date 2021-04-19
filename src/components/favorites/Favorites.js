import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Redirect, useHistory, Link } from 'react-router-dom';
// import Login from '../login/Login.js'
import TopNav from '../topNav/TopNav.js'
import MapWrapper from '../map/Map.js'
import './favorites.css'

function Favorites(props) {
    const history = useHistory()

    //=========================== Check if there is a token ===========================
    let [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    })

    // console.log('token after useEffect', token)


    // console.log('props in Favorites', props)
    // return (
    //     <div>
    //         <TopNav />
    //         <MapWrapper
    //                 state={props.searchResults}
    //                 getNearbySearch={props.getNearbySearch}
    //             />
    //         <div>This is Favorites Page</div>
    //         {/* {token
    //             ? <div>This is Favorites Page</div>
    //             : <Redirect to="/login" component={Login} />
    //         } */}
    //     </div>
    // )



    const logOut = () => {
        localStorage.removeItem('userToken')
        history.push('/home')
    }

    // return (
    //     <div>
    //         {isAuth
    //             // ? <div>'yes there is token' </div>
    //             ? <Redirect to='/test' />
    //             : <Redirect to='/login' />}
    //     </div>
    //     // <div>
    //     //     <div className='topNav-wrapper'>
    //     //         {/* <Link to='/home'>Go Back</Link> */}
    //     // This is Fav component
    //     // {/* <button onClick={() => logOut()}>LogOut</button> */}
    //     //     </div>
    //     //     {/* // : <Redirect to='/login' /> */}


    //     // </div>

    // )

    return (
        <>

            <div>
                <div className='topNav-wrapper'>
                    <button><Link to='/home'>Go Back</Link></button>
                    <div className='topnav-right-buttons-wrapper'>
                        {isAuth
                            ? <button onClick={() => logOut()}>Logout</button>
                            : <button><Link to='/login'>Login</Link></button>
                        }
                    </div>
                </div>

                <div className='map-wrapper'>
                    <MapWrapper
                        state={props.searchResults}
                        getNearbySearch={props.getNearbySearch}
                    />
                </div>
                <div className='sidebar-wrapper'>
                    {isAuth
                        ? <p>This is Favorites</p>
                        : <p>You Must Login To see your favorites</p>
                    }
                </div>
            </div>


            {/* {props.searchResults.places.length === 0
                ? null
                : <div className='sidebar-wrapper'>
                    <Sidebar
                        togglePlaceDetail={props.togglePlaceDetail}
                        getPlaceDetail={props.getPlaceDetail}
                        searchResults={props.searchResults} />
                </div>
            } */}
        </>
    );


}

const mapStateToProps = (state) => {
    return {
        state: state.authReducer
    }
}

export default connect(mapStateToProps)(Favorites)