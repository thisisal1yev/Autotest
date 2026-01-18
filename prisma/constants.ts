export const USERS = {
  superadmin: {
    email: "torvaldsDev@gmail.com",
    login: "linusT",
    fullName: "Linus Torvalds",
    password: "87654321",
    role: "SUPERADMIN" as const,
    drivingSchoolId: null,
  },
  admins: [
    {
      email: "artificialSam@mail.com",
      login: "samA",
      fullName: "Sam Altman",
      password: "1235678",
      role: "ADMIN" as const,
      drivingSchoolId: 1,
    },
    {
      email: "admin2@citydriving.com",
      login: "admin2",
      fullName: "Jane Smith",
      password: "password",
      role: "ADMIN" as const,
      drivingSchoolId: 2,
    },
    {
      email: "admin3@highwaydriving.com",
      login: "admin3",
      fullName: "Bob Johnson",
      password: "password",
      role: "ADMIN" as const,
      drivingSchoolId: 3,
    },
  ],
  students: [
    { email: "spaceElon@email.com", login: "elonM", fullName: "Elon Musk", password: "password", drivingSchoolId: 1 },
    { email: "student2@example.com", login: "student2", fullName: "John Doe", password: "password", drivingSchoolId: 1 },
    { email: "student3@example.com", login: "student3", fullName: "Alice Williams", password: "password", drivingSchoolId: 1 },
    { email: "student4@example.com", login: "student4", fullName: "Michael Brown", password: "password", drivingSchoolId: 1 },
    { email: "student5@example.com", login: "student5", fullName: "Sarah Davis", password: "password", drivingSchoolId: 2 },
    { email: "student6@example.com", login: "student6", fullName: "David Wilson", password: "password", drivingSchoolId: 2 },
    { email: "student7@example.com", login: "student7", fullName: "Emma Martinez", password: "password", drivingSchoolId: 2 },
    { email: "student8@example.com", login: "student8", fullName: "James Taylor", password: "password", drivingSchoolId: 3 },
    { email: "student9@example.com", login: "student9", fullName: "Olivia Anderson", password: "password", drivingSchoolId: 3 },
    { email: "student10@example.com", login: "student10", fullName: "Noah Thomas", password: "password", drivingSchoolId: 3 },
  ],
} as const;

export const DRIVING_SCHOOLS = [
  {
    name: "Elite Driving School",
    email: "info@elitedriving.com",
    phone: "+1234567890",
    address: "123 Main Street, City",
  },
  {
    name: "City Driving Academy",
    email: "contact@citydriving.com",
    phone: "+1987654321",
    address: "456 Oak Avenue, Downtown",
  },
  {
    name: "Highway Driving School",
    email: "hello@highwaydriving.com",
    phone: "+1555123456",
    address: "789 Highway Road, Suburb",
  },
] as const;

export const SUBSCRIPTIONS = [
  {
    drivingSchoolId: 1,
    plan: "PREMIUM" as const,
    status: "ACTIVE" as const,
    startMonthsAgo: 3,
    endMonthsFromNow: 9,
    price: 249.0,
    currency: "USD",
    autoRenewal: true,
    paymentMethod: "credit_card",
  },
  {
    drivingSchoolId: 2,
    plan: "STANDARD" as const,
    status: "ACTIVE" as const,
    startMonthsAgo: 1,
    endMonthsFromNow: 11,
    trialDaysFromNow: 14,
    price: 99.0,
    currency: "USD",
    autoRenewal: true,
    paymentMethod: "credit_card",
  },
  {
    drivingSchoolId: 3,
    plan: "FREE" as const,
    status: "TRIAL" as const,
    startMonthsAgo: 0,
    endDaysFromNow: 30,
    trialDaysFromNow: 30,
    price: 0.0,
    currency: "USD",
    autoRenewal: false,
  },
] as const;

export const GROUPS = [
  {
    name: "Beginner Group A",
    description: "First-time drivers learning basics",
    drivingSchoolId: 1,
    studentIds: [1, 2],
  },
  {
    name: "Advanced Group B",
    description: "Experienced students preparing for exams",
    drivingSchoolId: 1,
    studentIds: [3, 4],
  },
  {
    name: "Weekend Group",
    description: "Students learning on weekends",
    drivingSchoolId: 2,
    studentIds: [5, 6, 7],
  },
  {
    name: "Evening Group",
    description: "Evening classes for working students",
    drivingSchoolId: 3,
    studentIds: [8, 9, 10],
  },
] as const;

export const QUESTIONS = {
  intersection: {
    title: "CHORRAHADAN BIRINCHI BO'LIB KIM O'TADI?",
    imgPath: "/images/question.jpg",
    comment: `Bu tartiblanmagan chorrahada svetofor va yo'l belgilari yo'q, shuning uchun "o'ng qo'l qoidasi" amal qiladi — har bir haydovchi o'ng tomonidan yaqinlashayotgan transport vositasiga yo'l berishi shart.Har bir mashinaning o'ng tomoniga qarang: kimning o'ng tomoni bo'sh bo'lsa — o'sha birinchi o'tadi, chunki u hech kimga yo'l berishi shart emas.Shuningdek, esda tuting: chapga burilayotgan haydovchi qarshidan to'g'riga ketayotgan transport vositasiga yo'l berishi kerak.Shu ikki qoidani birga qo'llab, har bir mashinaning vaziyatini tahlil qiling.`,
    options: [
      { answerOption: "QIZIL AVTAMOBIL", isCorrect: false },
      { answerOption: "KO'K AVTAMOBIL", isCorrect: false },
      { answerOption: "SARIQ AVTAMOBIL", isCorrect: false },
      { answerOption: "YASHIL AVTAMOBIL", isCorrect: true },
    ],
  },
  noStoppingSign: {
    title: "Qaysi avtamobil uchun bu belgilarning ta'sir oralig'ida to'xtashga ruxsat etiladi?",
    imgPath: "/images/question_1.jpg",
    comment: `Rasmda 3.27 "To'xtash taqiqlanadi" belgisi va uning ostida qo'shimcha belgi — chizilgan nogironlar aravachasi ko'rsatilgan. Bu qo'shimcha belgi shuni anglatadiki, asosiy belgining taqiqi nogironlar belgisi o'rnatilgan transport vositalariga taalluqli emas.
Sariq avtomobilda nogironlar taniqlik belgisi (sariq fonda nogironlar aravachasi) mavjud. Shuning uchun bu haydovchi belgi ta'sir doirasida to'xtashi mumkin.
Qizil avtomobilda esa bunday belgi yo'q, demak u uchun to'xtash taqiqlangan holda qoladi.
Xulosa: Qo'shimcha belgilar asosiy belgining ta'sirini ma'lum toifadagi transport vositalari uchun bekor qilishi yoki cheklashi mumkin. Har doim asosiy belgi bilan birga qo'shimcha belgilarni ham diqqat bilan o'qing.`,
    options: [
      { answerOption: "Qizilga", isCorrect: false },
      { answerOption: "Ikkala avtamobilga", isCorrect: false },
      { answerOption: "Hech qaysi biriga", isCorrect: false },
      { answerOption: 'Nogiron" taniqlik belgisi bo\'lgan sariq avtamobilga', isCorrect: true },
    ],
  },
  straightOnly: {
    title: "QAYSI AVTOMOBIL TO'G'RI YO'L HARAKATI QOIDALARIGA AMAL QILMOQDA?",
    imgPath: "/images/question_2.jpg",
    comment: `Rasmda o'ng tomonda 4.1.1 "Faqat to'g'riga harakatlanish" buyuruvchi belgisi o'rnatilgan. Bu belgi haydovchiga faqat to'g'ri yo'nalishda harakatlanishni buyuradi.
Belgi ta'sir doirasida:

Chapga burish — taqiqlangan
O'ngga burish — taqiqlangan
Orqaga qaytish (razvorot) — taqiqlangan
To'g'riga harakatlanish — ruxsat etilgan

Rasmda ko'rsatilgan yo'nalishlarni tahlil qilsak:

A va Г — to'g'ri yo'nalishlar
Б — chapga burish
В — o'ngga burish

Xulosa: Buyuruvchi belgilar haydovchiga ma'lum bir harakatni bajarishni majbur qiladi. 4.1.1 belgisi faqat ko'rsatilgan yo'nalishda — ya'ni to'g'riga harakatlanishga ruxsat beradi, qolgan barcha yo'nalishlar taqiqlanadi.`,
    options: [
      { answerOption: "F1) FAQAT \"A\" YO'NALISH BO'YLAB", isCorrect: false },
      { answerOption: "F2) FAQAT \"Б\" YO'NALISH BO'YLAB", isCorrect: false },
      { answerOption: "F3) FAQAT \"В\" YO'NALISH BO'YLAB", isCorrect: false },
      { answerOption: "F4) FAQAT \"A va Г\" YO'NALISH BO'YLAB", isCorrect: true },
      { answerOption: "F5) FAQAT \"Г\" YO'NALISH BO'YLAB", isCorrect: false },
    ],
  },
  rightHandRule: {
    title: "QAYSI AVTOMOBIL TO'G'RI YO'L HARAKATI QOIDALARIGA AMAL QILMOQDA?",
    imgPath: "/images/question_3.jpg",
    comment: `Bu tartiblanmagan chorrahada svetofor va yo'l belgilari yo'q, shuning uchun "o'ng qo'l qoidasi" amal qiladi — har bir haydovchi o'ng tomonidan kelayotgan transport vositasiga yo'l berishi kerak.
Vaziyatni tahlil qilsak:

Sariq avtomobil chapga burilmoqchi va uning o'ng tomonida hech kim yo'q. Demak, u birinchi bo'lib harakatni boshlashi mumkin.
Ko'k va qizil avtomobillar to'g'riga ketmoqda. Ularning o'ng tomonida sariq avtomobil bor, lekin sariq chapga burilyapti va ularning yo'lidan ketadi.
Yashil avtomobil chapga burilmoqchi. Uning o'ng tomonida ko'k va qizil avtomobillar bor, shuningdek qarshidan (sariq tomonda) to'g'riga ketuvchi transport yo'q.

Asosiy qoida: Chapga burilayotgan haydovchi qarshidan to'g'riga yoki o'ngga ketayotgan transport vositalariga yo'l berishi shart.
Agar biror avtomobil o'zidan oldin o'tishi kerak bo'lgan transportga yo'l bermay harakatni boshlasa — u qoidani buzgan hisoblanadi.`,
    options: [
      { answerOption: "F1) QIZIL AVTAMOBIL", isCorrect: false },
      { answerOption: "F2) KO'K AVTAMOBIL", isCorrect: false },
      { answerOption: "F3) SARIQ AVTAMOBIL", isCorrect: false },
      { answerOption: "F4) YASHIL AVTAMOBIL", isCorrect: true },
    ],
  },
  trafficController: {
    title: "HARAKATLANISH TAQIQLANADI?",
    imgPath: "/images/question_4.jpg",
    comment: `Bu chorrahada tartiblovchi (regulirovshik) bor. Tartiblovchi mavjud bo'lganda, svetofor va yo'l belgilarining signallari ahamiyatini yo'qotadi — faqat tartiblovchining ishoralariga bo'ysunish kerak.
Rasmda tartiblovchi qo'llarini yon tomonga yozgan holatda turibdi. Bu ishorada:

Tartiblovchining ko'kragi va orqa tomonidan kelayotgan transport vositalari uchun harakat TAQIQLANADI
Tartiblovchining chap va o'ng yon tomonidan kelayotgan transport vositalari uchun to'g'riga va o'ngga harakatlanishga ruxsat beriladi

Vaziyatni tahlil qilish uchun har bir avtomobilning tartiblovchiga nisbatan qaysi tomonda turganini aniqlang:

Qaysi avtomobillar tartiblovchining ko'kragi yoki orqasiga qaragan?
Qaysi avtomobillar tartiblovchining yon tomonlarida turgan?

Xulosa: Tartiblovchi ishoralarini bilish juda muhim. Har doim avval tartiblovchining qaysi tomonga qarganini va qo'llari qanday holatda ekanini aniqlang, so'ng o'zingizning unga nisbatan joylashuvingizni tekshiring.`,
    options: [
      { answerOption: "F1) QIZIL VA OQ AVTAMOBILLARGA", isCorrect: false },
      { answerOption: "F2) KO'K,YASHIL VA OQ AVTAMOBILLARGA", isCorrect: true },
      { answerOption: "F3) OQ,KO'K VA SARIQ AVTAMOBILLARGA", isCorrect: false },
    ],
  },
} as const;

export const TESTS = [
  {
    title: "Basic Traffic Rules Test",
    description: "Test your knowledge of basic traffic rules",
    timeLimit: 15,
    passingScore: 70,
    drivingSchoolId: 1,
    questionKeys: ["intersection", "noStoppingSign", "straightOnly", "rightHandRule", "trafficController"] as const,
  },
  {
    title: "Parking Rules Test",
    description: "Test your knowledge of parking regulations",
    timeLimit: 20,
    passingScore: 75,
    drivingSchoolId: 1,
    questionKeys: [
      "trafficController", "intersection", "noStoppingSign", "straightOnly", "rightHandRule",
      "trafficController", "intersection", "noStoppingSign", "straightOnly", "trafficController",
      "intersection", "noStoppingSign", "straightOnly", "rightHandRule", "trafficController",
      "intersection", "noStoppingSign",
    ] as const,
  },
  {
    title: "Highway Driving Test",
    description: "Test your knowledge of highway driving rules",
    timeLimit: 25,
    passingScore: 80,
    drivingSchoolId: 2,
    questionKeys: [
      "noStoppingSign", "trafficController", "intersection", "noStoppingSign", "straightOnly",
      "rightHandRule", "trafficController", "intersection", "noStoppingSign", "straightOnly",
      "trafficController", "intersection", "noStoppingSign", "straightOnly", "rightHandRule",
      "trafficController", "intersection",
    ] as const,
  },
  {
    title: "City Driving Basics",
    description: "Basic city driving rules and regulations",
    timeLimit: 15,
    passingScore: 70,
    drivingSchoolId: 3,
    questionKeys: ["intersection", "noStoppingSign"] as const,
  },
] as const;

export const TUTORIALS = [
  {
    title: "Yo'l belgilari asoslari",
    description: "Asosiy yo'l belgilari va ularning ma'nolari haqida video dars",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    thumbnailUrl: "/images/tutorials/signs.jpg",
    duration: 1200, // 20 minutes
    order: 1,
    drivingSchoolId: 1,
  },
  {
    title: "Svetofor signallari",
    description: "Svetofor signallarini to'g'ri tushunish va ularga amal qilish",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    thumbnailUrl: "/images/tutorials/traffic-lights.jpg",
    duration: 900, // 15 minutes
    order: 2,
    drivingSchoolId: 1,
  },
  {
    title: "Chorrahalardan o'tish qoidalari",
    description: "Tartiblanmagan va tartiblangan chorrahalardan to'g'ri o'tish",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    thumbnailUrl: "/images/tutorials/intersections.jpg",
    duration: 1500, // 25 minutes
    order: 3,
    drivingSchoolId: 1,
  },
  {
    title: "Avtomobilni boshqarish asoslari",
    description: "Rul, pedal va uzatmalarni to'g'ri ishlatish",
    videoUrl: "https://www.youtube.com/watch?v=example4",
    thumbnailUrl: "/images/tutorials/driving-basics.jpg",
    duration: 1800, // 30 minutes
    order: 1,
    drivingSchoolId: 2,
  },
  {
    title: "Magistral yo'llarda harakatlanish",
    description: "Tezkor yo'llarda xavfsiz harakatlanish qoidalari",
    videoUrl: "https://www.youtube.com/watch?v=example5",
    thumbnailUrl: "/images/tutorials/highway.jpg",
    duration: 1350, // 22.5 minutes
    order: 2,
    drivingSchoolId: 2,
  },
  {
    title: "Shahar ichida harakatlanish",
    description: "Shahar sharoitida xavfsiz haydash texnikasi",
    videoUrl: "https://www.youtube.com/watch?v=example6",
    thumbnailUrl: "/images/tutorials/city-driving.jpg",
    duration: 1100, // ~18 minutes
    order: 1,
    drivingSchoolId: 3,
  },
] as const;

export const TEST_RESULTS = [
  { studentIndex: 1, testIndex: 1, score: 85, passed: true, timeSpent: 720 },
  { studentIndex: 1, testIndex: 2, score: 70, passed: false, timeSpent: 1100 },
  { studentIndex: 2, testIndex: 1, score: 90, passed: true, timeSpent: 600 },
  { studentIndex: 3, testIndex: 1, score: 65, passed: false, timeSpent: 850 },
  { studentIndex: 3, testIndex: 1, score: 78, passed: true, timeSpent: 700 },
  { studentIndex: 4, testIndex: 2, score: 82, passed: true, timeSpent: 950 },
  { studentIndex: 5, testIndex: 3, score: 88, passed: true, timeSpent: 1200 },
  { studentIndex: 6, testIndex: 3, score: 72, passed: false, timeSpent: 1400 },
  { studentIndex: 7, testIndex: 3, score: 95, passed: true, timeSpent: 1000 },
  { studentIndex: 8, testIndex: 4, score: 75, passed: true, timeSpent: 500 },
  { studentIndex: 9, testIndex: 4, score: 60, passed: false, timeSpent: 600 },
  { studentIndex: 10, testIndex: 4, score: 80, passed: true, timeSpent: 450 },
] as const;

export type QuestionKey = keyof typeof QUESTIONS;
export type Question = typeof QUESTIONS[QuestionKey];