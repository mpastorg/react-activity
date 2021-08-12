import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function Activities() {
    console.log("enter activity")
    const { athleteId } = useParams();
    return GetActivities({athleteId})
  }

//https://api.madastur.com/strava/activities/
function GetActivities({ athleteId }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  console.log(athleteId);
  useEffect(() => {
    setLoading(true);
    if (!athleteId){ 
      console.log("no hay nada");
      return <p> Nothing is here!!!</p>;
    }

  fetch(`https://api.madastur.com/strava/activities/${athleteId}`)
      .then(dat => dat.text())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [athleteId]);
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
  const myt = eval(data);
  const listi = myt.map( (ii) => 
  {
    const myurl = "/strava/activity/"+ii.activityid;
    return(
    <tr key={ii.activityid}>
      <td><a href={myurl}>/strava/activity/{ii.activityid}</a>
      </td>
      <td>movingTime:{ii.movingTime}</td>
      <td>calories:{ii.calories}</td>
      <td>activityDate:{ii.activityDate}</td>
    </tr>
    )
  });

  return (
    <div className="stravaActivity">
      <table>
      <tbody>
         {listi}      
      </tbody>
    </table>
    </div>
  );
}