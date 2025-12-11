import React, {  useEffect, useRef, useState } from 'react'

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [recordNo, setRecordNo] = useState(0);
    const intervalRefId = useRef(null);
    const startTimeRef = useRef(0);
    const [recordTimeArray, setRecordTimeArray] = useState([]);

    useEffect(() => {

        if(isRunning){
            intervalRefId.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            },10)
        }
        

            return () => {
                clearInterval(intervalRefId.current);
            }
            
    },[isRunning])

    

    function start(){

        if(isRunning) return;
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
        
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setIsRunning(false);
        setElapsedTime(0);
        setRecordNo(0);
        setRecordTimeArray([]);
        if(intervalRefId.current){
            clearInterval(intervalRefId.current);
        }
    }

    function record(){
        let RecordTime = lapsedTime();

        setRecordNo(prevNo => prevNo + 1);

        const newArray = {
            id: recordNo + 1,
            time : RecordTime
        }

        setRecordTimeArray(prevArray => [...prevArray, newArray]);
    }

    function lapsedTime(){
        let mins = Math.floor(elapsedTime / (1000 * 60 )% 60);
         let secs = Math.floor(elapsedTime /  (1000) % 60);
         let millisecs =  Math.floor(elapsedTime % 1000 / 10);

         
         mins = String(mins).padStart(2, '0');
         secs = String(secs).padStart(2, '0');
         millisecs = String(millisecs).padStart(2, '0');

         return `${mins} : ${secs} : ${millisecs}`

    }


  return (
    <div className='body'>
    <div className='stopwatch'>
        <div className='display'>
            {lapsedTime()}
        </div>
        <div className='controls'>
            <button className='start' onClick={start}>Start</button>
            <button className='stop' onClick={stop}>Stop</button>
            <button className='reset' onClick={reset}>Reset</button>
            <button className='record'onClick={record} disabled={!isRunning}>Record</button>
        </div>
        <div className='recordTime'>
            <ul>
                
               {recordTimeArray.map(record => (
                <li key={record.id} className='records'>
                    {`Lap ${record.id}: RecordTime ${record.time}`}
                </li>
               ))}
            </ul>
        </div>
    </div>
    </div>
  )
}

export default Stopwatch