export type PageView =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'clients'
  | 'careers'
  | 'blog'
  | 'contact';

export interface ProjectItem {
  id: string;
  name: string;
  service: string;
  client: string;
  value: string;
  consultant: string;
  location: string;
  category: 'Commercial' | 'Infrastructure' | 'Education' | 'Hospitality' | 'Government' | 'Industrial' | string;
  status: 'completed' | 'in_progress';
  image: string;
  isFeatured?: boolean;
  featured?: boolean;
  coordinates?: { x: number; y: number; label: string } | [number, number] | any;
  year?: string;
  description?: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  iconName: string;
  stages: {
    title: string;
    description: string;
    points: string[];
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  readTime: number;
  publishedAt: string;
  moderationFeedback?: string;
}

export interface ChatTag {
  id: string;
  name?: string;
  label?: string;
  slug?: string;
  color?: string;
  colour?: string;
  description?: string;
  isSystem: boolean;
  usageCount: number;
}

export interface ChatMessage {
  id: string;
  sessionId?: string;
  sender: 'customer' | 'staff' | 'system' | 'agent';
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: string;
  read?: boolean;
  attachments?: string[];
}

export interface ChatSession {
  id: string;
  contactIdentifier?: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  customerCountry: string;
  status: 'open' | 'pending' | 'resolved' | 'active' | 'waiting_agent' | 'closed';
  priority: 'low' | 'normal' | 'urgent';
  tags: string[]; // Multi-tag array
  adminNotes?: string;
  staffNotes?: string;
  assignedAgent?: string;
  lastActive?: string;
  lastMessageText?: string;
  lastMessageTime?: string;
  unreadAdminCount?: number;
  unreadStaffCount?: number;
  unreadCustomerCount: number;
  createdAt?: string;
  updatedAt?: string;
  messages: ChatMessage[];
}

export interface RFQLineItem {
  id: string;
  service: string;
  description: string;
  unit: string;
  quantity: number;
  unitRateAED: number;
  amountAED: number;
}

export interface Quotation {
  id: string;
  rfqNumber: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  projectTitle: string;
  projectLocation: string;
  sector: string;
  status: 'Pending' | 'Quoted' | 'Negotiating' | 'Confirmed' | 'Shipped' | 'Declined';
  dateIssued: string;
  validUntil: string;
  items: RFQLineItem[];
  subtotalAED: number;
  discountPercent: number;
  vatPercent: number;
  totalAED: number;
  notes: string;
}

export interface ClientPartner {
  id: string;
  name: string;
  sector: 'Government & Authorities' | 'Hospitality' | 'Education' | 'Industrial & Energy' | 'Real Estate & Development' | string;
  logoPlaceholder: string;
  projectsCount: number;
  country: string;
}

export interface SystemTelemetry {
  cpuLoadPercent: number;
  cpuCores: number;
  memoryUsedGB: number;
  memoryTotalGB: number;
  databaseUsedMB: number;
  databaseMaxMB: number;
  activeThreads: number;
  uptimeSeconds: number;
  cpuUsagePercent?: number;
  ramUsageMB?: number;
  ramTotalMB?: number;
  storageUsageGB?: number;
  storageTotalGB?: number;
  mysqlDbSizeMB?: number;
  mysqlMaxDbSizeMB?: number;
  mysqlConnections?: number;
  activeNodeAppSlots?: number;
  inodesUsed?: number;
  inodesMax?: number;
}
