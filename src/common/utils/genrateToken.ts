import jwt from 'jsonwebtoken';

interface JwtUser {
  id: number;
  email: string;
}

const generateToken = (user: JwtUser): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );
};

export default generateToken;
