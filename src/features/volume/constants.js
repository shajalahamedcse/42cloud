const VOLUME_TABLE_HEADER = {
  "name": "名称",
  "description": "描述",
  "size": "大小(GB)",
  "volume_type": "磁盘类型",
  "status": "状态",
  "attachments": "连接到 serverID 的设备",
  "bootable": "可启动",
  "disk_format": "磁盘格式"
};

const VOLUME_STATUS = {
  "creating": "创建中",
  "available": "可用",   // green
  "attaching": "绑定中",
  "detaching": "解绑中",
  "in-use": "在用",  // blue
  "deleting": "删除中",
  "error": "错误",    // red
  "error_deleting": "删除错误",  // red
  "error_extending": "扩容错误", // red
  "extending": "扩容中",
  // all others yellow.
};

const VOLUME_TYPE = {
  "Capacity": "容量型",
  "Performance": "性能型",
};

export { VOLUME_STATUS, VOLUME_TABLE_HEADER, VOLUME_TYPE };

