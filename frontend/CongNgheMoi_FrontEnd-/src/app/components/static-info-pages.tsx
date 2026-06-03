type StaticInfoPageProps = {
    title: string;
    description: string;
    sections: Array<{ heading: string; content: string }>;
};

function StaticInfoPage({ title, description, sections }: StaticInfoPageProps) {
    return (
        <section className="bg-[#f4f8f6] min-h-[calc(100vh-300px)]">
            <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
                <div className="rounded-2xl border border-[#d5e8e1] bg-white p-6 md:p-10 shadow-[0_8px_24px_rgba(12,52,44,0.06)]">
                    <h1 className="text-3xl md:text-4xl text-[#103a31] mb-3" style={{ fontWeight: 700 }}>{title}</h1>
                    <p className="text-[#456860] leading-relaxed mb-8">{description}</p>

                    <div className="space-y-6">
                        {sections.map((section) => (
                            <article key={section.heading}>
                                <h2 className="text-xl text-[#11463b] mb-2" style={{ fontWeight: 600 }}>{section.heading}</h2>
                                <p className="text-[#355a51] leading-relaxed">{section.content}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function TermsPage() {
    return (
        <StaticInfoPage
            title="Điều khoản sử dụng"
            description="Khi truy cập và sử dụng MyCourse.io, bạn đồng ý tuân thủ các quy định dưới đây để đảm bảo môi trường học tập an toàn và minh bạch cho tất cả người dùng."
            sections={[
                {
                    heading: "Phạm vi sử dụng",
                    content: "Tài khoản chỉ được sử dụng cho mục đích học tập hợp pháp. Người dùng không được chia sẻ trái phép nội dung khoá học hoặc thực hiện hành vi gây ảnh hưởng đến hệ thống.",
                },
                {
                    heading: "Quyền và trách nhiệm",
                    content: "Người dùng chịu trách nhiệm bảo mật tài khoản cá nhân. MyCourse.io có quyền tạm ngưng tài khoản nếu phát hiện hành vi gian lận, phát tán nội dung vi phạm hoặc lạm dụng nền tảng.",
                },
            ]}
        />
    );
}

export function PrivacyPage() {
    return (
        <StaticInfoPage
            title="Chính sách bảo mật"
            description="MyCourse.io cam kết bảo vệ thông tin cá nhân và chỉ thu thập dữ liệu cần thiết để cải thiện trải nghiệm học tập."
            sections={[
                {
                    heading: "Dữ liệu được thu thập",
                    content: "Chúng tôi có thể thu thập email, thông tin hồ sơ, lịch sử học tập và tương tác hệ thống nhằm hỗ trợ quản lý tài khoản và tối ưu đề xuất khoá học.",
                },
                {
                    heading: "Mục đích sử dụng",
                    content: "Dữ liệu được dùng cho xác thực, hỗ trợ người học, cá nhân hoá nội dung và thông báo quan trọng. Chúng tôi không bán thông tin cá nhân cho bên thứ ba.",
                },
            ]}
        />
    );
}

export function CookiesPage() {
    return (
        <StaticInfoPage
            title="Chính sách Cookies"
            description="Cookies giúp MyCourse.io ghi nhớ đăng nhập và tối ưu hiệu suất hiển thị. Bạn có thể quản lý cookie trong trình duyệt của mình."
            sections={[
                {
                    heading: "Cookie cần thiết",
                    content: "Các cookie này phục vụ đăng nhập, bảo mật phiên và những tính năng cốt lõi của website.",
                },
                {
                    heading: "Cookie phân tích",
                    content: "Chúng tôi sử dụng dữ liệu tổng hợp để hiểu hành vi sử dụng và cải thiện chất lượng nội dung, nhưng không dùng để theo dõi thông tin nhạy cảm cá nhân.",
                },
            ]}
        />
    );
}

export function AboutPage() {
    return (
        <StaticInfoPage
            title="Giới thiệu MyCourse.io"
            description="MyCourse.io được xây dựng với mục tiêu giúp học viên Việt Nam tiếp cận kiến thức thực chiến, học tập linh hoạt và phát triển sự nghiệp bền vững."
            sections={[
                {
                    heading: "Sứ mệnh",
                    content: "Mang đến hệ sinh thái học tập trực tuyến chất lượng cao, giúp mọi người nâng cấp kỹ năng nghề nghiệp bằng các khoá học dễ tiếp cận và cập nhật liên tục.",
                },
                {
                    heading: "Giá trị cốt lõi",
                    content: "Thực tiễn, minh bạch và đồng hành lâu dài với học viên trong hành trình từ người mới đến chuyên gia.",
                },
            ]}
        />
    );
}

export function ContactPage() {
    return (
        <StaticInfoPage
            title="Liên hệ"
            description="Đội ngũ MyCourse.io luôn sẵn sàng hỗ trợ bạn trong quá trình học tập và sử dụng nền tảng."
            sections={[
                {
                    heading: "Hỗ trợ người học",
                    content: "Email: support@mycourse.io - Thời gian phản hồi dự kiến trong vòng 24 giờ làm việc.",
                },
                {
                    heading: "Hợp tác nội dung",
                    content: "Nếu bạn muốn trở thành giảng viên hoặc hợp tác phát triển khoá học, vui lòng liên hệ partnership@mycourse.io.",
                },
            ]}
        />
    );
}

export function CommunityPage() {
    return (
        <StaticInfoPage
            title="Cộng đồng học viên"
            description="Kết nối cùng cộng đồng học viên để chia sẻ kinh nghiệm, thảo luận kiến thức và cùng nhau phát triển."
            sections={[
                {
                    heading: "Không gian trao đổi",
                    content: "Bạn có thể đặt câu hỏi, chia sẻ tài nguyên học tập và cập nhật các hoạt động mới từ cộng đồng MyCourse.io.",
                },
                {
                    heading: "Nguyên tắc cộng đồng",
                    content: "Tôn trọng, xây dựng và tích cực hỗ trợ lẫn nhau là nền tảng cho mọi hoạt động trong cộng đồng học viên.",
                },
            ]}
        />
    );
}