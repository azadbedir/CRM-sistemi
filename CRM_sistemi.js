function assignAgents(costMatrix, agentAvailability, agentNames, customerNames) {
    const n = costMatrix.length; // Temsilci sayısı
    const m = costMatrix[0].length; // Müşteri sayısı
    
    let assignments = new Array(n).fill(-1); // Temsilci atamalarını tutar
    
    // Atama işlemini gerçekleştir
    for (let agent = 0; agent < n; agent++) {
        if (!agentAvailability[agent]) continue; // Müsait değilse atlama
        
        let minCost = Infinity;
        let bestCustomer = -1;
        
        for (let customer = 0; customer < m; customer++) {
            if (costMatrix[agent][customer] < minCost) {
                minCost = costMatrix[agent][customer];
                bestCustomer = customer;
            }
        }
        
        if (bestCustomer !== -1) {
            assignments[agent] = bestCustomer; // En uygun müşteriyi ata
        }
    }
    
    // Sonuçları isimlerle yazdır
    return assignments.map((customer, agent) => 
        customer !== -1 
            ? `${agentNames[agent]} -> ${customerNames[customer]}`
            : `${agentNames[agent]} atanamadı`
    );
}

function selectCampaigns(campaigns, budget) {
    const n = campaigns.length;
    
    // DP tablosu: dp[i][j] => ilk i kampanya ile j bütçe için maksimum ROI
    let dp = Array.from({ length: n + 1 }, () => Array(budget + 1).fill(0));

    // Kampanyaları seçmek için DP tablosunu dolduruyoruz
    for (let i = 1; i <= n; i++) {
        const cost = campaigns[i - 1].cost;   // Kampanyanın maliyeti
        const returnOnInvestment = campaigns[i - 1].roi;  // Kampanyanın beklenen getirisi

        for (let b = 0; b <= budget; b++) {
            if (cost <= b) {
                // Kampanyayı dahil etme: Maliyeti karşılıyorsa, kampanya eklenebilir
                dp[i][b] = Math.max(dp[i - 1][b], dp[i - 1][b - cost] + returnOnInvestment);
            } else {
                // Kampanyayı dahil etme: Maliyeti karşılamıyorsa, bu kampanya seçilemez
                dp[i][b] = dp[i - 1][b];
            }
        }
    }

    // Maksimum ROI'yi bulduk, şimdi hangi kampanyaların seçildiğini belirleyelim
    let selectedCampaigns = [];
    let remainingBudget = budget;
    for (let i = n; i > 0; i--) {
        if (dp[i][remainingBudget] !== dp[i - 1][remainingBudget]) {
            selectedCampaigns.push(campaigns[i - 1]);
            remainingBudget -= campaigns[i - 1].cost;
        }
    }

    // Seçilen kampanyalar ve toplam ROI döndürülür
    return {
        selectedCampaigns: selectedCampaigns,
        totalROI: dp[n][budget]
    };
}

// CRM çözümü: Hem temsilci atamalarını hem de kampanya seçimlerini içerir
function crmSolution(costMatrix, agentAvailability, agentNames, customerNames, campaigns, budget) {
    // Temsilci atamaları
    const agentAssignments = assignAgents(costMatrix, agentAvailability, agentNames, customerNames);
    
    // Pazarlama kampanyası seçimi
    const campaignResult = selectCampaigns(campaigns, budget);

    // CRM çıktısını döndür
    return {
        agentAssignments: agentAssignments,
        selectedCampaigns: campaignResult.selectedCampaigns,
        totalROI: campaignResult.totalROI
    };
}

// Örnek Maliyet Matrisi (Temsilci x Müşteri)
const costMatrix = [
    [4, 2, 7],
    [3, 8, 5],
    [9, 1, 6]
];

// Temsilcilerin müsaitlik durumu (true = müsait, false = meşgul)
const agentAvailability = [true, false, true];

// Temsilci ve müşteri isimleri
const agentNames = ["Ahmet", "Mehmet", "Ayşe"];
const customerNames = ["Ali", "Veli", "Zeynep"];

// Örnek kampanyalar (maliyet ve beklenen getiri)
const campaigns = [
    { name: 'Kampanya A', cost: 300, roi: 500 },
    { name: 'Kampanya B', cost: 400, roi: 600 },
    { name: 'Kampanya C', cost: 200, roi: 300 },
    { name: 'Kampanya D', cost: 500, roi: 700 },
    { name: 'Kampanya E', cost: 250, roi: 400 }
];

// Bütçe kısıtlaması
const budget = 800;

// CRM çözümünü çalıştır
const crmResult = crmSolution(costMatrix, agentAvailability, agentNames, customerNames, campaigns, budget);

// Sonuçları yazdır
console.log("Müşteri Temsilcisi Atamaları:");
crmResult.agentAssignments.forEach(assignment => console.log(assignment));

console.log("\nSeçilen Kampanyalar:");
crmResult.selectedCampaigns.forEach(campaign => {
    console.log(`${campaign.name}: Maliyet - ${campaign.cost}, ROI - ${campaign.roi}`);
});

console.log(`\nToplam ROI: ${crmResult.totalROI}`);

