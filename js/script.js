/**
 * =========================================================================
 * S.C.A. 終端內部論壇 - 各部門與維序官動態吐槽系統
 * =========================================================================
 */

// 1. 核心資料庫：儲存各個留言板的吐槽對話資料
const complaintDatabase = {
    vesper: [
        // 🛠️ 邏輯修正：由資深維序官 A 先動態跳出回覆，再引出某葉的「扮豬吃老虎」發言！
        {
            sender: 'senior-a',
            name: '資深維序官 A',
            text: '（系統提示：該維序官已轉移合約/檔案部分屏蔽）……07號新人，組長是在救你。手冊裡的 Vesper Lancrea 指的就是我們私下叫的「某葉」大人。只要她心情好時空就安全，她要是暴走，我們就得全體熬夜修補時間線。遇到這種狀況，常規物理干涉全部無效，唯一的自救手段就是立刻鎖定『幽逸雨（喵幽）』小姐的位置，祈禱她及時順毛。'
        },
        {
            sender: 'vesper',
            name: '某葉 (Vesper)',
            text: '哎呀，資深維序官 A 說得太誇張了～（推眼鏡）我明明只是個體弱多病、隨時會低血糖暈倒的普通人類魔術師罷了，哪有什麼毀滅時空的能力呢？'
        },
        {
            sender: 'miaoyou',
            name: '喵幽 (Miaoyou)',
            text: '葉！你少來！到底是誰一邊低血糖，一邊隨手用時空法則把墨淵的私人空間全部塗成芭比粉的啊？！還有，今天又不准偷偷不吃飯！（生氣地無意識用尾巴捲住某葉）'
        },
        {
            sender: 'youmingjin',
            name: '幽冥燼',
            text: '哈哈，小喵幽別生氣。來，先把這碗剛熬好、完全沒有藥味的溫補牛肉湯喝了。至於某葉大人……「哥哥」（葉沐風）已經準備拿著剛泡好的伊墨茶去對她進行「泡茶規勸」了。'
        }
    ],
    moyuan: [
        { sender: 'vesper', name: '某葉 (Vesper)', text: '墨淵那傢伙懂不懂什麼叫高級感的「莫蘭迪灰」啊？居然嫌棄我的實驗室不夠純粹漆黑？漆成芭比粉都是便宜他了。' },
        { sender: 'bonnie', name: '蓓妮 (Bonnie)', text: '（佛系微笑）大人，那次事件後，我已經用得體且優雅的官方辭令寫了謝絕函把墨淵堵回去了。字面意思是請他滾，別耽誤我們做網頁遊戲。' },
        { sender: 'mufeng', name: '葉沐風', text: '呵，這兩人的混沌屬性共鳴確實挺浪費觀測資源的。比起爭吵，我更建議他們坐下來喝杯我剛泡好的伊墨茶。' }
    ],
    mufeng: [
        { sender: 'youmingjin', name: '幽冥燼', text: '那當然！「哥哥」可是原始意識體裡唯一的「秩序之光」！只要他端著膳食走進來，無論是暴走的某葉或是偷偷吃瓜的魔王，都會瞬間老實變茶會現場。' },
        { sender: 'mufeng', name: '葉沐風', text: '冥，安靜點。還有，你在「看熱鬧不嫌事大」的樣子也稍微收斂點，別在內部論壇刷屏。' },
        { sender: 'vesper', name: '某葉 (Vesper)', text: '喲，不愧是我們家精緻冷峻的「大美人」族長，一開口就是頂級心理戰～沐風，要不要試試我研發的新調味汁？拿去加在幽冥燼今天的牛肉湯裡一定很有趣（樂子人微笑）。' }
    ]
};

// 2. 觸發吐槽彈出視窗的核心函式 (明確掛載到 window，確保 HTML 的 onclick 絕對讀得到)
window.triggerComplaint = function(id) {
    const container = document.getElementById(`complaint-${id}`);
    if (!container) {
        console.error(`找不到容器: complaint-${id}`);
        return;
    }

    // 如果裡面已經有對話泡泡了，代表使用者再度點擊，那就進行「顯示/隱藏」的切換
    if (container.children.length > 0) {
        if (container.style.display === 'none' || container.style.display === '') {
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
        return;
    }

    // 第一次點擊，確保容器展示出來並設為 flex
    container.style.display = 'flex';

    const script = complaintDatabase[id];
    if (!script) return;

    // 跑迴圈依序輸出對話，並帶有 0.5 秒的生動時間差
    script.forEach((dialogue, index) => {
        setTimeout(() => {
            const bubble = document.createElement('div');
            // 將 CSS class 對應到 dialogue.sender (如 bubble vesper)
            bubble.className = `bubble ${dialogue.sender}`;
            bubble.innerHTML = `<strong>${dialogue.name}：</strong>${dialogue.text}`;

            container.appendChild(bubble);
        }, index * 500);
    });
};

// 3. 頁面載入完成後的額外初始化 (修正原 Bootstrap 範本的滾動監聽錯誤)
window.addEventListener('DOMContentLoaded', () => {
    // 修正導覽列收縮效果 (對應當前的 sca-navbar)
    const navbarCollapsible = document.body.querySelector('.sca-navbar');
    if (navbarCollapsible) {
        const navbarShrink = () => {
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink');
            } else {
                navbarCollapsible.classList.add('navbar-shrink');
            }
        };
        navbarShrink();
        document.addEventListener('scroll', navbarShrink);
    }

    // 啟用 Bootstrap 的 ScrollSpy (滾動自動同步導覽列高亮)
    const scaNav = document.body.querySelector('#scaNav');
    if (scaNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#scaNav',
            rootMargin: '0px 0px -40%',
        });
    }
});

/**
 * =========================================================================
 * 滾動式終端機任務牆 —— 數據載入與無縫複製控制
 * =========================================================================
 */
const scaMissions = [
    { time: "08:14:22", dept: "歷史遺物修復科", status: "WORKING", info: "[工作日誌] 首席實習生葉思冥正在縫補被創世神們吵架震碎的時間線...（怨念值 99%）" },
    { time: "09:30:15", dept: "管制觀測處", status: "WARNING", info: "⚠️ 幽冥燼卡片警告：嚴禁在此觀測對象面前拿出醫療針劑或蔬果汁！" },
    { time: "11:05:40", dept: "後勤整備裝備庫", status: "SYNCED", info: "[環境偽裝狀態] 概念武裝已自動偽裝為：鑲嵌寶石的鋼筆（魔法世界模式）。" },
    { time: "13:22:11", dept: "特級戰略部", status: "ALERT", info: "【警告】觀測到原始意識體 Vesper 低血糖指標接近臨界點，速將巧克力補給投遞至相應時空節點！" },
    { time: "15:45:00", dept: "技術科", status: "MONITOR", info: "檢測到防火牆遭受未授權干涉，偵測到微量草莓賽博兔代碼特徵，暫定為非惡意串門，予以放行。" },
    { time: "17:10:33", dept: "外勤維序分隊", status: "STABLE", info: "已成功回收原初影界浮塵碎屑三枚，當前局部時空穩定度已回升至 94.2%。" },
    { time: "23:59:59", dept: "全體維序分隊", status: "SLEEPING", info: "[全體通告] 今日份的時間線都縫好了，大家打卡下班，睡覺去！" }
];

function initMissionWall() {
    const track = document.getElementById('mission-scroll-track');
    if (!track) return;

    // 將狀態轉換為對應的 Bootstrap 文字色彩或自訂發光色
    const getStatusBadge = (status) => {
        const colors = {
            WORKING: '#e17055',
            WARNING: '#d63031',
            SYNCED: '#0984e3',
            ALERT: '#ff9f43',
            MONITOR: '#fdcb6e',
            STABLE: '#00b894',
            SLEEPING: '#81ecec'
        };
        return `<span style="color: ${colors[status] || '#00ff66'}; font-weight: bold;">[${status}]</span>`;
    };

    // 建立任務 HTML 模板
    const createMissionHTML = (mission) => `
        <div class="mission-item-card d-flex align-items-start gap-3">
            <span style="color: #00ff66; font-weight: bold; white-space: nowrap;">&gt; ${mission.time}</span>
            <span style="color: var(--text-muted); white-space: nowrap;">[${mission.dept}]</span>
            <div style="color: #efeada; font-size: 0.9rem;">
                ${getStatusBadge(mission.status)} ${mission.info}
            </div>
        </div>
    `;

    // 渲染第一輪原始數據
    let htmlContent = scaMissions.map(createMissionHTML).join('');

    // 【核心關鍵】複製一份一模一樣的數據接在後面，用來欺騙視覺，達成 HTML 無縫滾動
    htmlContent += scaMissions.map(createMissionHTML).join('');

    track.innerHTML = htmlContent;
}

// 確保網頁載入時跑這個初始化
window.addEventListener('DOMContentLoaded', () => {
    initMissionWall();
});

/**
 * =========================================================================
 * 兔子 Bammie 的網頁惡作劇（最強彩蛋計數與覆寫機制）
 * =========================================================================
 */
function initBammieEasterEgg() {
    const bunnyBtn = document.getElementById('bammie-hacker-bunny');
    const overlay = document.getElementById('bammie-popup-overlay');
    const feedBtn = document.getElementById('btn-feed-strawberry');

    if (!bunnyBtn || !overlay || !feedBtn) return;

    let clickCount = 0;
    let clickTimeout;

    bunnyBtn.addEventListener('click', () => {
        clickCount++;

        // 畫面上震動提示，暗示玩家發現了可疑按鈕
        bunnyBtn.style.transform = `scale(1.2) rotate(${clickCount % 2 === 0 ? 15 : -15}deg)`;
        setTimeout(() => { bunnyBtn.style.transform = ''; }, 150);

        // 重置連續點擊時間差計時器（必須在 3 秒內點完 5 次才算成就）
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            clickCount = 0;
        }, 3000);

        // 達成 5 次點擊成就，啟動侵入！
        if (clickCount === 5) {
            clickCount = 0;
            triggerBammieHack();
        }
    });

    // 觸發入侵：篡改主體變數，開啟警告彈窗
    function triggerBammieHack() {
        document.body.classList.add('bammie-hacked-mode');
        overlay.style.display = 'flex';
        console.warn("⚠️ S.C.A. ALERT: Unauthorized code block injected by 'Bammie'.");
    }

    // 解除入侵：投餵草莓大福
    feedBtn.addEventListener('click', () => {
        overlay.style.animation = 'bammiePop 0.3s ease reverse forwards';

        setTimeout(() => {
            document.body.classList.remove('bammie-hacked-mode');
            overlay.style.display = 'none';
            overlay.style.animation = ''; // 還原動畫
            alert("Bammie：「草莓成分很純正，多謝款待。系統權限還給你們囉～(燦爛微笑)」");
        }, 3000); // 留給回播動畫一點緩衝時間
    });
}

// 註冊到現有的 DOMContentLoaded 監聽器中
window.addEventListener('DOMContentLoaded', () => {
    initBammieEasterEgg();
});