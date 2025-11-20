import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token (synchronous)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Attach userId to request for later use
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default isAuthenticated;
