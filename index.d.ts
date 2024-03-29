import { JwtPayload } from 'jsonwebtoken';

// Define an interface that includes email and password along with JwtPayload
// Extend the Request interface to include currentUser property with AuthenticatedJwtPayload type
declare global {
    namespace Express {
        interface Request {
            currentUser: JwtPayload;
        }
    }
}
