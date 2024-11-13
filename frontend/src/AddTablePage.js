// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Select, DatePicker, Modal } from 'antd';
// import Axios from '../Axios';
// import moment from 'moment';

// const { Option } = Select;

// const AddTablePage = () => {
//     const [appConfig, setAppConfig] = useState(null); // Holds the app configuration
//     const [form] = Form.useForm(); // Form instance
//     const [tableType, setTableType] = useState('mainTable'); // Selected table type: mainTable or detailTable
//     const [tableDetails, setTableDetails] = useState([]); // Table details specific to the selected type

//     // Fetch application configuration on component mount
//     useEffect(() => {
//         async function fetchConfig() {
//             const result = await Axios.get('/api/getConfig'); // Replace with your actual backend endpoint
//             setAppConfig(result.data);
//         }
//         fetchConfig();
//     }, []);

//     // Filter table details based on selected table type
//     useEffect(() => {
//         if (appConfig) {
//             const filteredTableDetails = appConfig.tableDetails.filter(
//                 (table) => table.tableType === tableType
//             );
//             setTableDetails(filteredTableDetails);
//         }
//     }, [appConfig, tableType]);

//     const handleSubmit = async (values) => {
//         values.tableType = tableType;
//         if (values.recordDate) {
//             values.recordDate = values.recordDate.format('YYYY-MM-DD');
//         }
//         const endpoint = '/api/createTableInstance';
//         const res = await Axios.post(endpoint, values); 
//         console.log("hereeee", res.data);
//         Modal.success({
//             title: 'Success',
//             content: `Tablo oluşturuldu!`,
//         });
//         form.resetFields();
//     };

//     if (!appConfig) {
//         return <div>Loading...</div>; // Loading state
//     }

//     return (
//         <div>
//             <h1>Create {tableType === 'mainTable' ? 'Main Table' : 'Detail Table'} Instance</h1>

//             {/* Select table type (mainTable or detailTable) */}
//             <Form.Item label="Select Table Type">
//                 <Select
//                     value={tableType}
//                     onChange={(value) => setTableType(value)}
//                     style={{ width: 200 }}
//                 >
//                     <Option value="mainTable">Main Table</Option>
//                     <Option value="detailTable">Detail Table</Option>
//                 </Select>
//             </Form.Item>

//             {/* Form to create table instance */}
//             <Form form={form} layout="vertical" onFinish={handleSubmit}>
//                 {tableDetails.length > 0 &&
//                     tableDetails[0].fields.map((field) => (
//                         <Form.Item
//                             key={field.fieldName}
//                             label={field.fieldLabel}
//                             name={field.fieldName}
//                             rules={[
//                                 { required: field.canEmptyForInsert === 'false', message: `${field.fieldLabel} is required` },
//                             ]}
//                         >
//                             {field.type === 'numeric' ? (
//                                 <Input type="number" />
//                             ) : field.type === 'string' ? (
//                                 <Input />
//                             ) : field.type === 'date' ? (
//                                 <DatePicker
//                                     format="YYYY-MM-DD" // Enforce date format
//                                     // If initial value is provided, parse it to moment
//                                     defaultValue={field.value ? moment(field.value, 'YYYY-MM-DD') : null}
//                                 />
//                             ) : (
//                                 <Input />
//                             )}
//                         </Form.Item>
//                     ))}

//                 {/* Submit button */}
//                 <Button type="primary" htmlType="submit">
//                     Create {tableType === 'mainTable' ? 'Main Table' : 'Detail Table'} Instance
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default AddTablePage;
