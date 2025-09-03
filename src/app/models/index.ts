export interface User {
  id?: number;
  name: string;
  email: string;
  role: 'admin' | 'lawyer' | 'assistant';
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  documentNumber?: string;
  documentType?: 'cedula' | 'passport' | 'ruc';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CaseModel {
  id?: number;
  title: string;
  description: string;
  clientId: number;
  client?: Client;
  assignedLawyerId?: number;
  assignedLawyer?: User;
  status: 'activo' | 'cerrado' | 'pendiente' | 'en_revision';
  priority: 'baja' | 'media' | 'alta' | 'urgente';
  category: string;
  startDate: Date;
  endDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  documents?: Document[];
  notes?: Note[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Document {
  id?: number;
  name: string;
  type: string;
  size: number;
  url: string;
  caseId?: number;
  uploadedBy?: number;
  uploadedAt?: Date;
}

export interface Note {
  id?: number;
  content: string;
  caseId?: number;
  authorId?: number;
  author?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
