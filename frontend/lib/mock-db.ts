export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager';
  password?: string;
  createdAt: string;
}

// Mock Database State
let users: User[] = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    password: 'password123',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    password: 'password123',
    createdAt: new Date('2024-01-05').toISOString(),
  },
  {
    _id: '3',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Manager',
    password: 'password123',
    createdAt: new Date('2024-02-10').toISOString(),
  },
];

export const mockDb = {
  users: {
    find: async () => [...users],
    findById: async (id: string) => users.find((u) => u._id === id) || null,
    findOne: async (query: { email: string }) => users.find((u) => u.email === query.email) || null,
    create: async (data: Partial<User>) => {
      const newUser: User = {
        _id: Math.random().toString(36).substr(2, 9),
        name: data.name || '',
        email: data.email || '',
        role: data.role || 'Manager',
        password: data.password || 'password123',
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      return newUser;
    },
    findByIdAndUpdate: async (id: string, data: Partial<User>) => {
      const index = users.findIndex((u) => u._id === id);
      if (index === -1) return null;
      users[index] = { ...users[index], ...data };
      return users[index];
    },
    findByIdAndDelete: async (id: string) => {
      const index = users.findIndex((u) => u._id === id);
      if (index === -1) return null;
      const deletedUser = users[index];
      users = users.filter((u) => u._id !== id);
      return deletedUser;
    },
  },
};
