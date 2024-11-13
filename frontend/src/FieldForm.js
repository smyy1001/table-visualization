import React, { useState } from "react";

function FieldForm({ fields }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the form data to the backend
        console.log("Form data submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.filter(field => field.insertable).map((field, index) => (
                <div key={index}>
                    <label>{field.fieldLabel}</label>
                    <input
                        type={field.type === "numeric" ? "number" : "text"}
                        name={field.fieldName}
                        required={!field.canEmptyForInsert}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

export default FieldForm;
