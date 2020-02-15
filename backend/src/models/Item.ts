export enum Filter {
  Task = 'task'
}

export interface Item {
  itemId: string;
  userId: string;
  text: string;
  dueDate?: string;
  downloadUrl?: string;
  createdAt: string;
  updatedAt: string;
}
