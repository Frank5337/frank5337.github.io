---
prev:
  text: '怎么Sql调优的'
  link: '/interview/mysql/05_sql_tuning'
next:
  text: '什么是回表'
  link: '/interview/mysql/07_back_to_table'
---

# Explain分析看哪些指标

## 题目

> `EXPLAIN` 分析时重点看哪些指标？

## 参考答案

重点看：

- `type`
- `key`
- `rows`
- `filtered`
- `Extra`

经验上：

- `type` 尽量别是 `ALL`
- `Extra` 里尽量避免 `Using filesort`、`Using temporary`
## 回答展开

- SQL 和索引题的关键是解释为什么快、为什么慢，而不是只背优化口诀。
- 回答时最好结合执行计划、扫描行数、回表次数和写入成本。
- 真正有经验的回答通常会强调以执行计划和真实数据分布为准。

## 实际场景

比如后台订单列表查询慢，通常要先看执行计划，再判断是不是没走索引、回表太多或深分页导致扫描成本过高。





