export enum IssueStatus {
  NEW = '新建',
  IN_PROGRESS = '处理中',
  PENDING_REVIEW = '待复核',
  RESOLVED = '已解决',
  CLOSED = '已关闭'
}

export enum IssueSeverity {
  LOW = '一般',
  MEDIUM = '重要',
  HIGH = '严重',
  CRITICAL = '紧急'
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  department: string;
  assignee: string;
  status: IssueStatus;
  severity: IssueSeverity;
  createdAt: string;
  updatedAt: string;
}

export enum ImageSize {
  SIZE_1K = '1K',
  SIZE_2K = '2K',
  SIZE_4K = '4K'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}
