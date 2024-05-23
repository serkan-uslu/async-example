# Asenkron Programlama Örneği

### 1. Başlangıç Mesajı Yazdırma
```javascript
console.log('Starting')
```
- Bu kod hemen çalışır ve konsola "Starting" yazar.

### 2. İki Saniyelik Zamanlayıcı Oluşturma
```javascript
setTimeout(() => {
    console.log('2 Second Timer')
}, 2000)
```
- `setTimeout` fonksiyonu iki argüman alır: bir fonksiyon ve bir süre (milisaniye cinsinden).
- Bu durumda, iki saniye (2000 milisaniye) sonra çalışacak bir fonksiyon oluşturuluyor.
- Fonksiyonun içinde, iki saniye sonra "2 Second Timer" konsola yazdırılacak.

### 3. Sıfır Saniyelik Zamanlayıcı Oluşturma
```javascript
setTimeout(() => {
    console.log('0 Second Timer')
}, 0)
```
- Bu `setTimeout` fonksiyonu, 0 milisaniye sonra çalışacak bir fonksiyon oluşturur.
- "0 Second Timer" mesajını yazdıracak olan bu fonksiyon, hemen çalışacak gibi görünse de, aslında JavaScript'in olay döngüsü (event loop) nedeniyle küçük bir gecikmeyle çalışır.

### 4. Bitiş Mesajı Yazdırma
```javascript
console.log('Stopping')
```
- Bu kod hemen çalışır ve konsola "Stopping" yazar.

### Çalışma Sırası ve Asenkron Programlama

#### Senkron ve Asenkron Modeller
- **Senkron Modellerde:** Bir işlem bittiğinde, bir sonraki işlem başlar.
- **Asenkron Modellerde:** Belirli işlemler belirli sürelerde beklerken diğer işlemler çalışmaya devam eder.

### JavaScript Olay Döngüsü (Event Loop)
- JavaScript tek iş parçacıklı (single-threaded) bir dildir, ancak olay döngüsü sayesinde asenkron işlemleri gerçekleştirebilir.
- `setTimeout` fonksiyonları asenkron olarak yürütülür ve belirli bir süre sonra bir olay kuyruğuna (event queue) yerleştirilir.
- Olay döngüsü, çağrı yığını (call stack) boşaldığında olay kuyruğundaki işlemleri çalıştırır.

### Adım Adım İşleyiş
1. **"Starting" Yazdırılır:**
   - `console.log('Starting')` hemen çalışır ve "Starting" yazdırılır.
2. **2 Saniyelik ve 0 Saniyelik `setTimeout` Fonksiyonları Kurulur:**
   - Her iki `setTimeout` fonksiyonu da kurulurken, fonksiyonlar olay kuyruğuna yerleştirilir.
   - 0 milisaniyelik `setTimeout`, hemen çalışmak üzere olay kuyruğuna eklenir ancak çağrı yığını boşalana kadar bekler.
3. **"Stopping" Yazdırılır:**
   - `console.log('Stopping')` hemen çalışır ve "Stopping" yazdırılır.
4. **0 Saniyelik `setTimeout` Çalışır:**
   - Olay kuyruğundaki 0 milisaniyelik `setTimeout` çalışır ve "0 Second Timer" yazdırılır.
5. **2 Saniyelik `setTimeout` Çalışır:**
   - 2 saniye geçtiğinde olay kuyruğuna eklenen `setTimeout` fonksiyonu çalışır ve "2 Second Timer" yazdırılır.

### Ekrandaki Çıktı
```
Starting
Stopping
0 Second Timer
2 Second Timer
```

Bu kod, asenkron programlamanın nasıl çalıştığını gösteren basit bir örnektir. `setTimeout` fonksiyonları ile kodun belirli kısımlarının asenkron olarak çalışmasını sağlayarak, uzun süren işlemler sırasında diğer işlemlerin aksamadan devam etmesini sağlarız. Bu sayede Node.js uygulamaları hızlı ve verimli olur.