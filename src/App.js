import Axios from "axios";
import './App.css';
import React, { useEffect, useState } from "react"; import { useCookies } from 'react-cookie';
import { BiTimeFive, BiMenu, BiInfoCircle } from 'react-icons/bi';

function App() {
  const [cookies, setCookie] = useCookies(['timeZone', 'hemi'])
  const [date, setDate] = useState(new Date())
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone); const [showTimezone, setShowTimezone] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mode, setMode] = useState("fish"); const [modeColor, setModeColor] = useState("#4ba3c3"); const [showMenu, setShowMenu] = useState(false)
  const mon = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  const [fish, setFish] = useState([]); const [bug, setBug] = useState([]); const [sea, setSea] = useState([]);
  const [showFish, setShowFish] = useState(false); const [showBug, setShowBug] = useState(false); const [showSea, setShowSea] = useState(false); 
  const [isSouth, setIsSouth] = useState(false)

  useEffect(() => {
    if (cookies.timeZone == undefined) {
      setCookie('timeZone', 'empty', { path: '/' })
      setCookie('hemi', 'north', { path: '/' })
    }
    if (window.matchMedia("(max-width: 700px)").matches) {
      setIsMobile(true)
    }
    if (cookies.timeZone != 'empty' && cookies.timeZone != undefined) {
      FishRequest()
      BugRequest()
      SeaRequest()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date())
    }, 1000);
  }, [date])

  useEffect(() => {
    if (document.getElementById('mobile-scroll') != undefined) {
      document.getElementById('mobile-scroll').scrollTop = 0;
    }
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
    if (document.getElementById("checkbox").checked) {
      setCookie('hemi', 'south', { path: '/' })
    } else {
      setCookie('hemi', 'north', { path: '/' })
    }
    window.location.reload()
  }

  const Fish = () => {
    let temp = []
    for (let i = 0; i < fish.length; i++) {
      temp.push(
        <div className="what-the-catch-scroll" style={{ color: "#4ba3c3", border: "#4ba3c3 solid" }}>
          <img src={require("./png/fish/" + fish[i].name +".png")} />
          <div style={{ width: "125px", textAlign: "center" }}>{(fish[i].name.replace('-', ' ')).replace('+', '-').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</div>
          <div style={{ width: "64px", textAlign: "center" }} >{fish[i].location.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</div>
          <div style={{ width: "64px", textAlign: "center" }}>{fish[i].shadow.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</div>
          <div style={{ width: "64px", textAlign: "center" }}>{fish[i].price.toLocaleString()} Bells</div>
        </div>
      )
    }
    return temp;
  }

  const FishRequest = () => {
    let time = new Date().toLocaleString('en-US', {hour: '2-digit',   hour12: false, timeZone: cookies.timezone })
    let temp = []
    if (cookies.hemi == "north") {
      Axios.post("https://acnh-server.onrender.com/fish", {
        m: mon[new Date().toLocaleString('en-US', {month: 'numeric',   hour12: false, timeZone: cookies.timeZone }) - 1]
      }).then((response) => {
        setShowFish(true)
        response.data.forEach(d => {
          if (d.time == "all") {
            temp.push(d)
          } else {
            let start = d.time.split('-')[0]
            let end = d.time.split('-')[1]
            if (start > end) {
              if (time >= start) {
                temp.push(d)
              } else if (time <= end) {
                temp.push(d)
              } else {
                return
              }
          } else if (time >= start && time <= end) {
              temp.push(d)
          } else {
              return
          }
          }
        });
    })
    } else if (cookies.hemi == "south") {
      Axios.post("https://acnh-server.onrender.com/fish1", {
        m: mon[new Date().toLocaleString('en-US', {month: 'numeric',   hour12: false, timeZone: cookies.timeZone }) - 1]
      }).then((response) => {
        response.data.forEach(d => {
          if (d.time == "all") {
            temp.push(d)
          } else {
            let start = d.time.split('-')[0]
            let end = d.time.split('-')[1]
            if (start > end) {
              if (time >= start) {
                temp.push(d)
              } else if (time <= end) {
                temp.push(d)
              } else {
                return
              }
          } else if (time >= start && time <= end) {
              temp.push(d)
          } else {
              return
          }
          }
        });
    })
    }
    setFish(temp)
  }

  const BugRequest = () => {
    let time = new Date().toLocaleString('en-US', {hour: '2-digit',   hour12: false, timeZone: cookies.timezone })
    let temp = []
    if (cookies.hemi == "north") {
      Axios.post("https://acnh-server.onrender.com/bug", {
        m: mon[new Date().toLocaleString('en-US', {month: 'numeric',   hour12: false, timeZone: cookies.timeZone }) - 1]
      }).then((response) => {
        setShowBug(true)
        response.data.forEach(d => {
          if (d.time == "all") {
            temp.push(d)
          } else {
            let start = d.time.split('-')[0]
            let end = d.time.split('-')[1]
            if (start > end) {
              if (time >= start) {
                temp.push(d)
              } else if (time <= end) {
                temp.push(d)
              } else {
                return
              }
          } else if (time >= start && time <= end) {
              temp.push(d)
          } else {
              return
          }
          }
        });
    })
    } else if (cookies.hemi == "south") {
      Axios.post("https://acnh-server.onrender.com/bug1", {
        m: mon[new Date().toLocaleString('en-US', {month: 'numeric',   hour12: false, timeZone: cookies.timeZone }) - 1]
      }).then((response) => {
        response.data.forEach(d => {
          if (d.time == "all") {
            temp.push(d)
          } else {
            let start = d.time.split('-')[0]
            let end = d.time.split('-')[1]
            if (start > end) {
              if (time >= start) {
                temp.push(d)
              } else if (time <= end) {
                temp.push(d)
              } else {
                return
              }
          } else if (time >= start && time <= end) {
              temp.push(d)
          } else {
              return
          }
          }
        });
    })
    }
    setBug(temp)
  }

  const SeaRequest = () => {
    let time = new Date().toLocaleString('en-US', {hour: '2-digit',   hour12: false, timeZone: cookies.timezone })
    let temp = []
    if (cookies.hemi == "north") {
      Axios.post("https://acnh-server.onrender.com/sea", {
        m: mon[new Date().toLocaleString('en-US', {month: 'numeric',   hour12: false, timeZone: cookies.timeZone }) - 1]
      }).then((response) => {
        setShowSea(true)
        response.data.forEach(d => {
          if (d.time == "all") {
            temp.push(d)
          } else {
            let start = d.time.split('-')[0]
            let end = d.time.split('-')[1]
            if (start > end) {
              if (time >= start) {
                temp.push(d)
              } else if (time <= end) {
                temp.push(d)
              } else {
                return
              }
          } else if (time >= start && time <= end) {
              temp.push(d)
          } else {
              return
          }
          }
        });
    })
    } else if (cookies.hemi == "south") {
      Axios.post("https://acnh-server.onrender.com/sea1", {
        m: mon[new Date().toLocaleString('en-US', {month: 'numeric',   hour12: false, timeZone: cookies.timeZone }) - 1]
      }).then((response) => {
        response.data.forEach(d => {
          if (d.time == "all") {
            temp.push(d)
          } else {
            let start = d.time.split('-')[0]
            let end = d.time.split('-')[1]
            if (start > end) {
              if (time >= start) {
                temp.push(d)
              } else if (time <= end) {
                temp.push(d)
              } else {
                return
              }
          } else if (time >= start && time <= end) {
              temp.push(d)
          } else {
              return
          }
          }
        });
    })
    }
    setSea(temp)
    console.log(temp)
  }

  const Bug = () => {
    let temp = []
    for (let i = 0; i < bug.length; i++) {
      temp.push(
        <div className="what-the-catch-scroll" style={{ color: "#7cbe56", border: "#7cbe56 solid" }}>
          <img src={require("./png/bug/"+ bug[i].name +".png")} />
          <div style={{ width: "125px", textAlign: "center" }}>{(bug[i].name.replace('-', ' ')).replace('+', '-').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</div>
          <div style={{ width: "100px", textAlign: "center" }} >{bug[i].location.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</div>
          <div style={{ width: "64px", textAlign: "center" }}>{bug[i].price.toLocaleString()} Bells</div>
        </div>
      )
    }
    return temp;
  }

  const Sea = () => {
    let temp = []
    for (let i = 0; i < sea.length; i++) {
      temp.push(
        <div className="what-the-catch-scroll" style={{ color: "#505dbe", border: "#505dbe solid" }}>
          <img src={require("./png/sea/" + sea[i].name +".png")} />
          <div style={{ width: "125px", textAlign: "center" }}>{(sea[i].name.replace('-', ' ')).replace('+', '-').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</div>
          <div style={{ width: "80px", textAlign: "center" }} >{sea[i].shadow.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</div>
          <div style={{ width: "100px", textAlign: "center" }}>{sea[i].swimming.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</div>
          <div style={{ width: "64px", textAlign: "center" }}>{sea[i].price.toLocaleString()} Bells</div>
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
            <div id="bubble-checkbox">
            <input id="checkbox" type='checkbox' value="test" style={{marginRight: "10px"}}/> <div>Southern Hemisphere?</div>
            </div>
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
                      <div className='what-the-catch-scroll-container' id="mobile-scroll">
                        {showFish && showBug && showSea ? Mode() : <div className="text-2" style={{ color: modeColor, textAlign: "center"}}><div>Loading...</div><div>Free can be slow...</div></div>}
                      </div>
                    </> :
                    <>
                      <div style={{ padding: "0px", margin: "0px", width: "90%", height: "10%", marginTop: "10px" }} id="navbar-time"> {new Date().toLocaleString("en-US", { timeZone: cookies.timeZone })}</div>
                      <div className="text-2" style={{width: "90%", color: "#86be9b"}}> This website is built on React.js (along with HMTL and CSS of course) with MySQL running on AWS RDS and Node.js running on Render. I pretty much chucked all the data into MySQL and then make a request to pull data based off the current month and then parsed the data to see if that current
                        animal could spawn. This website is also mostly mobile friendly.
                         </div>
                    </>
                  }
                </div>
              </> : <>
                {showMenu
                  ?
                  <>
                    <div className='what-the-catch-container-page'>
                        <div style={{ fontSize: "200%" }}>Info</div>
                          <div className="text-2" style={{width: "90%", color: "#86be9b"}}> This website is built on React.js (along with HMTL and CSS of course) with MySQL running on AWS RDS and Node.js running on Render. I pretty much chucked all the data into MySQL and then make a request to pull data based off the current month and then parsed the data to see if that current
                          animal could spawn. This website is also mostly mobile friendly.
                          </div>
                          <div className="text" style={{ fontSize: "200%", color: "#86be9b" }}>References</div>
                          <a href="https://nookipedia.com/wiki/Fish/New_Horizons">https://nookipedia.com/wiki/Fish/New_Horizons</a>
                          <a href="https://nookipedia.com/wiki/Bug/New_Horizons">https://nookipedia.com/wiki/Bug/New_Horizons</a>
                          <a href="https://nookipedia.com/wiki/Sea_creature/New_Horizons">https://nookipedia.com/wiki/Sea_creature/New_Horizons</a>
                          <br/>
                          <div className="text" id="back" style={{color: "#86be9b"}} onClick={() => {setShowMenu(false)}}>Go Back</div>
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
                          <div style={{ width: "125px", textAlign: "center" }}>Name</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Location</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Shadow</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Price</div>
                        </div>
                      </div>
                      <div className='what-the-catch-scroll-container'>
                        {!showFish ? <div className="text-2" style={{ color: "#4ba3c3" }}>Loading...</div> : Fish()}
                      </div>
                    </div>
                    <div className='what-the-catch-container-page' style={{ border: "#7cbe56 solid" }}>
                      <div>
                        <div style={{ fontSize: "200%", color: "#7cbe56" }}>Insects</div>
                        <div className="scroll" style={{ color: "#7cbe56" }}>
                          <div style={{ width: "64px", height: "1px" }}></div>
                          <div style={{ width: "125px", textAlign: "center" }}>Name</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Location</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Price</div>
                        </div>
                      </div>
                      <div className='what-the-catch-scroll-container'>
                        {!showBug ? <div className="text-2" style={{ color: "#7cbe56" }}>Loading...</div> : Bug()}
                      </div>
                    </div>
                    <div className='what-the-catch-container-page' style={{ border: "#505dbe solid" }}>
                      <div>
                        <div style={{ fontSize: "200%", color: "#505dbe" }}>Sea Creatures</div>
                        <div className="scroll" style={{ color: "#505dbe" }}>
                          <div style={{ width: "64px", height: "1px" }}></div>
                          <div style={{ width: "125px", textAlign: "center" }}>Name</div>
                          <div style={{ width: "80px", textAlign: "center" }}>Shadow</div>
                          <div style={{ width: "100px", textAlign: "center" }}>Swimming</div>
                          <div style={{ width: "64px", textAlign: "center" }}>Price</div>
                        </div>
                      </div>
                      <div className='what-the-catch-scroll-container'>
                      {!showSea ? <div className="text-2" style={{ color: "#505dbe" }}>Loading...</div> : Sea()}
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
