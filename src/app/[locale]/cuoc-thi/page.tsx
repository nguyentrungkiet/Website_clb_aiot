import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Trophy, Medal, Award } from "lucide-react";

export default function CompetitionsPage() {
  const competitions = [
    { year: "2025", name: "SV-Startup Toàn quốc", award: "Giải Nhì", project: "Hệ thống Nông nghiệp thông minh bằng UAV", icon: Trophy },
    { year: "2024", name: "Olympic Tin học Sinh viên", award: "Huy chương Bạc", project: "Khối chuyên Tin", icon: Medal },
    { year: "2024", name: "Cuộc thi Sáng tạo Robot TDMU", award: "Vô địch", project: "Robot dò đường tự động", icon: Trophy },
    { year: "2023", name: "Hackathon TDMU Innovation", award: "Giải Ba", project: "Ứng dụng AI phân loại rác", icon: Award },
  ];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-[#F5F9FC]">
        <section className="bg-white py-20 text-center px-4 border-b border-light-border">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B2F55] mb-4">Từ phòng Lab đến Đấu trường</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "Mỗi cuộc thi là một lớp học thực tế". Khám phá hành trình chinh phục các giải thưởng công nghệ của AIOT Club.
          </p>
        </section>

        <section className="py-20 container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="relative border-l-4 border-[#1767A6] ml-6 md:ml-0 md:pl-0">
            {competitions.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div key={idx} className="mb-12 ml-8 md:ml-12 relative">
                  <div className="absolute -left-[45px] md:-left-[63px] top-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#1767A6] border-4 border-[#F5F9FC] flex items-center justify-center text-white">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-border hover:shadow-md transition">
                    <span className="text-sm font-bold text-[#05A6C8]">{comp.year}</span>
                    <h3 className="text-xl font-bold text-[#0B2F55] mt-1">{comp.name}</h3>
                    <p className="text-gray-600 mt-2">Dự án: <span className="font-semibold text-gray-800">{comp.project}</span></p>
                    <div className="mt-4 inline-block bg-[#F5F9FC] text-[#1767A6] px-4 py-1.5 rounded-full font-bold text-sm">
                      Thành tích: {comp.award}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
