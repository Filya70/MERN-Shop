import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ivan Ivanov',
    email: 'Ivan@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Andrew Filippov',
    email: 'andrew@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
