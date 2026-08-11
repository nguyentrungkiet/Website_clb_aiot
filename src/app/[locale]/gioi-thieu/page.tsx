import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Users, BookOpen } from "lucide-react";

export default function AboutPage() {
  const members = [
    { name: "TS. Huỳnh Nguyễn Thành Luân", role: "Cố vấn", image: "https://ui-avatars.com/api/?name=Huỳnh+Nguyễn+Thành+Luân&background=random" },
    { name: "ThS. Nguyễn Anh Tú", role: "Cố vấn", image: "https://ui-avatars.com/api/?name=Nguyễn+Anh+Tú&background=random" },
    { name: "ThS. Nguyễn Trung Kiệt", role: "Chủ nhiệm CLB", image: "https://ui-avatars.com/api/?name=Nguyễn+Trung+Kiệt&background=random" },
    { name: "Lê Triều Phương Hiếu", role: "Phó chủ nhiệm", image: "https://ui-avatars.com/api/?name=Lê+Triều+Phương+Hiếu&background=random" },
    { name: "Võ Gia Huy", role: "Phó chủ nhiệm", image: "https://ui-avatars.com/api/?name=Võ+Gia+Huy&background=random" },
    { name: "Bùi Quang Chương", role: "Phó chủ nhiệm", image: "https://ui-avatars.com/api/?name=Bùi+Quang+Chương&background=random" },
    { name: "Nguyễn Anh Thư", role: "Trưởng ban Thư ký", image: "https://ui-avatars.com/api/?name=Nguyễn+Anh+Thư&background=random" },
    { name: "Huỳnh Kim Phương", role: "Trưởng ban Truyền thông", image: "https://ui-avatars.com/api/?name=Huỳnh+Kim+Phương&background=random" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white">
        <section className="bg-[#F5F9FC] py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B2F55] mb-6">Về Chúng Mình</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AIOT Club là câu lạc bộ trực thuộc Viện Công nghệ số - Trường Đại học Thủ Dầu Một. Nơi hội tụ những sinh viên có niềm đam mê mãnh liệt với Công nghệ, AI, IoT, và Robotics.
          </p>
        </section>

        <section className="py-16 container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-light-border rounded-xl text-center hover:shadow-md transition">
              <Target className="w-12 h-12 text-[#1767A6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0B2F55] mb-2">Tầm Nhìn</h3>
              <p className="text-gray-600">Trở thành một trong những CLB công nghệ sinh viên hàng đầu miền Nam, là vườn ươm cho các startup và dự án thực tế.</p>
            </div>
            <div className="p-6 border border-light-border rounded-xl text-center hover:shadow-md transition">
              <BookOpen className="w-12 h-12 text-[#1767A6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0B2F55] mb-2">Sứ Mệnh</h3>
              <p className="text-gray-600">Tạo ra môi trường "Học thật - Làm thật", giúp sinh viên ứng dụng kiến thức vào thực tế ngay từ năm nhất.</p>
            </div>
            <div className="p-6 border border-light-border rounded-xl text-center hover:shadow-md transition">
              <Users className="w-12 h-12 text-[#1767A6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0B2F55] mb-2">Văn Hóa</h3>
              <p className="text-gray-600">Chia sẻ kiến thức, không sợ sai, sẵn sàng thử thách. Bạn không cần giỏi trước khi bắt đầu.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F9FC] py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-[#0B2F55] mb-12">Ban Điều Hành</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {members.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B2F55]">{member.name}</h4>
                  <p className="text-sm text-[#1767A6] font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
