import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function NewsPage() {
  const news = [
    { date: "15 Th08, 2026", cat: "Sự kiện", title: "Workshop: Lập trình ESP32 cho người mới bắt đầu", desc: "Buổi chia sẻ kiến thức nền tảng về vi điều khiển ESP32 và cách giao tiếp với các cảm biến cơ bản.", image: "/news-workshop.jpg" },
    { date: "02 Th08, 2026", cat: "Hoạt động", title: "Giao lưu cùng doanh nghiệp công nghệ tại Bình Dương", desc: "Chuyến tham quan thực tế nhà máy thông minh và giao lưu cùng các kỹ sư công nghệ hàng đầu.", image: "/news-workshop.jpg" },
    { date: "20 Th07, 2026", cat: "Thành tựu", title: "Đội tuyển AIOT vô địch cuộc thi Sáng tạo Robot 2026", desc: "Hành trình nghẹt thở của team Robotics khi vượt qua 20 đội thi để giành ngôi vị cao nhất.", image: "/news-award.jpg" },
    { date: "10 Th07, 2026", cat: "Tin công nghệ", title: "Khám phá xu hướng AI tạo sinh trong năm 2026", desc: "Bài viết tổng hợp những công nghệ AI đang định hình tương lai do team Research biên soạn.", image: "/news-workshop.jpg" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white">
        <section className="bg-[#F5F9FC] py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B2F55] mb-4">Tin tức & Hoạt động</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những hoạt động mới nhất, các buổi workshop và tin tức công nghệ từ AIOT Club.
          </p>
        </section>

        <section className="py-16 container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid gap-8">
            {news.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row bg-white border border-light-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                <div className="w-full md:w-1/3 min-h-[200px] relative overflow-hidden flex items-center justify-center">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-bold text-white bg-[#05A6C8] px-3 py-1 rounded-full uppercase tracking-wider">{item.cat}</span>
                    <div className="flex items-center text-sm text-gray-500 font-medium">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B2F55] mb-3 group-hover:text-[#1767A6] transition-colors">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.desc}</p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-[#1767A6] font-semibold">
                      Đọc tiếp <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
