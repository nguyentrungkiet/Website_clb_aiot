"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function RecruitmentPage() {
  const t = useTranslations("RecruitmentPage");
  
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
        setStatusMessage({ type: "success", message: t("success_msg") });
        setFormData({ name: "", studentId: "", major: "", phone: "", departments: [], reason: "" });
      } else {
        setStatusMessage({ type: "error", message: result.message || t("error_msg") });
      }
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: "error", message: t("network_error") });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white dark:bg-card">
        <ScrollReveal direction="none">
          <section className="bg-navy dark:bg-card py-20 text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">{t("hero_title")}</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto relative z-10">
              {t("hero_desc")}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
        <section className="py-16 container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="bg-white dark:bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border -mt-24 relative z-20">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{t("form_title")}</h2>
            
            {statusMessage.message && (
              <div className={`mb-6 p-4 rounded-xl text-center font-medium ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {statusMessage.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("fields.name")}</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" 
                    placeholder={t("fields.name_ph")} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("fields.studentId")}</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" 
                    placeholder={t("fields.studentId_ph")} 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("fields.major")}</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.major}
                    onChange={(e) => setFormData({...formData, major: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" 
                    placeholder={t("fields.major_ph")} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("fields.phone")}</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" 
                    placeholder={t("fields.phone_ph")} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("fields.departments")}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {['AI', 'IoT', 'Embedded', 'Robotics', 'UAV', 'Media', 'Sự kiện'].map((ban) => (
                    <label key={ban} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.departments.includes(ban)}
                        onChange={() => handleCheckboxChange(ban)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary" 
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{ban}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("fields.reason")}</label>
                <textarea 
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full p-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition min-h-[120px]" 
                  placeholder={t("fields.reason_ph")}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 flex items-center justify-center bg-gradient-to-r from-secondary to-primary text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("submitting_btn")}
                  </span>
                ) : t("submit_btn")}
              </button>
            </form>
          </div>
        </section>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
