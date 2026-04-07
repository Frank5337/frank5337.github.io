---
prev:
  text: 'Spring中Bean的作用域有哪些'
  link: '/interview/spring/05_scope'
next:
  text: 'JDK动态代理和CGLIB的区别'
  link: '/interview/spring/07_jdk_cglib'
---

# Spring AOP 的底层原理

## 题目

> Spring AOP 的底层原理是什么？

## 参考答案

Spring AOP 本质上是代理模式：

- 有接口时优先用 JDK 动态代理
- 没有接口时常用 CGLIB

它通过代理对象在目标方法前后织入增强逻辑，比如事务、日志、权限校验。
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





