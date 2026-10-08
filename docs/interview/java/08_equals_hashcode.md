---
prev:
  text: 'Compile-Time Checking of Exceptions 和 Unchecked Exception 的区别'
  link: '/interview/java/07_checked_unchecked'
next:
  text: 'JVM内存模型'
  link: '/interview/java/09_jvm_memory_model'
---

# 为什么重写equals() 的同时也要重写hashcode()

## 题目

> 为什么重写 `equals()` 的同时也要重写 `hashCode()`？

## 参考答案

因为哈希容器在判断元素时，先看 `hashCode()`，再看 `equals()`。如果两个对象 `equals()` 返回 true，但 `hashCode()` 不一致，就可能被放进不同桶里，破坏集合语义。

核心约定：

- 相等对象必须有相同的 `hashCode`
- 不相等对象允许有相同的 `hashCode`

所以重写 `equals()` 时通常必须同步重写 `hashCode()`。
## 回答展开

- 基础题不要只给定义，最好补上原理、边界和一个容易踩坑的点。
- 如果能说明这个知识点解决什么问题、不能解决什么问题，回答会更完整。
- 最后加一句实际取舍，通常比只背术语更像真实经验。

## 实际场景

比如把订单查询条件对象、坐标对象、业务键对象放进 HashSet 或 HashMap 做去重时，equals 和 hashCode 必须保持一致。





