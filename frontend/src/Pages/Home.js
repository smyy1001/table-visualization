import React, { useState, useEffect } from 'react';
import Axios from '../Axios';
import { Modal, Table, Tooltip, Input, DatePicker } from 'antd';
import moment from 'moment';
import './Home.css';

const Home = () => {
    const [perPage] = useState(11);
    const [appConfig, setAppConfig] = useState(null);
    const [mainTableData, setMainTableData] = useState([]);
    const [detailTableData, setDetailTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [detailSortOrder, setDetailSortOrder] = useState(null);
    const [detailSortedColumn, setDetailSortedColumn] = useState(null);

    // !
    // INSERTION LOGIC (insertable - canEmptyforInsert)
    // !

    useEffect(() => {
        async function fetchConfig() {
            const result = await Axios.get('/api/getConfig');
            setAppConfig(result.data);
        }
        fetchConfig();
    }, []);

    useEffect(() => {
        async function fetchMain() {
            const result = await Axios.get('/api/ana');
            setMainTableData(result.data);
            setFilteredData(result.data);
        }
        fetchMain();
    }, [appConfig]);

    useEffect(() => {
        async function fetchDetail() {
            const result = await Axios.get('/api/detay');
            setDetailTableData(result.data);
        }
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
        setModalData(detailTableData);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
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

        const sortedData = [...detailTableData].sort((a, b) => {
            if (newSortOrder === 'ascend') {
                return a[fieldName] > b[fieldName] ? 1 : -1;
            } else {
                return a[fieldName] < b[fieldName] ? 1 : -1;
            }
        });
        setDetailTableData(sortedData);
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
            setDetailTableData(detailTableData);
        } else {
            const newFilteredData = detailTableData.filter((item) => {
                return item[fieldName]
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase());
            });
            setDetailTableData(newFilteredData);
        }
    };

    return (
        <>
            <div className='home-outer-container'>
                <div className='home-title'>
                    {appConfig.applicationName}
                </div>
                <Table
                    title={() => (
                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {mainTableConfig.tableLabel}
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
                                                <div
                                                    onClick={() => handleSort(field.fieldName)}
                                                >
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
                                            href={`#${field.triggerTable}`}
                                            onClick={() => handleTriggerClick(field.triggerTable)}
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

                                        ) : (
                                            <Input
                                                placeholder="Ara"
                                                onChange={(e) =>
                                                    handleFilter(field.fieldName, e.target.value)
                                                }
                                            />
                                        )
                                    ) : null
                                }

                            />
                        );
                    })}
                </Table>

                {/* <Modal
                    title={modalTitle}
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    <Table
                        dataSource={modalData}
                        rowKey="id"
                        pagination={{ pageSize: perPage }}
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
                                                <div
                                                    onClick={() => handleDetailSort(field.fieldName)}
                                                >
                                                    {field.fieldLabel}
                                                </div>
                                            </Tooltip>
                                        ) : (
                                            field.fieldLabel
                                        )}
                                    </div>
                                }
                                dataIndex={field.fieldName}
                            />
                        ))}
                    </Table>
                </Modal> */}

                <Modal
                    title={modalTitle}
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    <Table
                        dataSource={modalData}
                        rowKey="id"
                        pagination={{ pageSize: perPage }}
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
                                                <div
                                                    onClick={() => handleDetailSort(field.fieldName)}
                                                >
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
                </Modal>

            </div>
        </>
    );
};

export default Home;
