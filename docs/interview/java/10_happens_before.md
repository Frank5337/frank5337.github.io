---
prev:
  text: 'JVM内存模型'
  link: '/interview/java/09_jvm_memory_model'
next:
  text: 'volatile关键字的作用'
  link: '/interview/java/11_volatile'
---

# Java内存模型里的happens-before有哪些规则

## 题目

> Java 内存模型里的 happens-before 规则有哪些？

## 参考答案

常见规则有：

- 程序次序规则
- 监视器锁规则
- `volatile` 变量规则
- 线程启动规则
- 线程终止规则
- 传递性

一句话理解：如果 A happens-before B，那么 A 的结果对 B 可见，且 A 的执行顺序先于 B。
## 回答展开

- 基础题不要只给定义，最好补上原理、边界和一个容易踩坑的点。
- 如果能说明这个知识点解决什么问题、不能解决什么问题，回答会更完整。
- 最后加一句实际取舍，通常比只背术语更像真实经验。

## 实际场景

比如系统里有一个动态开关控制消费者是否继续处理消息，用 volatile 保证不同线程能及时看到最新值，就是非常典型的使用场景。





