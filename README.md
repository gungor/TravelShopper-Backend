# Yurtdışından Sipariş İsteme REST Servisleri

Takım: Güngör Yılmaz, Berhan

## Amaç

Yurtdışından sipariş vermek isteyenlerin, seyahat eden insanlardan istedikleri ürünü getirmelerini kolaylaştıracak bir uygulama.
Uygulamada yurtdışından istenecek ürünler için gereken backend servisleri bulunmaktadır.

Backend uygulama url: https://orderfromabroad.herokuapp.com <br /><br />

mongodb ve redis bağlantı bilgileri conf/app.properties dosyasındadır <br /><br />

## Servisler <br /><br />

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

## Request,Response Örnekleri <br /><br />

Güncellenecek <br />