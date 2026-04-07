---
prev:
  text: 'Java 题目列表'
  link: '/interview/java'
next:
  text: '说说ReentrantLock'
  link: '/interview/java/02_reentrantlock'
---

# JUC了解多少, 介绍下体系, atomic包干什么的

## 题目

> JUC 了解多少？介绍一下整体体系。`atomic` 包是干什么的？

## 参考答案

JUC 就是 `java.util.concurrent`，是 Java 并发编程的核心工具包。面试时我一般会按 5 类来讲：

- 锁：`ReentrantLock`、`ReadWriteLock`、`StampedLock`
- 原子类：`AtomicInteger`、`AtomicReference`、`LongAdder`
- 并发容器：`ConcurrentHashMap`、`BlockingQueue`
- 线程池：`ThreadPoolExecutor`、`CompletableFuture`
- 同步工具：`CountDownLatch`、`Semaphore`、`CyclicBarrier`

`atomic` 包的作用是提供无锁的原子操作，底层大多基于 CAS。它适合计数器、状态位、引用替换这类简单并发更新场景。
## 回答展开

- 回答时先给整体分层，再挑自己熟悉的锁、线程池、并发容器展开。
- 要把 atomic 包和 CAS 联系起来，说明它更适合单变量原子更新。
- 如果继续追问，通常会延伸到 ABA、自旋开销和 LongAdder。

## 实际场景

实际项目里常见场景是做接口调用计数、状态位切换和并发统计。比如网关服务会用 LongAdder 统计每个接口的 QPS，再定时上报到监控平台。





