/**
 * =========================================================================
 * S.C.A. 終端內部論壇 - 各部門與維序官動態吐槽系統 (獨立整合版)
 * =========================================================================
 */

// 1. 核心資料庫：儲存各個留言板的吐槽對話資料
const complaintDatabase = {
    vesper: [
        { sender: 'vesper', name: '某葉 (Vesper)', text: '資深維序官 A 說得對，我只是個體弱多病、隨時會低血糖暈倒的普通人類魔術師罷了～（推眼鏡）' },
        { sender: 'miaoyou', name: '喵幽 (Miaoyou)', text: '葉！你少來！昨天是誰一邊低血糖一邊用時空法則把別人的私人空間塗成芭比粉的！還有，不准偷偷不吃飯！（無意識用尾巴捲住葉）' },
        { sender: 'youmingjin', name: '幽冥燼', text: '哈哈，小喵幽別生氣，來，先把這碗剛熬好、完全沒有藥味的溫補牛肉湯喝了。至於某葉……哥哥已經準備去給她「泡茶規勸」了。' },
        // 🛠️ 新增：神秘人資深維序官 A 登場！
        { sender: 'senior-a', name: '資深維序官 A', text: '（已離職/檔案屏蔽）……某葉大人，請不要隨便盜用我的名義當不吃飯的藉口。還有，雖然我已轉移合約，但看在過去的份上，提醒您幽冥燼大人的牛肉湯裡真的沒有加藥，請務必喝完。' }
    ],
    moyuan: [
        { sender: 'vesper', name: '某葉 (Vesper)', text: '墨淵那傢伙懂不懂什麼叫高級感的「莫蘭迪灰」啊？居然嫌棄我的實驗室不夠純粹漆黑？漆成芭比粉都是便宜他了。' },
        { sender: 'bonnie', name: '蓓妮 (Bonnie)', text: '（佛系微笑）大人，那次事件後，我已經用得體且優雅的官方辭令寫了謝絕函把墨淵堵回去了。字面意思是請他滾，別耽誤我們做網頁遊戲。' },
        { sender: 'mufeng', name: '葉沐風', text: '呵，這兩人的混沌屬性共鳴確實挺浪費觀測資源的。比起爭吵，我更建議他們坐下來喝杯我剛泡好的伊墨茶。' }
    ],
    mufeng: [
        { sender: 'youmingjin', name: '幽冥燼', text: '那當然！哥哥可是原始意識體裡唯一的「秩序之光」！只要他端著膳食走進來，無論是暴走的某葉或是偷偷吃瓜的魔王，都會瞬間老實變茶會現場。' },
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
    // 修正導覽列收縮效果 (對應你當前的 sca-navbar)
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