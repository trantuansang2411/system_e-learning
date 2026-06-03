import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { LandingPage } from "./components/landing-page";
import { SearchPage } from "./components/search-page";
import { CourseDetail } from "./components/course-detail";
import { CartPage } from "./components/cart-page";
import { CheckoutPage } from "./components/checkout-page";
import { ProfilePage } from "./components/profile-page";
import { BecomeInstructorPage } from "./components/become-instructor";
import { MyCoursesPage } from "./components/my-courses-page";
import { PaymentSuccessPage } from "./components/payment-success-page";
import { PaymentCancelPage } from "./components/payment-cancel-page";
import { StudentDashboard } from "./components/student/student-dashboard";
import { InstructorDashboard } from "./components/instructor/instructor-dashboard";
import { AdminDashboard } from "./components/admin/admin-dashboard";
import { AdminInstructorDetailPage } from "./components/admin/admin-instructor-detail-page";
import { AboutPage, CommunityPage, ContactPage, CookiesPage, PrivacyPage, TermsPage } from "./components/static-info-pages";
import { RequireAuth, RequireRole } from "./components/route-guards";
import { GoogleAuthCallback } from "./components/google-callback";

function ProtectedStudentDashboard() {
  return createElement(
    RequireRole,
    { allowedRoles: ["STUDENT"] },
    createElement(StudentDashboard),
  );
}

function ProtectedInstructorDashboard() {
  return createElement(
    RequireRole,
    { allowedRoles: ["INSTRUCTOR"] },
    createElement(InstructorDashboard),
  );
}

function ProtectedAdminDashboard() {
  return createElement(
    RequireRole,
    { allowedRoles: ["ADMIN"] },
    createElement(AdminDashboard),
  );
}

function ProtectedAdminInstructorDetailPage() {
  return createElement(
    RequireRole,
    { allowedRoles: ["ADMIN"] },
    createElement(AdminInstructorDetailPage),
  );
}

function ProtectedCartPage() {
  return createElement(RequireAuth, null, createElement(CartPage));
}

function ProtectedCheckoutPage() {
  return createElement(RequireAuth, null, createElement(CheckoutPage));
}

function ProtectedProfilePage() {
  return createElement(RequireAuth, null, createElement(ProfilePage));
}

function ProtectedMyCoursesPage() {
  return createElement(
    RequireRole,
    { allowedRoles: ["STUDENT"] },
    createElement(MyCoursesPage),
  );
}

function ProtectedBecomeInstructorPage() {
  return createElement(
    RequireRole,
    {
      allowedRoles: ["STUDENT"],
      forbiddenRoles: ["INSTRUCTOR"],
      fallbackPath: "/instructor"
    },
    createElement(BecomeInstructorPage),
  );
}

function ProtectedPaymentSuccessPage() {
  return createElement(RequireAuth, null, createElement(PaymentSuccessPage));
}

function ProtectedPaymentCancelPage() {
  return createElement(RequireAuth, null, createElement(PaymentCancelPage));
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: "search", Component: SearchPage },
      { path: "terms", Component: TermsPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "cookies", Component: CookiesPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "community", Component: CommunityPage },
      { path: "course/:id", Component: CourseDetail },
      { path: "cart", Component: ProtectedCartPage },
      { path: "checkout", Component: ProtectedCheckoutPage },
      { path: "profile", Component: ProtectedProfilePage },
      { path: "my-courses", Component: ProtectedMyCoursesPage },
      { path: "payment/success", Component: ProtectedPaymentSuccessPage },
      { path: "payment/cancel", Component: ProtectedPaymentCancelPage },
      { path: "student/*", Component: ProtectedStudentDashboard },
      { path: "become-instructor", Component: ProtectedBecomeInstructorPage },
      { path: "instructor/*", Component: ProtectedInstructorDashboard },
    ],
  },
  {
    path: "/admin/instructors/:userId",
    Component: ProtectedAdminInstructorDetailPage,
  },
  {
    path: "/admin",
    Component: ProtectedAdminDashboard,
  },
  {
    path: "/auth/google/callback",
    Component: GoogleAuthCallback,
  },
]);