import React, { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import jsonData from '../../assets/JSON/JsonDataClient.json'
import { MAX_COUNT } from '../../utils/constants'

const Index = () => {
    const [data, setData] = useState([])

    const hours = Array.from(Array(24).keys())

    useEffect(() => {
        setData(jsonData.sort((a, b) => b.day - a.day))
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.matrixBox}>
                <div className={styles.hoursRow}>
                    <p className={styles.hourTag}>Hours</p>
                    {hours?.map(hour => {
                        return (
                            <p className={styles.hour}>{hour}</p>
                        )
                    })}
                </div>
                
                {data?.map(d => {
                    const date = d.day.slice(-2)
                    const sortDate = d.hours.sort((a, b) => a.hour - b.hour)

                    return (
                        <div 
                            key={date} 
                            className={styles.dateRow}
                        >
                            <p className={styles.date}>{date}</p>

                            {hours?.map(hour =>{
                                const findHourIndex = sortDate.findIndex(a=>parseInt(a.hour.slice(-2)) === hour)
                                
                                if(findHourIndex !== -1){
                                    const recordCount = sortDate[findHourIndex]?.record_count
                                    let opacity = recordCount;

                                    if (recordCount) {
                                        opacity = recordCount / MAX_COUNT * 100
                                        opacity = Math.floor(opacity)
                                        opacity = opacity === 100 ? '1' : '.' + opacity
                                    }
                                    return(
                                        <div
                                            className={styles.box}
                                            style={{ backgroundColor: `${opacity ? `rgba(15,87,27,${opacity})` : 'gray'}` }}
                                        ></div>  
                                    )
                                }else{
                                    return(
                                        <div
                                            className={styles.box}
                                        ></div>  
                                    )
                                }
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Index