---
prev:
  text: 'redo log、undo log、binlog 有什么区别'
  link: '/interview/mysql/13_logs'
next:
  text: '为什么建议使用自增主键'
  link: '/interview/mysql/15_auto_increment_pk'
---

# MySQL主从同步原理

## 题目

> MySQL 主从同步原理是什么？

## 参考答案

主库写 binlog，从库 IO 线程拉取 binlog 写到 relay log，再由 SQL 线程回放执行。

要点：

- 默认是异步复制
- 可能有主从延迟
- 读写分离时要考虑延迟带来的数据不一致
## 回答展开

- 数据库并发题最好把一致性和性能之间的权衡讲出来。
- 如果涉及事务和锁，建议区分普通读、当前读、锁类型和日志作用。
- 回答时尽量把概念串成链路，而不是孤立背名词。

## 实际场景

比如订单刚支付成功就去从库查状态，如果主从延迟还没追上，就可能查到旧数据，所以核心链路一般要谨慎使用读写分离。





