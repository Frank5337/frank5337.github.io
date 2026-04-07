---
prev:
  text: 'HashMap为什么线程不安全'
  link: '/interview/java/05_hashmap_thread_unsafe'
next:
  text: 'Compile-Time Checking of Exceptions 和 Unchecked Exception 的区别'
  link: '/interview/java/07_checked_unchecked'
---

# ConcurrentHashMap 1.7 和 1.8 的区别

## 题目

> `ConcurrentHashMap` 在 JDK1.7 和 JDK1.8 中有什么区别？

## 参考答案

JDK1.7 使用的是 `Segment` 分段锁，整体结构像“数组 + Segment + 小 HashMap”，锁粒度是 Segment。

JDK1.8 改成了 `Node[] + CAS + synchronized`：

- 空桶插入优先用 CAS
- 冲突时对桶头节点加 `synchronized`
- 锁粒度降到桶级别

所以 1.8 结构更简单，内存开销更低，整体吞吐也更好。
## 回答展开

- 集合题最好从数据结构、访问流程和并发行为三个角度回答。
- 如果是并发容器，要把线程安全的实现方式说清楚，而不是只说能并发用。
- 最后落到真实选择：单线程普通容器，并发场景选并发容器或避免共享。

## 实际场景

比如本地缓存用户信息、配置项、权限映射时，单线程构建可用 HashMap，并发读写场景则更适合 ConcurrentHashMap。





