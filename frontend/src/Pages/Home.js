import React, { useState, useEffect } from 'react';
import { Modal, Table, Tooltip, Input, InputNumber, DatePicker, Form, Button } from 'antd';
import { FileAddTwoTone, DeleteTwoTone } from '@ant-design/icons';
import Axios from '../Axios';
import moment from 'moment';
import './Home.css';

const Home = () => {
    const [perPage] = useState(11);
    const [mainTableForm] = Form.useForm();
    const [detailTableForm] = Form.useForm();
    const [modalTitle, setModalTitle] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const [appConfig, setAppConfig] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [mainTableData, setMainTableData] = useState([]);
    const [detailTableData, setDetailTableData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailSortOrder, setDetailSortOrder] = useState(null);
    const [filteredDetailData, setFilteredDetailData] = useState([]);
    const [detailSortedColumn, setDetailSortedColumn] = useState(null);
    const [isMainTableAddModalVisible, setIsMainTableAddModalVisible] = useState(false);
    const [isDetailTableAddModalVisible, setIsDetailTableAddModalVisible] = useState(false);

    async function fetchMain() {
        const result = await Axios.get('/api/trino/query', {
            params: { sql: "SELECT * FROM oracle.NEW_USER.ANATABLO" }
        });
        setMainTableData(result.data);
        setFilteredData(result.data);
    }
    async function fetchDetail() {
        const result = await Axios.get('/api/trino/query', {
            params: { sql: "SELECT * FROM oracle.NEW_USER.DETTABLO" }
        });
        setDetailTableData(result.data);
        setFilteredDetailData(result.data);
    }
    useEffect(() => {
        async function fetchConfig() {
            const result = await Axios.get('/api/getConfig');
            setAppConfig(result.data);
        }
        fetchConfig();
    }, []);



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
            const response = await Axios.post('/api/trino/insert', {
                sql: "INSERT INTO oracle.NEW_USER.ANATABLO (NAME, RECORDDATE) VALUES (?, ?)",
                values: [formattedValues.name, formattedValues.recordDate]
            });
            console.log('Response:', response.data);
            fetchMain();
            setIsMainTableAddModalVisible(false);
            mainTableForm.resetFields();
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };

    const handleMainDelete = async (id) => {
        try {
            const sql = "DELETE FROM oracle.NEW_USER.ANATABLO WHERE ID = ?";
            const values = [id];
            const response = await Axios.delete('/api/trino/delete', {
                data: { sql, values },
            });
            console.log('Response:', response.data);
            fetchMain();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    }


    const showDetailTableAddModal = () => {
        setIsDetailTableAddModalVisible(true);
    };

    const handleDetailTableFormModalClose = () => {
        setIsDetailTableAddModalVisible(false);
        detailTableForm.resetFields();
    };

    const handleDetailTableFormSubmit = async (values) => {
        try {
            const response = await Axios.post('/api/trino/insert', {
                sql: "INSERT INTO oracle.NEW_USER.DETTABLO (NAME) VALUES (?)",
                values: [values.name]
            });

            console.log('Response:', response.data);
            fetchDetail();
            setIsDetailTableAddModalVisible(false);
            detailTableForm.resetFields();
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };

    const handleDetailDelete = async (id) => {
        try {
            const sql = "DELETE FROM oracle.NEW_USER.DETTABLO WHERE ID = ?";
            const values = [id];
            const response = await Axios.delete('/api/trino/delete', {
                data: { sql, values },
            });
            console.log('Response:', response.data);
            fetchDetail();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    }

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
                    <Table.Column
                        key="delete"
                        className="home-table-column"
                        title={
                            <div className="home-table-column-label2">
                                Sil
                            </div>
                        }
                        render={(text, record) => (
                            <Tooltip title="Silmek için tıklayınız.">
                                <DeleteTwoTone
                                    onClick={() => handleMainDelete(text.id)}
                                    style={{ cursor: "pointer" }}
                                />
                            </Tooltip>
                        )}
                    />;
                    {
                        mainTableConfig.fields.map((field) => {
                            if (!field.viewOnResults) return null;

                            return (
                                <Table.Column
                                    key={field.fieldName}
                                    className="home-table-column"
                                    title={
                                        <div className="home-table-column-label">
                                            {field.canSort ? (
                                                <Tooltip title="Sıralamak için tıklayın!">
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
                                        if (field.fieldName === "recordDate") {
                                            formattedText = moment(text).format("YYYY-MM-DD");
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
                                            field.fieldName === "recordDate" ? (
                                                <Tooltip title="Filtrelemek için tıklayınız.">
                                                    <DatePicker
                                                        onChange={(date) => {
                                                            if (date === null) {
                                                                handleFilter(field.fieldName, null);
                                                            } else {
                                                                const newDate = new Date(date);
                                                                const formattedDate = moment(newDate).format(
                                                                    "YYYY-MM-DD"
                                                                );
                                                                handleFilter(field.fieldName, formattedDate);
                                                            }
                                                        }}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Filtrelemek için tıklayınız.">
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
                        })
                    }
                </Table>


                <Modal
                    title="Ana Tabloya Yeni Kayıt Ekle"
                    visible={isMainTableAddModalVisible}
                    onCancel={handleMainTableFormModalClose}
                    footer={null}
                >
                    <Form form={mainTableForm} layout="vertical" onFinish={handleMainTableFormSubmit}>
                        {mainTableConfig.fields
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
                        <Table.Column
                            key="delete"
                            className="home-table-column"
                            title={
                                <div className="home-table-column-label2">
                                    Sil
                                </div>
                            }
                            render={(text, record) => (
                                <Tooltip title="Silmek için tıklayınız.">
                                    <DeleteTwoTone
                                        onClick={() => handleDetailDelete(text.id)}
                                        style={{ cursor: "pointer" }}
                                    />
                                </Tooltip>
                            )}
                        />;
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

