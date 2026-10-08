---
prev:
  text: 'synchronized底层实现'
  link: '/interview/java/12_synchronized'
next:
  text: 'submit 和 execute 有什么区别'
  link: '/interview/java/14_submit_execute'
---

# 线程池核心参数有哪些, 拒绝策略有哪些

## 题目

> `ThreadPoolExecutor` 的核心参数有哪些？拒绝策略有哪些？

## 参考答案

核心参数有：

- `corePoolSize`
- `maximumPoolSize`
- `keepAliveTime`
- `workQueue`
- `threadFactory`
- `RejectedExecutionHandler`

常见拒绝策略：

- `AbortPolicy`
- `CallerRunsPolicy`
- `DiscardPolicy`
- `DiscardOldestPolicy`

面试时建议顺带说线程池执行流程：先核心线程，再队列，再最大线程，最后拒绝。
## 回答展开

- 基础题不要只给定义，最好补上原理、边界和一个容易踩坑的点。
- 如果能说明这个知识点解决什么问题、不能解决什么问题，回答会更完整。
- 最后加一句实际取舍，通常比只背术语更像真实经验。

## 实际场景

这些知识点在线上都属于高频基础能力。比如异步通知、批量导出、网络通信、对象复制和字符串拼接，几乎每个 Java 项目都会遇到。





