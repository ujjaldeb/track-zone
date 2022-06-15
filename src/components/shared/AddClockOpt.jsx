import Button from "../UI/buttons/Button";

const AddClockOpt = ({ index, city, handleCityClock }) => {
    return (
        <li key={index}><Button onClick={() => handleCityClock(city)}>{city}</Button></li>
    );
};

export default AddClockOpt;