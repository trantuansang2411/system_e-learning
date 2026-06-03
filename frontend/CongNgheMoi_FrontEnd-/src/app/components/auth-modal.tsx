import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "../../contexts/AuthContext";

interface AuthModalProps {
  mode: "login" | "signup";
  initialEmail?: string;
  onClose: () => void;
  onSwitchMode: () => void;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function AuthModal({ mode, initialEmail, onClose, onSwitchMode, onSuccess, onError }: AuthModalProps) {
  const { login, register, verifyOtp, resendOtp, forgotPassword, loginWithGoogle } = useAuth();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"form" | "otp" | "forgot">("form");

  const isSignup = mode === "signup";
  const isPrefilledSignupEmail = isSignup && !!initialEmail?.trim();

  useEffect(() => {
    if (mode !== "signup") {
      return;
    }

    setStep("form");
    form.setFieldsValue({
      email: initialEmail || "",
      password: "",
      otp: "",
    });
  }, [form, initialEmail, mode]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== 'GOOGLE_AUTH_CALLBACK') return;

      const { credential } = event.data;
      if (!credential) {
        toast.error("Không nhận được Google ID token. Vui lòng thử lại.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        await loginWithGoogle(credential);
        messageApi.success("Đăng nhập Google thành công.");
        onSuccess?.();
      } catch (err: unknown) {
        const errorMessage = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message || "Không thể đăng nhập với Google.";
        onClose();
        onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [loginWithGoogle, messageApi, onSuccess]);

  const handleGoogleLogin = () => {
    if (!googleClientId) {
      toast.error("Thiếu cấu hình Google Client ID. Vui lòng kiểm tra VITE_GOOGLE_CLIENT_ID.");
      return;
    }

    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const scope = 'openid email profile';
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(googleClientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=id_token` +
      `&scope=${encodeURIComponent(scope)}` +
      `&prompt=select_account` +
      `&nonce=${encodeURIComponent(nonce)}`;

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      authUrl,
      'google-auth-popup',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
    );
  };

  const handleSubmit = async (values: { email: string; password?: string; otp?: string }) => {
    setIsLoading(true);

    try {
      if (step === "forgot") {
        await forgotPassword(values.email);
        messageApi.success("Đã gửi hướng dẫn đặt lại mật khẩu (nếu email tồn tại).");
        setIsLoading(false);
        onClose();
        return;
      }

      if (step === "otp") {
        await verifyOtp(values.email, values.otp || "");
        messageApi.success("Xác thực OTP thành công.");
        setIsLoading(false);
        onSuccess?.();
        return;
      }

      if (isSignup) {
        const result = await register(values.email, values.password || "");
        setStep("otp");
        messageApi.success(result.message || "OTP đã được gửi tới email của bạn.");
        form.setFieldsValue({ email: values.email, otp: "" });
        setIsLoading(false);
        return;
      }

      await login(values.email, values.password || "");
      messageApi.success("Đăng nhập thành công.");
      setIsLoading(false);
      onSuccess?.();
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message
        || "Email hoặc mật khẩu không đúng. Vui lòng thử lại.";

      onClose();
      onError?.(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    const email = form.getFieldValue("email");
    if (!email) {
      toast.error("Vui lòng nhập email trước khi gửi lại OTP.");
      return;
    }
    setIsLoading(true);
    try {
      await resendOtp(email);
      messageApi.success("Đã gửi lại OTP tới email.");
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message || "Không thể gửi lại OTP.";
      onError?.(errorMessage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {contextHolder}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="bg-[#3dcbb1] rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white text-sm" style={{ fontWeight: 900 }}>m</span>
          </div>
          <span style={{ fontWeight: 700 }}>MyCourse.io</span>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          {step === "otp"
            ? "Nhập mã OTP đã được gửi về email để kích hoạt tài khoản."
            : step === "forgot"
              ? "Nhập email để nhận hướng dẫn đặt lại mật khẩu."
              : mode === "signup"
                ? "Tham gia cùng chúng tôi để nhận nhiều ưu đãi. Chúng tôi cam kết bảo mật dữ liệu của bạn."
                : "Đăng nhập để tiếp tục học tập."}
        </p>

        {step === "form" && (
          <button className="w-full flex items-center justify-center gap-3 border rounded-lg py-2.5 mb-3 hover:bg-gray-50 transition disabled:opacity-60" onClick={handleGoogleLogin} disabled={isLoading}>
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>
            <span className="text-sm">{mode === "signup" ? "Đăng ký với Google" : "Đăng nhập với Google"}</span>
          </button>
        )}

        {step === "form" && <div className="text-center text-sm text-gray-400 my-4">hoặc</div>}

        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit}
          className="space-y-1"
        >
          <Form.Item
            label="Email"
            name="email"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Vui lòng nhập email." },
              { type: "email", message: "Email không hợp lệ." },
            ]}
          >
            <Input
              size="large"
              placeholder="Email"
              disabled={step === "otp" || isLoading || isPrefilledSignupEmail}
            />
          </Form.Item>

          {step === "form" && (
            <Form.Item
              label="Mật khẩu"
              name="password"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu." },
                ...(isSignup ? [{ min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." }] : []),
              ]}
            >
              <Input.Password size="large" placeholder="Mật khẩu" />
            </Form.Item>
          )}

          {step === "otp" && (
            <Form.Item
              label="Mã OTP"
              name="otp"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Vui lòng nhập mã OTP." },
                { len: 6, message: "Mã OTP gồm 6 ký tự." },
              ]}
            >
              <Input size="large" placeholder="Mã OTP" maxLength={6} />
            </Form.Item>
          )}

          <Form.Item className="!mb-0">
            <Button
              htmlType="submit"
              type="primary"
              loading={isLoading}
              className="!w-full !h-[42px] !rounded-lg"
              style={{ backgroundColor: "#3dcbb1", borderColor: "#3dcbb1", fontWeight: 600 }}
            >
              {step === "otp"
                ? "Xác thực OTP"
                : step === "forgot"
                  ? "Gửi yêu cầu"
                  : mode === "signup"
                    ? "Tạo tài khoản"
                    : "Đăng nhập"}
            </Button>
          </Form.Item>
        </Form>

        {step === "otp" && (
          <div className="text-center text-sm mt-4">
            <button onClick={handleResendOtp} className="text-[#3dcbb1] hover:underline" style={{ fontWeight: 600 }} disabled={isLoading}>
              Gửi lại OTP
            </button>
          </div>
        )}

        {step === "form" && mode === "login" && (
          <div className="text-center text-sm mt-4 text-gray-500">
            <button onClick={() => { setStep("forgot"); }} className="text-[#3dcbb1] hover:underline" style={{ fontWeight: 600 }}>
              Quên mật khẩu?
            </button>
          </div>
        )}

        <p className="text-center text-sm mt-4 text-gray-500">
          {step !== "form" ? (
            <button onClick={() => { setStep("form"); }} className="text-[#3dcbb1] hover:underline" style={{ fontWeight: 600 }}>
              Quay lại đăng nhập
            </button>
          ) : (
            <>
              {mode === "signup" ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
              <button onClick={onSwitchMode} className="text-[#3dcbb1] hover:underline" style={{ fontWeight: 600 }}>
                {mode === "signup" ? "Đăng nhập" : "Đăng ký"}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}