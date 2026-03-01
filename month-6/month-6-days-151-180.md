# Month 6: Phỏng Vấn Technical (Days 151–180)

---

## Tuần 21 (Days 151–157): Coding Interview — Think Aloud

### Day 151: Think Aloud Framework

Khi giải bài coding interview, bạn PHẢI nói to suy nghĩ. Đây là framework:

**Step 1: Understand (1-2 phút)**
- "Let me make sure I understand the problem correctly."
- "So the input is... and the expected output is..."
- "Are there any constraints I should be aware of?"
- "Can I assume the input is always valid?"
- "Let me trace through an example to verify my understanding."

**Step 2: Plan (2-3 phút)**
- "My first thought is to use a brute force approach..."
- "The brute force would be O(n²) which might be too slow."
- "I think we can optimize this using [data structure/algorithm]."
- "Let me think about edge cases: empty input, single element, duplicates..."
- "My approach is: First... Then... Finally..."

**Step 3: Code (10-15 phút)**
- "I'll start by defining the function signature."
- "Here I'm iterating through the array..."
- "I'm using a hash map to store... for O(1) lookup."
- "Let me write a helper function for..."
- "I need to handle the edge case where..."

**Step 4: Verify (2-3 phút)**
- "Let me trace through my solution with the example."
- "For input [1,2,3], step 1 gives us... step 2 gives us..."
- "The time complexity is O(n) and space complexity is O(n)."
- "I think we could optimize space by..."

**Bài tập:** Giải 1 bài LeetCode Easy bằng tiếng Anh, ghi âm toàn bộ quá trình.

---

### Day 152: Array & String Problems (English)

**Từ vựng thuật toán:**
| Từ | Nghĩa | Cách dùng |
|---|---|---|
| iterate | lặp qua | "I'll iterate through the array." |
| traverse | duyệt qua | "Traverse the string character by character." |
| pointer | con trỏ | "I'll use two pointers." |
| sliding window | cửa sổ trượt | "This is a sliding window problem." |
| hash map | bảng băm | "I'll use a hash map for lookups." |
| edge case | trường hợp biên | "The edge case is an empty array." |
| overflow | tràn số | "We should check for integer overflow." |
| in-place | tại chỗ | "Can we do this in-place?" |

**Bài tập:** Giải 2 bài LeetCode bằng tiếng Anh → ghi âm think aloud.

---

### Day 153: Tree & Graph Problems

**Từ vựng:**
- "I'll do a BFS/DFS traversal."
- "Let me use a recursive approach."
- "The base case is when the node is null."
- "I'll track visited nodes to avoid cycles."
- "The time complexity is O(V + E) where V is vertices and E is edges."

**Bài tập:** Giải 1 tree + 1 graph problem → think aloud.

---

### Day 154: Dynamic Programming Explanation

**Phrases:**
- "This has overlapping subproblems, so I'll use dynamic programming."
- "Let me define the state: dp[i] represents..."
- "The recurrence relation is dp[i] = ..."
- "The base case is dp[0] = ..."
- "I can optimize space by only keeping the previous row."

**Bài tập:** Giải 1 DP problem → think aloud.

---

### Day 155: Sorting & Searching Explanation

**Phrases:**
- "I'll sort the array first in O(n log n)."
- "I'll use binary search since the array is sorted."
- "The search space is from left to right."
- "I'll use the mid point to decide which half to search."

---

### Day 156: Time/Space Complexity Discussion

**Phrases:**
- "The time complexity is O(n) because we iterate once."
- "We're trading space for time here."
- "The worst case is O(n²) but the average case is O(n log n)."
- "Can we do better than O(n²)?"
- "This uses O(n) extra space for the hash map."

---

### Day 157: Ôn Tập — Mock coding interview (30 phút)
Giải 2 bài (1 Easy, 1 Medium), nói to toàn bộ. Ghi hình → review.

---

## Tuần 22 (Days 158–164): System Design Interview

### Day 158: System Design Interview Framework

**Step 1: Requirements Clarification (3-5 phút)**
- "Before I dive in, I'd like to clarify the requirements."
- "How many users are we expecting?"
- "What's the read/write ratio?"
- "Do we need real-time updates?"
- "What's the acceptable latency?"

**Step 2: High-Level Design (5-10 phút)**
- "Let me start with a high-level architecture."
- "The main components are: [client, API gateway, services, database, cache]."
- "The data flow would be: client → API gateway → service → database."

**Step 3: Detailed Design (10-15 phút)**
- "For the database, I'd use [X] because..."
- "We'll need a cache layer using Redis for..."
- "For the message queue, I'd use Kafka because..."
- "The API design would include these endpoints: ..."

**Step 4: Scaling & Trade-offs (5 phút)**
- "To handle more traffic, we can..."
- "The bottleneck would be at..."
- "We're choosing availability over consistency here because..."

---

### Day 159: Design a URL Shortener
Practice the full system design interview in English (20 phút).

### Day 160: Design a Chat System
Practice (20 phút) → ghi hình.

### Day 161: Design a Social Media Feed
Practice (20 phút) → ghi hình.

### Day 162: Design a Rate Limiter
Practice (20 phút).

### Day 163: Design a Notification System
Practice (20 phút).

### Day 164: Ôn Tập — Full system design interview (45 phút) → ghi hình.

---

## Tuần 23 (Days 165–171): Mock Interviews

### Day 165: Mock Interview #1 — Behavioral Only (30 phút)
- Self-intro (2 phút)
- 5 behavioral questions (15 phút)
- Questions for interviewer (5 phút)
- Self-review (8 phút)

### Day 166: Mock Interview #2 — Coding Only (45 phút)
- 2 coding problems
- Think aloud throughout
- Discuss complexity
- Self-review

### Day 167: Mock Interview #3 — System Design Only (45 phút)
- 1 full system design problem
- Self-review

### Day 168: Mock Interview #4 — Full Interview (60 phút)
- Behavioral (15 phút) + Coding (25 phút) + System Design (20 phút)
- Ghi hình toàn bộ

### Day 169: Review & Improve
- Watch all recordings
- Note patterns in mistakes
- Practice weak areas

### Day 170: Mock Interview #5 — With a Partner
- Use Pramp.com or ask a friend
- Get external feedback

### Day 171: Ôn Tập — Address all feedback from mocks

---

## Tuần 24 (Days 172–178): Final Preparation

### Day 172: Interview Day Preparation (English)

**Before the interview:**
- Research the company (engineering blog, tech talks)
- Prepare 3 questions to ask
- Review your STAR stories
- Test your mic/camera

**Opening:**
- "Thank you for taking the time to meet with me."
- "I'm really excited about this opportunity."

**Closing:**
- "Thank you for your time. I really enjoyed our conversation."
- "I'm very interested in this role and I look forward to hearing from you."
- "Is there anything else you'd like to know about my background?"

### Day 173: Handling Tough Situations

**When you're stuck:**
- "That's a great question. Let me think about it for a moment."
- "I'm not 100% sure, but my initial thought would be..."
- "I haven't worked with that specific technology, but based on my experience with [similar tech]..."

**When you make a mistake:**
- "Actually, let me correct that. I think..."
- "Good catch. Let me reconsider my approach."

**When you don't know:**
- "I haven't encountered that specific scenario, but I would approach it by..."
- "That's outside my area of expertise, but I'm a quick learner and I would..."

### Day 174: Salary Negotiation (English)
- "Based on my research, the market rate for this role is..."
- "I'm looking for a salary in the range of..."
- "Are there other components of the compensation package?"
- "I'd like some time to consider the offer."

### Day 175: Follow-up Email Template
```
Subject: Thank you — [Position] Interview

Dear [Name],

Thank you for taking the time to interview me for the [position]
role today. I enjoyed learning more about [specific topic discussed].

Our conversation about [topic] reinforced my enthusiasm for
joining [company]. I believe my experience in [skill] would allow
me to contribute to [specific goal].

Please don't hesitate to reach out if you need any additional
information. I look forward to hearing from you.

Best regards,
[Your name]
```

### Day 176: Common Interview Formats
- Phone screen
- Take-home assignment
- On-site (virtual/in-person)
- Panel interview
- Pair programming
- Behavioral + Technical combined

### Day 177: Final Mock Interview (FULL)
60-minute full simulation:
1. Icebreaker / small talk (5 min)
2. Self-introduction (2 min)
3. Behavioral (15 min — 4 questions)
4. Coding (20 min — 1 medium problem)
5. System design (15 min)
6. Your questions (3 min)

GHI HÌNH → review kỹ.

### Day 178: Address Final Weak Areas
Based on Day 177 recording → practice specific weak areas.

---

## Days 179–180: FINAL REVIEW & READINESS CHECK

### Day 179: Complete Review

**Morning: Pronunciation & Speaking**
- Read STAR stories out loud (20 phút)
- Shadowing 10 phút
- ELSA Speak final test

**Afternoon: Knowledge Review**
- Ôn Anki toàn bộ (600+ thẻ)
- Review all STAR stories
- Review system design notes

**Evening: Confidence Building**
- Watch your Day 1 recording vs your latest recording
- Celebrate your progress! 🎉

### Day 180: Readiness Assessment

**Final Self-Assessment:**

| Category | Skill | Score /10 |
|---|---|---|
| **Pronunciation** | IPA, word stress, intonation | /10 |
| **Vocabulary** | 600+ IT terms | /10 |
| **Grammar** | All tenses, complex structures | /10 |
| **Listening** | Understand native speed | /10 |
| **Behavioral** | STAR stories fluent | /10 |
| **Coding** | Think aloud in English | /10 |
| **System Design** | Explain architecture | /10 |
| **Professional** | Email, meeting, code review | /10 |
| **Confidence** | Overall interview confidence | /10 |

**Final Ghi Hình:** Self-introduction + top 3 STAR stories + explain favorite system design. (15 phút)

**LƯU LẠI** tất cả bản ghi để tham khảo trước ngày phỏng vấn thật!

---

> 🏆🏆🏆 **CHÚC MỪNG! BẠN ĐÃ HOÀN THÀNH LỘ TRÌNH 6 THÁNG!**
>
> Bạn đã đi từ:
> - ❌ Không biết IPA → ✅ Phát âm chuẩn
> - ❌ <>50 từ IT → ✅ 600+ từ chuyên ngành
> - ❌ Không nói được 1 câu → ✅ Thuyết trình 15 phút
> - ❌ Sợ phỏng vấn tiếng Anh → ✅ Tự tin mock interview!
>
> **Bước tiếp theo:** Apply và phỏng vấn thật! Practice makes perfect!
> **Tip cuối:** Trước mỗi buổi phỏng vấn, xem lại Day 172 + recordings. Good luck! 🍀
