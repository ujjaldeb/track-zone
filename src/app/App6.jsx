import React, { useEffect, useState } from 'react';
import Button from '../components/UI/buttons/Button';
import Container from '../components/UI/containers/Container';
import Heading1 from '../components/UI/headings/Heading1';
import Heading3 from '../components/UI/headings/Heading3';
import UnOrderedList from '../components/UI/lists/UnorderedList';
// import { getHours, getMinutes, getSeconds } from 'date-fns';

function getTimeZoneOffset(date, timeZone) {

    // Abuse the Intl API to get a local ISO 8601 string for a given time zone.
    let iso = date.toLocaleString('en-CA', { timeZone, hour12: false }).replace(', ', 'T');

    // Include the milliseconds from the original timestamp
    iso += '.' + date.getMilliseconds().toString().padStart(3, '0');

    // Lie to the Date object constructor that it's a UTC time.
    const lie = new Date(iso + 'Z');

    // Return the difference in timestamps, as minutes
    // Positive values are West of GMT, opposite of ISO 8601
    // this matches the output of `Date.getTimeZoneOffset`
    return -(lie - date) / 60 / 1000;
}

const init = {
    timeZone: []
}

const towns = ['Europe/Berlin', 'Asia/Dhaka', 'America/Chicago'];

const App = () => {
    const [seconds, setSeconds] = useState(new Date().getTime());
    const [cities, setCities] = useState(null);
    const [zones, setZones] = useState({ ...init });
    const [editOp, setEditOp] = useState('');
    // const [formState, setFormState] = useState(null);
    // const [tz, setTz] = useState('UTC');

    useEffect(() => {
        setInterval(() => {
            setSeconds(new Date().getTime());
        }, 1000);
    }, []);

    const handleClick = (e) => {
        setCities([
            ...towns
        ]);
    }

    const handleCityClock = (city) => {
        setCities([]);
        setZones({
            ...zones,
            timeZone: [
                city, ...zones.timeZone,
            ],
        });
    }

    const handleDelete = (id) => {
        const filteredZones = zones.timeZone.filter((zone, index) => index !== id);
        setZones({
            ...zones,
            timeZone: [
                ...filteredZones,
            ],
        });
    }

    const handleEdit = (city) => {
        if (towns.includes(city)) {
            setEditOp(city);
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const fileteredZones = zones.timeZone.filter((zone) => zone !== editOp);
        setZones({
            ...zones,
            timeZone: [
                value, ...fileteredZones,
            ],
        });
        setEditOp('');
    }

    // const handleAddEvent = (city, id) => {
    //     setFormState({
    //         events: [
    //             { city, id, title: '', time: '' },
    //         ],
    //     });
    // }

    // const handleFormElement = (e) => {
    //     setFormState({
    //         ...formState,

    //     });
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // setFormState(null);
    //     // const { city, id, title, time } = formState;
    //     // console.log(city, id, title, time);
    // }


    // console.log(formState);
    // console.log(zone);

    // console.log(date?.getTime());

    return (
        <Container>
            <Heading1>World Clock</Heading1>
            {seconds && <Heading3>{new Date(seconds).toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</Heading3>}
            {/* <Button onClick={() => handleEdit()}>Edit</Button> */}

            <Button onClick={handleClick}>Add City</Button>

            <UnOrderedList>
                {cities && cities.map((city, index) => <li key={index}><Button onClick={() => handleCityClock(city)}>{city}</Button></li>)}
            </UnOrderedList>

            {editOp && <select onChange={handleChange}>
                <option value="">Select</option>
                <option value="Europe/Berlin">Berlin</option>
                <option value="Asia/Dhaka">Dhaka</option>
                <option value="America/Chicago">Chicago</option>
            </select>}

            {/* {formState && <form onSubmit={handleSubmit}>
                <label htmlFor="title"></label>
                <input type="text" name="title" id='title' placeholder='Enter event title' onChange={handleFormElement} />
                <label htmlFor="time"></label>
                <input type="time" name="time" id='time' placeholder='Enter timing' onChange={handleFormElement} />
                <button type='submit'>Submit</button>
            </form>} */}

            <ul>
                {zones.timeZone.map((city, i) => <li key={i}>{seconds && <div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Heading3>{city.split('/')[1]}</Heading3>
                        <span>{'GMT' + (getTimeZoneOffset(new Date(), city) / -60 > 0 ? '+' : '') + getTimeZoneOffset(new Date(), city) / -60}</span>
                        <div>
                            <Button onClick={() => handleEdit(city)}>Edit</Button>
                            <Button onClick={() => handleDelete(i)}>X</Button>
                        </div>
                    </div>

                    <Heading1>{new Date(seconds).toLocaleTimeString('en-GB', { timeZone: city })}</Heading1>
                    {/* {i === formState?.id && <p>{`${formState.title} at ${formState.time}`}</p>} */}
                    {/* <Button onClick={() => handleAddEvent(city, i)}>Add Event</Button> */}
                </div>}</li>)}
            </ul>

            {/* {seconds && <span>{getHours(seconds)}:{getMinutes(seconds)}:{getSeconds(seconds)}</span>} */}
        </Container>
    );
};

export default App;