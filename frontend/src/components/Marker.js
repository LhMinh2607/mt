import React from 'react'

export default function Marker(props) {

    const {text} = props;

    return (
        <div style={{
            color: 'white', 
            background: 'red',
            padding: '2rem',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            zIndex: 999,
            transform: 'translate(-50%, -50%)', //use style this way cuz I got invalid property error with style in css for this. Could have something to do with Google Map
            wordWrap: 'none',
          }}>
            {text}
        </div>
    )
}
