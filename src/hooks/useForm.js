import { useState } from "react";
import { deepClone, isObjEmpty } from "../utils/object-utils";

/**
 * @typedef {Object} Param
 * @property {Object} init
 * @property {(Object | boolean)} validate
 * 
 * create forms using this useForm hook easily
 * @param {Param} param
 * @returns 
 */

const useForm = ({ init, validate }) => {
    const [state, setState] = useState(mapValuesToState(init));

    const handleChange = (e) => {
        const { name: key, value, type, checked } = e.target;

        const oldState = deepClone(state);

        if (type === 'checkbox') {
            oldState[key].value = checked;
        } else {

            oldState[key].value = value;
        }

        const { errors } = getErrors();

        if (oldState[key].touched && errors[key]) {
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = '';
        }

        setState(oldState);
    }

    const handleFocus = (e) => {
        const { name } = e.target;

        const oldState = deepClone(state);
        oldState[name].focused = true;

        if (!oldState[name].touched) {
            oldState[name].touched = true; // touch akbar true hoye gele aar false kora jai na
        }

        setState(oldState);
    }

    const handleBlur = (e) => {
        const key = e.target.name;

        const { errors } = getErrors();
        const oldState = deepClone(state);

        if (oldState[key].touched && errors[key]) {
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = '';
        }

        oldState[key].focused = false;
        setState(oldState);
    }

    const handleSubmit = (e, cb) => {
        e.preventDefault();

        const { hasError, errors, values } = getErrors();
        cb({
            hasError,
            errors,
            values,
            touched: mapStateToKeys(state, 'touched'),
            focused: mapStateToKeys(state, 'focused'),
        });

        // if (typeof validate === 'boolean') {
        //     if (validate) {
        //         cb({
        //             values: mapStateToKeys(state, 'value'),
        //             touched: mapStateToKeys(state, 'touched'),
        //             focused: mapStateToKeys(state, 'focused'),
        //             error: mapStateToKeys(state, 'error'),
        //             hasError: false,
        //         });
        //     } else {
        //         cb({
        //             errors: mapStateToKeys(state, 'error'),
        //             hasError: true,
        //         });
        //     }
        //     return;
        // }

        // if (typeof validate === 'function') {
        //     const values = mapStateToKeys(state, 'values');
        //     const { errors } = validate(values);

        //     const hasError = !isObjEmpty(errors);

        //     if (hasError) {
        //         cb({
        //             errors,
        //             hasError,
        //         });
        //     } else {
        //         cb({
        //             values: mapStateToKeys(state, 'value'),
        //             touched: mapStateToKeys(state, 'touched'),
        //             focused: mapStateToKeys(state, 'focused'),
        //             error: mapStateToKeys(state, 'error'),
        //             hasError: false,
        //         });
        //     }
        // }
    }

    const clear = () => {
        const newState = mapValuesToState(init, true);
        setState(newState);
    }

    const getErrors = () => {
        let hasError = null, errors = null;

        const values = mapStateToKeys(state, 'value');
        console.log(values);

        if (typeof validate === 'boolean') {
            hasError = validate;
            errors = mapStateToKeys(state, 'error');
        } else if (typeof validate === 'function') {
            const errorsFromCB = validate(values);
            // console.log(errorsFromCB);
            hasError = !isObjEmpty(errorsFromCB);
            errors = errorsFromCB;
        } else {
            throw new Error('validate must be a boolean or a function.');
        }

        return {
            values,
            errors,
            hasError,
        }
    }

    return {
        formState: state,
        handleChange,
        handleFocus,
        handleBlur,
        handleSubmit,
        clear,
    }
};

export default useForm;

// helper functions
const mapValuesToState = (values, shouldClear = false) => {
    return Object.keys(values).reduce((acc, key) => {
        acc[key] = {
            value: shouldClear ? '' : values[key],
            error: '',
            focused: false,
            touched: false,
        };

        return acc;
    }, {});
}

const mapStateToKeys = (state, key) => {
    return Object.keys(state).reduce((acc, cur) => {
        acc[cur] = state[cur][key];

        return acc;
    }, {});
}