import { Navigate, Outlet } from "react-router-dom";

// Note: This is only a partial Protected Route because we are not using a proper backend authentication system yet.
// We are using localStorage to test the flow of protected routes.
function ProtectedRoute() {
    const mobileNumber = localStorage.getItem("userMobileNumber");
    const verificationStatus =
        localStorage.getItem("verificationStatus")?.toLowerCase() || "";

    // Not logged in
    if (!mobileNumber) {
        return <Navigate to="/login" replace />;
    }

    const allowedStatuses = [
        "fully-verified",
        "semi-verified*",
        "semi-verified",
    ];

    // Not verified or not allowed to access protected routes because of verification status 
    // Inshort: only allowedStatuses can access protected routes, otherwise redirect to profile page
    if (!allowedStatuses.includes(verificationStatus)) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;