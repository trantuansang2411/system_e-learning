import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-[#0f3f36] text-[#e7f5ef] pt-12 pb-6">
      <div className="max-w-[1680px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-9">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#3dcbb1] rounded-full w-[42px] h-[42px] flex items-center justify-center">
                <span className="text-white text-2xl" style={{ fontWeight: 900 }}>m</span>
              </div>
              <span className="text-[30px] leading-none" style={{ fontWeight: 800 }}>MyCourse.io</span>
            </div>
            <p className="text-base text-[#c2e5da] max-w-xs leading-relaxed">
              Nền tảng học trực tuyến giúp bạn nâng cấp kỹ năng và chinh phục mục tiêu nghề nghiệp.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase mb-3 text-[#97d1c0]" style={{ fontWeight: 700 }}>Chính sách</p>
            <div className="space-y-2">
              <Link to="/terms" className="block text-base text-[#c2e5da] hover:text-white">Điều khoản sử dụng</Link>
              <Link to="/privacy" className="block text-base text-[#c2e5da] hover:text-white">Chính sách bảo mật</Link>
              <Link to="/cookies" className="block text-base text-[#c2e5da] hover:text-white">Cookies</Link>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase mb-3 text-[#97d1c0]" style={{ fontWeight: 700 }}>Về chúng tôi</p>
            <div className="space-y-2">
              <Link to="/about" className="block text-base text-[#c2e5da] hover:text-white">Giới thiệu</Link>
              <Link to="/contact" className="block text-base text-[#c2e5da] hover:text-white">Liên hệ</Link>
              <Link to="/community" className="block text-base text-[#c2e5da] hover:text-white">Cộng đồng học viên</Link>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase mb-3 text-[#97d1c0]" style={{ fontWeight: 700 }}>Mạng xã hội</p>
            <div className="space-y-2">
              <span className="block text-base text-[#c2e5da]">Twitter</span>
              <span className="block text-base text-[#c2e5da]">Instagram</span>
              <span className="block text-base text-[#c2e5da]">Facebook</span>
              <span className="block text-base text-[#c2e5da]">LinkedIn</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2d6a5e] pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-[#b5ded1]">Copyright © MyCourse.io 2026. Bảo lưu mọi quyền.</p>
          <p className="text-sm text-[#b5ded1]">Thiết kế với tình yêu dành cho giáo dục Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}
