---
prev:
  text: 'Mysql 题目列表'
  link: '/interview/mysql'
next:
  text: 'innodb索引数据结构'
  link: '/interview/mysql/02_innodb_index'
---

# 什么是MVCC

## 题目

> 什么是 MVCC？

## 参考答案

MVCC 是多版本并发控制。MySQL InnoDB 通过 `undo log + ReadView` 让读操作不加锁也能读到一致性数据。

它的价值主要是：

- 减少读写冲突
- 提高并发性能
- 支持一致性读
## 回答展开

- 数据库并发题最好把一致性和性能之间的权衡讲出来。
- 如果涉及事务和锁，建议区分普通读、当前读、锁类型和日志作用。
- 回答时尽量把概念串成链路，而不是孤立背名词。

## 实际场景

比如订单查询、商品详情查询这类读多写少场景，如果每次读都加锁吞吐会很差，所以数据库会依赖 MVCC 和事务隔离来平衡一致性与性能。





