import { useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import {useSearchParams} from "react-router-dom"
import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import $ from 'jquery';

const groomsmen = ["evan", "caleb", "justin", "steven", "jimmy"] as const;
type Groomsman = typeof groomsmen[number];

function capitalize(val: string) {
  return val[0].toUpperCase() + val.slice(1);
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [step, setStep] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(5);
  
  const person = searchParams.get("awesome-person") as Groomsman

  const bottomRef = useRef<null | HTMLDivElement>(null);;

  if (!person || !groomsmen.includes(person)) {
    return (
      <div>
        <h1>You are not allowed here!</h1>
      </div>
    );
  }

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom();

    if (step === 5) {
      setCountdown(4);
    }
  }, [step])

  useEffect(() => {
    if (countdown > 4) {
      return;
    }

    if (countdown === -1) {
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => {
      clearTimeout(timer);
    };
  }, [countdown])

  function handleClick() {
    $('.alert')
      .show()
      .stop(true, true)
      .delay(4000)
      .fadeOut()
  }

  return (
    <>
      <h1>Hi {capitalize(person)},</h1>
      <div className='header'>
        <h2>I have a very important question for you...</h2>
        <div className={`countdown ${step >= 5 && countdown !== -1 ? "" : "hide"}`}>
          {countdown}
        </div>
        <div style={{margin: "auto 50%"}}>
            {countdown === -1 && <ConfettiExplosion />}
        </div>
        <div className={`question ${countdown === -1 ? "" : "hide"}`}>
          <div className='question-text'>
            <div className='question-text-conf'>
              <div>🎉</div><div>🎉</div>
            </div>
            <div>
              Will you be my groomsman?
            </div>
            <div className='question-text-conf'>
              <div>🎉</div><div>🎉</div>
            </div>
          </div>
          <button style={{maxWidth: "100px", width: "100px"}}>Yes</button><br />
          <button style={{maxWidth: "100px", width: "100px"}} onClick={() => handleClick()}>No</button><br />
          <div className="alert hide">❌ I'm sorry, that answer isn't allowed, try a different one ❌</div>
        </div>
      </div>
      <div className={`step-holder ${step >= 5 ? "hide" : ""}`}>
        <button onClick={() => setStep(1)}>Okay ask away...</button>
        <div className={`accordion ${step >= 1 ? "show" : ""}`}>
          <p>
            I wanted to do something cooler, but this was the best I could come up with...
          </p>
          <button onClick={() => {
            setStep(2);
            setTimeout(() => {
              setStep(3);
              setTimeout(() => setStep(4), 1000);
            }, 1500)
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
        <div ref={bottomRef} />
      </div>
    </>
  )
}

export default App
