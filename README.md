CRM Sistem Optimizasyonu
Bu proje, bir CRM sisteminin müşteri temsilcilerini en uygun şekilde atamak ve pazarlama kampanyalarını bütçe kısıtlamaları altında en verimli şekilde seçmek için iki temel işlevi içerir. Her iki işlev de dinamik programlama (DP) ve optimizasyon algoritmaları kullanarak süreçlerin verimliliğini artırmayı hedefler.

İşlevler
1. assignAgents
Bu fonksiyon, temsilcileri müşteri listelerine en uygun şekilde atamak için kullanılan bir algoritmadır. Temsilcilerin, her müşteriyle olan maliyetlerine dayalı olarak, en düşük maliyetli müşteri atamaları yapılır. Ayrıca, temsilcilerin müsaitlik durumları göz önünde bulundurulur.

Parametreler:
costMatrix: Temsilciler ve müşteriler arasındaki maliyetleri içeren matris.
agentAvailability: Temsilcilerin müsaitlik durumları (boolean dizi).
agentNames: Temsilcilerin isimleri (dizi).
customerNames: Müşterilerin isimleri (dizi).
Çıktı:
Atanmış temsilci-müşteri çiftlerini içeren bir liste. Temsilciler atanamamışsa, "atanamadı" olarak işaretlenir.
2. selectCampaigns
Bu fonksiyon, belirli bir bütçe ile en yüksek yatırım getirisi (ROI) sağlayacak pazarlama kampanyalarını seçmek için dinamik programlama kullanır. Bütçeyi aşmayan ve en yüksek ROI'yi sağlayan kampanyalar seçilir.

Parametreler:
campaigns: Kampanyaların isimlerini, maliyetlerini ve ROI değerlerini içeren dizi.
budget: Kullanılabilir bütçe.
Çıktı:
Seçilen kampanyalar ve toplam ROI'yi içeren bir nesne.
Kullanım
1. assignAgents Kullanımı:
javascript
Kopyala
Düzenle
const costMatrix = [
    [4, 2, 7],
    [3, 8, 5],
    [9, 1, 6]
];
const agentAvailability = [true, false, true];
const agentNames = ["Ahmet", "Mehmet", "Ayşe"];
const customerNames = ["Ali", "Veli", "Zeynep"];

console.log(assignAgents(costMatrix, agentAvailability, agentNames, customerNames));
2. selectCampaigns Kullanımı:
javascript
Kopyala
Düzenle
const campaigns = [
    { name: 'Kampanya A', cost: 300, roi: 500 },
    { name: 'Kampanya B', cost: 400, roi: 600 },
    { name: 'Kampanya C', cost: 200, roi: 300 },
    { name: 'Kampanya D', cost: 500, roi: 700 },
    { name: 'Kampanya E', cost: 250, roi: 400 }
];
const budget = 800;

console.log(selectCampaigns(campaigns, budget));
