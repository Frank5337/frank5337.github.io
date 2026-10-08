---
prev:
  text: 'Spring 题目列表'
  link: '/interview/spring'
next:
  text: 'Bean生命周期'
  link: '/interview/spring/02_bean_lifecycle'
---

# Spring启动时如何创建 Bean 对象，过程是什么样的

## 题目

> Spring 启动时是怎么创建 Bean 的？

## 参考答案

大致流程：

1. 扫描并注册 BeanDefinition
2. 实例化 Bean
3. 属性注入
4. 执行各种 Aware 和 PostProcessor
5. 初始化
6. 放入单例池

如果 Bean 需要 AOP，Spring 还可能在这个过程中生成代理对象。
## 回答展开

- 对象创建题建议按类加载、内存分配、默认初始化、构造执行的顺序来讲。
- 如果能补充 TLAB、对象头和逃逸分析，会更显得有深度。
- 这类题本质上在考你是否理解 JVM 对象生命周期的起点。

## 实际场景

比如某个接口在循环里频繁 new 临时对象，虽然代码本身没错，但很可能造成年轻代对象暴涨和频繁 GC，这类问题在性能优化里很常见。





