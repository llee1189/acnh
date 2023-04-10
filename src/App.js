import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react"; import { useCookies } from 'react-cookie';
import { BiTimeFive, BiMenu, BiInfoCircle } from 'react-icons/bi';

function App() {
  const [cookies, setCookie] = useCookies([])
  const [date, setDate] = useState(new Date())
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone); const [showTimezone, setShowTimezone] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mode, setMode] = useState("fish"); const [modeColor, setModeColor] = useState("#4ba3c3"); const [showMenu, setShowMenu] = useState(false)

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

  useEffect(() => {
    switch (mode) {
      case "fish":
        setModeColor("#4ba3c3")
        break
      case "bug":
        setModeColor("#7cbe56")
        break
      case "sea":
        setModeColor("#505dbe")
        break
      default:
        setModeColor("#86be9b")
    }
  }, [mode])

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
    window.location.reload()
  }

  const Fish = () => {
    let temp = []
    for (let i = 0; i < 100; i++) {
      temp.push(
        <div className="what-the-catch-scroll" style={{ color: "#4ba3c3", border: "#4ba3c3 solid" }}>
          <img src={require("./png/fish/sea-bass.png")} />
          <div style={{ width: "64px", textAlign: "center" }}>guppy</div>
          <div style={{ width: "64px", textAlign: "center" }} >Lake (Mouth)</div>
          <div style={{ width: "64px", textAlign: "center" }}>Very Large</div>
          <div style={{ width: "64px", textAlign: "center" }}>60,000 Bells</div>
        </div>
      )
    }
    return temp;
  }

  const Bug = () => {
    let temp = []
    for (let i = 0; i < 100; i++) {
      temp.push(
        <div className="what-the-catch-scroll" style={{ color: "#7cbe56", border: "#7cbe56 solid" }}>
          <img src={require("./png/bug/banded-dragonfly.png")} />
          <div style={{ width: "64px", textAlign: "center" }}>Banded Dragonfly</div>
          <div style={{ width: "64px", textAlign: "center" }} >On the ground (rolling snowballs)</div>
          <div style={{ width: "64px", textAlign: "center" }}>60,000 Bells</div>
        </div>
      )
    }
    return temp;
  }

  const Sea = () => {
    let temp = []
    for (let i = 0; i < 100; i++) {
      temp.push(
        <div className="what-the-catch-scroll" style={{ color: "#505dbe", border: "#505dbe solid" }}>
          <img src={require("./png/sea/moon-jellyfish.png")} />
          <div style={{ width: "64px", textAlign: "center" }}>Moon Jellyfish</div>
          <div style={{ width: "80px", textAlign: "center" }} >Large</div>
          <div style={{ width: "100px", textAlign: "center" }}>Slow consistent movement</div>
          <div style={{ width: "64px", textAlign: "center" }}>60,000 Bells</div>
        </div>
      )
    }
    return temp;
  }

  const Mode = () => {
    switch (mode) {
      case "fish":
        return Fish()
      case "bug":
        return Bug()
      case "sea":
        return Sea()
    }
  }
  const ModeEct = () => {
    switch (mode) {
      case "fish":
        return <>
          <div style={{ width: "64px", height: "1px" }}></div>
          <div style={{ width: "64px", textAlign: "center" }}>Name</div>
          <div style={{ width: "64px", textAlign: "center" }}>Location</div>
          <div style={{ width: "64px", textAlign: "center" }}>Shadow</div>
          <div style={{ width: "64px", textAlign: "center" }}>Price</div>
        </>
      case "bug":
        return <>
          <div style={{ width: "64px", height: "1px" }}></div>
          <div style={{ width: "20%", textAlign: "center" }}>Name</div>
          <div style={{ width: "20%", textAlign: "center" }}>Location</div>
          <div style={{ width: "20%", textAlign: "center" }}>Price</div>
        </>
      case "sea":
        return <>
          <div style={{ width: "64px", height: "1px" }}></div>
          <div style={{ width: "64px", textAlign: "center" }}>Name</div>
          <div style={{ width: "80px", textAlign: "center" }}>Shadow</div>
          <div style={{ width: "100px", textAlign: "center" }}>Swimming</div>
          <div style={{ width: "64px", textAlign: "center" }}>Price</div>
        </>
    }
  }

  return (
    <>
      {cookies.timeZone == "empty" ?
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
            <input id="bubble-input" type="button" value="Confirm" onClick={() => onClickConfirmTimezone()} />
          </div>
        </div> :
        <>

          <div id="wrapper">
            <div id="navbar-container">
              {isMobile ?
                <>
                  <BiInfoCircle className="icon" size={35} color={"#86be9b"} onClick={() => { if (mode == "menu") { setMode("fish") } else { setMode("menu") } }} />
                </>
                : <BiInfoCircle className="icon" size={35} color={"#86be9b"} onClick={() => setShowMenu(!showMenu)} />}
              {isMobile ?
                <>
                  <div id="navbar-container-container">
                    <div className="navbar-input-container" style={mode == "fish" ? { backgroundColor: '#86be9b' } : {}}>
                      <img src={mode == "fish" ? require("./content/fish-1.png") : require("./content/fish.png")} onClick={() => { setMode("fish") }} />
                    </div>
                    <div className="navbar-input-container" style={mode == "bug" ? { backgroundColor: '#86be9b' } : {}}>
                      <img src={mode == "bug" ? require("./content/bug-1.png") : require("./content/bug.png")} onClick={() => { setMode("bug") }} />
                    </div>
                    <div className="navbar-input-container" style={mode == "sea" ? { backgroundColor: '#86be9b' } : {}}>
                      <img src={mode == "sea" ? require("./content/sea-critter-1.png") : require("./content/sea-critter.png")} onClick={() => { setMode("sea") }} />
                    </div>
                  </div>

                </> :
                <div id="navbar-time">{new Date().toLocaleString("en-US", { timeZone: cookies.timeZone })}</div>}
              <div id="navbar-time-container">
                <BiTimeFive className="icon" size={35} color={"#86be9b"} onClick={() => { setCookie('timeZone', 'empty', { path: '/' }); window.location.reload() }} />
              </div>
            </div>
            <div id="what-the-catch-container">
              {isMobile ? <>
                <div className='what-the-catch-container-page' style={{ border: modeColor + " solid" }}>
                  {mode != "menu" ?
                    <>
                      <div>
                        <div style={{ fontSize: "150%", color: modeColor }}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</div>
                        <div className="scroll" style={{ color: modeColor }}>
                          {ModeEct()}
                        </div>
                      </div>
                      <div className='what-the-catch-scroll-container'>
                        {Mode()}
                      </div>
                    </> :
                    <>
                      <div style={{ padding: "0px", margin: "0px", width: "90%", height: "10%", marginTop: "10px" }} id="navbar-time"> {new Date().toLocaleString("en-US", { timeZone: cookies.timeZone })}</div>
                    </>
                  }
                </div>
              </> : <>
                {showMenu
                  ?
                  <>
                    <div className='what-the-catch-container-page'>
                      <div>
                        <div style={{ fontSize: "200%" }}>Info</div>
                        <div className="scroll">

                        </div>
                      </div>
                      <div className='what-the-catch-scroll-container'>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className='what-the-catch-container-page' style={{ border: "#4ba3c3 solid" }}>
                      <div>
                        <div style={{ fontSize: "200%", color: "#4ba3c3" }}>Fish</div>
                        <div className="scroll" style={{ color: "#4ba3c3" }}>
                          <div style={{ width: "64px", height: "1px" }}></div>
                          <div style={{ width: "64px", textAlign: "center" }}>Name</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Location</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Shadow</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Price</div>
                        </div>
                      </div>
                      <div className='what-the-catch-scroll-container'>
                        {Fish()}
                      </div>
                    </div>
                    <div className='what-the-catch-container-page' style={{ border: "#7cbe56 solid" }}>
                      <div>
                        <div style={{ fontSize: "200%", color: "#7cbe56" }}>Insects</div>
                        <div className="scroll" style={{ color: "#7cbe56" }}>
                          <div style={{ width: "64px", height: "1px" }}></div>
                          <div style={{ width: "20%", textAlign: "center" }}>Name</div>
                          <div style={{ width: "20%", textAlign: "center" }}>Location</div>
                          <div style={{ width: "15%", textAlign: "center" }}>Price</div>
                        </div>
                      </div>
                      <div className='what-the-catch-scroll-container'>
                        {Bug()}
                      </div>
                    </div>
                    <div className='what-the-catch-container-page' style={{ border: "#505dbe solid" }}>
                      <div>
                        <div style={{ fontSize: "200%", color: "#505dbe" }}>Sea Creatures</div>
                        <div className="scroll" style={{ color: "#505dbe" }}>
                          <div style={{ width: "64px", height: "1px" }}></div>
                          <div style={{ width: "15%", textAlign: "center" }}>Name</div>
                          <div style={{ width: "15%", textAlign: "center" }}>Shadow</div>
                          <div style={{ width: "20%", textAlign: "center" }}>Swimming</div>
                          <div style={{ width: "15%", textAlign: "center" }}>Price</div>
                        </div>
                      </div>
                      <div className='what-the-catch-scroll-container'>
                        {Sea()}
                      </div>
                    </div></>}
              </>}
            </div>
          </div>
        </>}

    </>
  );
}

export default App;
