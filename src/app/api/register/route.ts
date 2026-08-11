import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { name, studentId, major, phone, departments, reason } = data;

    // 1. Send data to Google Apps Script (Google Sheets)
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

    // 2. Send notification to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = `
🎉 <b>ĐƠN ĐĂNG KÝ MỚI</b> 🎉

👤 <b>Họ tên:</b> ${name}
🎓 <b>MSSV:</b> ${studentId}
📚 <b>Ngành:</b> ${major}
📞 <b>SĐT:</b> ${phone}
🎯 <b>Ban:</b> ${departments ? departments.join(', ') : 'Không có'}
💬 <b>Lý do:</b>
${reason}
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
      { success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
