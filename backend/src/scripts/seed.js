const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Device = require('../models/Device');
const connectDB = require('../config/database');

// Load environment variables
dotenv.config();

// Sample devices data
const devices = [
  {
    name: "Nokia 1110",
    year: 2005,
    category: "phone",
    emoji: "📱",
    era: "2000s",
    rarity: "common",
    description: "Chiếc điện thoại huyền thoại với độ bền vô địch. Pin dùng được cả tuần, game rắn săn mồi làm say đắm biết bao thế hệ.",
    memories: "Ai chưa từng chơi game rắn săn mồi trên Nokia? Màn hình đen trắng nhỏ xíu nhưng là cả một tuổi thơ. Nhớ nhất là cảm giác phím bấm, tiếng 'tíc tắc' mỗi khi gõ tin nhắn. Pin dùng cả tuần không cần sạc, thả rơi từ tầng 3 vẫn còn nguyên - đó là Nokia!",
    tags: ["nokia", "feature-phone", "durable"],
    price: {
      original: 50,
      currency: "USD",
      vintageValue: 25
    },
    specifications: {
      "Màn hình": "Monochrome 96x65 pixels",
      "Pin": "900 mAh - 400h standby",
      "Trọng lượng": "80g",
      "Đặc điểm": "Game rắn săn mồi, đèn pin"
    }
  },
  {
    name: "Sony Walkman WM-2",
    year: 1985,
    category: "audio",
    emoji: "🎧",
    era: "80s",
    rarity: "rare",
    description: "Máy nghe nhạc cassette di động đầu tiên. Biểu tượng của thời đại âm nhạc analog với chất lượng âm thanh ấm áp.",
    memories: "Thời không có Spotify, chúng ta có Walkman và băng cassette. Mỗi buổi sáng đi học, cắm tai nghe và lắng nghe những bản nhạc yêu thích được thu âm từ radio. Cảm giác tua băng để tìm bài hát, nghe lại đi nghe lại lại cho đến khi băng bị giãn - đó là cả một kỷ niệm.",
    tags: ["sony", "walkman", "cassette", "portable"],
    price: {
      original: 200,
      currency: "USD",
      vintageValue: 500
    },
    specifications: {
      "Định dạng": "Cassette tape",
      "Pin": "2 AA batteries",
      "Trọng lượng": "280g",
      "Đặc điểm": "Auto-reverse, Metal tape support"
    }
  },
  {
    name: "Nintendo Game Boy",
    year: 1989,
    category: "console",
    emoji: "🎮",
    era: "80s",
    rarity: "legendary",
    description: "Máy chơi game cầm tay huyền thoại với màn hình LCD xanh. Pokemon, Mario, Tetris - tất cả đều bắt đầu từ đây.",
    memories: "Màn hình xanh lá cây đơn sắc đó giờ nghĩ lại thật lạ, nhưng ngày xưa nó là cả một thế giới. Ai cũng mơ ước có một cái Game Boy và bộ sưu tập băng game Pokemon. Chơi dưới ánh đèn vì màn hình không có đèn nền, và âm thanh 8-bit vẫn còn văng vẳng trong tai.",
    tags: ["nintendo", "gameboy", "handheld", "pokemon"],
    price: {
      original: 89,
      currency: "USD",
      vintageValue: 300
    },
    specifications: {
      "CPU": "Sharp LR35902 8-bit",
      "Màn hình": "2.6 inch LCD 160x144",
      "Pin": "4 AA batteries - 30h",
      "Game nổi tiếng": "Pokemon, Tetris, Super Mario Land"
    }
  },
  {
    name: "Commodore 64",
    year: 1982,
    category: "computer",
    emoji: "💻",
    era: "80s",
    rarity: "legendary",
    description: "Máy tính gia đình phổ biến nhất thập niên 80. Khởi đầu của làn sóng máy tính cá nhân tại gia đình.",
    memories: "Load game từ băng cassette mất cả 10 phút, nhưng niềm vui khi game chạy được là vô bờ. Âm thanh SID chip vẫn còn vang vọng trong tai những ai đã từng trải nghiệm. Gõ code BASIC từ sách, chạy được là hạnh phúc tột bậc.",
    tags: ["commodore", "8-bit", "retro-computing"],
    price: {
      original: 595,
      currency: "USD",
      vintageValue: 800
    },
    specifications: {
      "CPU": "MOS 6510 @ 1MHz",
      "RAM": "64KB",
      "Đồ họa": "320x200, 16 colors",
      "Âm thanh": "SID chip 3 voices"
    }
  },
  {
    name: "Sony Discman D-50",
    year: 1990,
    category: "audio",
    emoji: "💿",
    era: "90s",
    rarity: "uncommon",
    description: "Máy nghe nhạc CD di động. Bước tiến lớn từ cassette sang CD, chất lượng âm thanh digital rõ ràng hơn.",
    memories: "Nhớ cái cảm giác cầm chiếc Discman to tướng, cố gắng đi thật nhẹ nhàng để đĩa CD không bị nhảy. Mỗi album CD là một kho báu được cất giữ cẩn thận. Chức năng chống rung ESP là phép màu thời đó.",
    tags: ["sony", "discman", "cd", "portable"],
    price: {
      original: 250,
      currency: "USD",
      vintageValue: 150
    },
    specifications: {
      "Định dạng": "CD Audio",
      "Pin": "2 AA batteries",
      "Chống rung": "ESP (Electronic Skip Protection)",
      "Trọng lượng": "350g"
    }
  },
  {
    name: "Motorola RAZR V3",
    year: 2004,
    category: "phone",
    emoji: "📲",
    era: "2000s",
    rarity: "rare",
    description: "Điện thoại nắp gập mỏng nhất thời bấy giờ. Thiết kế kim loại sang trọng, biểu tượng của sự thời thượng.",
    memories: "Cái 'tách' khi mở nắp là cả một phong cách. RAZR V3 không chỉ là điện thoại mà còn là phụ kiện thời trang. Ai cũng ngưỡng mộ người có chiếc RAZR bạc bóng. Bàn phím kim loại phẳng lì, màn hình trong xanh đẹp mê ly.",
    tags: ["motorola", "razr", "flip-phone", "fashion"],
    price: {
      original: 499,
      currency: "USD",
      vintageValue: 200
    },
    specifications: {
      "Màn hình": "2.2 inch 176x220",
      "Camera": "VGA 0.3MP",
      "Độ dày": "13.9mm",
      "Đặc điểm": "Vỏ kim loại, bàn phím phẳng"
    }
  },
  {
    name: "Sony PlayStation 1",
    year: 1994,
    category: "console",
    emoji: "🕹️",
    era: "90s",
    rarity: "legendary",
    description: "Máy chơi game đầu tiên sử dụng đĩa CD. Mở ra kỷ nguyên gaming 3D với hàng nghìn tựa game kinh điển.",
    memories: "Âm thanh khởi động PlayStation vẫn còn đọng lại trong tâm trí. Final Fantasy VII, Metal Gear Solid, Crash Bandicoot - những tựa game làm nên tuổi thơ của một thế hệ. Mở nắp đĩa để thay game, thổi vào đĩa khi nó không đọc - những ký ức không thể nào quên.",
    tags: ["sony", "playstation", "gaming", "3d"],
    price: {
      original: 299,
      currency: "USD",
      vintageValue: 400
    },
    specifications: {
      "CPU": "MIPS R3000 33MHz",
      "RAM": "2MB",
      "Đồ họa": "GPU 3D",
      "Game nổi tiếng": "FF VII, MGS, Crash Bandicoot, Tekken"
    }
  },
  {
    name: "Apple iPod Classic",
    year: 2001,
    category: "audio",
    emoji: "🎵",
    era: "2000s",
    rarity: "legendary",
    description: "Máy nghe nhạc MP3 cách mạng với ổ cứng lưu trữ hàng nghìn bài hát. Click wheel iconic và thiết kế tối giản.",
    memories: "1000 bài hát trong túi của bạn - đó là lời hứa của iPod và họ đã làm được. Xoay click wheel để tìm bài hát là một trải nghiệm khó quên. iTunes và iPod thay đổi cách chúng ta nghe nhạc mãi mãi. Màn hình trắng đen simple nhưng đẹp không tì vết.",
    tags: ["apple", "ipod", "mp3", "revolutionary"],
    price: {
      original: 399,
      currency: "USD",
      vintageValue: 600
    },
    specifications: {
      "Dung lượng": "5GB - 160GB",
      "Pin": "10-20 hours",
      "Màn hình": "2 inch LCD",
      "Đặc điểm": "Click wheel, FireWire/USB"
    }
  },
  {
    name: "Canon AE-1",
    year: 1976,
    category: "camera",
    emoji: "📷",
    era: "70s",
    rarity: "rare",
    description: "Máy ảnh film SLR 35mm huyền thoại. Chế độ tự động phơi sáng giúp nhiếp ảnh trở nên dễ dàng hơn.",
    memories: "Mỗi lần bấm máy là một quyết định cân nhắc vì film có hạn. Tiếng 'click' của màn trập, việc lên phim thủ công, và sự chờ đợi khi rửa ảnh - tất cả tạo nên một trải nghiệm nhiếp ảnh chân thực. Chỉnh manual focus qua kính ngắm, cảm giác nặng trĩu của máy film.",
    tags: ["canon", "film-camera", "slr", "photography"],
    price: {
      original: 625,
      currency: "USD",
      vintageValue: 450
    },
    specifications: {
      "Mount": "Canon FD",
      "Film": "35mm",
      "Shutter": "1/1000s - 2s",
      "Đặc điểm": "AE mode, TTL metering"
    }
  },
  {
    name: "Casio Calculator Watch CA-53W",
    year: 1985,
    category: "other",
    emoji: "⌚",
    era: "80s",
    rarity: "uncommon",
    description: "Đồng hồ tích hợp máy tính. Biểu tượng của sự sành điệu công nghệ thập niên 80, gắn liền với hình ảnh học sinh giỏi.",
    memories: "Đeo đồng hồ Casio có máy tính là cả một niềm tự hào. Bấm phím nhỏ xíu trên đồng hồ để tính toán, và cái đèn LED nhỏ xíu soi đường trong đêm tối. Trong lớp học, đây là vũ khí bí mật cho các bài kiểm tra toán.",
    tags: ["casio", "calculator", "watch", "retro"],
    price: {
      original: 35,
      currency: "USD",
      vintageValue: 80
    },
    specifications: {
      "Màn hình": "LCD 8-digit",
      "Tính năng": "Calculator, Alarm, Stopwatch",
      "Pin": "CR2016",
      "Chống nước": "Water resistant"
    }
  },
  {
    name: "Polaroid SX-70",
    year: 1972,
    category: "camera",
    emoji: "📸",
    era: "70s",
    rarity: "legendary",
    description: "Máy ảnh chụp lấy liền gập được. Ảnh hiện ra ngay sau khi chụp, phép màu của thập niên 70.",
    memories: "Cảm giác kỳ diệu khi xem bức ảnh từ từ hiện ra trên tờ giấy trắng. Lắc tay lắc lắc tấm ảnh (dù không cần thiết) đã trở thành một thói quen vui nhộn. Mỗi bức ảnh Polaroid là độc nhất vô nhị, có chất film đặc trưng không thể làm giả.",
    tags: ["polaroid", "instant-camera", "vintage"],
    price: {
      original: 180,
      currency: "USD",
      vintageValue: 900
    },
    specifications: {
      "Film": "Polaroid SX-70",
      "Ống kính": "f/8, 116mm",
      "Focus": "10.4 inch to infinity",
      "Đặc điểm": "Folding design, Auto-exposure"
    }
  },
  {
    name: "Sega Dreamcast",
    year: 1999,
    category: "console",
    emoji: "🎮",
    era: "90s",
    rarity: "rare",
    description: "Máy chơi game 128-bit cuối cùng của Sega. Tiên phong với chơi game online và VMU memory card có màn hình.",
    memories: "Dreamcast ra đời sớm hơn thời đại của nó. Shenmue, Sonic Adventure, Crazy Taxi - những tựa game đầy sáng tạo. VMU có thể chơi game mini độc lập là một ý tưởng thiên tài. Console chết yểu nhưng để lại di sản lớn lao cho gaming.",
    tags: ["sega", "dreamcast", "gaming", "innovative"],
    price: {
      original: 199,
      currency: "USD",
      vintageValue: 350
    },
    specifications: {
      "CPU": "Hitachi SH-4 200MHz",
      "RAM": "16MB",
      "Đồ họa": "PowerVR2 GPU",
      "Game nổi tiếng": "Shenmue, Sonic Adventure, Crazy Taxi"
    }
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing devices
    console.log('🗑️  Clearing existing devices...');
    await Device.deleteMany({});

    // Insert new devices
    console.log('📝 Inserting sample devices...');
    await Device.insertMany(devices);

    console.log(`✅ Successfully seeded ${devices.length} devices!`);
    console.log('🎉 Database seeding completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
