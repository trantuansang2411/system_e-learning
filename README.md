# EduPlatform — Nền Tảng Học Trực Tuyến Microservices

Dự án môn công nghệ mới xây dựng hệ thống học trực tuyến quy mô lớn theo kiến trúc microservices, lấy cảm hứng từ Udemy. Hệ thống hỗ trợ đầy đủ vòng đời từ tạo khoá học, thanh toán đa nhà cung cấp, theo dõi tiến độ học tập đến cấp chứng chỉ tự động.

---

## Kiến Trúc Tổng Quan

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                           │
│               React 18 + TypeScript + Vite + Tailwind CSS           │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS / REST
┌──────────────────────────────▼──────────────────────────────────────┐
│                         API Gateway :3000                           │
│          Express + http-proxy-middleware + Rate Limiting            │
└──┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬──────────────────────┘
   │   │   │   │   │   │   │   │   │   │   │   │   REST / gRPC
   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼
  Auth User Course Search Order Payment Wallet Learning Cert Review Notif Admin
 :3001 :3002 :3003 :3004 :3005 :3006  :3007  :3008  :3009 :3010 :3011 :3012

                    Analytic Service :8000 (Python FastAPI)

┌─────────────────── Infrastructure Layer ────────────────────────────┐
│  PostgreSQL 15  │  MongoDB 7  │  Redis 7  │  RabbitMQ 3.12  │ Kafka │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Stack Công Nghệ

### Backend (Node.js Microservices)

| Thành phần | Công nghệ | Mục đích |
|---|---|---|
| Runtime | **Node.js 20 LTS** | Nền tảng thực thi |
| Framework | **Express.js 4.18** | HTTP server cho 12 service |
| RPC đồng bộ | **gRPC + Protocol Buffers** | Giao tiếp nội bộ giữa các service |
| ORM (SQL) | **Prisma 5** | Auth, Order, Payment, Wallet, Search |
| ODM (NoSQL) | **Mongoose 8** | User, Course, Learning, Certificate, Review |
| SQL DB | **PostgreSQL 15** | Dữ liệu có cấu trúc (đơn hàng, thanh toán) |
| NoSQL DB | **MongoDB 7** | Dữ liệu linh hoạt (khoá học, tiến độ) |
| Cache | **Redis 7** | refresh_token lưu trữ |
| Message Broker | **RabbitMQ 3.12** | Sự kiện bất đồng bộ giữa các service |
| Event Streaming | **Apache Kafka 3.7** | Hành vi người dùng, analytics |
| Xác thực | **JWT + Google OAuth 2.0** | Phiên đăng nhập, SSO |
| Thanh toán | **Stripe + MoMo** | Quốc tế và ví điện tử Việt Nam |
| Logging | **Winston** | Structured logging |
| Validation | **Joi** | Input validation |
| File Upload | **Multer** | Ảnh, tài liệu khoá học |
| Container | **Docker + Docker Compose** | Triển khai toàn bộ stack |

### Backend (Python Service)

| Thành phần | Công nghệ | Mục đích |
|---|---|---|
| Framework | **FastAPI 0.115** | Analytic Service (:8000) |
| Async ORM | **SQLAlchemy 2.0 (async)** | Truy vấn analytics bất đồng bộ |
| DB Driver | **asyncpg** | Kết nối PostgreSQL hiệu năng cao |
| WebSocket | **FastAPI WebSocket** | Realtime metrics dashboard |
| Kafka Client | **aiokafka** | Consume user behavior events |

### Frontend

| Thành phần | Công nghệ | Phiên bản |
|---|---|---|
| Framework | **React** | 18.3.1 |
| Ngôn ngữ | **TypeScript** | Latest |
| Build tool | **Vite** | 6.3.5 |
| Routing | **React Router** | 7.13.0 |
| Styling | **Tailwind CSS 4** + Emotion | 4.1.12 |
| UI Components | **Radix UI** + MUI + Ant Design | — |
| Form | **React Hook Form** | 7.55.0 |
| HTTP Client | **Axios** | 1.13.6 |
| Charts | **Recharts** | 2.15.2 |
| Drag & Drop | **React DnD** | 16.0.1 |
| Animation | **Motion (Framer Motion)** | 12.23 |
| Icons | **Lucide React** | 0.487.0 |
| Toast | **Sonner** | 2.0.3 |
| Dark mode | **next-themes** | 0.4.6 |

---

## Các Microservice

### 1. API Gateway (:3000 / :4000)
Điểm vào duy nhất của hệ thống. Xử lý rate limiting, CORS, bảo mật header (Helmet) và định tuyến đến 12 service phía sau.

### 2. Auth Service (:3001)
Đăng ký, đăng nhập, JWT (access 15 phút / refresh 7 ngày), Google OAuth 2.0, xác minh email. Expose gRPC server để các service khác xác thực token.

### 3. User Service (:3002)
Quản lý hồ sơ học viên và giảng viên. Xử lý đăng ký giảng viên, upload ảnh đại diện. Lắng nghe event từ RabbitMQ.

### 4. Course Service (:3003)
CRUD khoá học, section, bài học. Quản lý coupon/giảm giá. Workflow xuất bản khoá học (draft → pending → published). Phát event đến Kafka và RabbitMQ.

### 5. Search Service (:3004)
Tìm kiếm full-text khoá học với filter (giá, chủ đề, rating, sắp xếp). Đồng bộ index qua event `course.published`, `course.updated`, `review.created`.

### 6. Order Service (:3005)
Giỏ hàng, checkout, lịch sử đơn hàng. Gọi Payment Service qua gRPC để đồng bộ trạng thái. Phát event `order.paid` khi thanh toán thành công.

### 7. Payment Service (:3006)
Tích hợp **Stripe** (thẻ quốc tế), **MoMo** (ví điện tử VN) và provider MOCK (test). Webhook endpoints xử lý callback thanh toán. Expose gRPC server.

### 8. Wallet Service (:3007)
Ví học viên và ví giảng viên. Nạp tiền, lịch sử giao dịch. Nhận hoa hồng 80% từ mỗi đơn bán khoá học sau khi trừ 20% phí nền tảng.

### 9. Learning Service (:3008)
Quản lý enrollment, theo dõi tiến độ từng bài học, đánh dấu hoàn thành. Phát event `course.completed` khi học viên hoàn tất khoá học.

### 10. Certificate Service (:3009)
Tự động cấp chứng chỉ khi nhận event `course.completed`. Endpoint xác minh chứng chỉ.

### 11. Review Service (:3010)
CRUD đánh giá và xếp hạng khoá học. Phát event `review.created/updated` để Search Service cập nhật rating.

### 12. Notification Service (:3011)
Quản lý thông báo realtime. Lắng nghe các event `order.paid`, `course.enrolled`, `certificate.issued` và tạo thông báo cho người dùng.

### 13. Admin Service (:3012)
Phê duyệt khoá học, khóa/mở khóa giảng viên, xem analytics nền tảng. Không có database riêng, gọi các service khác qua gRPC.

### 14. Analytic Service (:8000) — Python FastAPI
Thu thập hành vi người dùng từ Kafka. Cung cấp dashboard metrics realtime qua WebSocket. Dùng async SQLAlchemy + asyncpg cho hiệu năng cao.

---

## Giao Tiếp Giữa Các Service

### gRPC (Đồng bộ — dữ liệu quan trọng)
```
API Gateway  ──► Auth Service        (xác thực token)
Order        ──► Payment Service     (kiểm tra giao dịch)
Order        ──► Course Service      (lấy thông tin khoá học)
Learning     ──► Course Service      (kiểm tra enrollment)
Admin        ──► User/Course Service (quản lý)
```

### RabbitMQ (Bất đồng bộ — sự kiện nghiệp vụ)
```
Course Service    → Search Service          (course.published / updated)
Payment Service   → Order Service           (payment.succeeded / failed)
Order Service     → Learning Service        (order.paid → tạo enrollment)
Order Service     → Wallet Service          (order.paid → cộng hoa hồng)
Order Service     → Notification Service    (order.paid → thông báo)
Learning Service  → Certificate Service     (course.completed → cấp chứng chỉ)
Certificate Svc   → Notification Service    (certificate.issued → thông báo)
Review Service    → Search Service          (review.created → cập nhật rating)
```

### Kafka (Event Streaming — analytics)
```
Course/Order Service → Analytic Service     (hành vi người dùng)
```

---

## Luồng Mua Khoá Học (End-to-End)

```
Học viên chọn khoá học
        ↓
Thêm vào giỏ hàng (Order Service)
        ↓
Checkout → chọn Stripe / MoMo / Mock
        ↓
Payment Service tạo payment intent / redirect URL
        ↓
Người dùng thanh toán (Stripe Checkout / MoMo QR)
        ↓
Webhook callback → Payment Service xác nhận
        ↓
RabbitMQ: payment.succeeded
        ↓
Order Service cập nhật trạng thái → RabbitMQ: order.paid
        ↓
┌──────────────────────────────────────┐
│  Learning Service: tạo enrollment    │
│  Wallet Service: cộng 80% giảng viên │
│  Notification: thông báo học viên    │
└──────────────────────────────────────┘
        ↓
Học viên học → đánh dấu bài → hoàn tất khoá học
        ↓
Certificate Service tự động cấp chứng chỉ
```

---

## Cơ Sở Hạ Tầng & Triển Khai

```
docker-compose.yml
├── postgres:15        — 5 database riêng biệt (init-postgres/init-databases.sh)
├── mongo:7            — MongoDB cho NoSQL data
├── redis:7            — Caching layer
├── rabbitmq:3.12      — Message broker (management UI :15672)
├── kafka:3.7          — Event streaming
├── zookeeper          — Kafka coordinator
├── stripe-cli         — Webhook forwarding (dev)
└── 14 service containers (mỗi service có Dockerfile riêng)
```

Mỗi service độc lập, có health check, khởi động theo thứ tự phụ thuộc (`depends_on`). Data persistence qua Docker volumes.

---

## Phân Quyền Người Dùng

| Role | Quyền hạn |
|---|---|
| **Student** | Tìm kiếm, đăng ký, học, đánh giá, nhận chứng chỉ, quản lý ví |
| **Instructor** | Tạo/sửa khoá học, quản lý section/bài học, xem doanh thu, rút tiền |
| **Admin** | Phê duyệt khoá học, quản lý giảng viên, xem analytics toàn nền tảng |

---

## Tính Năng Nổi Bật

- **Kiến trúc microservices hoàn chỉnh** — 14 service độc lập, giao tiếp qua REST, gRPC và message queue
- **Thanh toán đa nhà cung cấp** — Stripe (quốc tế) + MoMo (Việt Nam)
- **Realtime analytics** — Kafka + WebSocket dashboard
- **Certificate automation** — Cấp chứng chỉ tự động khi hoàn tất khoá học
- **Event-driven** — Loose coupling qua RabbitMQ đảm bảo tính nhất quán eventual
- **Dual database strategy** — PostgreSQL cho dữ liệu quan hệ, MongoDB cho dữ liệu linh hoạt
- **Full Docker stack** — Toàn bộ infrastructure chạy bằng một lệnh `docker-compose up`
- **Proto-based contracts** — gRPC với Protocol Buffers đảm bảo type safety giữa các service

---

## Cấu Trúc Thư Mục

```
.
├── backend/
│   ├── api-gateway/         — Express reverse proxy
│   ├── auth-service/        — JWT + OAuth
│   ├── user-service/        — Hồ sơ người dùng
│   ├── course-service/      — Quản lý khoá học
│   ├── search-service/      — Tìm kiếm full-text
│   ├── order-service/       — Đơn hàng & giỏ hàng
│   ├── payment-service/     — Stripe + MoMo
│   ├── wallet-service/      — Ví điện tử
│   ├── learning-service/    — Tiến độ học tập
│   ├── certificate-service/ — Cấp chứng chỉ
│   ├── review-service/      — Đánh giá khoá học
│   ├── notification-service/— Thông báo realtime
│   ├── admin-service/       — Quản trị nền tảng
│   ├── analytic-service/    — Python FastAPI analytics
│   ├── shared/              — Shared utilities (logger, middleware, RabbitMQ)
│   ├── proto/               — gRPC Protocol Buffer definitions
│   └── init-postgres/       — DB initialization scripts
├── frontend/
│   └── CongNgheMoi_FrontEnd-/  — React + TypeScript SPA
└── README.md
```

---

## Chạy Dự Án

```bash
# Clone và khởi động toàn bộ stack
git clone <repo>
cd "do_An_Cn_Moi_backup - Copy"

# Tạo file .env (xem backend/.env.example)
cp backend/.env.example backend/.env

# Khởi động toàn bộ infrastructure + services
docker-compose up --build

# Frontend (development)
cd frontend/CongNgheMoi_FrontEnd-
npm install
npm run dev
```

API Gateway: `http://localhost:3000`  
Frontend: `http://localhost:5173`  
RabbitMQ Management: `http://localhost:15672`  
Analytic Service: `http://localhost:8000`
