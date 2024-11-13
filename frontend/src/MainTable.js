import React, { useState } from "react";
import FieldForm from "./FieldForm";
import Axios from './Axios';
import Modal from "./Modal";

function MainTable({ tableDetails }) {
    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const mainTable = tableDetails.filter((table) => table.tableType === "mainTable");

    if (!mainTable) {
        return <div>No main table found</div>;
    }

    const handleFieldClick = (fieldValue, triggerTable) => {
        // Adjusted the URL to match the backend mapping
        Axios.get(`/api/detay-tablo/${triggerTable}/${fieldValue}`)
            .then(response => {
                setModalData(response.data);
                setShowModal(true);
            })
            .catch(error => {
                console.error("Error fetching config:", error);
            });
    };



    return (
        <div>
            <h2>{mainTable.tableLabel}</h2>
            {mainTable.map((f, i) => (
                <table key={i}>
                    <thead>
                        <tr>
                            {f.fields.filter(field => field.viewOnResults).map((field, index) => (
                                <th key={index}>{field.fieldLabel}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {f.fields.filter(field => field.viewOnResults).map((field, index) => (
                                <td key={index}>
                                    {field.triggerTable ? (
                                        <span onClick={() => handleFieldClick(field.value, field.triggerTable)}>
                                            {field.value}
                                        </span>
                                    ) : (
                                        field.value
                                    )}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ))}



            {mainTable.insertable && <FieldForm fields={mainTable.fields} />}

            {showModal && <Modal data={modalData} onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default MainTable;
