import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react"; import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie] = useCookies([])
  const [date, setDate] = useState(new Date())
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone); const [showTimezone, setShowTimezone] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (cookies.timeZone == undefined) {
      setCookie('timeZone', 'empty', { path: '/' })
    }
    if (window.matchMedia("(max-width: 700px)").matches) {
      setIsMobile(true)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date())
    }, 1000);
  }, [date])

  const specificTimeZone = (x) => {
    let tempest = Math.abs(x) / 60
    if (tempest % 1 == 0) {
      if (x > 0) {
        return tempest * -1 + ":00"
      } else {
        return "+" + tempest + ":00"
      }
    } else {
      let temp = tempest - Math.floor(tempest)
      switch (temp) {
        case .25:
          if (x > 0) {
            return Math.floor(tempest) * -1 + ":15"
          } else {
            return "+" + Math.floor(tempest) + ":15"
          }
        case .50:
          if (x > 0) {
            return Math.floor(tempest) * -1 + ":30"
          } else {
            return "+" + Math.floor(tempest) + ":30"
          }
        case .75:
          if (x > 0) {
            return Math.floor(tempest) * -1 + ":45"
          } else {
            return "+" + Math.floor(tempest) + ":45"
          }
      }
    }
  }

  const onClickConfirmTimezone = () => {
    setCookie('timeZone', timezone, { path: '/' })
    setShowTimezone(false)
  }

  return (
    <>
      {cookies.timeZone == "empty" && showTimezone ?
        <div id="timezone-wrapper">
          <div id="bubble-container">
            <div id="bubble-text" className="text">Select your Timezone</div>
            <select id="select-box" onChange={(e) => setTimezone(e.target.value)}>
              <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>UTC{specificTimeZone((new Date().getTimezoneOffset()))} {new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })}</option>
              <option value="Etc/GMT+12">UTC-12:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+12" })}</option>
              <option value="Etc/GMT+11">UTC-11:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+11" })}</option>
              <option value="-Etc/GMT+10">UTC-10:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+10" })}</option>
              <option value="Pacific/Marquesas">UTC-9:30 {new Date().toLocaleString("en-US", { timeZone: "Pacific/Marquesas" })}</option>
              <option value="-Etc/GMT+9">UTC-9:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+9" })}</option>
              <option value="Etc/GMT+8">UTC-8:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+8" })}</option>
              <option value="Etc/GMT+7">UTC-7:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+7" })}</option>
              <option value="Etc/GMT+6">UTC-6:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+6" })}</option>
              <option value="Etc/GMT+5">UTC-5:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+5" })}</option>
              <option value="Etc/GMT+4">UTC-4:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+4" })}</option>
              <option value="America/St_Johns">UTC-3:30 {new Date(new Date().getTime() - 1 * 60 * 60 * 1000).toLocaleString("en-US", { timeZone: "America/St_Johns" })}</option>
              <option value="Etc/GMT+3">UTC-3:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+3" })}</option>
              <option value="Etc/GMT+2">UTC-2:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+2" })}</option>
              <option value="Etc/GMT+1">UTC-1:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+1" })}</option>
              <option value="Etc/GMT+0">UTC 0:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+0" })}</option>
              <option value="Etc/GMT-1">UTC+1:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-1" })}</option>
              <option value="Etc/GMT-2">UTC+2:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-2" })}</option>
              <option value="Etc/GMT-3">UTC+3:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-3" })}</option>
              <option value="Asia/Tehran">UTC+3:30 {new Date().toLocaleString("en-US", { timeZone: "Asia/Tehran" })}</option>
              <option value="Etc/GMT-4">UTC+4:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-4" })}</option>
              <option value="Asia/Kabul">UTC+4:30 {new Date().toLocaleString("en-US", { timeZone: "Asia/Kabul" })}</option>
              <option value="Etc/GMT-5">UTC+5:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-5" })}</option>
              <option value="Asia/Kolkata">UTC+5:30 {new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}</option>
              <option value="Asia/Kathmandu">UTC+5:45 {new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })}</option>
              <option value="Etc/GMT-6">UTC+6:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-6" })}</option>
              <option value="Asia/Yangon">UTC+6:30 {new Date().toLocaleString("en-US", { timeZone: "Asia/Yangon" })}</option>
              <option value="Etc/GMT-7">UTC+7:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-7" })}</option>
              <option value="Etc/GMT-8">UTC+8:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-8" })}</option>
              <option value="Australia/Eucla">UTC+8:45 {new Date().toLocaleString("en-US", { timeZone: "Australia/Eucla" })}</option>
              <option value="Etc/GMT-9">UTC+9:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-9" })}</option>
              <option value="Australia/Adelaide">UTC+9:30 {new Date().toLocaleString("en-US", { timeZone: "Australia/Adelaide" })}</option>
              <option value="Etc/GMT-10">UTC+10:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-10" })}</option>
              <option value="Australia/Lord_Howe">UTC+10:30 {new Date().toLocaleString("en-US", { timeZone: "Australia/Lord_Howe" })}</option>
              <option value="Etc/GMT-11">UTC+11:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-11" })}</option>
              <option value="Etc/GMT-12">UTC+12:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-12" })}</option>
              <option value="Pacific/Chatham">UTC+12:45 {new Date().toLocaleString("en-US", { timeZone: "Pacific/Chatham" })}</option>
              <option value="Etc/GMT-13">UTC+13:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-13" })}</option>
              <option value="Etc/GMT-14">UTC+14:00 {new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-14" })}</option>
            </select>
            <input id="bubble-input" type="button" value="Confirm" onClick={() => onClickConfirmTimezone()}/>
          </div>
        </div>:
        <>

        <div id="wrapper">
          <div id="navbar-container">
          <div className="navbar-input-container">
              {isMobile ? <></> : <div className="text-2">Seasonal</div>}
              <img src={require("./content/seasonal.png")}/>
            </div>
            <div className="navbar-input-container">
              {isMobile ? <></> : <div className="text-2">Fish </div>}
              <img src={require("./content/fish.png")}/>
            </div>
            <div className="navbar-input-container">
              {isMobile ? <></> : <div className="text-2">Insects </div>}
              <img src={require("./content/bug.png")}/>
            </div>
            <div className="navbar-input-container">
              {isMobile ? <></> : <div className="text-2">Sea Creatures</div>}
              <img src={require("./content/sea-critter.png")}/>
            </div>
          </div>
          <div id="what-the-catch-container">
            {isMobile ? <></> : <>
            <div className='what-the-catch-container-page'>
              <div>Fish</div>
              <div></div>
            </div>
            <div className='what-the-catch-container-page'></div>
            <div className='what-the-catch-container-page'></div>
            </>}
          </div>
        </div>
        </>}

    </>
  );
}

export default App;
