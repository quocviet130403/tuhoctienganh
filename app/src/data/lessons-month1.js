// Lessons data — Month 1: Pronunciation Foundation (Days 1-30)
// Each day has title, objective, sections (pronunciation, vocabulary, listening), checklist, and exercises

export const month1Lessons = [
  {
    day: 1, title: 'Giới Thiệu IPA & Nguyên Âm /iː/ vs /ɪ/',
    objective: 'Hiểu hệ thống IPA, phân biệt và phát âm đúng /iː/ và /ɪ/. Bắt đầu xây dựng thói quen học hàng ngày.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/iː/', name: '"ee" dài', desc: 'Kéo môi sang hai bên (như cười), lưỡi đẩy lên cao, giữ âm dài', words: ['see /siː/', 'team /tiːm/', 'week /wiːk/', 'key /kiː/', 'feature /ˈfiːtʃər/', 'release /rɪˈliːs/'] },
        { phoneme: '/ɪ/', name: '"i" ngắn', desc: 'Môi thả lỏng hơn, lưỡi thấp hơn /iː/, âm ngắn gọn', words: ['sit /sɪt/', 'bit /bɪt/', 'ship /ʃɪp/', 'list /lɪst/', 'fix /fɪks/', 'git /ɡɪt/'] },
      ], minimalPairs: [['beat /biːt/', 'bit /bɪt/'], ['seat /siːt/', 'sit /sɪt/'], ['sheep /ʃiːp/', 'ship /ʃɪp/'], ['team /tiːm/', 'Tim /tɪm/'], ['leave /liːv/', 'live /lɪv/'], ['feel /fiːl/', 'fill /fɪl/']] },
      { type: 'vocabulary', title: '📝 Từ Vựng — Computer Basics', vocabDays: [1] },
      { type: 'listening', title: '🎧 Nghe & ELSA', instructions: ['ELSA Speak: làm bài hướng dẫn phát âm', 'Shadowing: lặp lại 5 câu ví dụ từ vựng'] }
    ],
    checklist: ['Phát âm /iː/ với 6 từ ví dụ', 'Phát âm /ɪ/ với 6 từ ví dụ', 'Đọc 6 cặp minimal pairs', 'Học 12 từ vựng mới + ghi vào sổ', 'ELSA Speak bài đầu tiên', 'Shadowing 5 câu'],
    exercises: [
      { type: 'listen-choose', title: 'Nghe và chọn đúng', instructions: 'Nghe phát âm và chọn từ đúng', items: [
        { question: 'Từ nào có âm /iː/?', options: ['ship', 'sheep', 'sit'], answer: 1 },
        { question: 'Từ nào có âm /ɪ/?', options: ['beat', 'feel', 'fix'], answer: 2 },
        { question: 'Từ nào có âm /iː/?', options: ['bit', 'kit', 'key'], answer: 2 },
      ]},
      { type: 'fill-blank', title: 'Điền vào chỗ trống', instructions: 'Điền từ phù hợp', items: [
        { sentence: 'Please ___ the bug in the code.', options: ['fix', 'feel'], answer: 0 },
        { sentence: 'Our ___ released a new version.', options: ['Tim', 'team'], answer: 1 },
        { sentence: 'Check the ___ of items.', options: ['list', 'least'], answer: 0 },
      ]},
    ]
  },
  {
    day: 2, title: 'Nguyên Âm /e/ vs /æ/',
    objective: 'Phát âm đúng /e/ (bed) vs /æ/ (bad). Học từ vựng IT cơ bản.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/e/', name: '"e" ngắn', desc: 'Miệng hé mở vừa, lưỡi ở giữa', words: ['test /test/', 'set /set/', 'get /ɡet/', 'web /web/', 'tech /tek/', 'step /step/'] },
        { phoneme: '/æ/', name: '"a" rộng', desc: 'Miệng mở rộng hơn /e/, hàm hạ thấp', words: ['app /æp/', 'back /bæk/', 'stack /stæk/', 'add /æd/', 'map /mæp/', 'tab /tæb/'] },
      ], minimalPairs: [['set /set/', 'sat /sæt/'], ['pen /pen/', 'pan /pæn/'], ['bed /bed/', 'bad /bæd/'], ['met /met/', 'mat /mæt/']] },
      { type: 'vocabulary', title: '📝 Từ Vựng — Software Basics', vocabDays: [2] },
      { type: 'listening', title: '🎧 Nghe', instructions: ['ELSA Speak: bài /e/ vs /æ/', 'Shadowing video "What is Software?" 3 phút'] }
    ],
    checklist: ['Phát âm /e/ vs /æ/', 'Đọc 4 cặp minimal pairs', 'Học từ vựng ngày 2', 'ELSA Speak', 'Shadowing video'],
    exercises: [
      { type: 'listen-choose', title: 'Minimal Pairs Quiz', items: [
        { question: 'Chọn từ có âm /æ/', options: ['set', 'sat', 'sit'], answer: 1 },
        { question: 'Chọn từ có âm /e/', options: ['map', 'web', 'app'], answer: 1 },
      ]},
    ]
  },
  {
    day: 3, title: 'Nguyên Âm /ʌ/ vs /ɑː/',
    objective: 'Phát âm đúng /ʌ/ (bug) vs /ɑː/ (start). Từ vựng lập trình.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/ʌ/', name: '"uh" ngắn', desc: 'Miệng hé nhẹ, âm ngắn, nhẹ', words: ['bug /bʌɡ/', 'run /rʌn/', 'cut /kʌt/', 'up /ʌp/', 'such /sʌtʃ/', 'function /ˈfʌŋkʃən/'] },
        { phoneme: '/ɑː/', name: '"a" dài', desc: 'Miệng mở rộng, âm dài', words: ['start /stɑːrt/', 'hard /hɑːrd/', 'part /pɑːrt/', 'target /ˈtɑːrɡɪt/', 'archive /ˈɑːrkaɪv/'] },
      ]},
      { type: 'vocabulary', title: '📝 Từ Vựng — Programming', vocabDays: [3] },
      { type: 'listening', title: '🎧 Nghe', instructions: ['ELSA Speak bài /ʌ/ vs /ɑː/', 'Shadowing: đọc 5 câu ví dụ'] }
    ],
    checklist: ['Phát âm /ʌ/ vs /ɑː/', 'Học từ vựng lập trình', 'ELSA Speak', 'Ghi âm so sánh ngày 1'],
    exercises: []
  },
  {
    day: 4, title: 'Nguyên Âm /ɒ/ vs /ɔː/',
    objective: 'Phát âm đúng /ɒ/ (log) vs /ɔː/ (port). Từ vựng OOP.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/ɒ/', name: '"o" ngắn', desc: 'Miệng tròn nhỏ, âm ngắn', words: ['log /lɒɡ/', 'drop /drɒp/', 'stop /stɒp/', 'lock /lɒk/', 'mock /mɒk/'] },
        { phoneme: '/ɔː/', name: '"o" dài', desc: 'Miệng tròn lớn, âm dài', words: ['port /pɔːrt/', 'sort /sɔːrt/', 'source /sɔːrs/', 'core /kɔːr/', 'forum /ˈfɔːrəm/'] },
      ]},
      { type: 'vocabulary', title: '📝 Từ Vựng — OOP', vocabDays: [4] },
      { type: 'listening', title: '🎧 Nghe', instructions: ['ELSA Speak bài /ɒ/ vs /ɔː/', 'Shadowing video OOP 5 phút'] }
    ],
    checklist: ['Phát âm /ɒ/ vs /ɔː/', 'Học từ vựng OOP', 'ELSA Speak', 'Shadowing'],
    exercises: []
  },
  {
    day: 5, title: 'Nguyên Âm /ʊ/ vs /uː/',
    objective: 'Phát âm đúng /ʊ/ (push) vs /uː/ (tool). Từ vựng Git.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/ʊ/', name: '"u" ngắn', desc: 'Môi tròn nhẹ, âm ngắn', words: ['push /pʊʃ/', 'put /pʊt/', 'pull /pʊl/', 'look /lʊk/', 'full /fʊl/'] },
        { phoneme: '/uː/', name: '"oo" dài', desc: 'Môi chúm tròn mạnh, âm dài', words: ['tool /tuːl/', 'root /ruːt/', 'loop /luːp/', 'group /ɡruːp/', 'true /truː/'] },
      ]},
      { type: 'vocabulary', title: '📝 Từ Vựng — Git', vocabDays: [5] },
      { type: 'listening', title: '🎧 Nghe', instructions: ['ELSA Speak bài /ʊ/ vs /uː/', 'Shadowing video Git 5 phút'] }
    ],
    checklist: ['Phát âm /ʊ/ vs /uː/', 'Học từ vựng Git', 'ELSA Speak', 'Shadowing'],
    exercises: []
  },
  {
    day: 6, title: 'Nguyên Âm Đôi /eɪ/ /aɪ/ /ɔɪ/',
    objective: 'Phát âm nguyên âm đôi. Từ vựng Web Development.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/eɪ/', name: 'ay', desc: 'Bắt đầu từ /e/ trượt lên /ɪ/', words: ['data /ˈdeɪtə/', 'page /peɪdʒ/', 'save /seɪv/', 'make /meɪk/', 'break /breɪk/'] },
        { phoneme: '/aɪ/', name: 'ai', desc: 'Bắt đầu từ /ɑ/ trượt lên /ɪ/', words: ['file /faɪl/', 'write /raɪt/', 'type /taɪp/', 'line /laɪn/', 'time /taɪm/'] },
        { phoneme: '/ɔɪ/', name: 'oy', desc: 'Bắt đầu từ /ɔ/ trượt lên /ɪ/', words: ['deploy /dɪˈplɔɪ/', 'point /pɔɪnt/', 'join /dʒɔɪn/'] },
      ]},
      { type: 'vocabulary', title: '📝 Từ Vựng — Web Dev', vocabDays: [6] },
      { type: 'listening', title: '🎧 Nghe', instructions: ['ELSA Speak bài diphthongs', 'Shadowing video Web Dev'] }
    ],
    checklist: ['Phát âm 3 nguyên âm đôi', 'Học từ vựng Web Dev', 'ELSA Speak', 'Shadowing'],
    exercises: []
  },
  {
    day: 7, title: 'Ôn Tập Tuần 1 — Tất Cả Nguyên Âm',
    objective: 'Ôn tập 12 nguyên âm, thêm 2 diphthongs, tự đánh giá.',
    sections: [
      { type: 'pronunciation', title: '🔊 Ôn Tập Nguyên Âm', content: [
        { phoneme: '/aʊ/', name: 'ao', desc: 'Bắt đầu từ /ɑː/ trượt lên /ʊ/', words: ['cloud /klaʊd/', 'down /daʊn/', 'now /naʊ/', 'browser /ˈbraʊzər/'] },
        { phoneme: '/əʊ/', name: 'oh', desc: 'Bắt đầu từ /ə/ trượt lên /ʊ/', words: ['code /koʊd/', 'home /hoʊm/', 'load /loʊd/', 'node /noʊd/'] },
      ]},
      { type: 'vocabulary', title: '📝 Ôn Từ Vựng Tuần 1', vocabDays: [1,2,3,4,5,6] },
    ],
    checklist: ['Ôn tập tất cả nguyên âm', 'Đọc lại minimal pairs', 'Ôn Anki (60+ thẻ)', 'ELSA full test', 'Ghi âm tự giới thiệu'],
    exercises: []
  },
  // Day 8-14 (Week 2: Consonants)
  {
    day: 8, title: 'Phụ Âm /θ/ vs /ð/ — Âm "TH"',
    objective: 'Phát âm đúng 2 âm "th" — âm khó nhất với người Việt. Học 15 từ networking.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/θ/', name: '"th" vô thanh', desc: 'Đặt đầu lưỡi giữa 2 hàm răng → thổi hơi → KHÔNG rung cổ họng', words: ['think /θɪŋk/', 'three /θriː/', 'through /θruː/', 'method /ˈmeθəd/', 'path /pæθ/', 'thread /θred/', 'throw /θroʊ/'] },
        { phoneme: '/ð/', name: '"th" hữu thanh', desc: 'Giống /θ/ nhưng CÓ rung cổ họng', words: ['the /ðə/', 'this /ðɪs/', 'that /ðæt/', 'they /ðeɪ/', 'there /ðer/', 'other /ˈʌðər/'] },
      ], minimalPairs: [['thin /θɪn/', 'then /ðen/'], ['think /θɪŋk/', 'the /ðə/'], ['three /θriː/', 'there /ðer/'], ['path /pæθ/', 'paths /pæðz/']] },
      { type: 'vocabulary', title: '📝 Từ Vựng — Networking', vocabDays: [8] },
      { type: 'listening', title: '🎧 Nghe', instructions: ['ELSA Speak bài /θ/ và /ð/', 'Video "How Does the Internet Work?" → ghi từ có âm "th"'] }
    ],
    checklist: ['Phát âm /θ/ (vô thanh)', 'Phát âm /ð/ (hữu thanh)', 'Test rung/không rung cổ họng', 'Đọc minimal pairs /θ/ vs /ð/', 'Học 15 từ networking + Anki', 'ELSA Speak', 'Nghe video + ghi âm'],
    exercises: [
      { type: 'listen-choose', title: '/θ/ hay /ð/?', items: [
        { question: '"think" có âm gì?', options: ['/θ/ (vô thanh)', '/ð/ (hữu thanh)'], answer: 0 },
        { question: '"this" có âm gì?', options: ['/θ/ (vô thanh)', '/ð/ (hữu thanh)'], answer: 1 },
        { question: '"method" có âm gì?', options: ['/θ/ (vô thanh)', '/ð/ (hữu thanh)'], answer: 0 },
        { question: '"together" có âm gì?', options: ['/θ/ (vô thanh)', '/ð/ (hữu thanh)'], answer: 1 },
      ]},
    ]
  },
  {
    day: 9, title: 'Phụ Âm /ʃ/ /ʒ/ /tʃ/ /dʒ/',
    objective: 'Phát âm 4 âm sh/zh/ch/j. Từ vựng Testing.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/ʃ/', name: '"sh"', desc: 'Môi hơi chúm tròn, không rung cổ', words: ['push /pʊʃ/', 'cache /kæʃ/', 'crash /kræʃ/', 'function /ˈfʌŋkʃən/'] },
        { phoneme: '/tʃ/', name: '"ch"', desc: 'Đầu lưỡi bật ra nhanh', words: ['check /tʃek/', 'change /tʃeɪndʒ/', 'branch /bræntʃ/', 'fetch /fetʃ/'] },
        { phoneme: '/dʒ/', name: '"j"', desc: 'Như /tʃ/ + rung cổ họng', words: ['join /dʒɔɪn/', 'manage /ˈmænɪdʒ/', 'image /ˈɪmɪdʒ/', 'JavaScript /ˈdʒɑːvəskrɪpt/'] },
      ]},
      { type: 'vocabulary', title: '📝 Từ Vựng — Testing', vocabDays: [9] },
      { type: 'listening', title: '🎧 Nghe', instructions: ['ELSA Speak bài sh/ch/j', 'Shadowing video Testing'] }
    ],
    checklist: ['Phát âm 4 âm /ʃ/ /ʒ/ /tʃ/ /dʒ/', 'Học 15 từ testing + Anki', 'ELSA + Shadowing', 'Mô tả quy trình testing + ghi âm'],
    exercises: []
  },
  {
    day: 10, title: 'Phụ Âm /r/ vs /l/ — Lỗi Kinh Điển',
    objective: 'Phân biệt /r/ và /l/ — lỗi phổ biến nhất của người Việt. Từ vựng Security.',
    sections: [
      { type: 'pronunciation', title: '🔊 Phát Âm', content: [
        { phoneme: '/l/', name: 'L', desc: 'Đầu lưỡi ĐẬM CHẮC lên vòm miệng', words: ['list /lɪst/', 'link /lɪŋk/', 'load /loʊd/', 'log /lɒɡ/', 'file /faɪl/', 'null /nʌl/'] },
        { phoneme: '/r/', name: 'R', desc: 'Lưỡi CONG LÊN TRÊN nhưng KHÔNG CHẠM vòm', words: ['run /rʌn/', 'read /riːd/', 'write /raɪt/', 'render /ˈrendər/', 'request /rɪˈkwest/'] },
      ], minimalPairs: [['right /raɪt/', 'light /laɪt/'], ['read /riːd/', 'lead /liːd/'], ['rock /rɒk/', 'lock /lɒk/'], ['race /reɪs/', 'lace /leɪs/'], ['red /red/', 'led /led/']] },
      { type: 'vocabulary', title: '📝 Từ Vựng — Security', vocabDays: [10] },
      { type: 'listening', title: '🎧 Nghe', instructions: ['YouTube: "R vs L pronunciation practice"', 'Shadowing video tech'] }
    ],
    checklist: ['Phát âm /l/ (light L và dark L)', 'Phát âm /r/', 'Đọc 5 cặp minimal pairs', 'Học 15 từ security + Anki', 'Tongue twisters + ghi âm'],
    exercises: [
      { type: 'listen-choose', title: '/r/ hay /l/?', items: [
        { question: '"release" bắt đầu bằng:', options: ['/r/', '/l/'], answer: 0 },
        { question: '"list" bắt đầu bằng:', options: ['/r/', '/l/'], answer: 1 },
        { question: '"reliable" — đếm số âm /r/ và /l/:', options: ['1r + 1l', '1r + 2l', '2r + 1l'], answer: 1 },
      ]},
    ]
  },
  { day: 11, title: 'Phụ Âm Cuối + Đuôi -s/-es', objective: 'Phát âm đúng phụ âm cuối. Học 3 cách phát âm -s/-es. Từ vựng Agile.', sections: [{ type: 'pronunciation', title: '🔊 Phát Âm', content: [{ phoneme: '-s', name: '3 cách đọc đuôi -s', desc: '/s/ sau vô thanh, /z/ sau hữu thanh, /ɪz/ sau s/z/sh/ch/j', words: ['tests /s/', 'codes /z/', 'pages /ɪz/', 'stacks /s/', 'files /z/', 'changes /ɪz/'] }] }, { type: 'vocabulary', title: '📝 Từ Vựng — Agile', vocabDays: [11] }], checklist: ['Phụ âm cuối /t/ /d/ /k/ /p/', '3 cách phát âm -s/-es', 'Học 15 từ Agile + Anki', 'Đọc đoạn Agile + ghi âm'], exercises: [] },
  { day: 12, title: 'Đuôi -ed + Phụ Âm /v/ /f/ /w/', objective: 'Học 3 cách phát âm -ed. Phân biệt /v/ /f/ /w/. Từ vựng DevOps.', sections: [{ type: 'pronunciation', title: '🔊 Phát Âm', content: [{ phoneme: '-ed', name: '3 cách đọc đuôi -ed', desc: '/t/ sau vô thanh, /d/ sau hữu thanh, /ɪd/ sau t/d', words: ['fixed /t/', 'deployed /d/', 'started /ɪd/', 'pushed /t/', 'merged /d/', 'updated /ɪd/'] }] }, { type: 'vocabulary', title: '📝 Từ Vựng — DevOps', vocabDays: [12] }], checklist: ['3 cách phát âm -ed', 'Phân biệt /f/ /v/ /w/', 'Học 15 từ DevOps + Anki', 'Kể quy trình deploy + ghi âm'], exercises: [] },
  { day: 13, title: 'Consonant Clusters + Âm Mũi', objective: 'Phát âm cụm phụ âm và phân biệt /n/ /ŋ/ /m/ cuối từ. Từ vựng Cloud.', sections: [{ type: 'pronunciation', title: '🔊 Phát Âm', content: [{ phoneme: 'clusters', name: 'Cụm phụ âm', desc: 'Đầu: /str/ /skr/ /spr/ /pl/ /br/ — Cuối: /ks/ /ts/ /kt/ /pt/ /nd/', words: ['string', 'screen', 'sprint', 'platform', 'branch', 'fix', 'tests', 'strict', 'script', 'find'] }] }, { type: 'vocabulary', title: '📝 Từ Vựng — Cloud Computing', vocabDays: [13] }], checklist: ['Cụm phụ âm đầu + cuối', 'Phân biệt /n/ /ŋ/ /m/', '15 từ cloud + Anki', 'ELSA + nghe video'], exercises: [] },
  { day: 14, title: 'Ôn Tập Tuần 2 + Test Phát Âm', objective: 'Ôn tập tổng hợp phụ âm, đuôi -s/-ed. Đánh giá tiến bộ.', sections: [{ type: 'pronunciation', title: '🔊 Test Phát Âm Toàn Diện', content: [{ phoneme: 'Ôn tập', name: 'Tất cả phụ âm', desc: 'Test /θ/ /ð/ /ʃ/ /tʃ/ /dʒ/ /r/ /l/ /v/ /f/ /w/ + đuôi -s/-ed', words: ['think', 'this', 'push', 'check', 'join', 'run', 'list', 'version', 'file', 'web'] }] }], checklist: ['Test phát âm tất cả phụ âm', 'Test đuôi -s và -ed', 'Ôn Anki (120+ thẻ)', 'ELSA full test', 'So sánh Day 7'], exercises: [] },
  // Week 3: Stress & Intonation
  { day: 15, title: 'Trọng Âm Từ (Word Stress)', objective: 'Hiểu và áp dụng quy tắc trọng âm từ IT.', sections: [{ type: 'pronunciation', title: '🔊 Trọng Âm', content: [{ phoneme: 'Stress', name: 'Quy tắc trọng âm', desc: 'Danh từ 2 âm: nhấn âm 1. Động từ 2 âm: nhấn âm 2. Đuôi -tion/-ity: nhấn trước đuôi.', words: ['PRO-gram', 'SYS-tem', 'de-PLOY', 'in-STALL', 'ap-pli-CA-tion', 'se-CU-ri-ty'] }] }, { type: 'vocabulary', title: '📝 Từ Vựng — Mobile Dev', vocabDays: [15] }], checklist: ['Học 4 quy tắc trọng âm', 'Đánh dấu trọng âm 8 từ', '15 từ mobile dev + Anki', 'Giới thiệu dự án + ghi âm'], exercises: [] },
  { day: 16, title: 'Trọng Âm Câu + Ngữ Điệu', objective: 'Hiểu trọng âm câu và ngữ điệu — chìa khóa nói tự nhiên.', sections: [{ type: 'pronunciation', title: '🔊 Ngữ Điệu', content: [{ phoneme: 'Intonation', name: 'Hạ/Lên giọng', desc: '↘️ Hạ: câu trần thuật, Wh-question. ↗️ Lên: Yes/No question.', words: ['The SERVER is DOWN ↘️', 'Is the server running? ↗️', 'What\'s the error? ↘️', 'Did you push? ↗️'] }] }, { type: 'vocabulary', title: '📝 Từ Vựng — Frontend', vocabDays: [16] }], checklist: ['Content words vs function words', 'Falling vs rising intonation', '15 từ frontend + Anki', 'Shadowing + tự hỏi-đáp'], exercises: [] },
  { day: 17, title: 'Connected Speech', objective: 'Học linking, reduction, elision trong tiếng Anh.', sections: [], checklist: ['Linking words', 'Reduction patterns', 'Shadowing + ghi âm'], exercises: [] },
  { day: 18, title: 'Numbers, Dates & Technical Terms', objective: 'Đọc số, ngày tháng, phiên bản, đơn vị kỹ thuật.', sections: [], checklist: ['Đọc số lớn', 'Đọc version numbers', 'Đọc IP addresses', 'Technical units'], exercises: [] },
  { day: 19, title: 'Sentence Rhythm & Pacing', objective: 'Luyện nhịp câu tự nhiên.', sections: [], checklist: ['Rhythm practice', 'Pacing exercises', 'Shadowing'], exercises: [] },
  { day: 20, title: 'Pronunciation of Common IT Terms', objective: 'Phát âm đúng các từ IT hay bị sai.', sections: [], checklist: ['Từ hay sai: cache, queue, pseudo...', 'Acronyms: SQL, GUI, API...', 'Shadowing + ghi âm'], exercises: [] },
  { day: 21, title: 'Ôn Tập Tuần 3', objective: 'Ôn tập trọng âm, ngữ điệu, connected speech.', sections: [], checklist: ['Ôn tập tuần 3', 'ELSA full test', 'Ghi âm tự giới thiệu'], exercises: [] },
  // Week 4: Grammar + Review
  { day: 22, title: 'Present Simple & Continuous', objective: 'Dùng 2 thì để mô tả công việc IT.', sections: [{ type: 'grammar', title: '📖 Ngữ Pháp', content: [{ phoneme: 'Tenses', name: 'Present Simple vs Continuous', desc: 'Simple: thói quen, sự thật. Continuous: đang làm, tạm thời.', words: ['I write code every day.', 'I\'m working on the login feature.', 'The server runs on port 8080.', 'We\'re migrating to a new database.'] }] }, { type: 'vocabulary', title: '📝 Từ Vựng — Workplace', vocabDays: [22] }], checklist: ['Present Simple: 6 câu mẫu', 'Present Continuous: 6 câu mẫu', 'So sánh 2 thì', '15 từ workplace + Anki', 'Mô tả ngày làm việc + ghi âm'], exercises: [{ type: 'fill-blank', title: 'Chọn thì đúng', items: [{ sentence: 'I ___ code every day. (write/am writing)', options: ['write', 'am writing'], answer: 0 }, { sentence: 'Right now, I ___ a bug. (fix/am fixing)', options: ['fix', 'am fixing'], answer: 1 }] }] },
  { day: 23, title: 'Past Simple', objective: 'Kể về công việc đã làm.', sections: [], checklist: ['Past Simple regular/irregular', 'Kể dự án đã hoàn thành', 'Ghi âm'], exercises: [] },
  { day: 24, title: 'Present Perfect', objective: 'Dùng Present Perfect mô tả kinh nghiệm IT.', sections: [], checklist: ['Present Perfect cơ bản', 'Since/For/Already/Yet', 'Mô tả kinh nghiệm'], exercises: [] },
  { day: 25, title: 'Modal Verbs', objective: 'Can/could/should/would/might trong IT.', sections: [], checklist: ['Modal verbs trong IT', 'Đề xuất giải pháp', 'Yêu cầu lịch sự'], exercises: [] },
  { day: 26, title: 'Passive Voice', objective: 'Passive voice trong mô tả kỹ thuật.', sections: [], checklist: ['Passive trong technical writing', 'Bug reports', 'Process descriptions'], exercises: [] },
  { day: 27, title: 'Conditionals (If)', objective: 'Câu điều kiện type 1 & 2 trong IT.', sections: [], checklist: ['Type 1: If the test passes...', 'Type 2: If I had more time...', 'Technical scenarios'], exercises: [] },
  { day: 28, title: 'Linking Words', objective: 'However, therefore, although, meanwhile...', sections: [], checklist: ['Linking words', 'Complex sentences', 'Technical writing'], exercises: [] },
  { day: 29, title: 'Ôn Tập Tháng 1 (Phần 1)', objective: 'Ôn tập toàn diện tháng 1.', sections: [], checklist: ['Test phát âm toàn diện', 'Ôn Anki (200+ thẻ)', 'Đoạn văn 150 từ kết hợp ngữ pháp'], exercises: [] },
  { day: 30, title: 'Đánh Giá Tháng 1 🏆', objective: 'Đánh giá tiến bộ, ghi hình, chuẩn bị tháng 2.', sections: [], checklist: ['ELSA full test → so sánh Day 1', 'Ghi hình tự giới thiệu 3-5 phút', 'Self-assessment tháng 1', 'Kế hoạch tháng 2'], exercises: [] },
];
