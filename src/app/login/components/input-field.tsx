import React from "react";

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    errorMessage: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   type,
                                                   name,
                                                   value,
                                                   onChange,
                                                   errorMessage,
                                                   required = false,
                                               }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="input validator w-full"
                placeholder={`Digite seu ${label.toLowerCase()}`}
            />
            <div className="validator-hint">{errorMessage}</div>
        </div>
    );
};

export default InputField;
