import TextInput from "../../UI/inupts/TextInput";
import Label from '../../UI/texts/Label';

const InputGroup = ({ type, label, name, placeholder, error, value, onChange }) => {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <TextInput
                type={type}
                name={name}
                id={name}
                placeholder={placeholder ?? ''}
                error={error}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputGroup;