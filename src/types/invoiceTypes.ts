export type Invoice = {
  id: number;
  vendorName: string;
  amount: number;
  dueDate: Date;
  description: string;
  paid: boolean;
  userId: number;
  createdAt: Date;
};

export type Invoices = Invoice[];
