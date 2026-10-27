// Football Store Product Catalog Database
const PRODUCTS_DATA = [
    // --- รองเท้าสตั๊ด (Football Boots) ---
    {
        id: "boot-1",
        name: "Nike Air Zoom Mercurial Superfly 10 Elite FG",
        category: "boots",
        brand: "Nike",
        groundType: "FG",
        price: 8900,
        originalPrice: 9900,
        rating: 4.9,
        reviewsCount: 48,
        isNew: true,
        isHot: true,
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11"],
        description: "รองเท้าสตั๊ดสายความเร็วตัวท็อป มาพร้อมถุงลม Zoom Air เฉพาะรุ่น 3/4 และโครงสร้าง Flyknit ยืดหยุ่นพิเศษ ปุ่มสตั๊ดแบบ Tri-star ช่วยให้ออกตัวและเปลี่ยนทิศทางได้รวดเร็วที่สุดในคลาส",
        specs: {
            "ประเภทปุ่ม": "FG (Firm Ground สำหรับสนามหญ้าจริง)",
            "อัปเปอร์": "Vaporposite+ ร่วมกับ Flyknit น้ำหนักเบาพิเศษ",
            "เทคโนโลยี": "3/4 Zoom Air Unit ให้แรงส่งทุกสปรินต์",
            "น้ำหนัก": "ประมาณ 185 กรัม (เบอร์ 9 US)"
        }
    },
    {
        id: "boot-2",
        name: "Adidas Predator 24 Elite FT FG (Fold-over Tongue)",
        category: "boots",
        brand: "Adidas",
        groundType: "FG",
        price: 9200,
        originalPrice: 9500,
        rating: 5.0,
        reviewsCount: 62,
        isNew: true,
        isHot: true,
        image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5"],
        description: "การกลับมาของลิ้นพับในตำนาน Predator Strikeskin ครีบยางปั่นไซด์โค้งช่วยเพิ่มความแม่นยำในการยิงประตูและวางบอลระดับเวิลด์คลาส โครงสร้าง Controlframe 2.0 เสริมความมั่นคง",
        specs: {
            "ประเภทปุ่ม": "FG (Firm Ground สำหรับสนามหญ้าจริง)",
            "อัปเปอร์": "HybridTouch 2.0 นุ่มกระชับพร้อม Strikeskin fin",
            "เทคโนโลยี": "Controlframe 2.0 และลิ้นพับแบบคลาสสิกรัดยาง",
            "น้ำหนัก": "ประมาณ 208 กรัม"
        }
    },
    {
        id: "boot-3",
        name: "Mizuno Morelia Neo IV Beta Made In Japan",
        category: "boots",
        brand: "Mizuno",
        groundType: "FG",
        price: 9900,
        originalPrice: 10500,
        rating: 5.0,
        reviewsCount: 39,
        isNew: false,
        isHot: true,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10"],
        description: "สุดยอดงานฝีมือหนังจิงโจ้แท้เกรดพรีเมียมจากญี่ปุ่น (Made in Japan) สัมผัสบอลนุ่มนวลเป็นธรรมชาติ ผสานกับผ้าถัก Beta Knit บริเวณลิ้นและข้อเท้า น้ำหนักเบาราวกับไม่ได้ใส่",
        specs: {
            "ประเภทปุ่ม": "FG/AG รองรับทั้งหญ้าจริงและหญ้าเทียมคุณภาพดี",
            "อัปเปอร์": "Scotchgard Kangaroo Leather หนังจิงโจ้กันน้ำ",
            "แหล่งผลิต": "ผลิตด้วยมือในประเทศญี่ปุ่น (Made in Japan)",
            "น้ำหนัก": "เพียง 190 กรัม"
        }
    },
    {
        id: "boot-4",
        name: "Puma Future 7 Ultimate FG/AG",
        category: "boots",
        brand: "Puma",
        groundType: "AG",
        price: 7600,
        originalPrice: 8500,
        rating: 4.8,
        reviewsCount: 31,
        isNew: true,
        isHot: false,
        image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 8", "US 8.5", "US 9", "US 9.5", "US 10"],
        description: "สวมบทบาทเพลย์เมกเกอร์ตัวจริงกับ FUZIONFIT360 อัปเปอร์ผ้ายืดพร้อมสายรัด PWRTAPE เสริมความกระชับโดยไม่ต้องพึ่งเชือก พื้น Dynamic Motion System ช่วยให้การเคลื่อนไหวฉับไว",
        specs: {
            "ประเภทปุ่ม": "FG/AG เหมาะสำหรับทั้งสนามหญ้าจริงและหญ้าเทียม",
            "อัปเปอร์": "FUZIONFIT360 พร้อมแถบ PWRTAPE ซัพพอร์ตเท้า",
            "เทคโนโลยี": "Dynamic Motion System Outsole",
            "น้ำหนัก": "ประมาณ 210 กรัม"
        }
    },
    {
        id: "boot-5",
        name: "Nike Phantom GX 2 Elite Gripknit FG",
        category: "boots",
        brand: "Nike",
        groundType: "FG",
        price: 8800,
        originalPrice: 9400,
        rating: 4.9,
        reviewsCount: 42,
        isNew: false,
        isHot: true,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 11"],
        description: "ออกแบบมาเพื่อความแม่นยำในการสัมผัสบอลด้วย Nike Gripknit คลุมโซนเตะบอล ปุ่มสตั๊ด Cyclone 360 ช่วยให้การหมุนตัว 360 องศาทำได้อย่างราบรื่นและคล่องแคล่ว",
        specs: {
            "ประเภทปุ่ม": "FG (Firm Ground)",
            "อัปเปอร์": "Nike Gripknit เทคโนโลยีเส้นด้ายเหนียวพิเศษควบคุมทิศทาง",
            "ปุ่มสตั๊ด": "Cyclone 360 Pattern ลดแรงเสียดทานเวลาหมุนตัว",
            "น้ำหนัก": "ประมาณ 200 กรัม"
        }
    },
    {
        id: "boot-6",
        name: "Adidas Predator Club TF (ร้อยปุ่มหญ้าเทียม)",
        category: "boots",
        brand: "Adidas",
        groundType: "TF",
        price: 2600,
        originalPrice: 2900,
        rating: 4.7,
        reviewsCount: 53,
        isNew: false,
        isHot: false,
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=900&q=80",
        sizes: ["US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5"],
        description: "รองเท้าฟุตบอลร้อยปุ่ม TF สเปกยอดนิยมสำหรับสนามหญ้าเทียมเมืองไทย พื้นยางทนทาน ยึดเกาะดีเยี่ยม ช่วยลดแรงกระแทกต่อข้อเท้าและหัวเข่า",
        specs: {
            "ประเภทปุ่ม": "TF (Turf สนามหญ้าเทียมสั้น)",
            "อัปเปอร์": "หนังสังเคราะห์เนื้อนุ่มพร้อมผิวสัมผัส Strikeprint",
            "พื้นรองเท้า": "พื้นยางลายปุ่มถี่กระจายน้ำหนักได้ดี",
            "เหมาะสำหรับ": "ผู้เล่นสนามหญ้าเทียมทั่วไปและออกกำลังกาย"
        }
    },

    // --- เสื้อแข่งฟุตบอล (Jerseys & Kits) ---
    {
        id: "jersey-1",
        name: "เสื้อแข่งทีมชาติไทย 2026/27 Changsuek Home (Player Edition)",
        category: "jerseys",
        brand: "Changsuek",
        price: 2490,
        originalPrice: 2790,
        rating: 5.0,
        reviewsCount: 88,
        isNew: true,
        isHot: true,
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80",
        sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
        description: "เสื้อแข่งทัพช้างศึกเกรดนักเตะ (Player Edition) ลวดลายเปลวไฟแห่งศรัทธา เนื้อผ้าทอแบบ Jacquard ระบายความร้อนได้เร็วกว่าปกติถึง 3 เท่า พร้อมอาร์มทองและตราสัญลักษณ์สามมิติ",
        specs: {
            "เกรดเสื้อ": "Player Edition (ทรงเข้ารูปกระชับกล้ามเนื้อ)",
            "เนื้อผ้า": "100% Recycled Polyester พร้อมเทคโนโลยี CoolDry",
            "การปรับแต่ง": "บริการสกรีนชื่อและเบอร์ฟรี",
            "การดูแลรักษา": "ซักเครื่องด้วยน้ำเย็น ไม่ควรใช้น้ำยาปรับผ้านุ่มสูตรเข้มข้น"
        }
    },
    {
        id: "jersey-2",
        name: "Real Madrid 2026/27 Home Authentic Match Jersey",
        category: "jerseys",
        brand: "Adidas",
        price: 4600,
        originalPrice: 4900,
        rating: 4.9,
        reviewsCount: 54,
        isNew: true,
        isHot: true,
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80",
        sizes: ["S", "M", "L", "XL", "2XL"],
        description: "เสื้อเหย้าเรอัล มาดริด สีขาวคลาสสิกแซมด้วยประกายสีทองเฉลิมฉลองแชมป์ยุโรป เทคโนโลยี HEAT.RDY ช่วยให้อากาศไหลเวียนได้สูงสุด ให้ความเย็นสบายตลอด 90 นาทีในสนาม",
        specs: {
            "เกรดเสื้อ": "Authentic / Player Issue สเปกเดียวกับที่นักเตะใส่ลงสนาม",
            "เทคโนโลยี": "HEAT.RDY ระบายเหงื่อและอากาศรอบทิศทาง",
            "ตราสโมสร": "Heat-applied 3D Crest ตราสโมสรแบบรีดร้อนน้ำหนักเบา",
            "ลิขสิทธิ์": "สินค้าลิขสิทธิ์แท้ 100%"
        }
    },
    {
        id: "jersey-3",
        name: "Arsenal 2026/27 Home Authentic Jersey",
        category: "jerseys",
        brand: "Adidas",
        price: 4500,
        originalPrice: 4800,
        rating: 4.9,
        reviewsCount: 47,
        isNew: true,
        isHot: false,
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80",
        sizes: ["S", "M", "L", "XL"],
        description: "เสื้อแข่งทัพปืนใหญ่ อาร์เซนอล สีแดงเอกลักษณ์ผสานดีเทลรูปปืนใหญ่คลาสสิกที่หน้าอก ทรงสลิมฟิตเข้ารูปสวยงาม ผ้าทอพิเศษน้ำหนักเบา",
        specs: {
            "เกรดเสื้อ": "Authentic Player Version",
            "เทคโนโลยี": "HEAT.RDY Ultra Light Breathability",
            "สไตล์": "Retro Cannon Crest สัญลักษณ์ปืนใหญ่เดี่ยวสุดคลาสสิก",
            "ลิขสิทธิ์": "สินค้าของแท้ 100% นำเข้าจากยุโรป"
        }
    },
    {
        id: "jersey-4",
        name: "Manchester City 2026/27 Home Match Kit",
        category: "jerseys",
        brand: "Puma",
        price: 4400,
        originalPrice: 4700,
        rating: 4.8,
        reviewsCount: 36,
        isNew: true,
        isHot: false,
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80",
        sizes: ["S", "M", "L", "XL", "2XL"],
        description: "เสื้อเหย้าสีฟ้า Sky Blue โครงสร้างผ้า ULTRAWEAVE น้ำหนักเบาที่สุดเท่าที่พูม่าเคยผลิตมา เหมาะสำหรับการเคลื่อนไหวไร้ขีดจำกัด",
        specs: {
            "เกรดเสื้อ": "Match Authentic ULTRAWEAVE",
            "วัสดุ": "เนื้อผ้าน้ำหนักเบาพิเศษเพียง 72 กรัม",
            "เทคโนโลยี": "dryCELL ดูดซับความชื้นออกจากผิวหนัง",
            "การรับประกัน": "รับประกันของแท้ตลอดอายุการใช้งาน"
        }
    },

    // --- ลูกฟุตบอลแมตช์เดย์ (Match Balls) ---
    {
        id: "ball-1",
        name: "Adidas UEFA Champions League Pro Official Match Ball",
        category: "balls",
        brand: "Adidas",
        price: 4800,
        originalPrice: 5200,
        rating: 5.0,
        reviewsCount: 71,
        isNew: true,
        isHot: true,
        image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=900&q=80",
        sizes: ["Size 5 (มาตรฐานสากล)"],
        description: "ลูกฟุตบอลที่ใช้แข่งขันจริงในศึก ยูฟ่า แชมเปียนส์ลีก ลวดลายดวงดาวไร้รอยต่อด้วยเทคโนโลยี Thermal Bonded ความนิ่งในอากาศแม่นยำสูงสุด พร้อมตรารับรอง FIFA Quality Pro",
        specs: {
            "ขนาด": "Size 5 เส้นรอบวง 68.5 - 69.5 ซม.",
            "โครงสร้าง": "Thermal Bonded ไร้รอยเย็บ น้ำไม่ซึมเข้าลูกบอล",
            "การรับรอง": "FIFA Quality Pro ได้รับการรับรองสูงสุดจากฟีฟ่า",
            "ผิวนอก": "ผิวสัมผัส Micro-texture ป้องกันลูกบอลส่ายในอากาศ"
        }
    },
    {
        id: "ball-2",
        name: "Nike Flight Premier League Official Match Ball",
        category: "balls",
        brand: "Nike",
        price: 4900,
        originalPrice: 5400,
        rating: 4.9,
        reviewsCount: 56,
        isNew: true,
        isHot: true,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80",
        sizes: ["Size 5"],
        description: "ลูกฟุตบอลประจำศึกพรีเมียร์ลีกอังกฤษ วิจัยนานกว่า 8 ปีและทดสอบกว่า 1,700 ชั่วโมง ร่อง Aerowsculpt ช่วยลดการต้านทานลม เพิ่มความแม่นยำในการวางบอลยาวและยิงไกล 30%",
        specs: {
            "เทคโนโลยี": "Aerowsculpt Grooves ร่องรอบลูกบอลลดกระแสลมวน",
            "หมึกพิมพ์": "3D Printed Ink เพิ่มความเหนียวในการจับบอล",
            "การรับรอง": "FIFA Quality Pro Official Premier League",
            "ยางใน": "Latex Bladder รักษาระดับลมและความกระดอนสม่ำเสมอ"
        }
    },
    {
        id: "ball-3",
        name: "Molten Vantaggio 5000 FIFA Quality Pro",
        category: "balls",
        brand: "Molten",
        price: 3200,
        originalPrice: 3800,
        rating: 4.8,
        reviewsCount: 45,
        isNew: false,
        isHot: false,
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80",
        sizes: ["Size 5"],
        description: "ลูกฟุตบอลทางการของการแข่งขันเอเชียนคัพและฟุตบอลไทยลีก อัดกาวด้วยความร้อน ACENTEC นุ่มเท้า ให้สัมผัสการเตะที่สม่ำเสมอในทุกสภาพอากาศ",
        specs: {
            "เทคโนโลยี": "ACENTEC Structure ไร้รอยเย็บกลมสมบูรณ์แบบ",
            "วัสดุ": "หนัง PU คุณภาพสูง ทนต่อการเสียดสี",
            "การรับรอง": "FIFA Quality Pro",
            "ความนิยม": "ลูกฟุตบอลยอดนิยมอันดับ 1 สำหรับการแข่งขันในไทย"
        }
    },

    // --- ถุงมือผู้รักษาประตู (Goalkeeper Gloves) ---
    {
        id: "glove-1",
        name: "Adidas Predator Pro FingerSave Goalkeeper Gloves",
        category: "gloves",
        brand: "Adidas",
        price: 4500,
        originalPrice: 4900,
        rating: 4.9,
        reviewsCount: 38,
        isNew: true,
        isHot: true,
        image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=900&q=80",
        sizes: ["Size 8", "Size 8.5", "Size 9", "Size 9.5", "Size 10"],
        description: "ถุงมือโกลระดับโปรมาพร้อมเทคโนโลยี URG 2.0 โฟมเกาะบอลหนึบในทุกสภาพอากาศ และระบบเซฟนิ้ว FingerSave ป้องกันนิ้วหักหรือซ้นจากการปะทะลูกยิงรุนแรง",
        specs: {
            "โฟมฝ่ามือ": "URG 2.0 Latex หนา 4 มม. หนึบระดับแมตช์เดย์",
            "การป้องกัน": "ระบบแกนเซฟนิ้ว FingerSave 4 นิ้ว (ถอดแยกได้)",
            "การตัดเย็บ": "Negative Cut แนบกระชับชิดนิ้วเพิ่มความรู้สึกสัมผัส",
            "ข้อมือ": "ผ้ายืดทอ Knit ไร้สายรัด สวมใส่ง่ายกระชับมั่นคง"
        }
    },
    {
        id: "glove-2",
        name: "Uhlsport Speed Contact Supergrip+ Finger Surround",
        category: "gloves",
        brand: "Uhlsport",
        price: 4900,
        originalPrice: 5500,
        rating: 5.0,
        reviewsCount: 29,
        isNew: false,
        isHot: true,
        image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=900&q=80",
        sizes: ["Size 8.5", "Size 9", "Size 9.5", "Size 10"],
        description: "แบรนด์ถุงมือผู้รักษาประตูระดับโลกจากเยอรมนี โฟม SUPERGRIP+ ผสมเม็ดสีไฮเกาะ เหนียวหนึบแม้ขณะฝนตกหนัก ช่างภาพและโกลอาชีพเลือกใช้",
        specs: {
            "โฟมฝ่ามือ": "SUPERGRIP+ นวัตกรรมโฟมเกรดสูงสุดจากเยอรมนี",
            "การตัดเย็บ": "Finger Surround ห่อหุ้มรอบนิ้วมือ 360 องศา",
            "โซนชกบอล": "REBOUND ZONE ดูดซับแรงและชกบอลได้ไกลขึ้น",
            "ประเทศต้นกำเนิด": "ประเทศเยอรมนี"
        }
    },

    // --- อุปกรณ์ซ้อมและป้องกัน (Gear & Accessories) ---
    {
        id: "gear-1",
        name: "Nike Mercurial Lite Shin Guards (สนับแข้งน้ำหนักเบา)",
        category: "gear",
        brand: "Nike",
        price: 950,
        originalPrice: 1100,
        rating: 4.8,
        reviewsCount: 112,
        isNew: false,
        isHot: true,
        image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=900&q=80",
        sizes: ["S (ความสูง 150-160cm)", "M (ความสูง 160-170cm)", "L (ความสูง 170-185cm)"],
        description: "สนับแข้งรุ่นคลาสสิกที่นักเตะอาชีพนิยมมากที่สุด เปลือกนอกโพลีคาร์บอเนตบางเบาแต่แข็งแกร่ง ด้านในบุโฟม EVA ดูดซับแรงกระแทก พร้อมปลอกรัดระบายอากาศ",
        specs: {
            "เปลือกนอก": "เคสโพลีเมอร์เกรดวิศวกรรม น้ำหนักเบาแนบหน้าแข้ง",
            "โฟมซับใน": "โฟม EVA ขึ้นรูปช่วยกระจายแรงกระแทก",
            "อุปกรณ์เสริม": "แถมฟรีปลอกผ้ารัดสวม Dri-FIT 1 คู่",
            "น้ำหนัก": "เบาเป็นพิเศษเพียง 45 กรัมต่อข้าง"
        }
    },
    {
        id: "gear-2",
        name: "ถุงเท้าฟุตบอลกันลื่น Tapedesign Allround Classic",
        category: "gear",
        brand: "Tapedesign",
        price: 1350,
        originalPrice: 1500,
        rating: 4.9,
        reviewsCount: 95,
        isNew: false,
        isHot: true,
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=900&q=80",
        sizes: ["Free Size (EU 38 - 46)"],
        description: "ถุงเท้ากันลื่นต้นตำรับที่นักเตะระดับโลกอย่าง เมสซี่, ฮาแลนด์ และเบลลิงแฮม เลือกใช้ ปุ่มยางซิลิโคนหนึบพิเศษล็อกเท้ากับพื้นรองเท้าสตั๊ด ไม่ลื่นไถล ป้องกันนิ้วพอง",
        specs: {
            "ปุ่มยาง": "Special Rubber Knobs ล็อกพื้นรองเท้าแน่นหนึบ",
            "เนื้อผ้า": "เส้นใยผสมระบายเหงื่อกระชับอุ้งเท้า",
            "การใช้งาน": "เหมาะสำหรับใช้คู่กับถุงเท้าตัดข้อในวันแข่ง",
            "การรับประกัน": "ของแท้ 100% นำเข้าจากออสเตรีย"
        }
    },
    {
        id: "gear-3",
        name: "ชุดกรวยฝึกซ้อมฟุตบอล Agility Training Cones (ชุด 20 ชิ้นพร้อมขาตั้ง)",
        category: "gear",
        brand: "Puma",
        price: 690,
        originalPrice: 850,
        rating: 4.7,
        reviewsCount: 34,
        isNew: false,
        isHot: false,
        image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=900&q=80",
        sizes: ["ชุด 20 ชิ้น (4 สีคละกัน)"],
        description: "กรวยซ้อมฟุตบอลทรงจาน ทำจากพลาสติก PE ยืดหยุ่นสูง เหยียบไม่แตก คืนรูปได้ทันที มาพร้อมสายสะพายและขาตั้งเหล็ก พกพาสะดวกสำหรับโค้ชและนักเตะฝึกซ้อมส่วนตัว",
        specs: {
            "วัสดุ": "Flexible Polyethylene ทนทานต่อการเหยียบและแดดจัด",
            "จำนวน": "20 ชิ้น (สีส้ม, เขียวสะท้อนแสง, น้ำเงิน, เหลือง)",
            "ความสูง": "เส้นผ่านศูนย์กลาง 19 ซม. สูง 5 ซม.",
            "อุปกรณ์แถม": "ขาตั้งเก็บกรวยโลหะพร้อมหูหิ้ว"
        }
    }
];

// Available discount promo codes
const PROMO_CODES = {
    "KICKOFF10": { type: "percent", value: 10, label: "ลดทันที 10%" },
    "STRIKER100": { type: "fixed", value: 100, label: "ส่วนลด ฿100" },
    "FREESHIP": { type: "shipping", value: 0, label: "ฟรีค่าจัดส่ง" }
};
