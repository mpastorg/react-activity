import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function Activity() {
    console.log("enter activity")
    const { activityId } = useParams();
    return GetActivity({activityId})
  }

//https://api.madastur.com/strava/activity/5666238308
function GetActivity({ activityId }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  console.log(activityId);
  useEffect(() => {
    setLoading(true);
    if (!activityId){ 
      console.log("no hay nada");
      return <p> Nothing is here!!!</p>;
    }

    fetch(`https://api.madastur.com/strava/activity/${activityId}`)
      .then(data => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [activityId]);
  console.log("despues de effect")
  if (loading) {
    console.log("loafing");
    return<h1>loading...</h1>
  };
  if (error)
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!data) {
    console.log("paso por no data")
    return null};
  console.log("paso por aqui");
  return (
    <div className="stravaActivity">
      <div>
        <h3>Athlete Id: {data.athlete.id}</h3>
        <p>Activity Type: {data.type}</p>
        <p>Calories: {data.calories}</p>
        <p>Activity Name: {data.name}</p>
        <p>Avg. Heart Rate: {data.average_heartrate} bpm</p>
        <p>Activity Date: {data.start_date_local.substring(0,10)}</p>
        <p>Activity Time: {data.start_date_local.substring(11,16)}</p>
        <p>Moving time: {data.moving_time / 60} minutes</p>
        <p>Distance: {data.distance}</p>
      </div>
    </div>
  );
}