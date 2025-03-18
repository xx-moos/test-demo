export const enum Status {
  Inactive = 0,
  Active = 1,
  Deleted = 2,
}

export const statusMap = {
  [Status.Active]: '启用',
  [Status.Inactive]: '禁用',
  [Status.Deleted]: '删除',
};

export const statusColorMap = {
  [Status.Active]: 'green',
  [Status.Inactive]: 'red',
  [Status.Deleted]: 'gray',
};
