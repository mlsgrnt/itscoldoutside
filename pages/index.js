import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SpecialVideo from '../components/SpecialVideo';

const Home = () => {
  const [temp, updateTemp] = useState(33.3);
  useEffect(() => {
    getTemp();
  }, []);

  const getTemp = async () => {
    const ipRaw = await fetch('https://loving-biplane.glitch.me/ip');
    const ip = await ipRaw.json();
    const weatherRaw = await fetch(
      `https://loving-biplane.glitch.me/${ip.latitude},${ip.longitude}`
    );
    const weather = await weatherRaw.json();
    updateTemp(weather.currently.temperature);
  };
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/modern-css-reset/dist/reset.min.css"
        />
      </Head>

      <SpecialVideo temperature={temp} />
      <style jsx>{`
        div {
          background: black;
          color: #eee;
          font-family: Helvetica, Arial;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
