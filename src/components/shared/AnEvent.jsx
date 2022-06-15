const AnEvent = ({ index, event, handleDeleteEvent }) => {
    return (
        <p key={index}>
            <span style={{ display: 'inline-block', margin: '0.4rem', color: '#666' }}>{event.title} at {event.time}</span>
            {/* <button onClick={() => handleEditEvent(event, index)}> <small>Edit</small> </button> */}
            <button onClick={() => handleDeleteEvent(event, index)}> <small>x</small> </button>
        </p>
    );
};

export default AnEvent;