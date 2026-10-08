---
prev:
  text: 'ThreadLocal的原理, 为什么会内存泄漏'
  link: '/interview/java/15_threadlocal'
next:
  text: '深拷贝和浅拷贝的区别'
  link: '/interview/java/17_copy'
---

# String、StringBuilder、StringBuffer 的区别

## 题目

> `String`、`StringBuilder`、`StringBuffer` 有什么区别？

## 参考答案

- `String` 不可变，线程安全
- `StringBuilder` 可变，线程不安全，性能更好
- `StringBuffer` 可变，线程安全，性能相对低

一般结论：

- 单线程字符串拼接用 `StringBuilder`
- 多线程共享且需要修改时才考虑 `StringBuffer`
## 回答展开

- 基础题不要只给定义，最好补上原理、边界和一个容易踩坑的点。
- 如果能说明这个知识点解决什么问题、不能解决什么问题，回答会更完整。
- 最后加一句实际取舍，通常比只背术语更像真实经验。

## 实际场景

这些知识点在线上都属于高频基础能力。比如异步通知、批量导出、网络通信、对象复制和字符串拼接，几乎每个 Java 项目都会遇到。





