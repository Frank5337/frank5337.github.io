---
prev:
  text: '联合索引应该怎么设计'
  link: '/interview/mysql/18_composite_index'
next:
  text: 'Mysql 题目列表'
  link: '/interview/mysql'
---

# MySQL中drop、delete、truncate 的区别

## 题目

> `drop`、`delete`、`truncate` 的区别是什么？

## 参考答案

- `delete`：逐行删除，可带条件，属于 DML
- `truncate`：清空整表，通常更快，属于 DDL
- `drop`：直接删除表结构和数据，属于 DDL

面试里最容易混的是 `truncate` 和 `drop`，一个是清空表，一个是删掉表本身。
## 回答展开

- SQL 和索引题的关键是解释为什么快、为什么慢，而不是只背优化口诀。
- 回答时最好结合执行计划、扫描行数、回表次数和写入成本。
- 真正有经验的回答通常会强调以执行计划和真实数据分布为准。

## 实际场景

比如定期清理临时数据时，如果只是清空表内容保留结构，通常会选择 truncate；如果按条件删除历史数据，则更适合 delete。





