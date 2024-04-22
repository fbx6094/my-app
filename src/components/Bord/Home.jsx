import React, { useEffect, useState, useRef } from 'react';
import './Homecss.css';


const App = () => {
    const [data, setData] = useState({
        score_team_1: 0,
        score_team_2: 0,
        name_team_1: "Team 1",
        name_team_2: "Team 2",
        team_1_score_street_1: 4,
        team_1_score_street_2: 2,
        team_1_score_street_3: 0,
        team_2_score_street_1: 4,
        team_2_score_street_2: 4,
        team_2_score_street_3: 4,
        team_score_street_main: 2,
        progress_bar_state: 0,
    });
    const sound = useRef(null);
    const loader = useRef(null);
    const startbtn = useRef(null);
    const startbtn0 = useRef(null);
    const timeroff = useRef(null);
    const timer = useRef(null);
    const [timerInterval, setTimerInterval] = useState(null);
    const StreetContainer = ({ label, score }) => (
        <div className="houses_container">
            <div className={score === 4 ? 'triangle_green' : 'triangle'}></div>
            {[...Array(4 - score)].map((_, index) => (
                <div key={index} className="house_white"></div>
            ))}
            {[...Array(score)].map((_, index) => (
                <div key={index} className="house_green"></div>
            ))}
            <div className="street_label">{label}</div>
        </div>
    );

    const Skyscraper = ({ score }) => (
        <div className="houses_containerbig">
            <div className={score === 4 ? 'big_triangle_green' : 'big_triangle'}></div>
            {[...Array(4 - score)].map((_, index) => (
                <div key={index} className="big_house_white"></div>
            ))}
            {[...Array(score)].map((_, index) => (
                <div key={index} className="big_house_green"></div>
            ))}
            <div className="skyscraper_label">НЕБОСКРЕБ</div>
        </div>
    );
    const fetchData = async () => {
        try {
            const response = await fetch("http://193.164.149.85:5000/scores");
            const result = await response.json();
            setData(result[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {


        fetchData();
        const intervalId = setInterval(fetchData, 50); 

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, 5000);
        const metaTag = document.querySelector('meta[name="viewport"]');
        if (metaTag) {
            metaTag.content = 'width=device-width, initial-scale=1.0';
        } else {
            const newMetaTag = document.createElement('meta');
            newMetaTag.name = 'viewport';
            newMetaTag.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(newMetaTag);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, []); 
    const button_hide = () => {
        startbtn.current.style.display = "none";
        startbtn0.current.style.display = "none";
        timer.current.style.display = "block";
        loader.current.style.display = "block";

    };

    const timerof = () => {
        timeroff.current.style.display = 'block';
        timer.current.style.display = 'none';
    };

    const timerfnc = () => {
        var timeLeft = 120;

        function updateTimer() {
            var timerElement = timer.current;
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;
            var formattedMinutes = ("0" + minutes).slice(-2);
            var formattedSeconds = ("0" + seconds).slice(-2);
            timerElement.textContent = formattedMinutes + ":" + formattedSeconds;
            timeLeft--;


            if (timeLeft < 0) {
                clearInterval(timerInterval);
                timerof();
            }
        }

        var timerInterval = setInterval(updateTimer, 1000);
    };



    const handleClick = () => {
        button_hide();
        timerfnc();
    };



    const timerCheckElement = data.progress_bar_state;
    let prevTimer = 0;
    let timerToggled = false;

    const checkTimer = () => {
        setInterval(() => {
            if (prevTimer !== timerCheckElement) {
                timerToggled = false;
            }
            if (timerToggled === true) {
                return;
            }
            if (timerCheckElement === prevTimer) {
                return;
            }
            if (timerToggled === false) {
                if (timerCheckElement === 1) {
                    timerToggled = true;
                    prevTimer = timerCheckElement;
                    console.log("timer started. VALUE = 1");
                    timerStartFromCpl();
                } else if (timerCheckElement === 2) {
                    console.log("restarting by timer. VALUE = 2");
                    restart();
                }
            } else {
                console.log("waiting")
            }
        }, 500);
    };
    setInterval(() => {
        checkTimer();
    }, 250);

    const restart = () => {
        window.location.reload();
    };

    const timerStartFromCpl = () => {
        button_hide();
        timerfnc();
    }

    return (


        <div className="app">
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="main_background"></div>
            <div className="backroudn_for_titles"></div>
            <div className="title_left" style={{ position: 'absolute', top: '1.6%', left: '2%' }}>Робототехнический турнир “ТЕХНОДВИЖ” 2023/2024</div>
            <div className="separator" style={{ position: 'absolute', top: '.5%', left: '36.5%' }}></div>
            <div className="title_center" style={{ position: 'absolute', top: '1.6%', left: '50%', transform: 'translate(-50%)' }}>Товарищеский турнир ВАО</div>
            <div className="separator" style={{ position: 'absolute', top: '.5%', left: '63.5%' }}></div>
            <div className="title_right" style={{ position: 'absolute', top: '1.6%', left: '74%' }}>Квалификационный матч 1</div>
            <div className="logo_left"></div>
            <h1 id="timer_check_element">{data.progress_bar_state}</h1>
            <div className="app" id="app">
               
                <div className="item">
                    <div className="timer_background">
                        <div className="loader" id="loader" ref={loader}>
                            <div className="loading_1"></div>
                        </div>
                    </div>
                    <div className="timer">
                        <span id="startbtn" style={{ fontSize: '35px', color: 'rgb(0, 0, 0)' }} ref={startbtn} >
                            Матч скоро начнётся!
                            
                        </span>
                        <span id="startbtn0" className='match' style={{ fontSize: '35px', color: 'rgb(0, 0, 0)' }} ref={startbtn0}>
                            Матч скоро <br/>начнётся!
                        </span>
                        <span id="timeroff" style={{ fontSize: '35px' }} ref={timeroff}>
                            Время истекло!
                        </span>
                        <h1 id="timer" className='timercss' ref={timer}>
                            02:00
                        </h1>
                    </div>
                </div>
            </div>
            <div className="logo_right"></div>

            <div className="blue_upper_background_with_curve"></div>
            <div className="score_background"></div>
            <div className="blue_upper_background"></div>

            <div className="score">{`${data.score_team_1}:${data.score_team_2}`}</div>

            <div className="item_for_widing0">{data.name_team_1}</div>
            <div className="item_for_widing1">{data.name_team_2}</div>
            < div className="street-container-1" >
                <StreetContainer score={data.team_1_score_street_1} />
                <div className='street-label'>Улица Медиа</div>
            </div>

            <div className="street-container-2">
                <StreetContainer score={data.team_1_score_street_2} />
                <div className='street-label'>Улица Первых</div>
            </div>

            <div className="street-container-3">
                <StreetContainer score={data.team_1_score_street_3} />
                <div className='street-label'>Улица Истории</div>
            </div>

            <div className='street-container-4' >
                <StreetContainer score={data.team_2_score_street_1} />
                <div className='street-label'>Улица Медиа</div>
            </div>

            <div className='street-container-5' >
                <StreetContainer score={data.team_2_score_street_2} />
                <div className='street-label'>Улица Первых</div>
            </div>

            <div className='street-container-6' >
                <StreetContainer score={data.team_2_score_street_3} />
                <div className='street-label'>Улица Истории</div>
            </div>

            <div className="skyscraper-container" >
                <Skyscraper score={data.team_score_street_main} />
            </div>

        </div>
    );
}

export default App;
