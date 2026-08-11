"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function RecruitmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    phone: "",
    departments: [] as string[],
    reason: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });

  const handleCheckboxChange = (ban: string) => {
    setFormData((prev) => {
      const isSelected = prev.departments.includes(ban);
      if (isSelected) {
        return { ...prev, departments: prev.departments.filter(d => d !== ban) };
      } else {
        return { ...prev, departments: [...prev.departments, ban] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: "", message: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const result = await res.json();
      
      if (result.success) {
        setStatusMessage({ type: "success", message: "Gửi đơn đăng ký thành công! Ban chủ nhiệm sẽ sớm liên hệ với bạn." });
        setFormData({ name: "", studentId: "", major: "", phone: "", departments: [], reason: "" });
      } else {
        setStatusMessage({ type: "error", message: result.message || "Có lỗi xảy ra, vui lòng thử lại." });
      }
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: "error", message: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau." });
    } finally {
      setIsLoading(false);
    }
  };

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
            
            {statusMessage.message && (
              <div className={`mb-6 p-4 rounded-xl text-center font-medium ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {statusMessage.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Họ và tên *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition" 
                    placeholder="Nguyễn Văn A" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mã số sinh viên *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition" 
                    placeholder="VD: 20241010" 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Ngành học *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.major}
                    onChange={(e) => setFormData({...formData, major: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition" 
                    placeholder="CNTT, KTPM, AI..." 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Số điện thoại *</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition" 
                    placeholder="09xxxxxxx" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Ban muốn tham gia (Chọn 1 hoặc nhiều)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {['AI', 'IoT', 'Embedded', 'Robotics', 'UAV', 'Media', 'Sự kiện'].map((ban) => (
                    <label key={ban} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.departments.includes(ban)}
                        onChange={() => handleCheckboxChange(ban)}
                        className="w-4 h-4 text-[#1767A6] rounded focus:ring-[#1767A6]" 
                      />
                      <span className="text-sm text-gray-600">{ban}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Lý do bạn muốn tham gia CLB?</label>
                <textarea 
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#1767A6] focus:ring-1 focus:ring-[#1767A6] outline-none transition min-h-[120px]" 
                  placeholder="Hãy chia sẻ mong muốn của bạn..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 flex items-center justify-center bg-gradient-to-r from-[#05A6C8] to-[#1767A6] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang gửi...
                  </span>
                ) : "Gửi Đơn Đăng Ký"}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
