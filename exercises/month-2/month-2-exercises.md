# Month 2 (Days 31-60) — Bài Tập + Listening Texts

---

## Tuần 5: Self-Introduction & Workplace Communication

### 📝 Exercises

**Ex 1: Self-introduction — Fill in the template**
Complete with YOUR real information:

"Hi, my name is _______. I'm a _______ with _______ years of experience. Currently, I'm working at _______, where I _______. My key skills include _______. I've worked on projects such as _______. I'm looking to _______."

**Ex 2: Small talk responses — Match**
| Question | Natural Response |
|---|---|
| 1. "How's it going?" | a. "Sure, it's about the new API design." |
| 2. "How was your weekend?" | b. "Not bad! Pretty busy with the release." |
| 3. "Working on anything interesting?" | c. "It was great, went hiking!" |
| 4. "Can you tell me about the meeting?" | d. "Yeah, I'm building a notification service." |

**Đáp án:** 1-b, 2-c, 3-d, 4-a

**Ex 3: Clarification phrases — Rewrite politely**
1. "What?" → "Sorry, could you repeat that?"
2. "I don't understand." → "Could you explain that in a different way?"
3. "Say it again." → "I didn't catch that. Could you say it again, please?"
4. "Is that right?" → "Just to confirm, is that correct?"

**Ex 4: Problem description — Complete the template**
"I'm running into an issue with _______. The expected behavior is _______, but the actual behavior is _______. I've tried _______, but the issue persists. I suspect the root cause is _______. I think we should _______."

**Ex 5: Opinions — Agree or disagree**
Read each statement and write your response using opinion phrases:
1. "We should switch from JavaScript to TypeScript."
   → "I agree / I see your point, but..."
2. "Unit tests are a waste of time."
   → Your response: _______
3. "Microservices are always better than monoliths."
   → Your response: _______

### 🎧 Listening Text — Workplace Conversation

```
It is Monday morning. Two developers, Alex and Kim, are having a conversation before the standup meeting.

Alex: Hey Kim, how was your weekend?
Kim: It was pretty good, thanks! I mostly relaxed, but I also did some coding on a side project. How about you?
Alex: Not bad. I went to a tech meetup on Saturday. There was an interesting talk about Web Assembly.
Kim: Oh nice! I've been meaning to learn about that. Was it any good?
Alex: Yeah, it was really informative. I can share the slides with you if you want.
Kim: That would be great, thanks!

Alex: By the way, are you working on anything interesting this sprint?
Kim: Yeah, I'm building the new notification service. It's challenging because we need to support both email and push notifications.
Alex: That sounds cool. Let me know if you need any help with the push notification part. I worked on something similar last year.
Kim: Actually, I could use your help. I'm stuck on the message queue integration. Do you have a few minutes after standup?
Alex: Sure, I'd be happy to help. Let's grab a coffee and look at it together.
Kim: Perfect. Oh, it looks like the standup is about to start. Let's go.
```

```
Now the standup meeting begins.

Kim: Yesterday, I set up the database schema for the notification service and created the API endpoints. Today, I'm going to work on the message queue integration. I might need some help from Alex on that. No blockers at the moment.

Alex: Yesterday, I finished the code review for Sarah's pull request and fixed two bugs in the payment module. Today, I'll continue working on the search feature optimization. I'm also going to help Kim with the message queue setup. One blocker: I'm waiting for the design team to finalize the search results layout.

Sarah: Yesterday, I addressed the code review feedback from Alex and updated my pull request. I also wrote integration tests for the user profile feature. Today, I'm going to deploy the user profile feature to staging and run the tests. No blockers.
```

---

## Tuần 6: Describing Experience & Technical Skills

### 📝 Exercises

**Ex 1: Past tenses — Fill in**
1. Last year, I _______ (work) on a fintech project. → was working / worked
2. Before we _______ (launch), we _______ (run) extensive tests. → launched, had run
3. While I _______ (develop) the API, my colleague _______ (design) the database. → was developing, was designing
4. We _______ (already/deploy) when the bug _______ (be) found. → had already deployed, was

**Ex 2: Tech stack description — Write yours**
Model: "The frontend is built with _______. We chose it because _______. The backend uses _______. Our database is _______. For deployment, we use _______."

**Ex 3: Technology comparison** 
Complete the sentences:
1. React is _______ (popular) than Vue. → **more popular**
2. SQL is not as _______ (flexible) as NoSQL. → **flexible**
3. Go is _______ (fast) than Python for backend services. → **faster**
4. Both TypeScript and JavaScript _______ (support) modern syntax. → **support**
5. I _______ (prefer) PostgreSQL _______ (over) MySQL because _______. → prefer, over

### 🎧 Listening Text — Developer Career Story

```
My name is David Chen and I have been a software developer for seven years. Let me tell you about my career journey.

I graduated from university with a degree in Computer Science in twenty nineteen. My first job was as a junior frontend developer at a small startup. We used React and Redux for the frontend and Node dot JS for the backend. I learned a lot about building user interfaces and working in an Agile team.

After two years, I moved to a larger company as a mid-level full-stack developer. This is where I really grew as an engineer. I was responsible for designing and building a real-time analytics dashboard. The main challenge was handling large amounts of data efficiently.

I chose to use WebSocket for real-time updates instead of polling. For the backend, I used Python with FastAPI because it was fast and easy to write. We stored the data in a time-series database called TimescaleDB, which is built on top of PostgreSQL.

The biggest technical challenge I faced was optimizing the dashboard for users with large datasets. The initial version was slow because we were loading all the data at once. I implemented virtual scrolling and server-side pagination, which reduced the load time from fifteen seconds to under two seconds.

Last year, I was promoted to senior developer. Now I lead a team of four developers. I am responsible for architecture decisions, code reviews, and mentoring junior developers.

Looking back, the most important skills I developed were not just technical. Communication, problem-solving, and the ability to learn quickly have been just as important as knowing how to write code.

If I could give one piece of advice to someone starting their career: focus on understanding the fundamentals deeply. Frameworks and tools change all the time, but core concepts like data structures, algorithms, and system design will always be relevant.
```

---

## Tuần 7-8: Daily Communication + Advanced Skills

### 📝 Exercises

**Ex 1: Standup — Write today's standup**
Write YOUR standup for today (all in English):
- Yesterday: _______
- Today: _______
- Blockers: _______

**Ex 2: Code review — Write feedback**
Look at this code and write 3 review comments:
```python
def get_user(id):
    user = db.query("SELECT * FROM users WHERE id = " + id)
    return user
```
1. [BLOCKER] _______  (SQL injection vulnerability)
2. [SUGGESTION] _______ (use parameterized queries)
3. [NIT] _______ (variable naming — use user_id instead of id)

**Ex 3: Meeting phrases — Complete**
1. "Let me _______ what we discussed." (summarize)
2. "Can we _______ this topic and come back later?" (table)
3. "I'd like to _______ something." (add)
4. "Building on what Sarah _______..." (said)
5. "Are there any _______?" (objections / questions)

**Ex 4: PR description — Write one**
Write a pull request description for: "Added password reset feature"
```
## What does this PR do?
_______
## Why?
_______
## How was this tested?
_______
```

### 🎧 Listening Text — Sprint Review Meeting

```
Welcome to the Sprint Twenty-Three review. I will walk you through what the team accomplished in the last two weeks.

The main goal of this sprint was to complete the user notification system. I'm happy to report that we delivered all planned features.

Let me start with the backend work. Alex built the notification service that supports email, push notifications, and in-app notifications. The service processes about ten thousand notifications per minute using a message queue. He also implemented rate limiting to prevent notification spam.

Kim worked on the frontend. She created a notification center component where users can see all their notifications, mark them as read, and manage their notification preferences. She also added real-time updates using WebSocket, so new notifications appear without refreshing the page.

Sarah focused on testing and documentation. She wrote over fifty integration tests that cover all notification scenarios. She also updated the API documentation and created a runbook for the operations team.

Now let me show you a quick demo. When a user receives a notification — let me trigger one now — you can see it appears immediately in the notification center. The user can click to view details, mark it as read, or dismiss it. In the settings page, users can choose which types of notifications they want to receive.

There is one item we did not complete. The notification analytics dashboard was descoped because we underestimated the complexity. We have moved it to the next sprint.

Does anyone have questions? Yes, go ahead.

Stakeholder: How are you handling notification failures? What happens if an email fails to send?

Alex: Great question. We have a retry mechanism. If a notification fails, it goes back into the queue and is retried up to three times with exponential backoff. If it still fails after three attempts, it is logged as a failed notification, and we get an alert.

Stakeholder: And what about user preferences? Can users opt out of certain notification types?

Kim: Yes, absolutely. Users can go to their settings and toggle each notification type on or off. We also respect the "Do Not Disturb" hours that users can set.

Thank you for your questions. That wraps up the sprint review. The retrospective will be right after the break.
```

---

> **Month 2 Target:** Nghe hiểu ≥ 60% cuộc họp tiếng Anh, nói standup 3 phút trôi chảy, viết email/PR chuyên nghiệp.
