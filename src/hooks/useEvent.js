import { useState } from "react";
import shortid from 'shortid';

const useEvent = () => {
    const [formState, setFormState] = useState(null);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState({});

    const handleAddEvent = (city, id) => {
        setFormState({
            city,
            id,
            uniqueID: shortid.generate(),
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

            return;
        }

        if (error.time && formState.time) {
            setError({
                ...error,
                [e.target.name]: '',
            });

            return;
        }

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();

        if (!formState.title) {
            error.title = 'Invalid title';

            setError({
                ...error,
            });

            return;
        } else if (!formState.time) {
            error.time = 'Invalid time';

            setError({
                ...error,
            });

            return;
        } else {
            if (id === formState.uniqueID) {
                const filteredEvent = events.filter((event) => id !== event.uniqueID);

                setEvents([
                    formState,
                    ...filteredEvent,
                ]);
            } else {
                setEvents([
                    formState,
                    ...events,
                ]);
            }

            setError({});
            setFormState(null);
        }

    }

    const handleEditEvent = (id) => {
        const theEvent = events.find((event) => id === event.uniqueID);

        setFormState({
            ...theEvent,
        })
    }

    const handleDeleteEvent = (ev, id) => {
        if (window.confirm('Do you want to delete the event?')) {
            const filteredEvents = events.filter((event, index) => ev !== event && id !== index);

            setEvents([
                ...filteredEvents,
            ]);
        }
    }

    return {
        formState,
        events,
        error,
        handleAddEvent,
        handleFormElement,
        handleSubmit,
        handleDeleteEvent,
        handleEditEvent,
    }
};

export default useEvent;