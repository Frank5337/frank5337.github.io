---
prev:
  text: '线程池核心参数有哪些, 拒绝策略有哪些'
  link: '/interview/java/13_threadpool_core'
next:
  text: 'ThreadLocal的原理, 为什么会内存泄漏'
  link: '/interview/java/15_threadlocal'
---

# submit 和 execute 有什么区别

## 题目

> 线程池里的 `submit()` 和 `execute()` 有什么区别？

## 参考答案

`execute()` 只负责提交任务，没有返回值；`submit()` 会返回 `Future`，可以拿结果、取消任务、感知异常。

补充一点：

- `execute()` 的异常通常直接抛到线程的异常处理器
- `submit()` 的异常会被包装进 `Future.get()`

如果你需要结果或统一处理异常，通常更适合 `submit()`。
## 回答展开

- 基础题不要只给定义，最好补上原理、边界和一个容易踩坑的点。
- 如果能说明这个知识点解决什么问题、不能解决什么问题，回答会更完整。
- 最后加一句实际取舍，通常比只背术语更像真实经验。

## 实际场景

这些知识点在线上都属于高频基础能力。比如异步通知、批量导出、网络通信、对象复制和字符串拼接，几乎每个 Java 项目都会遇到。





