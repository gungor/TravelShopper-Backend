# Yurtdışından Sipariş İsteme REST Servisleri

Takım: Güngör Yılmaz

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

POST /createTrip Örnek Request/Response:
```json
{
      "startDate" : "2018-02-26",
      "endDate" : "2018-03-02",
      "country"    : "Almanya",
      "capacity" : 5
}

{
    "code": "0",
    "msg": "Success"
}
```

POST /searchTrips Örnek Request/Response:
```json
{
      "startDate" : "2016-12-26",
      "endDate" : "2017-01-01",
      "countries"    : ["Almanya","İngiltere"],
      "capacity" : 7
}

{
    "code": "0",
    "msg": "Success",
    "trips": [
        {
            "_id": "5a87804ded15c62647863e4f",
            "startDate": "2016-01-26T00:00:00.000Z",
            "endDate": "2017-02-02T00:00:00.000Z",
            "capacity": 8,
            "country": "Almanya",
            "user_id": "5a873f23709cdf0a54531d54"
        }
    ]
}
```

POST /createPreorder Örnek Request/Response:
```json
{
      "startDate" : "2016-12-26",
      "endDate" : "2017-02-01",
      "country"    : "Japonya",
      "capacity" : 3,
      "userId" : "5a873f23709cdf0a54531d54",
      "itemId" : "5a87b0f63459a4b0ae4cfc11"
}

{
    "code": "0",
    "msg": "Success"
}
```

POST /queryPreorders  Örnek Request/Response:
```json
{
}

{
	"_id": "5a89596b1baef94dca9485e9",
	"startDate": "2018-02-26T00:00:00.000Z",
	"endDate": "2018-03-01T00:00:00.000Z",
	"capacity": 1,
	"country": "ABD",
	"item_id": "5a894616baf6f24cd5e62664",
	"user_id": "5a873f67709cdf0a54531d55",
	"items": [
		{
			"_id": "5a894616baf6f24cd5e62664",
			"name": "Iphone X",
			"price": 800,
			"currency": "USD",
			"country_id": "5a89432d734d1d041bb6dbfc"
		}
	],
	"customers": [
		{
			"_id": "5a873f67709cdf0a54531d55",
			"fullname": "Ahmet Mehmet"
		}
	]
}
```