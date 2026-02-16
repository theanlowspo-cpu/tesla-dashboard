// 在頁面頂部插入市場狀態橫幅
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        if (data.isMarketClosed) {
            const banner = document.createElement('div');
            banner.style.cssText = `
                background: linear-gradient(135deg, #e82127 0%, #b71c1c 100%);
                color: white;
                padding: 25px;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                margin: 20px 0;
                border-radius: 12px;
                box-shadow: 0 4px 8px rgba(232,33,39,0.4);
                border: 2px solid rgba(255,255,255,0.2);
            `;
            
            const nextTradingDay = getNextTradingDay();
            
            banner.innerHTML = `
                <div style="font-size: 28px; margin-bottom: 12px;">🛑 美國股市休市中</div>
                <div style="font-size: 18px; opacity: 0.95; margin-bottom: 8px;">
                    今日假期：${data.marketClosedReason}
                </div>
                <div style="font-size: 15px; margin-top: 12px; opacity: 0.85;">
                    📅 下次開市：${nextTradingDay}
                </div>
                <div style="font-size: 13px; margin-top: 12px; opacity: 0.75; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.2);">
                    ⚠️ 顯示數據為最後交易日收盤價格
                </div>
                <div style="font-size: 12px; margin-top: 8px; opacity: 0.7;">
                    自動交易系統已暫停，等待市場開市
                </div>
            `;
            
            const container = document.querySelector('.container');
            if (container) {
                container.insertBefore(banner, container.firstChild);
            }
        }
    })
    .catch(err => console.error('Failed to load market status:', err));

function getNextTradingDay() {
    const now = new Date();
    const day = now.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
    
    // 週五 → 下週一
    if (day === 5) return '下週一 (2月17日)';
    // 週六 → 下週一
    if (day === 6) return '下週一 (2月17日)';
    // 週日 → 明天（週一）
    if (day === 0) return '明天 (2月17日)';
    // 週一到週四的假期 → 明天
    return '明天';
}
