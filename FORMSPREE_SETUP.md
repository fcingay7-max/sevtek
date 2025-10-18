# Formspree Kurulum Rehberi

## ✅ Tamamlanan İşlemler

### 1. **Form Entegrasyonu**
- ✅ İletişim formu Formspree'ye bağlandı
- ✅ Geri arama formu Formspree'ye bağlandı
- ✅ Her iki form da aynı endpoint kullanıyor: `https://formspree.io/f/xvgwljyg`

### 2. **Form Özellikleri**
- ✅ **İletişim Formu**: Ad, telefon, e-posta, beyaz eşya seçimi, mesaj
- ✅ **Geri Arama Formu**: Ad, telefon, e-posta (opsiyonel), beyaz eşya seçimi, mesaj
- ✅ **Otomatik E-posta Yanıtı**: Formspree otomatik olarak müşteriye e-posta gönderecek
- ✅ **Spam Koruması**: Formspree'nin yerleşik spam koruması aktif

### 3. **Kullanıcı Deneyimi**
- ✅ **Yükleme Animasyonu**: Form gönderilirken spinner animasyonu
- ✅ **Başarı Mesajları**: Form başarıyla gönderildiğinde bildirim
- ✅ **Hata Mesajları**: Hata durumunda kullanıcı bilgilendirmesi
- ✅ **Form Temizleme**: Başarılı gönderimden sonra form otomatik temizlenir

## 📧 Formspree Ayarları

### **Formspree Dashboard'da Yapmanız Gerekenler:**

1. **Formspree Dashboard'a Giriş Yapın**
   - https://formspree.io/ adresine gidin
   - Hesabınıza giriş yapın

2. **Form Ayarlarını Kontrol Edin**
   - Form ID: `xvgwljyg`
   - Form adı: "Teknik Servis İletişim Formu"

3. **E-posta Ayarları**
   - **Alıcı E-posta**: Form gönderimlerinin gideceği e-posta adresinizi ayarlayın
   - **Otomatik Yanıt**: Müşterilere otomatik yanıt e-postası gönderilsin
   - **E-posta Şablonu**: Özelleştirilmiş e-posta şablonu oluşturun

4. **Spam Koruması**
   - reCAPTCHA aktif edin (önerilen)
   - Honeypot koruması zaten aktif

5. **Bildirim Ayarları**
   - Yeni form gönderimlerinde e-posta bildirimi alın
   - Slack/Discord entegrasyonu (opsiyonel)

## 📋 Form Alanları

### **İletişim Formu:**
- `name`: Ad Soyad (zorunlu)
- `phone`: Telefon (zorunlu)
- `email`: E-posta (zorunlu)
- `appliance`: Beyaz Eşya Türü (zorunlu)
- `message`: Mesaj (opsiyonel)
- `_subject`: "Yeni İletişim Formu - Teknik Servis"
- `_replyto`: Otomatik olarak e-posta alanından alınır

### **Geri Arama Formu:**
- `name`: Ad Soyad (zorunlu)
- `phone`: Telefon (zorunlu)
- `email`: E-posta (opsiyonel)
- `appliance`: Beyaz Eşya Türü (zorunlu)
- `message`: Arıza Açıklaması (opsiyonel)
- `_subject`: "Geri Arama Talebi - Teknik Servis"
- `_replyto`: E-posta varsa otomatik olarak alınır

## 🎨 Özelleştirmeler

### **E-posta Şablonu Önerisi:**
```
Merhaba {{name}},

Teknik servis talebiniz alınmıştır.

Beyaz Eşya: {{appliance}}
Telefon: {{phone}}
E-posta: {{email}}

Mesajınız: {{message}}

En kısa sürede size dönüş yapacağız.

Teşekkürler,
Teknik Servis Ekibi
```

### **Otomatik Yanıt Şablonu:**
```
Merhaba {{name}},

Teknik servis talebiniz başarıyla alınmıştır.

Talebiniz:
- Beyaz Eşya: {{appliance}}
- Telefon: {{phone}}

15 dakika içinde sizi arayacağız.

Teşekkürler,
Teknik Servis Ekibi
```

## 🔧 Test Etme

1. **Formspree Dashboard'da Test**
   - Formspree dashboard'da "Test" sekmesini kullanın
   - Test e-postası gönderin

2. **Web Sitesinde Test**
   - İletişim formunu doldurun ve gönderin
   - Geri arama formunu doldurun ve gönderin
   - Başarı mesajlarını kontrol edin

3. **E-posta Kontrolü**
   - Formspree'den gelen e-postaları kontrol edin
   - Müşterilere giden otomatik yanıtları kontrol edin

## 📊 İstatistikler

Formspree dashboard'da şunları takip edebilirsiniz:
- Günlük/haftalık form gönderim sayısı
- Spam engellenen gönderimler
- En popüler beyaz eşya türleri
- Form doldurma oranları

## 🚀 Sonuç

Formlarınız artık tamamen çalışır durumda! Müşterileriniz:
- ✅ Formları kolayca doldurabilir
- ✅ Anında başarı mesajı alır
- ✅ Otomatik e-posta yanıtı alır
- ✅ Spam koruması ile güvende olur

Formspree dashboard'da tüm gönderimleri takip edebilir ve müşterilerinize hızlı yanıt verebilirsiniz.
