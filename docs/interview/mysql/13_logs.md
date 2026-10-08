---
prev:
  text: '什么是间隙锁, 间隙锁生成的时机'
  link: '/interview/mysql/12_gap_lock'
next:
  text: 'MySQL主从同步原理'
  link: '/interview/mysql/14_replication'
---

# redo log、undo log、binlog 有什么区别

## 题目

> `redo log`、`undo log`、`binlog` 有什么区别？

## 参考答案

- `redo log`：保证崩溃恢复
- `undo log`：支持回滚和 MVCC
- `binlog`：记录逻辑操作，主要用于主从复制和恢复

再简单点记：

- redo 管重做
- undo 管回滚
- binlog 管归档和复制
## 回答展开

- 数据库并发题最好把一致性和性能之间的权衡讲出来。
- 如果涉及事务和锁，建议区分普通读、当前读、锁类型和日志作用。
- 回答时尽量把概念串成链路，而不是孤立背名词。

## 实际场景

比如订单刚支付成功就去从库查状态，如果主从延迟还没追上，就可能查到旧数据，所以核心链路一般要谨慎使用读写分离。





