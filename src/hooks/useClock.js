import { useEffect, useState } from "react";

const useClock = (init, towns) => {
    const [seconds, setSeconds] = useState(new Date().getTime());
    const [cities, setCities] = useState(null);
    const [zones, setZones] = useState({ ...init });
    const [editOp, setEditOp] = useState('');

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
        if (window.confirm('Do you want to delete the clock?')) {
            const filteredZones = zones.timeZone.filter((zone, index) => index !== id);

            setZones({
                ...zones,
                timeZone: [
                    ...filteredZones,
                ],
            });
        }

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

    return {
        seconds,
        cities,
        zones,
        editOp,
        handleClick,
        handleCityClock,
        handleDelete,
        handleEdit,
        handleChange
    }
};

export default useClock;