# Month 3-4 (Days 61-120) — Bài Tập + Listening Texts

---

## Month 3: IT Communication Chuyên Sâu

### 📝 Exercises — Software Development & Architecture

**Ex 1: SDLC — Sắp xếp đúng thứ tự**
Requirements → ? → ? → ? → ? → ?

Đáp án: Requirements → Analysis → Design → Implementation → Testing → Deployment → Maintenance

**Ex 2: Code quality vocabulary — Điền từ**
1. Duplicated code is an example of a code _______. (smell)
2. _______ is code structure improvement without changing behavior. (Refactoring)
3. Shortcuts taken to meet deadlines create technical _______. (debt)
4. The DRY principle stands for Don't _______ Yourself. (Repeat)
5. High _______ and low _______ are signs of good code. (cohesion, coupling)

**Ex 3: Design pattern explanation**
Explain the Singleton pattern in 3 sentences:
1. "The Singleton pattern ensures _______" (only one instance of a class exists)
2. "It is used when _______" (we need exactly one object, like a database connection)
3. "The advantage is _______" (it saves resources and ensures consistency)

**Ex 4: API design — Match HTTP method to action**
| Method | Action |
|---|---|
| GET | a. Delete a resource |
| POST | b. Read a resource |
| PUT | c. Create a resource |
| DELETE | d. Update a resource |

**Đáp án:** GET-b, POST-c, PUT-d, DELETE-a

**Ex 5: System architecture — Label the diagram**
Complete: Client → _______ → _______ → _______ → _______
**Đáp án:** Client → Load Balancer → API Gateway → Application Service → Database

### 🎧 Listening Text — System Design Discussion

```
Let me walk you through the architecture of our e-commerce platform.

At the highest level, our system follows a microservices architecture. We have about fifteen services, each responsible for a specific domain. The main services are: User Service, Product Service, Order Service, Payment Service, Notification Service, and Search Service.

All client requests first hit our load balancer, which distributes traffic across multiple instances of our API Gateway. The API Gateway handles authentication, rate limiting, and request routing. It decides which microservice should handle each request.

Our services communicate with each other in two ways. For synchronous communication, like when the Order Service needs to verify a user's payment method, we use REST APIs with HTTP. For asynchronous communication, like sending order confirmation emails, we use a message queue — specifically, Apache Kafka.

Each service has its own database. The User Service uses PostgreSQL because user data is highly relational. The Product Service uses MongoDB because product catalogs have varying structures. The Search Service uses Elasticsearch for fast full-text search.

For caching, we use Redis. We cache frequently accessed data like product listings and user sessions. This reduces the load on our databases and improves response times. Our cache hit rate is about ninety-five percent.

We deploy everything using Docker containers orchestrated by Kubernetes. Each service can be deployed independently, which means we can update the Payment Service without affecting the Product Service.

For monitoring, we use Prometheus for metrics collection and Grafana for dashboards. We track key metrics like response time, error rate, and throughput. We have alerts set up for when any metric exceeds its threshold.

The biggest challenge we face is maintaining data consistency across services. Since each service has its own database, we use the Saga pattern for distributed transactions. For example, when a user places an order, the Order Service creates the order, then the Payment Service charges the user, then the Inventory Service updates the stock. If any step fails, the previous steps are rolled back.

Our current system handles about fifty thousand requests per second with an average response time of two hundred milliseconds. Our uptime is ninety-nine point nine-five percent.
```

---

## Month 4: Professional Communication

### 📝 Exercises — Meetings, Reviews, Documentation

**Ex 1: Code review comments — Write appropriate feedback**

Code snippet:
```javascript
async function getUsers() {
  const users = await fetch('/api/users');
  return users;
}
```
Write 3 comments:
1. [QUESTION] "What happens if _______?" (the fetch fails — no error handling)
2. [SUGGESTION] "Consider adding _______." (try-catch for error handling)
3. [SUGGESTION] "You should also _______." (parse the JSON response with .json())

**Ex 2: Meeting facilitation — Put in order**
Order these meeting actions (1-6):
- [ ] Ask for questions
- [ ] Summarize decisions and action items
- [ ] State the agenda
- [ ] Open with greeting
- [ ] Discuss each topic
- [ ] Close and thank everyone

**Đáp án:** 1. Open, 2. State agenda, 3. Discuss topics, 4. Ask questions, 5. Summarize, 6. Close

**Ex 3: Technical documentation — Write a README section**
Write the "Getting Started" section for a project:
```markdown
## Getting Started

### Prerequisites
- _______
- _______

### Installation
1. _______
2. _______
3. _______

### Running the Application
_______
```

**Ex 4: System design discussion — Complete phrases**
1. "Let me clarify the _______ before we start." (requirements)
2. "Here's my _______ design." (high-level)
3. "The _______ here is between consistency and availability." (trade-off)
4. "Let me _______ the scale." (estimate)
5. "If we need to scale, we could _______." (add more instances / use a CDN / add caching)

### 🎧 Listening Text — Architecture Review Meeting

```
Thanks for joining today's architecture review. We are here to discuss the proposed design for the new real-time messaging feature.

Let me start by sharing the requirements. We need to support one-on-one messaging and group chats with up to fifty participants. Messages should be delivered in under one hundred milliseconds. We need to support message history and search. The system should handle up to one hundred thousand concurrent connections.

I propose the following architecture. For real-time message delivery, we will use WebSocket connections. Each user will maintain a persistent WebSocket connection to our message server. When a user sends a message, the server receives it and forwards it to all recipients who are currently online.

For users who are offline, we store the message in a message queue. When the user comes back online and reconnects, we deliver all pending messages.

For storage, I recommend using Cassandra for the message data. Cassandra is excellent for write-heavy workloads, which is exactly what we have with messaging. We will partition the data by conversation ID, so all messages in a conversation are stored together for fast retrieval.

For message search, we will use Elasticsearch. When a message is stored in Cassandra, we also index it in Elasticsearch asynchronously. This way, users can search through their message history without affecting the main message delivery performance.

Now, let me address some concerns I anticipate. First, presence tracking — how do we know which users are online? I propose using Redis for this. When a user connects, we add them to a Redis set. When they disconnect, we remove them. This gives us O of one lookup time for checking if a user is online.

Second, message ordering. In a distributed system, messages can arrive out of order. To solve this, each message will have a timestamp generated by the server. The client will display messages sorted by this server timestamp.

Any questions or concerns about this design?

Developer One: What about read receipts? How will the sender know their message was read?

Good question. When a recipient reads a message, the client sends a read receipt back through the WebSocket connection. We update the message status in Cassandra. The sender receives the status update in real-time.

Developer Two: I'm concerned about the WebSocket connection limits. One hundred thousand concurrent connections is a lot for a single server.

You're right. We won't handle all connections on one server. We will use multiple WebSocket servers behind a load balancer. Each server will handle about ten thousand connections. We will use Redis Pub Sub to broadcast messages between servers. So if User A is connected to Server One and User B is connected to Server Two, Server One publishes the message to Redis, and Server Two receives it and delivers it to User B.

That's a great point. Let me update the diagram to reflect this multi-server setup.

Thank you all for your feedback. I will update the design document and share it for async review. Please leave comments on the document by the end of the week.
```

---

> **Month 3-4 Target:** Thảo luận kiến trúc hệ thống 20 phút bằng tiếng Anh, viết technical docs, dẫn dắt cuộc họp.
