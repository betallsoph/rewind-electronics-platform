// Database of electronic devices with nostalgia
const devices = [
    {
        id: 1,
        name: "Nokia 1110",
        year: 2005,
        category: "phone",
        emoji: "📱",
        description: "Chiếc điện thoại huyền thoại với độ bền vô địch. Pin dùng được cả tuần, game rắn săn mồi làm say đắm biết bao thế hệ.",
        memories: "Ai chưa từng chơi game rắn săn mồi trên Nokia? Màn hình đen trắng nhỏ xíu nhưng là cả một tuổi thơ. Nhớ nhất là cảm giác phím bấm, tiếng 'tíc tắc' mỗi khi gõ tin nhắn."
    },
    {
        id: 2,
        name: "Sony Walkman",
        year: 1985,
        category: "audio",
        emoji: "🎧",
        description: "Máy nghe nhạc cassette di động đầu tiên. Biểu tượng của thời đại âm nhạc analog với chất lượng âm thanh ấm áp.",
        memories: "Thời không có Spotify, chúng ta có Walkman và băng cassette. Mỗi buổi sáng đi học, cắm tai nghe và lắng nghe những bản nhạc yêu thích được thu âm từ radio."
    },
    {
        id: 3,
        name: "Nintendo Game Boy",
        year: 1989,
        category: "console",
        emoji: "🎮",
        description: "Máy chơi game cầm tay huyền thoại với màn hình LCD xanh. Pokemon, Mario, Tetris - tất cả đều bắt đầu từ đây.",
        memories: "Màn hình xanh lá cây đơn sắc đó giờ nghĩ lại thật lạ, nhưng ngày xưa nó là cả một thế giới. Ai cũng mơ ước có một cái Game Boy và bộ sưu tập băng game Pokemon."
    },
    {
        id: 4,
        name: "Commodore 64",
        year: 1982,
        category: "computer",
        emoji: "💻",
        description: "Máy tính gia đình phổ biến nhất thập niên 80. Khởi đầu của làn sóng máy tính cá nhân tại gia đình.",
        memories: "Load game từ băng cassette mất cả 10 phút, nhưng niềm vui khi game chạy được là vô bờ. Âm thanh SID chip vẫn còn vang vọng trong tai những ai đã từng trải nghiệm."
    },
    {
        id: 5,
        name: "Sony Discman",
        year: 1990,
        category: "audio",
        emoji: "💿",
        description: "Máy nghe nhạc CD di động. Bước tiến lớn từ cassette sang CD, chất lượng âm thanh digital rõ ràng hơn.",
        memories: "Nhớ cái cảm giác cầm chiếc Discman to tướng, cố gắng đi thật nhẹ nhàng để đĩa CD không bị nhảy. Mỗi album CD là một kho báu được cất giữ cẩn thận."
    },
    {
        id: 6,
        name: "Motorola RAZR V3",
        year: 2004,
        category: "phone",
        emoji: "📲",
        description: "Điện thoại nắp gập mỏng nhất thời bấy giờ. Thiết kế kim loại sang trọng, biểu tượng của sự thời thượng.",
        memories: "Cái 'tách' khi mở nắp là cả một phong cách. RAZR V3 không chỉ là điện thoại mà còn là phụ kiện thời trang. Ai cũng ngưỡng mộ người có chiếc RAZR bạc bóng."
    },
    {
        id: 7,
        name: "Sony PlayStation 1",
        year: 1994,
        category: "console",
        emoji: "🕹️",
        description: "Máy chơi game đầu tiên sử dụng đĩa CD. Mở ra kỷ nguyên gaming 3D với hàng nghìn tựa game kinh điển.",
        memories: "Âm thanh khởi động PlayStation vẫn còn đọng lại trong tâm trí. Final Fantasy VII, Metal Gear Solid, Crash Bandicoot - những tựa game làm nên tuổi thơ của một thế hệ."
    },
    {
        id: 8,
        name: "iPod Classic",
        year: 2001,
        category: "audio",
        emoji: "🎵",
        description: "Máy nghe nhạc MP3 cách mạng với ổ cứng lưu trữ hàng nghìn bài hát. Click wheel iconic và thiết kế tối giản.",
        memories: "1000 bài hát trong túi của bạn - đó là lời hứa của iPod và họ đã làm được. Xoay click wheel để tìm bài hát là một trải nghiệm khó quên. iTunes và iPod thay đổi cách chúng ta nghe nhạc mãi mãi."
    },
    {
        id: 9,
        name: "Canon AE-1",
        year: 1976,
        category: "camera",
        emoji: "📷",
        description: "Máy ảnh film SLR 35mm huyền thoại. Chế độ tự động phơi sáng giúp nhiếp ảnh trở nên dễ dàng hơn.",
        memories: "Mỗi lần bấm máy là một quyết định cân nhắc vì film có hạn. Tiếng 'click' của màn trập, việc lên phim thủ công, và sự chờ đợi khi rửa ảnh - tất cả tạo nên một trải nghiệm nhiếp ảnh chân thực."
    },
    {
        id: 10,
        name: "Casio Calculator Watch",
        year: 1980,
        category: "computer",
        emoji: "⌚",
        description: "Đồng hồ tích hợp máy tính. Biểu tượng của sự sành điệu công nghệ thập niên 80, gắn liền với hình ảnh học sinh giỏi.",
        memories: "Đeo đồng hồ Casio có máy tính là cả một niềm tự hào. Bấm phím nhỏ xíu trên đồng hồ để tính toán, và cái đèn LED nhỏ xíu soi đường trong đêm tối."
    },
    {
        id: 11,
        name: "Polaroid SX-70",
        year: 1972,
        category: "camera",
        emoji: "📸",
        description: "Máy ảnh chụp lấy liền gập được. Ảnh hiện ra ngay sau khi chụp, phép màu của thập niên 70.",
        memories: "Cảm giác kỳ diệu khi xem bức ảnh từ từ hiện ra trên tờ giấy trắng. Lắc tay lắc lắc tấm ảnh (dù không cần thiết) đã trở thành một thói quen vui nhộn. Mỗi bức ảnh Polaroid là độc nhất vô nhị."
    },
    {
        id: 12,
        name: "Sega Dreamcast",
        year: 1999,
        category: "console",
        emoji: "🎮",
        description: "Máy chơi game 128-bit cuối cùng của Sega. Tiên phong với chơi game online và VMU memory card có màn hình.",
        memories: "Dreamcast ra đời sớm hơn thời đại của nó. Shenmue, Sonic Adventure, Crazy Taxi - những tựa game đầy sáng tạo. VMU có thể chơi game mini độc lập là một ý tưởng thiên tài."
    }
];

// State management
let currentCategory = 'all';
let searchTerm = '';

// DOM Elements
const deviceGrid = document.getElementById('deviceGrid');
const searchInput = document.getElementById('searchInput');
const navButtons = document.querySelectorAll('.nav-btn');
const modal = document.getElementById('deviceModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDevices();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Navigation buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderDevices();
        });
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderDevices();
    });

    // Modal close
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Filter devices
function filterDevices() {
    return devices.filter(device => {
        const matchesCategory = currentCategory === 'all' || device.category === currentCategory;
        const matchesSearch = device.name.toLowerCase().includes(searchTerm) ||
                            device.description.toLowerCase().includes(searchTerm) ||
                            device.year.toString().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
}

// Render devices
function renderDevices() {
    const filteredDevices = filterDevices();
    
    if (filteredDevices.length === 0) {
        deviceGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">😢</div>
                <h2>Không tìm thấy thiết bị nào</h2>
                <p>Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
            </div>
        `;
        return;
    }

    deviceGrid.innerHTML = filteredDevices.map(device => `
        <div class="device-card" onclick="showDeviceDetails(${device.id})">
            <div class="device-image">${device.emoji}</div>
            <div class="device-content">
                <span class="device-category">${getCategoryName(device.category)}</span>
                <h2 class="device-title">${device.name}</h2>
                <p class="device-year">📅 ${device.year}</p>
                <p class="device-description">${device.description}</p>
            </div>
        </div>
    `).join('');
}

// Get category name in Vietnamese
function getCategoryName(category) {
    const categoryNames = {
        'phone': 'Điện thoại',
        'computer': 'Máy tính',
        'console': 'Máy chơi game',
        'audio': 'Âm thanh',
        'camera': 'Máy ảnh'
    };
    return categoryNames[category] || category;
}

// Show device details in modal
function showDeviceDetails(id) {
    const device = devices.find(d => d.id === id);
    if (!device) return;

    modalBody.innerHTML = `
        <div class="modal-image">${device.emoji}</div>
        <h2 class="modal-title">${device.name}</h2>
        <p class="modal-year">📅 Năm ra mắt: ${device.year}</p>
        <span class="modal-category">${getCategoryName(device.category)}</span>
        <p class="modal-description">${device.description}</p>
        <div class="modal-memories">
            <h3>💭 Ký ức</h3>
            <p>${device.memories}</p>
        </div>
    `;

    modal.style.display = 'block';
}

// Make function global for onclick
window.showDeviceDetails = showDeviceDetails;
