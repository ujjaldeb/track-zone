import React, { useEffect, useState } from 'react';
import AddClockOpt from '../components/shared/AddClockOpt';
import Clock from '../components/shared/Clock';
import InputGroup from '../components/shared/forms/InputGroup';
import Button from '../components/UI/buttons/Button';
import Container from '../components/UI/containers/Container';
import ErrorMsg from '../components/UI/errorMsg/ErrorMsg';
import Form from '../components/UI/form/Form';
import Header from '../components/UI/header/Header';
import Heading1 from '../components/UI/headings/Heading1';
import Heading3 from '../components/UI/headings/Heading3';
import UnOrderedList from '../components/UI/lists/UnorderedList';
import Main from '../components/UI/main/Main';

const init = {
    timeZone: []
}

const towns = ['Europe/Paris', 'Pacific/Fiji', 'Asia/Shanghai', 'Asia/Tokyo', 'Europe/Berlin', 'Asia/Dhaka', 'America/Chicago', 'Africa/Algiers', 'Asia/Kathmandu', 'Australia/Sydney', 'Pacific/Auckland'];

const App = () => {
    const [seconds, setSeconds] = useState(new Date().getTime());
    const [cities, setCities] = useState(null);
    const [zones, setZones] = useState({ ...init });
    const [editOp, setEditOp] = useState('');
    const [formState, setFormState] = useState(null);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState({});
    // const [tz, setTz] = useState('UTC');

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(new Date().getTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const handleClick = (e) => {
        setCities([
            ...towns
        ]);
    }

    const handleCityClock = (city) => {
        setCities([]);

        if (!zones.timeZone.includes(city)) {
            setZones({
                ...zones,
                timeZone: [
                    city, ...zones.timeZone,
                ],
            });
        }
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

        if (!zones.timeZone.includes(value)) {
            setZones({
                ...zones,
                timeZone: [
                    value, ...fileteredZones,
                ],
            });
        }

        setEditOp('');
    }

    const handleAddEvent = (city, id) => {
        setFormState({
            city,
            id,
            title: '',
            time: '',
        });
    }

    const handleFormElement = (e) => {
        if (error.title && formState.title) {
            setError({
                ...error,
                [e.target.name]: '',
            });
        }

        if (error.time && formState.time) {
            setError({
                ...error,
                [e.target.name]: '',
            });
        }

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formState.title) {
            error.title = 'Invalid title';

            setError({
                ...error,
            });
        } else if (!formState.time) {
            error.time = 'Invalid time';

            setError({
                ...error,
            });
        } else {
            setEvents([
                formState,
                ...events,
            ]);

            setError({});
            setFormState(null);
        }

    }

    // const handleEditEvent = () => {
    //     // TO do
    // }

    const handleDeleteEvent = (ev, id) => {
        const filteredEvents = events.filter((event, index) => ev !== event && id !== index);
        setEvents([
            ...filteredEvents,
        ]);
    }

    console.log(events);

    return (
        <Container>
            <Header>
                <Heading1>World Clock</Heading1>
                {seconds && <Heading3>{new Date(seconds).toLocaleTimeString('en-GB', { timeZone: 'UTC' })} [GMT]</Heading3>}
                {/* <Button onClick={() => handleEdit()}>Edit</Button> */}
                <Button onClick={handleClick}>Add Clock</Button>
                <UnOrderedList>
                    {cities && cities.map((city, index) => <AddClockOpt
                        key={index}
                        city={city}
                        index={index}
                        handleCityClock={handleCityClock}
                    />)}
                </UnOrderedList>
            </Header>

            <Main>
                {editOp && <select style={{ marginBottom: '1rem' }} onChange={handleChange}>
                    <option value="">Select</option>
                    {towns.map(town => <option value={town}>{town}</option>)}
                </select>}

                {formState && <Form onSubmit={handleSubmit}>
                    <InputGroup
                        type="text"
                        label="Title: "
                        name="title"
                        error={error.title}
                        placeholder={'Enter event title'}
                        onChange={handleFormElement}
                    />
                    <InputGroup
                        type="time"
                        label="Time: "
                        name="time"
                        error={error.time}
                        placeholder={'Enter time'}
                        onChange={handleFormElement}
                    />
                    <button type='submit'>Submit</button>
                </Form>}

                <div style={{ marginBottom: '1rem' }}>
                    {Object.keys(error).length !== 0 && Object.keys(error).map(item => <ErrorMsg>{error[item]} </ErrorMsg>)}
                </div>

                <UnOrderedList>
                    {zones.timeZone.map((city, i) => <Clock
                        key={i}
                        city={city}
                        i={i}
                        seconds={seconds}
                        events={events}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleAddEvent={handleAddEvent}
                        handleDeleteEvent={handleDeleteEvent}
                    />)}
                </UnOrderedList>
            </Main>
        </Container>
    );
};

export default App;