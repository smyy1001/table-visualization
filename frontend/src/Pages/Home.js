import React, { useState, useEffect } from 'react';
import Axios from '../Axios';
import { Modal, Table, Tooltip, Input, InputNumber, DatePicker, Form, Button } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import moment from 'moment';
import './Home.css';

const Home = () => {
    const [perPage] = useState(11);
    const [appConfig, setAppConfig] = useState(null);
    const [mainTableData, setMainTableData] = useState([]);
    const [detailTableData, setDetailTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredDetailData, setFilteredDetailData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMainTableAddModalVisible, setIsMainTableAddModalVisible] = useState(false);
    const [isDetailTableAddModalVisible, setIsDetailTableAddModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [detailSortOrder, setDetailSortOrder] = useState(null);
    const [detailSortedColumn, setDetailSortedColumn] = useState(null);
    const [mainTableForm] = Form.useForm();
    const [detailTableForm] = Form.useForm();

    useEffect(() => {
        async function fetchConfig() {
            const result = await Axios.get('/api/getConfig');
            setAppConfig(result.data);
        }
        fetchConfig();
    }, []);

    async function fetchMain() {
        const result = await Axios.get('/api/ana');
        setMainTableData(result.data);
        setFilteredData(result.data);
    }
    async function fetchDetail() {
        const result = await Axios.get('/api/detay');
        setDetailTableData(result.data);
        setFilteredDetailData(result.data);
    }

    useEffect(() => {
        fetchMain();
        fetchDetail();
    }, [appConfig]);

    if (!appConfig) {
        return <div>Loading...</div>;
    }

    const mainTableConfig = appConfig.tableDetails.find(
        (table) => table.tableType === 'mainTable'
    );

    const detailTableConfig = appConfig.tableDetails.find(
        (table) => table.tableType === 'detailTable'
    );

    const handleTriggerClick = (triggerTable) => {
        setModalTitle(detailTableConfig.tableLabel);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setFilteredDetailData(detailTableData);
    };

    const handleSort = (fieldName) => {
        let newSortOrder = 'ascend';
        if (sortedColumn === fieldName && sortOrder === 'ascend') {
            newSortOrder = 'descend';
        }
        setSortOrder(newSortOrder);
        setSortedColumn(fieldName);

        const sortedData = [...filteredData].sort((a, b) => {
            if (newSortOrder === 'ascend') {
                return a[fieldName] > b[fieldName] ? 1 : -1;
            } else {
                return a[fieldName] < b[fieldName] ? 1 : -1;
            }
        });
        setFilteredData(sortedData);
    };

    const handleDetailSort = (fieldName) => {
        let newSortOrder = 'ascend';
        if (detailSortedColumn === fieldName && detailSortOrder === 'ascend') {
            newSortOrder = 'descend';
        }
        setDetailSortOrder(newSortOrder);
        setDetailSortedColumn(fieldName);

        const sortedData = [...filteredDetailData].sort((a, b) => {
            if (newSortOrder === 'ascend') {
                return a[fieldName] > b[fieldName] ? 1 : -1;
            } else {
                return a[fieldName] < b[fieldName] ? 1 : -1;
            }
        });
        setFilteredDetailData(sortedData);
    };

    const handleFilter = (fieldName, value) => {
        if (value === null || value === '') {
            setFilteredData(mainTableData);
        } else {
            const newFilteredData = mainTableData.filter((item) => {
                if (fieldName === 'recordDate') {
                    return value === moment.utc(item[fieldName]).format('YYYY-MM-DD');
                }
                return item[fieldName]
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase());
            });
            setFilteredData(newFilteredData);
        }
    };

    const handleDetailFilter = (fieldName, value) => {
        if (value === null || value === '') {
            setFilteredDetailData(detailTableData);
        } else {
            const newFilteredData = detailTableData.filter((item) => {
                return item[fieldName]
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase());
            });
            setFilteredDetailData(newFilteredData);
        }
    };


    // Main Table 
    const showMainTableAddModal = () => {
        setIsMainTableAddModalVisible(true);
    };

    const handleMainTableFormModalClose = () => {
        setIsMainTableAddModalVisible(false);
        mainTableForm.resetFields();
    };

    const handleMainTableFormSubmit = async (values) => {
        const formattedValues = {
            ...values,
            recordDate: (values.recordDate) ? values.recordDate.toISOString() : null,
        };

        try {
            const response = await Axios.post('/api/ana/insert', formattedValues);
            console.log('Response:', response.data);
            fetchMain();
            setIsMainTableAddModalVisible(false);
            mainTableForm.resetFields();
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };


    // Detail Table
    const showDetailTableAddModal = () => {
        setIsDetailTableAddModalVisible(true);
    };

    const handleDetailTableFormModalClose = () => {
        setIsDetailTableAddModalVisible(false);
        detailTableForm.resetFields();
    };

    const handleDetailTableFormSubmit = async (values) => {
        try {
            const response = await Axios.post('/api/detay/insert', values);
            console.log('Response:', response.data);
            fetchDetail();
            setIsDetailTableAddModalVisible(false);
            detailTableForm.resetFields();
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };

    return (
        <>
            <div className='home-outer-container'>
                <div className='home-title'>{appConfig.applicationName}</div>
                <Table
                    title={() => (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                {mainTableConfig.tableLabel}
                            </div>
                            <div>
                                {mainTableConfig.insertable && (
                                    <Button onClick={showMainTableAddModal}>
                                        Ekle <FileAddTwoTone />
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                    dataSource={filteredData}
                    rowKey="id"
                    pagination={{ pageSize: perPage }}
                    className='home-table'
                >
                    {mainTableConfig.fields.map((field) => {
                        if (!field.viewOnResults) return null;

                        return (
                            <Table.Column
                                key={field.fieldName}
                                className='home-table-column'
                                title={
                                    <div className='home-table-column-label'>
                                        {field.canSort ? (
                                            <Tooltip title='Sıralamak için tıklayın!'>
                                                <div onClick={() => handleSort(field.fieldName)}>
                                                    {field.fieldLabel}
                                                </div>
                                            </Tooltip>
                                        ) : (
                                            field.fieldLabel
                                        )}
                                    </div>
                                }
                                dataIndex={field.fieldName}
                                render={(text, record) => {
                                    let formattedText = text;
                                    if (field.fieldName === 'recordDate') {
                                        formattedText = moment(text).format('YYYY-MM-DD');
                                    }
                                    return field.triggerTable ? (
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleTriggerClick(field.triggerTable);
                                            }}
                                        >
                                            {formattedText}
                                        </a>
                                    ) : (
                                        formattedText
                                    );
                                }}
                                filterDropdown={() =>
                                    field.canFilter ? (
                                        field.fieldName === 'recordDate' ? (
                                            <Tooltip title='Filtrelemek için tıklayınız.'>
                                                <DatePicker
                                                    onChange={(date) => {
                                                        if (date === null) {
                                                            handleFilter(field.fieldName, null);
                                                        } else {
                                                            const newDate = new Date(date);
                                                            const formattedDate = moment(newDate).format('YYYY-MM-DD');
                                                            handleFilter(field.fieldName, formattedDate);
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title='Filtrelemek için tıklayınız.'>
                                                <Input
                                                    placeholder="Ara..."
                                                    onChange={(e) =>
                                                        handleFilter(field.fieldName, e.target.value)
                                                    }
                                                />
                                            </Tooltip>
                                        )
                                    ) : null
                                }
                            />
                        );
                    })}
                </Table>


                <Modal
                    title="Ana Tabloya Yeni Kayıt Ekle"
                    visible={isMainTableAddModalVisible}
                    onCancel={handleMainTableFormModalClose}
                    footer={null}
                >
                    <Form form={mainTableForm} layout="vertical" onFinish={handleMainTableFormSubmit}>
                        {mainTableConfig.fields
                            // .filter((field) => field.insertable)
                            .map((field) => (
                                <Form.Item
                                    key={field.fieldName}
                                    label={field.fieldLabel}
                                    name={field.fieldName}
                                    rules={[
                                        {
                                            required: !field.canEmptyForInsert,
                                            message: `${field.fieldLabel} zorunludur`,
                                        },
                                    ]}
                                >
                                    {field.fieldName === 'recordDate' ? (
                                        <DatePicker format="YYYY-MM-DD" />
                                    ) : (
                                        <Input />
                                    )}
                                </Form.Item>
                            ))}
                        <Button type="primary" htmlType="submit">
                            Kaydet
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title={modalTitle}
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    <Table
                        dataSource={filteredDetailData}
                        rowKey="id"
                        pagination={{ pageSize: perPage - 6 }}
                        className='detail-table'
                    >
                        {detailTableConfig.fields.map((field) => (
                            <Table.Column
                                key={field.fieldName}
                                className='home-table-column'
                                title={
                                    <div className='home-table-column-label'>
                                        {field.canSort ? (
                                            <Tooltip title='Sıralamak için tıklayın!'>
                                                <div onClick={() => handleDetailSort(field.fieldName)}>
                                                    {field.fieldLabel}
                                                </div>
                                            </Tooltip>
                                        ) : (
                                            field.fieldLabel
                                        )}
                                    </div>
                                }
                                dataIndex={field.fieldName}
                                filterDropdown={() =>
                                    field.canFilter ? (
                                        <Input
                                            placeholder="Ara"
                                            onChange={(e) =>
                                                handleDetailFilter(field.fieldName, e.target.value)
                                            }
                                        />
                                    ) : null
                                }
                            />
                        ))}
                    </Table>
                    <div style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        {detailTableConfig.insertable && (
                            <Button onClick={showDetailTableAddModal}>
                                Ekle <FileAddTwoTone />
                            </Button>
                        )}
                    </div>

                    <Modal
                        title="Detaylar Tablosuna Yeni Kayıt Ekle"
                        visible={isDetailTableAddModalVisible}
                        onCancel={handleDetailTableFormModalClose}
                        footer={null}
                    >
                        <Form form={detailTableForm} layout="vertical" onFinish={handleDetailTableFormSubmit}>
                            {detailTableConfig.fields
                                // .filter((field) => field.insertable)
                                .map((field) => (
                                    <Form.Item
                                        key={field.fieldName}
                                        label={field.fieldLabel}
                                        name={field.fieldName}
                                        rules={[
                                            {
                                                required: !field.canEmptyForInsert,
                                                message: `${field.fieldLabel} zorunludur`,
                                            },
                                        ]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                ))}
                            <Button type="primary" htmlType="submit">
                                Kaydet
                            </Button>
                        </Form>
                    </Modal>
                </Modal>
            </div>
        </>
    );
};

export default Home;

