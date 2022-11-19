import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideoBasic from '../assets/basicvideoone.mp4';
import logobasic from '../assets/logobasicwhite.png';

import { client } from '../client';
import { gapi } from "gapi-script";



const Login = () => {

  const clientId = 
  "922184108508-bnfvha5k9s531jmj5kogk810di2430l1.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const navigate = useNavigate();

  const responseGoogle= (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      username: name,
      image: imageUrl,

    };

    client.createIfNotExists(doc)
    .then(() => {
        navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
    <div className="relative w-full h-full">
      <video
        src={shareVideoBasic}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logobasic} width="130px" alt="logobasic" />
          </div>
          <div className="shadow-2x1">
            <GoogleLogin 
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4"/> Google Sign In


                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
              />
          </div>
        </div>
    </div>
    </div>
  );
};

export default Login;