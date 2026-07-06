import { Navigate, Outlet, useLocation } from "react-router-dom";

// Note: This is only a partial Protected Route because we are not using a proper backend authentication system yet.
// We are using localStorage to test the flow of protected routes.
function ProtectedRoute() {
    const location = useLocation();
    const mobileNumber = localStorage.getItem("userMobileNumber");
    let verificationStatus =
        localStorage.getItem("verificationStatus")?.toLowerCase() || "";

    // Set default verification status if not set
    if (!verificationStatus && mobileNumber) {
        verificationStatus = "fully-verified";
        localStorage.setItem("verificationStatus", "fully-verified");
    }

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
    if (!allowedStatuses.includes(verificationStatus) && location.pathname !== "/profile") {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;