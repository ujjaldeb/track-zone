import { useState } from "react";

const useEvent = () => {
    const [formState, setFormState] = useState(null);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState({});

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

    const handleEditEvent = () => {
        setFormState({
            ...formState,
        })
    }

    const handleDeleteEvent = (ev, id) => {
        const filteredEvents = events.filter((event, index) => ev !== event && id !== index);

        setEvents([
            ...filteredEvents,
        ]);
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