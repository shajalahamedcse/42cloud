export const INSTANCE_TABLE_COLUMN = [
  "name",
  "image",
  "flavor",
  "addresses",
  "status",
  "key_name",
  "created",
  "security_groups",
];

export const INSTANCE_FIELD = {
  "OS-EXT-STS:task_state": "过渡状态",
  "addresses": "IP地址",
  "image": "镜像",
  "OS-EXT-STS:vm_state": "状态",
  "OS-EXT-SRV-ATTR:instance_name": "宿主机实例名",
  "OS-SRV-USG:launched_at": "启动时间",
  "flavor": "规格",
  "id": "云主机ID",
  "security_groups": "安全组",
  "user_id": "用户",
  "OS-DCF:diskConfig": "DiskConfig",
  "OS-EXT-STS:power_state": "电源状态",
  "OS-EXT-AZ:availability_zone": "可用区",
  "metadata": "元数据",
  "status": "状态",
  "updated": "更新时间",
  "hostId": "宿主机",
  "OS-EXT-SRV-ATTR:host": "宿主机",
  "key_name": "密钥对",
  "OS-EXT-SRV-ATTR:hypervisor_hostname": "宿主机主机名",
  "name": "名字",
  "created": "创建时间",
  "tenant_id": "项目",
  "os-extended-volumes:volumes_attached": "挂载的磁盘",
  "config_drive": "ConfigDrive"
};

export const INSTANCE_STATUS = {
  "ACTIVE": "运行中",
  "BUILDING": "构建中",
  "DELETED": "已删除",
  "ERROR": "错误",
  "HARD_REBOOT": "硬重启中",
  "MIGRATING": "迁移中",
  "PASSWORD": "重置密码中",
  "PAUSED": "暂停",
  "REBOOT": "软重启中",
  "REBUILD": "重建中",
  "RESCUED": "救援模式",
  "RESIZED": "更改规格",
  "REVERT_RESIZE": "撤消更改规格",
  "SOFT_DELETED": "软删除",
  "STOPPED": "停止",
  "SUSPENDED": "挂起",
  "UNKNOWN": "未知",
  "VERIFY_RESIZE": "确认变更规格",
};

export const INSTANCE_POWER_STATE = {
  "1": {
    "en": "Running",
    "ch": "运行中"
  },
  "3": {
    "en": "Paused",
    "ch": "暂停"
  },
  "4": {
    "en": "Shutdown",
    "ch": "关闭"
  },
  "6": {
    "en": "Crashed",
    "ch": "崩溃"
  },
  "7": {
    "en": "Suspended",
    "ch": "挂起"
  }
};

