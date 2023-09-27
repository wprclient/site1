import React, { useEffect, useState } from 'react';
import { connect, styled } from "frontity";
import AdSense from 'react-adsense';

const GoogleAds = ({state, actions, slot}) => {
    const [adblockerActive, setAdblockerActive] = useState(false);

    useEffect(() => {
        actions.source.fetch("/");
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        script.onerror = (err) => err.type == "error" ? adBlockFunction() : "";

        document.body.appendChild(script);

    }, []);
    const adBlockFunction = () => {
        // Google Analytics End
        setAdblockerActive(true);
    }

    return (
        <>
            {adblockerActive ?
                <Adblock>
                    <h2>Adblock Detected !<br />
                        Please disable adblock  to use our site.</h2>
                </Adblock>
                : ""}

            <AdSense.Google
                client={state.theme.client_id}
                slot={slot?.slot}
                style={{ width: slot?.width, height: slot?.height }}
                format=''
            />

        </>
    );
};

export default connect(GoogleAds);

const Adblock = styled.adblock`
h2 {
    width: 1888px;
    position: fixed;
    top: -59px;
    left: 0px;
    right: 0px;
    background: rgb(116 112 112 / 94%);
    height: 100vh;
    text-align: center;
    padding-top: 20%;
    color: #ffffff;
    z-index: 999999999;
  }

`;
