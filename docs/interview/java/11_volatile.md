---
prev:
  text: 'Java内存模型里的happens-before有哪些规则'
  link: '/interview/java/10_happens_before'
next:
  text: 'synchronized底层实现'
  link: '/interview/java/12_synchronized'
---

# volatile关键字的作用

## 题目

> `volatile` 关键字有什么作用？

## 参考答案

`volatile` 主要保证两件事：

- 可见性
- 有序性

它不能保证复合操作的原子性，所以像 `count++` 这种场景不能只靠 `volatile`。

适用场景：

- 状态开关
- 配置刷新
- 双重检查单例中的实例引用
## 回答展开

- 基础题不要只给定义，最好补上原理、边界和一个容易踩坑的点。
- 如果能说明这个知识点解决什么问题、不能解决什么问题，回答会更完整。
- 最后加一句实际取舍，通常比只背术语更像真实经验。

## 实际场景

比如系统里有一个动态开关控制消费者是否继续处理消息，用 volatile 保证不同线程能及时看到最新值，就是非常典型的使用场景。





