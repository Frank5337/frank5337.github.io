---
prev:
  text: 'submit 和 execute 有什么区别'
  link: '/interview/java/14_submit_execute'
next:
  text: 'String、StringBuilder、StringBuffer 的区别'
  link: '/interview/java/16_string_family'
---

# ThreadLocal的原理, 为什么会内存泄漏

## 题目

> `ThreadLocal` 的原理是什么？为什么会发生内存泄漏？

## 参考答案

每个线程内部都有一个 `ThreadLocalMap`。`ThreadLocal` 作为 key，业务值作为 value，实现线程隔离。

内存泄漏的根因是：

- key 是弱引用
- value 是强引用
- 在线程池场景下线程长期存在
- key 被 GC 后，value 可能残留

正确姿势是用完 `remove()`，尤其在线程池里一定要清理上下文。
## 回答展开

- 这题要说清楚弱引用的是 key，不是 value，这是高频扣分点。
- 内存泄漏本质上和线程池线程长期存活有关，不是 ThreadLocal 自身有 bug。
- 最后一定要落到使用规范：try/finally 里 remove。

## 实际场景

比如网关服务会把 traceId、用户上下文、租户信息放到 ThreadLocal 里沿链路透传，请求结束后必须及时清理，否则线程复用时就会串数据。





