# Hướng dẫn thiết lập ISA Lab Management System

Dự án này sử dụng Google Sheets làm Database và Google Apps Script làm API Backend (kiến trúc Phase 1). Vui lòng làm theo các bước dưới đây để kết nối hệ thống.

## 1. Thiết lập Google Sheets (Database)
1. Tạo một Google Sheet mới.
2. Tạo các trang tính (sheet) với tên CỤ THỂ như sau:
   - `ASSETS`
   - `INVENTORY`
   - `PROJECTS`
3. Trong sheet `ASSETS`, tạo dòng 1 (header) với các cột chính xác:
   `Temporary_ID`, `Asset_Code`, `Tên thiết bị`, `Nhóm`, `Cấp quản lý`, `Hãng/Model`, `Serial_Number`, `Số lượng`, `Đơn vị`, `Vị trí`, `Trạng thái`, `Tình trạng`, `Project đang dùng`, `Người đang giữ`, `Ngày kiểm kê`, `Người kiểm kê`, `Link hình ảnh`, `Ghi chú`, `Ngày mua`, `Giá trị ước tính`
4. Copy ID của Google Sheet (nằm trong URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID_HERE]/edit`)

## 2. Thiết lập Google Apps Script (API)
1. Tại Google Sheet, chọn menu **Tiện ích mở rộng (Extensions)** -> **Apps Script**.
2. Copy toàn bộ nội dung trong file `Code.gs` của dự án này và dán vào file Code.gs trên trình duyệt.
3. Thay thế dòng: `const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';` bằng ID Sheet của bạn ở bước 1.
4. Lưu lại (Ctrl+S).

## 3. Triển khai Web App (Deploy)
1. Nhấn nút **Triển khai (Deploy)** ở góc trên bên phải -> **Triển khai mới (New deployment)**.
2. Loại (Type): Chọn **Ứng dụng web (Web App)**.
3. Thực thi với tư cách: **Tôi (Me)**.
4. Quyền truy cập: **Bất kỳ ai (Anyone)** (Bắt buộc để website AIOT có thể gọi API mà không cần đăng nhập Google).
5. Bấm Deploy (Xác nhận quyền truy cập nếu Google yêu cầu).
6. Copy **URL của Ứng dụng web (Web App URL)**.

## 4. Cấu hình Website
1. Trong source code web, mở file `.env.local` (tạo nếu chưa có) hoặc cấu hình trên server Vercel/Netlify.
2. Thêm dòng sau:
   ```env
   NEXT_PUBLIC_ISA_API_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
   (Thay URL bằng Web App URL bạn vừa copy).
3. Khởi động lại server Next.js (`npm run dev`). Hệ thống sẽ tự động sử dụng API thật. Nếu không cấu hình URL này, hệ thống sẽ tiếp tục dùng Mock Data để hiển thị.

## Xử lý sự cố (Troubleshooting)
- **CORS Error**: Đảm bảo quyền truy cập Web App lúc deploy là "Bất kỳ ai".
- **Không hiện dữ liệu**: Kiểm tra tên Header trong Sheet có chính xác như hướng dẫn không (cẩn thận khoảng trắng dư).
- **Cập nhật code Apps Script**: Mỗi khi sửa code Apps Script, bạn PHẢI deploy lại bản mới (Manage deployments -> Edit -> New version).
