const AnEvent = ({ index, event, handleDeleteEvent, handleEditEvent }) => {
    return (
        <p key={index}>
            <span style={{ display: 'inline-block', margin: '0.4rem', color: '#666' }}>{event.title} at {event.time}</span>
            <button style={{ marginRight: '0.3rem' }} onClick={handleEditEvent}> <small>Edit</small> </button>
            <button onClick={() => handleDeleteEvent(event, index)}> <small>x</small> </button>
        </p>
    );
};

export default AnEvent;