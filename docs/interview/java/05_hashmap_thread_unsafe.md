---
prev:
  text: '介绍下HashMap'
  link: '/interview/java/04_hashmap'
next:
  text: 'ConcurrentHashMap 1.7 和 1.8 的区别'
  link: '/interview/java/06_concurrenthashmap_diff'
---

# HashMap为什么线程不安全

## 题目

> `HashMap` 为什么线程不安全？

## 参考答案

主要原因有三类：

- 多线程 put 时可能发生数据覆盖
- 扩容迁移时可能产生数据错乱
- 读写并发时可能读到中间状态

所以在并发环境里，`HashMap` 不能替代并发容器。通常会改成：

- `ConcurrentHashMap`
- 外层加锁
- 不共享可变 Map
## 回答展开

- 集合题最好从数据结构、访问流程和并发行为三个角度回答。
- 如果是并发容器，要把线程安全的实现方式说清楚，而不是只说能并发用。
- 最后落到真实选择：单线程普通容器，并发场景选并发容器或避免共享。

## 实际场景

比如把用户会话、任务状态直接放进共享 HashMap，在高并发下就可能出现数据覆盖和读取异常，线上排查会非常痛苦。





