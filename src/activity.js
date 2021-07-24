import React from "react";
import { useState, useEffect } from "react";

export default function Activity() {
    console.log("enter activity")
    return GetActivity({"activityId":5666238308})
  }

//https://api.madastur.com/strava/activity/5666238308
function GetActivity({ activityId }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  console.log(activityId);
  useEffect(() => {
    if (!activityId){ 
      console.log("no hay nada");
      return};

    setLoading(true);
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
        <p>Activity Time: {data.start_date_local}</p>
        <p>Moving time: {data.moving_time / 60}</p>
        <p>Distance: {data.distance}</p>
      </div>
    </div>
  );
}