import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import {useSearchParams} from "react-router-dom"

const groomsmen = ["evan", "caleb", "justin", "steven", "jimmy"] as const;
type Groomsman = typeof groomsmen[number];

function capitalize(val: string) {
  return val[0].toUpperCase() + val.slice(1);
}

function setWaitStep(callBack: () => void, sec: number) {
  setTimeout(function () {
    callBack()
  }, sec);
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [step, setStep] = useState<number>(0);
  
  const person = searchParams.get("awesome-person") as Groomsman

  if (!person || !groomsmen.includes(person)) {
    return (
      <div>
        <h1>You are not allowed here!</h1>
      </div>
    );
  }

  return (
    <div className="App">
      {step}
      <div className='content'>
        <h1>Hi {capitalize(person)},</h1>
        <div className={`step-holder ${step >= 5 ? "hide" : ""}`}>
          <h2>I have a very important question for you...</h2>
          <button onClick={() => setStep(1)}>Okay ask away...</button>
          <div className={`accordion ${step >= 1 ? "show" : ""}`}>
            <p>
              I wanted to do something cooler, but this was the best I could come up with...
            </p>
            <button onClick={() => {
              setStep(2);
              setWaitStep(() => {
                setStep(3);
                setWaitStep(() => setStep(4), 1500);
              }, 2000)
            }}>No problem, carry on!</button>
          </div>
          <div className={`accordion ${step >= 2 ? "show" : ""}`}>
            <p>
              Okay here it goes...
            </p>
          </div>
          <div className={`accordion ${step >= 3 ? "show" : ""}`}>
            <p>
              ...
            </p>
          </div>
          <div className={`accordion ${step >= 4 ? "show" : ""}`}>
            <p>
              Are you sure you're ready for this?
            </p>
            <button onClick={() => setStep(5)}>Yes!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
