import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define the validation schema using Zod
const registerSchema = z.object({
  name: z.string().min(2, "Họ tên quá ngắn").max(100, "Họ tên quá dài"),
  studentId: z.string().min(5, "Mã SV quá ngắn").max(20, "Mã SV quá dài"),
  major: z.string().min(2, "Tên ngành quá ngắn").max(100, "Tên ngành quá dài"),
  phone: z.string().min(9, "SĐT không hợp lệ").max(15, "SĐT không hợp lệ"),
  departments: z.array(z.string()).max(10, "Chọn quá nhiều ban"),
  reason: z.string().max(1000, "Lý do không được vượt quá 1000 ký tự").optional(),
});

// Simple in-memory rate limiting Map
// Note: This works per-instance. In a serverless environment (e.g. Vercel), it resets frequently and isn't shared across edge nodes.
// For production scale, use Redis (e.g., Upstash) instead.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 3; // Max 3 requests
const TIME_WINDOW_MS = 60 * 1000; // per 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  // If time window has passed, reset
  if (now - userLimit.lastReset > TIME_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  // If within time window, check count
  if (userLimit.count >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }

  userLimit.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. IP-based Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const isAllowed = checkRateLimit(ip);
    
    if (!isAllowed) {
      return NextResponse.json(
        { success: false, message: "Bạn đang gửi quá nhanh. Vui lòng thử lại sau 1 phút." },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Request Data
    const rawData = await request.json();
    const parseResult = registerSchema.safeParse(rawData);

    if (!parseResult.success) {
      // Extract the first error message
      const errorMessage = parseResult.error.issues[0]?.message || "Dữ liệu không hợp lệ";
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 400 }
      );
    }

    const { name, studentId, major, phone, departments, reason } = parseResult.data;

    // 3. Send data to Google Apps Script (Google Sheets)
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (scriptUrl) {
      await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          studentId,
          major,
          phone,
          departments,
          reason,
        }),
      }).catch(err => console.error("Error sending to Google Script:", err));
    }

    // 4. Send notification to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = `
🎉 <b>ĐƠN ĐĂNG KÝ MỚI</b> 🎉

👤 <b>Họ tên:</b> ${name}
🎓 <b>MSSV:</b> ${studentId}
📚 <b>Ngành:</b> ${major}
📞 <b>SĐT:</b> ${phone}
🎯 <b>Ban:</b> ${departments && departments.length > 0 ? departments.join(', ') : 'Không có'}
💬 <b>Lý do:</b>
${reason || 'Không có'}
      `.trim();

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }).catch(err => console.error("Error sending to Telegram:", err));
    }

    return NextResponse.json({ success: true, message: "Đăng ký thành công!" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi hệ thống xảy ra, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
