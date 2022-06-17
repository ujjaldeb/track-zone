import Button from "../UI/buttons/Button";

const AddClockOpt = ({ city, handleCityClock }) => {
    return (
        <li><Button onClick={() => handleCityClock(city)}>{city}</Button></li>
    );
};

export default AddClockOpt;