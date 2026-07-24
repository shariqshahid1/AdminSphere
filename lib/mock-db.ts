import { hashSync } from 'bcryptjs';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Editor';
  password: string;
  status: 'active' | 'away' | 'offline';
  department: string;
  joinedAt: string;
  lastActive: string;
}

export function sanitizeUser(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _removed, ...safe } = user;
  return safe;
}

// pre-hash passwords so they work immediately
const pw = (plain: string) => hashSync(plain, 12);

let users: User[] = [
  {
    _id: '1',
    name: 'Ahmed Raza',
    email: 'ahmed@admin.io',
    role: 'Admin',
    password: pw('password123'),
    status: 'active',
    department: 'Engineering',
    joinedAt: '2023-03-15T00:00:00.000Z',
    lastActive: '2 min ago',
  },
  {
    _id: '2',
    name: 'Sana Malik',
    email: 'sana@admin.io',
    role: 'Manager',
    password: pw('password123'),
    status: 'active',
    department: 'Product',
    joinedAt: '2023-06-22T00:00:00.000Z',
    lastActive: '15 min ago',
  },
  {
    _id: '3',
    name: 'Hassan Javed',
    email: 'hassan@admin.io',
    role: 'Editor',
    password: pw('password123'),
    status: 'away',
    department: 'Design',
    joinedAt: '2023-09-01T00:00:00.000Z',
    lastActive: '2 hours ago',
  },
  {
    _id: '4',
    name: 'Fatima Noor',
    email: 'fatima@admin.io',
    role: 'Manager',
    password: pw('password123'),
    status: 'active',
    department: 'Marketing',
    joinedAt: '2024-01-10T00:00:00.000Z',
    lastActive: 'Just now',
  },
  {
    _id: '5',
    name: 'Bilal Siddiqui',
    email: 'bilal@admin.io',
    role: 'Editor',
    password: pw('password123'),
    status: 'offline',
    department: 'Engineering',
    joinedAt: '2024-02-18T00:00:00.000Z',
    lastActive: '1 day ago',
  },
  {
    _id: '6',
    name: 'Ayesha Khan',
    email: 'ayesha@admin.io',
    role: 'Admin',
    password: pw('password123'),
    status: 'active',
    department: 'Engineering',
    joinedAt: '2023-04-05T00:00:00.000Z',
    lastActive: '5 min ago',
  },
];

export const mockDb = {
  users: {
    find: async () => [...users].map(sanitizeUser),
    findById: async (id: string) => {
      const user = users.find((u) => u._id === id) || null;
      return user ? sanitizeUser(user) : null;
    },
    findOne: async (query: { email: string }) => users.find((u) => u.email === query.email) || null,
    create: async (data: Partial<User>) => {
      const newUser: User = {
        _id: Math.random().toString(36).substr(2, 9),
        name: data.name || '',
        email: data.email || '',
        role: data.role || 'Editor',
        password: data.password || pw('password123'),
        status: 'active',
        department: data.department || 'General',
        joinedAt: new Date().toISOString(),
        lastActive: 'Just now',
      };
      users.push(newUser);
      return sanitizeUser(newUser);
    },
    findByIdAndUpdate: async (id: string, data: Partial<User>) => {
      const index = users.findIndex((u) => u._id === id);
      if (index === -1) return null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _removed, ...safeData } = data as User & { password?: string };
      users[index] = { ...users[index], ...safeData };
      return sanitizeUser(users[index]);
    },
    findByIdAndDelete: async (id: string) => {
      const index = users.findIndex((u) => u._id === id);
      if (index === -1) return null;
      const deletedUser = users[index];
      users = users.filter((u) => u._id !== id);
      return sanitizeUser(deletedUser);
    },
  },
};
