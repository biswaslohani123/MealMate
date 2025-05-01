import jwt from 'jsonwebtoken'

const authAdmin = async(req, res, next) => {
    try {
        // Getting the authorization header
        const authHeader = req.headers.authorization
        
        if (!authHeader) {
            return res.json({ success: false, message: "Not Authorized" })
        }
        
        // Checking if it's a Bearer token
        if (!authHeader.startsWith('Bearer ')) {
            return res.json({ success: false, message: "Not Authorized" })
        }
        
        // Extract the token
        const token = authHeader.split(' ')[1]
        
        // Verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Check if it's the admin
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized Invalid credentials" })
        }

        // Add the decoded user to the request object
        req.admin = decoded
        
        next()
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: "Session Expired. Login Again." })
        }
        res.json({ success: false, message: "Authentication Failed" })
    }
}

export default authAdmin