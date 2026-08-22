export const mockDashboard = {
  totalAssets: 45,
  available: 30,
  inUse: 10,
  maintenance: 3,
  missing: 2,
  l4Controlled: 5,
  byCategory: [
    { name: 'IT & Display', count: 12 },
    { name: 'Embedded', count: 15 },
    { name: 'AI / Edge Computing', count: 5 },
    { name: 'Robotics', count: 3 },
    { name: 'UAV', count: 2 },
    { name: '3D Printing', count: 1 },
    { name: 'Sensor', count: 5 },
    { name: 'Power/Battery', count: 2 }
  ],
  alerts: [
    { type: 'maintenance', message: 'ISA-RPI-002 cần thay quạt tản nhiệt' },
    { type: 'missing', message: 'ISA-BAT-001 không tìm thấy trong kho' },
    { type: 'inventory', message: 'Dây Jumper đực-cái sắp hết (< 10)' }
  ],
  inUseAssets: [
    { code: 'ISA-RPI-001', name: 'Raspberry Pi 4 8GB', holder: 'Nguyễn Văn A', project: 'Smart Home', returnDate: '2026-09-01' },
    { code: 'ISA-JET-001', name: 'Jetson Nano', holder: 'Trần Thị B', project: 'AI Vision', returnDate: '2026-08-30' }
  ]
};

export const mockAssets = [
  {
    code: 'ISA-RPI-001',
    name: 'Raspberry Pi 4 8GB',
    category: 'Embedded',
    level: 'L3',
    location: 'Tủ A - Ngăn 1',
    status: 'In Use',
    condition: 'Good',
    project: 'Smart Home',
    holder: 'Nguyễn Văn A',
    model: 'RPi 4 Model B',
    serial: '123456789',
    notes: 'Kèm thẻ nhớ 32GB',
    image: 'https://images.unsplash.com/photo-1628236166708-3ff255b0a3ed?q=80&w=300&auto=format&fit=crop'
  },
  {
    code: 'ISA-RPI-002',
    name: 'Raspberry Pi 3',
    category: 'Embedded',
    level: 'L3',
    location: 'Tủ A - Ngăn 1',
    status: 'Maintenance',
    condition: 'Damaged',
    project: '',
    holder: '',
    model: 'RPi 3 Model B+',
    serial: '987654321',
    notes: 'Quạt kêu to',
    image: null
  },
  {
    code: 'ISA-MON-001',
    name: 'Màn hình Dell 24inch',
    category: 'IT & Display',
    level: 'L2',
    location: 'Bàn nghiên cứu 1',
    status: 'Available',
    condition: 'Good',
    project: '',
    holder: '',
    model: 'U2419H',
    serial: 'DELL-001',
    notes: '',
    image: null
  },
  {
    code: 'ISA-UAV-001',
    name: 'Drone DJI Tello',
    category: 'UAV',
    level: 'L4',
    location: 'Tủ B - Khóa',
    status: 'Available',
    condition: 'Good',
    project: '',
    holder: '',
    model: 'Tello',
    serial: 'DJI-T001',
    notes: 'Cần đăng ký bay',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=300&auto=format&fit=crop'
  }
];

export const mockInventory = [
  { code: 'INV-JMP-01', name: 'Dây Jumper M-F (Bó 40)', category: 'Consumable', unit: 'Bó', inStock: 5, minLevel: 10, location: 'Khay C1' },
  { code: 'INV-RES-01', name: 'Điện trở 10k Ohm', category: 'Consumable', unit: 'Cái', inStock: 200, minLevel: 50, location: 'Khay C2' },
  { code: 'INV-FIL-01', name: 'Nhựa in 3D PLA Trắng', category: 'Consumable', unit: 'Cuộn', inStock: 2, minLevel: 2, location: 'Kho máy in' },
];

export const mockProjects = [
  { id: 'PRJ-001', name: 'Smart Home IoT', field: 'IoT', leader: 'Nguyễn Văn A', status: 'Active', endDate: '2026-12-30' },
  { id: 'PRJ-002', name: 'AI Vision Drone', field: 'AI & UAV', leader: 'Trần Thị B', status: 'Active', endDate: '2026-11-15' },
];
