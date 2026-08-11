import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function ProjectsPage() {
  const projects = [
    { name: "Hệ thống MASS", category: "IoT & Cloud", desc: "Nền tảng giám sát điện nước thông minh áp dụng cho các phòng học tại TDMU.", status: "Đã triển khai", image: "/proj-iot.jpg" },
    { name: "Nông nghiệp thông minh", category: "UAV & AI", desc: "Drone tự hành bay giám sát và phun thuốc sâu bằng công nghệ Computer Vision.", status: "Đang phát triển", image: "/proj-drone.jpg" },
    { name: "AutoBot V1", category: "Robotics", desc: "Robot tự hành tránh vật cản và lập bản đồ không gian 3D dùng ROS.", status: "Hoàn thành", image: "/proj-robot.jpg" },
    { name: "Smart Home Kit", category: "Embedded", desc: "Bộ kit thực hành nhà thông minh giá rẻ dành cho sinh viên mới học IoT.", status: "Sản phẩm giáo dục", image: "/proj-iot.jpg" },
    { name: "AI Face Attendance", category: "AI", desc: "Hệ thống điểm danh bằng nhận diện khuôn mặt có tích hợp chống giả mạo.", status: "Hoàn thành", image: "/proj-robot.jpg" },
    { name: "Weather Station", category: "IoT", desc: "Trạm thời tiết mini cảnh báo ngập lụt, đo chất lượng không khí.", status: "Đang phát triển", image: "/proj-iot.jpg" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white">
        <section className="bg-[#0B2F55] py-20 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Dự án của chúng mình</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto relative z-10">
            Biến ý tưởng thành sản phẩm thực tế. Khám phá những gì sinh viên AIOT Club đã và đang xây dựng.
          </p>
        </section>

        <section className="py-16 container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div key={idx} className="group rounded-2xl border border-light-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="h-48 relative w-full flex items-center justify-center overflow-hidden">
                  <Image 
                    src={proj.image} 
                    alt={proj.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-[#05A6C8] uppercase tracking-wider">{proj.category}</span>
                  <h3 className="text-xl font-bold text-[#0B2F55] mt-2 mb-3">{proj.name}</h3>
                  <p className="text-gray-600 mb-4">{proj.desc}</p>
                  <div className="inline-block px-3 py-1 bg-[#F5F9FC] text-[#1767A6] text-xs font-semibold rounded-full">
                    {proj.status}
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
