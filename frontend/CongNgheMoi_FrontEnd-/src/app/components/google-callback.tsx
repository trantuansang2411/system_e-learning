import { useEffect } from "react";

/**
 * Trang callback cho Google OAuth2 popup.
 * Khi Google redirect về URL này với id_token trong hash fragment,
 * trang này extract token và gửi về parent window qua postMessage.
 */
export function GoogleAuthCallback() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const idToken = params.get("id_token");

    if (idToken && window.opener) {
      window.opener.postMessage(
        { type: "GOOGLE_AUTH_CALLBACK", credential: idToken },
        window.location.origin
      );
      window.close();
    }
  }, []);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "sans-serif",
      color: "#666",
    }}>
      <p>Đang xác thực với Google...</p>
    </div>
  );
}
