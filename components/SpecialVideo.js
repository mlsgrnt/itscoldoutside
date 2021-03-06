import { useState } from 'react';

export default ({ temperature }) => {
  const [video, setVideo] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [paused, setPaused] = useState(true);

  const handleTimeUpdate = e => {
    if (video.currentTime > 4.5) {
      setShowMessage(true);
    }

    const synth = window.speechSynthesis;
    // console.log(e.target.currentTime);
    if (video.currentTime > 1.35 && video.currentTime < 2) {
      video.pause();

      video.currentTime = 2.16;
      const utter = new SpeechSynthesisUtterance(`${temperature} degrees`);
      utter.onend = () => {
        video.play();
      };
      synth.speak(utter);
    }
  };
  const handleMounting = element => {
    setVideo(element);
  };
  const startVideo = () => {
    if (video.paused) {
      video.play();
      setPaused(false);
    }
  };

  if (showMessage) {
    return <h1>This song is fucked up and you shouldn't listen to it!</h1>;
  }
  return (
    <div>
      <h2>
        {paused
          ? 'CLICK THE VIDEO TO PLAY (it takes a few seconds to load)'
          : ''}
      </h2>
      <video
        playsInline
        src="/baby.mp4"
        onTimeUpdate={handleTimeUpdate}
        ref={handleMounting}
        onClick={startVideo}
      />
      <style jsx>{`
        h2 {
          padding-top: 1em;
        }
      `}</style>
    </div>
  );
};
