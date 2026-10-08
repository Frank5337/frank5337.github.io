---
prev:
  text: '为什么建议使用自增主键'
  link: '/interview/mysql/15_auto_increment_pk'
next:
  text: '深分页为什么慢, 怎么优化'
  link: '/interview/mysql/17_deep_pagination'
---

# count(*)、count(1)、count(字段) 的区别

## 题目

> `count(*)`、`count(1)`、`count(字段)` 有什么区别？

## 参考答案

- `count(*)`：统计总行数
- `count(1)`：和 `count(*)` 很接近
- `count(字段)`：忽略字段为 null 的行

在 InnoDB 中，性能差异通常不是重点，关键还是看执行计划和是否走索引。
## 回答展开

- SQL 和索引题的关键是解释为什么快、为什么慢，而不是只背优化口诀。
- 回答时最好结合执行计划、扫描行数、回表次数和写入成本。
- 真正有经验的回答通常会强调以执行计划和真实数据分布为准。

## 实际场景

比如后台订单列表查询慢，通常要先看执行计划，再判断是不是没走索引、回表太多或深分页导致扫描成本过高。





