---
prev:
  text: 'volatile关键字的作用'
  link: '/interview/java/11_volatile'
next:
  text: '线程池核心参数有哪些, 拒绝策略有哪些'
  link: '/interview/java/13_threadpool_core'
---

# synchronized底层实现

## 题目

> `synchronized` 的底层是怎么实现的？

## 参考答案

`synchronized` 底层依赖对象监视器 Monitor。字节码层面能看到 `monitorenter` 和 `monitorexit` 指令，JVM 会根据竞争情况做偏向锁、轻量级锁、重量级锁等优化。

它的特点：

- 可重入
- 自动释放锁
- 语法简单

JDK6 之后优化很多，在大多数业务场景下性能已经足够好。
## 回答展开

- 回答时不要只背概念，最好带上底层实现和适用场景。
- 显式锁更灵活，内置锁更简单，核心差别在可中断、超时、公平性和条件队列。
- 如果面试官继续追问，可以延伸到 AQS、Monitor 和锁升级。

## 实际场景

比如单机任务调度、缓存刷新、幂等校验这类代码块很短的临界区，直接用 synchronized 往往最清晰。





