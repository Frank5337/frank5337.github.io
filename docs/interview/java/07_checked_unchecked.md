---
prev:
  text: 'ConcurrentHashMap 1.7 和 1.8 的区别'
  link: '/interview/java/06_concurrenthashmap_diff'
next:
  text: '为什么重写equals() 的同时也要重写hashcode()'
  link: '/interview/java/08_equals_hashcode'
---

# Compile-Time Checking of Exceptions 和 Unchecked Exception 的区别

## 题目

> Checked Exception 和 Unchecked Exception 的区别是什么？

## 参考答案

Checked Exception 会在编译期检查，方法里要么捕获，要么继续 `throws`。Unchecked Exception 一般继承自 `RuntimeException`，编译器不强制处理。

一般可以这样理解：

- Checked：外部环境问题，可预期，比如 IO、SQL
- Unchecked：程序逻辑错误或运行时问题，比如空指针、数组越界

面试时别只背定义，最好顺带说出适用场景。
## 回答展开

- 基础题不要只给定义，最好补上原理、边界和一个容易踩坑的点。
- 如果能说明这个知识点解决什么问题、不能解决什么问题，回答会更完整。
- 最后加一句实际取舍，通常比只背术语更像真实经验。

## 实际场景

比如调用文件存储、消息中间件等外部资源时，异常通常属于可恢复问题；而参数校验失败、空指针更适合放进统一运行时异常体系处理。





