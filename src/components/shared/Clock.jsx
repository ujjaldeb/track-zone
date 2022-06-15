import { getTimeZoneOffset } from "../../utils/object-utils";
import Button from "../UI/buttons/Button";
import Heading1 from "../UI/headings/Heading1";
import Heading3 from "../UI/headings/Heading3";
import ListItem from "../UI/listItem/ListItem";
import AnEvent from "./AnEvent";

const Clock = ({ city, i, seconds, handleEdit, handleDelete, handleAddEvent, events, handleEditEvent, handleDeleteEvent }) => {
    return (
        <ListItem>{seconds && <div>
            <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                <Heading3>{city.split('/')[1]}</Heading3>
                <span style={{ fontSize: '0.8rem' }}>{'GMT' + (getTimeZoneOffset(new Date(), city) / -60 > 0 ? '+' : '') + getTimeZoneOffset(new Date(), city) / -60}</span>
                <Button onClick={() => handleEdit(city)}>Edit</Button>
                <Button onClick={() => handleDelete(i)}>X</Button>
            </div>

            <Heading1>{new Date(seconds).toLocaleTimeString('en-GB', { timeZone: city })}</Heading1>

            {events.map((event, index) => city === event.city && <AnEvent
                index={index}
                event={event}
                handleDeleteEvent={handleDeleteEvent}
            />)}
            <Button style={{ display: 'block', marginLeft: 'auto' }} onClick={() => handleAddEvent(city, i)}>Add Event</Button>
        </div>}</ListItem>
    );
};

export default Clock;