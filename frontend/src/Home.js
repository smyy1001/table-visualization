// // Import necessary libraries
// import React, { useState, useEffect } from 'react';
// import Axios from '../Axios'; // To handle API requests
// import { Modal, Button, Table, Form, Input, Select, DatePicker } from 'antd';

// const Home = () => {
//     const [appConfig, setAppConfig] = useState(null); // Holds the app configuration (applicationName, tableDetails, etc.)
//     const [mainTableData, setMainTableData] = useState([]); // Holds data for the mainTable
//     const [formVisible, setFormVisible] = useState(false); // Controls form modal visibility
//     const [triggerModalVisible, setTriggerModalVisible] = useState(false); // Controls trigger table modal visibility
//     const [triggerTableData, setTriggerTableData] = useState([]); // Holds data for the triggered detailTable
//     const [selectedTriggerValue, setSelectedTriggerValue] = useState(null); // Value for the triggered table

//     // Fetch application configuration on component mount
//     useEffect(() => {
//         async function fetchConfig() {
//             const result = await Axios.get('/api/getConfig'); // Replace with your actual endpoint to get config
//             setAppConfig(result.data);
//         }
//         fetchConfig();
//     }, []);

//     // Fetch main table data (when appConfig or mainTable changes)
//     useEffect(() => {
//         if (appConfig) {
//             const mainTable = appConfig.tableDetails.find((table) => table.tableType === 'detailTable');
//             if (mainTable) {
//                 fetchMainTableData(mainTable.tableName); // Fetch data for the mainTable
//             }
//         }
//     }, [appConfig]);

//     const fetchMainTableData = async (tableName) => {
//         const a = "name";
//         const b = "123"; 
//         const result = await Axios.get('/api/getDetailTableData/name/123'); // Replace with your actual endpoint
//         setMainTableData(result.data);
//     };

//     const handleAddRecord = async (values) => {
//         // Handle adding new records to the main table
//         const mainTable = appConfig.tableDetails.find((table) => table.tableType === 'mainTable');
//         await Axios.post(`/api/insertRecord?table=${mainTable.tableName}`, values); // Replace with your actual endpoint
//         setFormVisible(false);
//         fetchMainTableData(mainTable.tableName); // Refresh data after insertion
//     };

//     const handleTriggerClick = async (fieldValue, triggerTable) => {
//         // Handle click for trigger table
//         const result = await Axios.get(`/api/getDetailTableData?fieldName=${triggerTable.fieldName}&value=${fieldValue}`); // Replace with your endpoint
//         setTriggerTableData(result.data);
//         setSelectedTriggerValue(fieldValue);
//         setTriggerModalVisible(true);
//     };

//     if (!appConfig) {
//         return <div>Loading...</div>; // Loading state
//     }

//     const mainTable = appConfig.tableDetails.find((table) => table.tableType === 'detailTable');

//     return (
//         <div>
//             <h1>{appConfig.applicationName}</h1>
//             <Button onClick={() => setFormVisible(true)} disabled={!mainTable.insertable}>Add New Record</Button>
//             {/* Main Table */}
//             <Table dataSource={mainTableData}>
//                 {mainTable.fields.map((field) => (
//                     <Table.Column
//                         key={field.fieldName}
//                         title={field.fieldLabel}
//                         dataIndex={field.fieldName}
//                         render={(value) =>
//                             field.triggerTable ? (
//                                 <a onClick={() => handleTriggerClick(value, field)}>{value}</a>
//                             ) : (
//                                 value
//                             )
//                         }
//                     />
//                 ))}
//             </Table>

//             <Modal
//                 visible={formVisible}
//                 title="Add New Record"
//                 onCancel={() => setFormVisible(false)}
//                 onOk={() => setFormVisible(false)}
//                 footer={null}
//             >
//                 <Form onFinish={handleAddRecord}>
//                     {mainTable.fields
//                         .filter((field) => field.insertable === "true")
//                         .map((field) => (
//                             <Form.Item
//                                 key={field.fieldName}
//                                 label={field.fieldLabel}
//                                 name={field.fieldName}
//                                 rules={[
//                                     { required: field.canEmptyForInsert === "false", message: `${field.fieldLabel} is required` },
//                                 ]}
//                             >
//                                 {field.type === 'numeric' ? (
//                                     <Input type="number" />
//                                 ) : field.type === 'string' ? (
//                                     <Input />
//                                 ) : field.type === 'date' ? (
//                                     <DatePicker />
//                                 ) : (
//                                     <Input />
//                                 )}
//                             </Form.Item>
//                         ))}
//                     <Button type="primary" htmlType="submit">
//                         Submit
//                     </Button>
//                 </Form>
//             </Modal>

//             {/* Trigger Table Modal */}
//             <Modal
//                 visible={triggerModalVisible}
//                 title={`Details for ${selectedTriggerValue}`}
//                 onCancel={() => setTriggerModalVisible(false)}
//                 footer={null}
//             >
//                 <Table dataSource={triggerTableData}>
//                     {triggerTableData.length > 0 &&
//                         Object.keys(triggerTableData[0]).map((column) => (
//                             <Table.Column key={column} title={column} dataIndex={column} />
//                         ))}
//                 </Table>
//             </Modal>
//         </div>
//     );
// };

// export default Home;





