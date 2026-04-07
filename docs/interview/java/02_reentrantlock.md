---
prev:
  text: 'JUC了解多少, 介绍下体系, atomic包干什么的'
  link: '/interview/java/01_juc_overview'
next:
  text: 'new Object(); 做了哪些事情'
  link: '/interview/java/03_new_object'
---

# 说说ReentrantLock

## 题目

> 说说 `ReentrantLock`，它和 `synchronized` 有什么差别？

## 参考答案

`ReentrantLock` 是基于 AQS 实现的可重入锁。相比 `synchronized`，它最大的特点是更灵活：

- 支持公平锁和非公平锁
- 支持 `tryLock()`，避免一直阻塞
- 支持 `lockInterruptibly()`，等待锁时可响应中断
- 支持多个 `Condition`

它适合需要超时控制、可中断、精准唤醒的场景。缺点是必须手动 `unlock()`，通常要写在 `finally` 里。
## 回答展开

- 回答时不要只背概念，最好带上底层实现和适用场景。
- 显式锁更灵活，内置锁更简单，核心差别在可中断、超时、公平性和条件队列。
- 如果面试官继续追问，可以延伸到 AQS、Monitor 和锁升级。

## 实际场景

比如订单系统里做本地库存扣减时，如果同一时刻大量请求竞争同一资源，可以用 tryLock 加超时快速失败，避免线程一直阻塞。





