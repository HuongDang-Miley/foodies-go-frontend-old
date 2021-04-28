
import React, { useState, useCallback, useEffect } from 'react'
import { connect } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import routes from '../../data/routes.json'



const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}

// const something = 'static'
// const center = { lat: 40.7681, lng: -74.0208 }

export default function HardCodeMap(props) {

    /******************************************************************************************************************************
    *                    Functions
    ******************************************************************************************************************************/
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw',
        libraries,
    });



    // useEffect(() => {
    //     const directionsCallback = (response, status) => {
    //         console.log('response', response)
    //         if (response !== null) {
    //             if (status === 'OK') {
    //                 setDirections(response)
    //             }
    //             else {
    //                 console.log('response: ', response)
    //             }
    //         }
    //     }
    //     directionsCallback()
    // }, [])


    // let emtpyCallBack = ()=> return null




    // const directionsCallback = useCallback((response, status) => {
    //     console.log('response', response)
    //     console.log('status', status)
    //     if (response !== null) {
    //         if (status === 'OK') {
    //             setDirections(response)
    //         }
    //         else if (status === "OVER_QUERY_LIMIT") {
    //             setTimeout(setDirections(response), 1000)
    //         }
    //         else {
    //             console.log('response: ', response)
    //         }
    //     }
    // }, [])

    let [response, setResponse] = useState(null)
    let [directions, setDirections] = useState("");
    const [check, setCheck] = useState(false)

    const directionsCallback =  (response) => {
        // console.log('response', response)
        if (response !== null) {
            // console.log('response', response)
            if (response.status === 'OK' && check === false) {
                console.log('check', check)
                 setDirections(response)
                 setCheck(true)
            }
            else {
                console.log('error: ', response)
            }
        }
    }


    // const directionsCallback = (response, status) => {
    //             console.log('response', response)
    //             if (response !== null) {
    //                 if (status === 'OK') {
    //                     setDirections(response)
    //                 }
    //                 else {
    //                     console.log('response: ', response)
    //                 }
    //             }
    //         }
    //         directionsCallback()


    if (loadError) return 'Error Loading Map'
    if (!isLoaded) return 'Loading Maps'

    /******************************************************************************************************************************
    *                     Return Map
    ******************************************************************************************************************************/
    return (
        <div className="DirectionsMap">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={{ lat: 40.7681, lng: -74.0208 }}
            >

                /******************************************************************************************************************************
                *                     Request Direction
                ******************************************************************************************************************************/

            <DirectionsService
                    options={{
                        destination: { lat: 40.7386556, lng: -74.02963889999999 },
                        origin: { lat: 40.7681, lng: -74.0208 },
                        travelMode: 'DRIVING',
                    }}
                    callback={ directionsCallback}
                />

/******************************************************************************************************************************
*                     Render Direction
******************************************************************************************************************************/
            {directions ? <DirectionsRenderer options={{ directions }} /> : null}
            </GoogleMap>
        </div >
    );
}


