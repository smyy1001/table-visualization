package com.example.backend.model;

import java.util.List;

public class Config {
    private String applicationName;
    private String databaseType;
    private String databaseUrl;
    private String databaseUser;
    private String databasePassword;
    private String databaseName;
    private List<TableDetail> tableDetails;

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getDatabaseType() {
        return databaseType;
    }

    public void setDatabaseType(String databaseType) {
        this.databaseType = databaseType;
    }

    public String getDatabaseUrl() {
        return databaseUrl;
    }

    public void setDatabaseUrl(String databaseUrl) {
        this.databaseUrl = databaseUrl;
    }

    public String getDatabaseUser() {
        return databaseUser;
    }

    public void setDatabaseUser(String databaseUser) {
        this.databaseUser = databaseUser;
    }

    public String getDatabasePassword() {
        return databasePassword;
    }

    public void setDatabasePassword(String databasePassword) {
        this.databasePassword = databasePassword;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public List<TableDetail> getTableDetails() {
        return tableDetails;
    }

    public void setTableDetails(List<TableDetail> tableDetails) {
        this.tableDetails = tableDetails;
    }

    public static class TableDetail {
        private String tableType;
        private String tableName;
        private String tableLabel;
        private boolean insertable;
        private List<Field> fields;

        public String getTableType() {
            return tableType;
        }

        public void setTableType(String tableType) {
            this.tableType = tableType;
        }

        public String getTableName() {
            return tableName;
        }

        public void setTableName(String tableName) {
            this.tableName = tableName;
        }

        public String getTableLabel() {
            return tableLabel;
        }

        public void setTableLabel(String tableLabel) {
            this.tableLabel = tableLabel;
        }

        public boolean isInsertable() {
            return insertable;
        }

        public void setInsertable(boolean insertable) {
            this.insertable = insertable;
        }

        public List<Field> getFields() {
            return fields;
        }

        public void setFields(List<Field> fields) {
            this.fields = fields;
        }

        public static class Field {
            private String fieldName;
            private String type;
            private String fieldLabel;
            private boolean canFilter;
            private boolean canSort;
            private boolean viewOnResults;
            private String triggerTable;
            private boolean insertable;
            private boolean canEmptyForInsert;
            private Object value;

            public String getFieldName() {
                return fieldName;
            }

            public void setFieldName(String fieldName) {
                this.fieldName = fieldName;
            }

            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }

            public String getFieldLabel() {
                return fieldLabel;
            }

            public void setFieldLabel(String fieldLabel) {
                this.fieldLabel = fieldLabel;
            }

            public boolean isCanFilter() {
                return canFilter;
            }

            public void setCanFilter(boolean canFilter) {
                this.canFilter = canFilter;
            }

            public boolean isCanSort() {
                return canSort;
            }

            public void setCanSort(boolean canSort) {
                this.canSort = canSort;
            }

            public boolean isViewOnResults() {
                return viewOnResults;
            }

            public void setViewOnResults(boolean viewOnResults) {
                this.viewOnResults = viewOnResults;
            }

            public String getTriggerTable() {
                return triggerTable;
            }

            public void setTriggerTable(String triggerTable) {
                this.triggerTable = triggerTable;
            }

            public boolean isInsertable() {
                return insertable;
            }

            public void setInsertable(boolean insertable) {
                this.insertable = insertable;
            }

            public boolean isCanEmptyForInsert() {
                return canEmptyForInsert;
            }

            public void setCanEmptyForInsert(boolean canEmptyForInsert) {
                this.canEmptyForInsert = canEmptyForInsert;
            }

            public Object getValue() {
                return value;
            }

            public void setValue(Object val) {
                this.value = val;
            }
        }
    }

    @Override
    public String toString() {
        return "Config{" +
                "applicationName='" + applicationName + '\'' +
                ", databaseType='" + databaseType + '\'' +
                ", databaseUrl='" + databaseUrl + '\'' +
                ", databaseUser='" + databaseUser + '\'' +
                ", databasePassword='" + databasePassword + '\'' +
                ", databaseName='" + databaseName + '\'' +
                ", tableDetails=" + tableDetails +
                '}';
    }

}
