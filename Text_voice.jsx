import React, { useState } from "react";

const TextVoice = () => {
  //hooks
  const [text, setText] = useState("");
  const [lang,setLang] = useState('en-US')
  const [button,setButton] = useState("Convert to Speech")

  //function
  const textToSpeech = () => {
    let isSpeaking = true;
    const synth = window.speechSynthesis;
    if (!synth.speaking && text) {
      const utternace = new SpeechSynthesisUtterance(text);
      utternace.lang=lang;
      synth.speak(utternace);
    }
    if (text.length > 50) {
      if (synth.speaking && isSpeaking) {
         setButton("Pause");
        synth.resume();
        isSpeaking = false;
      } else {
        setButton("Resume");
        synth.pause();
        isSpeaking = true;
      }
    } else {
      isSpeaking = false;
      setButton("Speaking");
    }
    setInterval(() => {
      if (!synth.speaking && !isSpeaking) {
        isSpeaking = true;
        setButton("Convert to Speech");
      }
    });
  };
  return (
    <div>
      <div class="container">
      <header>Text to Speech Converter</header>
      <textarea value={text} onChange={(e)=>{setText(e.target.value)}} placeholder="Enter text"></textarea>
      <button onClick={textToSpeech}>{button}</button>
      <select onChange={(e)=>{setLang(e.target.value)}}>
          <option value="en-US">English</option>
          <option value="ta-IN">Tamil</option>
          <option value="te-IN">Telugu</option>
      </select>
      <button className="button"  onClick={()=>setText('')}>&#10060;</button>
    </div>
    </div>
  );
};

export default TextVoice;
