# Month 5-6 (Days 121-180) — Bài Tập Phỏng Vấn + Listening Texts

---

## Month 5: Behavioral Interview

### 📝 Exercises — STAR Method

**Ex 1: STAR Story Builder — Problem Solving**
Complete with YOUR real experience:

**Situation:** "At _______, our _______ was experiencing _______."
**Task:** "As the _______, I was responsible for _______."
**Action:** "First, I _______. Then, I _______. I also _______."
**Result:** "As a result, _______ improved by _______%. The team _______."

**Ex 2: STAR Story Builder — Teamwork**
**S:** "We were working on _______ with a team of _______."
**T:** "The challenge was that _______."
**A:** "I suggested _______. I also _______. We held _______ to _______."
**R:** "The project was delivered _______. I learned _______."

**Ex 3: STAR Story Builder — Failure & Learning**
**S:** "Early in my career, I _______."
**T:** "I needed to _______."
**A:** "Unfortunately, I _______ without _______."
**R:** "This caused _______. I learned _______. Since then, I always _______."

**Ex 4: "Why this company?" Template**
"I'm excited about _______ because _______. I've been following your work on _______, and I find it _______. My experience in _______ would help me contribute to _______."

**Ex 5: "Any questions?" — Write 5 smart questions**
1. "What does a typical day look like for this role?"
2. _______
3. _______
4. _______
5. _______

**Ex 6: Behavioral answer evaluation**
Rate each answer (Good/Bad) and explain why:

1. "Tell me about a conflict with a colleague."
   Bad answer: "I never have conflicts. I get along with everyone."
   → Rating: BAD — doesn't answer the question, sounds dishonest.

2. "Tell me about a failure."
   Answer: "I once deployed without testing and it caused downtime. I learned to always test in staging first. I then created a deployment checklist."
   → Rating: _______ — Why? _______

### 🎧 Listening Text — Mock Behavioral Interview

```
Interviewer: Thank you for coming in today. Let's start with a simple question. Can you tell me about yourself?

Candidate: Sure! My name is Minh and I'm a backend developer with four years of experience. Currently, I'm working at a fintech company called PayTech, where I'm responsible for building and maintaining payment processing services.

I have experience with Node dot JS, Python, and Go. I've also worked extensively with PostgreSQL, Redis, and Kafka. In my current role, I've built a payment reconciliation system that processes over two million transactions per day.

Before PayTech, I worked at a startup where I was one of the first five developers. That experience taught me to be versatile and take ownership of entire features from design to deployment.

I'm interested in this role at your company because I want to work on larger-scale distributed systems. I've read about your engineering blog and I'm particularly impressed by your approach to event-driven architecture.

Interviewer: Great, thank you. Can you tell me about a challenging technical problem you solved?

Candidate: Absolutely. At PayTech, we had a problem with our payment reconciliation system. It was taking over twelve hours to reconcile daily transactions, which meant we couldn't detect discrepancies quickly enough.

As the lead developer on this project, I was tasked with reducing the reconciliation time to under one hour.

First, I analyzed the existing process and found that it was doing sequential database queries for each transaction. For two million transactions, that meant two million individual queries.

I redesigned the system to use batch processing. Instead of querying one transaction at a time, I grouped them into batches of one thousand. I also added parallel processing using Go routines, so multiple batches could be processed simultaneously.

Additionally, I optimized the database by adding composite indexes on the columns we used for matching transactions. I also introduced a caching layer using Redis to store frequently accessed reference data.

As a result, the reconciliation time dropped from twelve hours to forty-five minutes — a ninety-three percent improvement. More importantly, we could now detect payment discrepancies within an hour, saving the company an estimated fifty thousand dollars per month in undetected errors.

Interviewer: Impressive. Now, tell me about a time you disagreed with a teammate. How did you handle it?

Candidate: Sure. Last year, my team was deciding on the database for a new service. My colleague wanted to use MongoDB because of its flexibility, but I believed PostgreSQL was a better choice for this particular use case because our data was highly relational.

Instead of just insisting on my preference, I prepared a comparison document. I listed the pros and cons of each option, considering our specific requirements: ACID compliance, complex joins, and data integrity.

I presented this document during our team meeting and invited discussion. My colleague raised valid points about MongoDB's scalability advantages. We had a constructive conversation and ultimately decided on PostgreSQL with a plan to use MongoDB for a separate service that needed more flexibility.

What I learned from this experience is that disagreements are actually valuable when handled respectfully. By grounding the discussion in data rather than opinions, we made a better decision together.

Interviewer: Last question. Do you have any questions for us?

Candidate: Yes, I have a few. First, what does the team structure look like for the role I'm applying for? Second, how does your team handle technical debt? And third, what does the onboarding process look like for new engineers?
```

---

## Month 6: Technical Interview

### 📝 Exercises — Coding Think Aloud

**Ex 1: Think aloud template — Apply to any problem**
1. "Let me make sure I understand. The input is _______. The output should be _______."
2. "Are there any constraints? _______"
3. "My initial approach would be _______. The time complexity would be _______."
4. "I can optimize this by using _______."
5. "Let me trace through an example: for input _______, step 1 gives _______, step 2 gives _______..."
6. "The time complexity is _______ and space complexity is _______."

**Ex 2: Explain this algorithm in English**
```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```
Write explanation: _______

**Mẫu:** "This function finds two numbers in an array that add up to a target value. I use a hash map to store numbers I've already seen. For each number, I calculate the complement — what number I need to reach the target. If the complement is in the hash map, I return both indices. Otherwise, I add the current number to the hash map. The time complexity is O of n and space complexity is O of n."

**Ex 3: System design — URL Shortener**
Complete the design outline:
1. Requirements: "The system should _______. Expected scale: _______ URLs per day."
2. API: "POST /shorten — takes _______, returns _______. GET /:code — _______ the user to the original URL."
3. Database: "I would use _______ because _______."
4. Algorithm: "To generate short codes, I would _______."
5. Scaling: "To handle high traffic, we could add _______ and _______."

### 🎧 Listening Text — Mock Technical Interview

```
Interviewer: For this part of the interview, I'd like you to solve a coding problem. Given an array of integers, find the maximum subarray sum. Can you walk me through your approach?

Candidate: Sure, let me make sure I understand the problem. I have an array of integers, which can be positive or negative. I need to find a contiguous subarray with the largest sum. Is that correct?

Interviewer: Yes, exactly.

Candidate: All right. Let me think about this. The brute force approach would be to check every possible subarray, calculate the sum, and keep track of the maximum. That would be O of n squared time, which might be too slow for large arrays.

I know there's a better approach called Kadane's algorithm that runs in O of n time. The idea is to keep track of the maximum sum ending at each position.

Let me walk through it. I'll use two variables: "max ending here" and "max so far." I initialize both with the first element of the array.

Then, for each element starting from the second one, I update "max ending here" to be the maximum of the current element alone or the current element plus "max ending here." This decision tells us whether to extend the current subarray or start a new one.

After updating "max ending here," I update "max so far" if "max ending here" is larger.

Let me trace through an example. For the array minus two, one, minus three, four, minus one, two, one, minus five, four:

Starting with max ending here equals minus two, max so far equals minus two.

Next element is one. Max ending here is max of one or one plus minus two, which is one. Max so far is now one.

Next is minus three. Max ending here is max of minus three or minus three plus one, which is minus two. Max so far stays one.

Next is four. Max ending here is max of four or four plus minus two, which is four. Max so far is now four.

Continuing this way, max ending here becomes three, then five, then six, then one, then five.

The maximum subarray sum is six, which comes from the subarray four, minus one, two, one.

Let me write the code now.

The time complexity is O of n because we iterate through the array once. The space complexity is O of one because we only use two variables.

Interviewer: Excellent explanation. What would you do if I asked you to also return the starting and ending indices of the maximum subarray?

Candidate: Good question. I would add two more variables to track the current start index and the result start and end indices. When I start a new subarray — when the current element is larger than the current element plus max ending here — I update the current start. When I update max so far, I also update the result start and end indices.

Interviewer: Great. Let's move on to the system design portion.
```

```
Interviewer: Design a URL shortening service like bit dot ly. Walk me through your approach.

Candidate: Sure. Let me start by clarifying the requirements.

The core feature is: given a long URL, generate a short URL. When someone visits the short URL, they should be redirected to the original long URL.

Let me ask some clarifying questions. What's the expected scale? How many URLs per day? Should short URLs expire?

Interviewer: Let's say one hundred million new URLs per day. URLs should be accessible for at least five years.

Candidate: That's helpful. Let me estimate the storage. One hundred million URLs per day times three sixty-five days times five years — that's about one hundred eighty billion URLs total. If each record is about five hundred bytes, we need approximately ninety terabytes of storage.

For the short code, I need a unique identifier. If I use base sixty-two encoding with letters and numbers, a seven-character code gives me three point five trillion possible combinations, which is more than enough.

Here is my high-level design. The client sends a POST request with the long URL to our API server. The server generates a unique short code, stores the mapping in the database, and returns the short URL.

When someone visits the short URL, the server looks up the short code in the database, finds the original URL, and returns a three-oh-one redirect.

For the database, I would use a NoSQL database like Cassandra because we have a very simple data model — just key-value pairs — and we need to handle high write throughput.

To improve read performance, I would add a Redis cache in front of the database. When a short URL is accessed, we first check the cache. If it's there, we return it immediately. If not, we query the database and put the result in the cache for next time.

For generating unique codes, I could use a combination of a counter service and base sixty-two encoding. The counter service generates sequential numbers, and we convert them to base sixty-two to get the short code.

To handle the high traffic, I would use multiple application servers behind a load balancer. The stateless design of our service makes it easy to scale horizontally.

Interviewer: What about analytics? What if we want to track how many times each short URL is clicked?

Candidate: For analytics, I would use an event-driven approach. Every time a URL is accessed, instead of updating the database synchronously, I would publish an event to Kafka. A separate analytics service would consume these events, aggregate them, and store the results in a time-series database for reporting.

This design keeps the main redirect path fast because we don't wait for analytics processing.
```

---

## 📝 Final Exercises — Interview Readiness

**Self-check: Can you do these in English?**

| # | Skill | Yes/No |
|---|---|---|
| 1 | Introduce yourself in 2 minutes | |
| 2 | Tell 3 STAR stories fluently | |
| 3 | Answer "Why this company?" naturally | |
| 4 | Handle "Tell me about a failure" | |
| 5 | Think aloud while coding | |
| 6 | Explain time/space complexity | |
| 7 | Discuss system design for 20 min | |
| 8 | Ask smart questions to interviewer | |
| 9 | Write a follow-up thank-you email | |
| 10 | Handle "I don't know" gracefully | |

**Target: ≥ 8/10 "Yes" = READY FOR INTERVIEWS! 🎉**

---

> 🏆 **Hoàn thành tất cả bài tập = Bạn đã sẵn sàng phỏng vấn bằng tiếng Anh!**
