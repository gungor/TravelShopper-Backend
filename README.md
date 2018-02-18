# Yurtdışından Sipariş İsteme REST Servisleri

Takım: Güngör Yılmaz, Berhan

## Amaç

Yurtdışından sipariş vermek isteyenlerin, seyahat eden insanlardan istedikleri ürünü getirmelerini kolaylaştıracak bir uygulama.
Uygulamada yurtdışından istenecek ürünler için gereken backend servisleri bulunmaktadır.

Backend uygulama url: https://orderfromabroad.herokuapp.com <br /><br />

mongodb ve redis bağlantı bilgileri conf/app.properties dosyasındadır

## Servisler

 /getCountries   : Sistemdeki ülke listesini verir <br />
 /createTrip     : Seyahat edecek kişinin, bu bilgiyi sisteme kaydetmesini sağlar <br />
 /searchTrips    : Mevcut tüm seyahatleri, zaman aralığı ve ülke bilgisi ile sorgulanır <br />
 /createPreorder : Yurtdışından ürün isteyen kullanıcı, isteğini ülke, ürün, zaman aralığı bilgisiyle kaydeder <br />
 /queryPreorders : Tüm ürün isteklerini listeler  <br />
 /queryPreordersByCustomer  : İsteyene ait istekler listelenir  <br />
 /createOrder :  İstekte bulunan kullanının istediği ürünü getirebilecek durumda seyahat eden biri getirmeyi uygulama bazında taahhüt eder <br />
 /queryOrderByCustomer : Kullanıcının teslim edilmesi beklenen isteklerini listeler <br />
 /queryOrderByCarrier  : Seyahat edecek kullanıcının teslim etmesi beklenen istekleri listeler <br />
 /closeOrder : İstekte bulunan kullanıcı, ürünü aldığını uygulamaya bildirir <br />
 /createUser : Yeni kullanıcı oluşturur  <br />
 /createItem : Teni Item oluşturur  <br />
 /queryItems : Tüm itemlar sorgulanır  <br />
 /queryItemsByCountry : Ülkeye göre ürünler sorgulanır


## Request,Response Örnekleri

GET /getCountries response:
```json
    {
        "code": "0",
        "msg": "Success",
        "countries": [
            {
                "_id": "5a875ea9709cdf0a54531d61",
                "name": "Almanya"
            },
            {
                "_id": "5a89432d734d1d041bb6dbfc",
                "name": "ABD"
            },
            {
                "_id": "5a89436b734d1d041bb6dc10",
                "name": "İngiltere"
            },
            {
                "_id": "5a894387734d1d041bb6dc16",
                "name": "İsveç"
            },
            {
                "_id": "5a89439f734d1d041bb6dc1d",
                "name": "Kanada"
            },
            {
                "_id": "5a8943ac734d1d041bb6dc20",
                "name": "Çin"
            },
            {
                "_id": "5a8943be734d1d041bb6dc23",
                "name": "Japonya"
            }
        ]
    }
```