
## Oracle Database Tabloları:
- ANATABLO
    - id: FLOAT,
    - NAME: VARCHAR2(255),
    - RECORDDATE: DATE,

- DETTABLO
    - id: FLOAT,
    - NAME: FLOAT




## Örnek Trino Configürasyonu:

config/node.properties:

    node.environment=production
    node.id=unique-node-id
    node.data-dir=/data/trino


config/jvm.config:

    -Xmx4G
    -XX:+UseG1GC
    -XX:G1HeapRegionSize=32M
    -XX:+ExplicitGCInvokesConcurrent
    -XX:+HeapDumpOnOutOfMemoryError
    -XX:OnOutOfMemoryError=kill -9 %p
    -XX:ReservedCodeCacheSize=512M


config/config.properties:

    coordinator=true    
    node-scheduler.include-coordinator=true
    http-server.http.port=8088
    discovery-server.enabled=true
    discovery.uri=http://192.168.1.20:8088


config/catalog/oracle.properties:

    connector.name=oracle
    connection-url=jdbc:oracle:thin:@//oracle-db:1521/XEPDB1
    connection-user=new_user
    connection-password=passw
