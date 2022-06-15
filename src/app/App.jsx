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
import useClock from '../hooks/useClock';
import useEvent from '../hooks/useEvent';

const init = {
    timeZone: []
}

const towns = ['Europe/Paris', 'Pacific/Fiji', 'Asia/Shanghai', 'Asia/Tokyo', 'Europe/Berlin', 'Asia/Dhaka', 'America/Chicago', 'Africa/Algiers', 'Asia/Kathmandu', 'Australia/Sydney', 'Pacific/Auckland'];

const App = () => {
    const { seconds, cities, zones, editOp, handleClick, handleCityClock, handleDelete, handleEdit, handleChange } = useClock(init, towns);
    const { formState, events, error, handleAddEvent, handleFormElement, handleSubmit, handleDeleteEvent } = useEvent();

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
                    {towns.map((town, i) => <option key={i} value={town}>{town}</option>)}
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
                    {Object.keys(error).length !== 0 && Object.keys(error).map((item, index) => <ErrorMsg key={index}>{error[item]} </ErrorMsg>)}
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