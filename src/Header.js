import { useState, useEffect } from "react";
import kuromi from "./assets/kuromi-sitting-on-the-floor-1.png";

function Header() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const format = {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'};
    const formatDate = currentDate.toLocaleDateString(undefined, format);

    return (
        <div className="header">
            <div className="date">
                <h1>TODAY</h1>
                <h3>{formatDate}</h3>
            </div>
            <div className="icon">
                <img src={kuromi} alt="kuromi" height={85}/>
            </div>
        </div>
    )
}

export default Header