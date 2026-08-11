import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RecruitmentPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white">
        <section className="bg-[#0B2F55] py-20 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Đăng ký tham gia AIOT Club</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto relative z-10">
            Không cần kinh nghiệm lập trình. Chỉ cần bạn có tinh thần học hỏi, dám nghĩ dám làm và đam mê công nghệ.
          </p>
        </section>

        <section className="py-16 container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-light-border -mt-24 relative z-20">
            <h2 className="text-2xl font-bold text-[#0B2F55] mb-8 text-center">Đơn Đăng Ký</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mã số sinh viên</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition" placeholder="VD: 20241010" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Ngành học</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition" placeholder="CNTT, KTPM, AI..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
                  <input type="tel" className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition" placeholder="09xxxxxxx" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Ban muốn tham gia (Chọn 1 hoặc nhiều)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {['AI', 'IoT', 'Embedded', 'Robotics', 'UAV', 'Media', 'Sự kiện'].map((ban) => (
                    <label key={ban} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#1767A6] rounded focus:ring-[#1767A6]" />
                      <span className="text-sm text-gray-600">{ban}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Lý do bạn muốn tham gia CLB?</label>
                <textarea className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition min-h-[120px]" placeholder="Hãy chia sẻ mong muốn của bạn..."></textarea>
              </div>

              <button type="button" className="w-full h-14 bg-gradient-to-r from-[#05A6C8] to-[#1767A6] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
                Gửi Đơn Đăng Ký
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
