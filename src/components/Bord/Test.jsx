import React, { useEffect, useState, useRef } from 'react';
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
        const intervalId = setInterval(fetchData, 50); // обновляем данные каждые 5 секунд

        return () => {
            clearInterval(intervalId); // очищаем интервал при размонтировании компонента
        };
    }, []);


    const checkTimer = () => {
        console.log(data.progress_bar_state);
    };
    setInterval(() => {
        checkTimer();
    }, 1000);

    return (
        <h1 id='check'>{data.progress_bar_state}</h1>
    )
}

export default App;