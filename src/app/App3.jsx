import { useState } from 'react';
import InputGroup from '../components/shared/forms/InputGroup';
import Button from '../components/UI/buttons/Button';

const init = {
    title: '',
    bio: '',
    skills: '',
};

const App = () => {
    const [values, setValues] = useState({ ...init });
    const [errors, setErrors] = useState({ ...init });
    const [focuses, setFocuses] = useState({
        title: false,
        bio: false,
        skills: false,
    });

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        const key = e.target.name;
        const { errors: err } = checkValidity(values);

        if (!err[key]) {
            setErrors((prev) => ({
                ...prev,
                [key]: '',
            }));
        }
    }

    const handleFocus = (e) => {
        setFocuses((prev) => ({
            ...prev,
            [e.target.name]: true,
        }));
    }

    const handleBlur = (e) => {
        const key = e.target.name;
        const { errors: err } = checkValidity(values);

        if (err[key] && focuses[key]) {
            setErrors((prev) => ({
                ...prev,
                [key]: err[key],
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [key]: '',
            }));
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { isValid, errors } = checkValidity(values);

        if (isValid) {
            console.log(values);
            setErrors({ ...errors });
        } else {
            setErrors({ ...errors });
        }
    }

    const checkValidity = (values) => {
        const errors = {};
        const { title, bio, skills } = values;

        if (!title) {
            errors.title = 'Invalid title';
        }

        if (!bio) {
            errors.bio = 'Invalid bio';
        }

        if (!skills) {
            errors.skills = 'Invalid skills';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        }
    }

    return (
        <div className="root">
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <InputGroup
                        value={values.title}
                        name="title"
                        label="Title:"
                        placeholder="Enter your job title"
                        error={errors.title}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <InputGroup
                        value={values.bio}
                        name="bio"
                        label="Bio:"
                        placeholder="Enter your bio"
                        error={errors.bio}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <InputGroup
                        value={values.skills}
                        name="skills"
                        label="Skills:"
                        placeholder="Enter your skills"
                        error={errors.skills}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default App;