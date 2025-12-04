import { Issue, IssueSeverity, IssueStatus } from './types';

export const MOCK_ISSUES: Issue[] = [
  {
    id: 'ISS-1001',
    title: '固定资产折旧计算偏差',
    description: '财务报表中固定资产折旧额与系统计算值存在 0.5% 的偏差，需核对 Q3 数据。',
    department: '财务部',
    assignee: '张会计',
    status: IssueStatus.IN_PROGRESS,
    severity: IssueSeverity.HIGH,
    createdAt: '2023-10-24T09:00:00Z',
    updatedAt: '2023-10-25T14:30:00Z'
  },
  {
    id: 'ISS-1002',
    title: '专项资金支出凭证缺失',
    description: '项目编号 PJ-2023-088 的专项资金支出缺少必要的发票扫描件。',
    department: '项目办',
    assignee: '李专员',
    status: IssueStatus.NEW,
    severity: IssueSeverity.CRITICAL,
    createdAt: '2023-10-26T10:15:00Z',
    updatedAt: '2023-10-26T10:15:00Z'
  },
  {
    id: 'ISS-1003',
    title: '往来款项未及时清理',
    description: '应收账款中存在超过 3 年的挂账，未按规定进行坏账计提说明。',
    department: '资产处',
    assignee: '王经理',
    status: IssueStatus.PENDING_REVIEW,
    severity: IssueSeverity.MEDIUM,
    createdAt: '2023-10-20T11:00:00Z',
    updatedAt: '2023-10-27T09:45:00Z'
  },
  {
    id: 'ISS-1004',
    title: '预算执行率偏低说明不足',
    description: '信息化建设专项预算执行率仅为 45%，说明材料过于简单。',
    department: '信息中心',
    assignee: '赵主任',
    status: IssueStatus.RESOLVED,
    severity: IssueSeverity.LOW,
    createdAt: '2023-10-15T16:20:00Z',
    updatedAt: '2023-10-28T11:00:00Z'
  },
  {
    id: 'ISS-1005',
    title: '政府采购流程合规性审查',
    description: '部分办公设备采购未走协议供货流程，需补齐特殊情况说明。',
    department: '后勤部',
    assignee: '孙科长',
    status: IssueStatus.IN_PROGRESS,
    severity: IssueSeverity.HIGH,
    createdAt: '2023-10-27T08:30:00Z',
    updatedAt: '2023-10-27T15:00:00Z'
  }
];

export const DEPARTMENTS = [
  '财务部',
  '项目办',
  '资产处',
  '信息中心',
  '后勤部',
  '审计处'
];
