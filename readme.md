Program temel olarak ana bir tablo ve buna bağlı olarak opsiyonel şekilde yan tablolardan oluşacaktır.
Öncelikle uygulamanın ayağa kalkması için bir konfigürasyon dosyası olmalı ve içinde şöyle
parametreler olmalı:
{
    "applicationName": "My App",
    "databaseType": "oracle",
    "databaseUrl": "jdbc:oracle:thin:@192.168.1.20:1521/XEPDB1",
    "databaseUser": "system",
    "databasePassword": "password",
    "databaseName": "XEPDB1",
    "tableDetails": [
        {
            "tableType": "mainTable",
            "tableName": "anaTablo",
            "tableLabel": "Ana Tablo Bilgileri",
            "insertable": "false",
            "fields": [
                {
                    "fieldName": "name",
                    "type": "string",
                    "fieldLabel": "Adı",
                    "canFilter": "true",
                    "canSort": "true",
                    "viewOnResults": "false",
                    "triggerTable": "detayTablo1",
                    "insertable": "true",
                    "canEmptyForInsert": "false"
                },
                {
                    "fieldName": "recordDate",
                    "type": "date",
                    "fieldLabel": "Kayıt Tarihi",
                    "canFilter": "true",
                    "canSort": "true",
                    "viewOnResults": "false",
                    "triggerTable": "detayTablo1",
                    "insertable": "false",
                    "canEmptyForInsert": "true"
                }
            ]
        },
        {
            "tableType": "detailTable",
            "tableName": "detayTablo1",
            "tableLabel": "Detay Tablo Bilgileri",
            "insertable": "true",
            "fields": [
                {
                "fieldName": "name",
                "type": "numeric",
                "fieldLabel": "Adı",
                "canFilter": "true",
                "canSort": "true",
                "viewOnResults": "false",
                "insertable": "false",
                "canEmptyForInsert": "true"
                }
            ]
        }
    ]
}




Parametrelerin Açiklamasi:
1. applicationName: Uygulama ayaga kalktiginda arayüzde görüntülenecek ismi,
2. tableDetails: Uygulamanin kullanmak için ihtiya duyacagi tablolarin listesi,
3. tableType: Tablonun tipini ifade eder, mainTable ve detailTable olabilir. "mainTable" tipinde sadece tek tablo olabilir ve arayüzde görüntülenecek veri bu tablodadir.
4. insertable: Bu tabloya yeni bir kayit eklenebilir mi seenegi, eger true ise fields kisminda bulunan alanlardan insertable degeri true olan alanlari kapsayan bir form ikmali ve canEmptyForInsert kismi false olan kolonlar için de degerlerin girilmesi zorunlu olmall
5. fields.type: Kolonun tipini ifade eder, numeric, string, date gibi degerleri alabilir.
6. viewOnResults: Eger true ise arayüzde gösterilebilir bir kolon, false ise gösterilemez
7. triggerTable: Opsiyonel bir konfigürasyon, eger dolu ise; arayüzde bu kolon görüntülenirken
tiklanilabilir olacak ve tiklandiginda bu alandaki deger ile detay Tablo1 tablosuna where fieldName=value seklinde sorgu atip; dönen listeyi bir modal' da görüntüleyecek