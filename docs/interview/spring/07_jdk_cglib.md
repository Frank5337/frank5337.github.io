---
prev:
  text: 'Spring AOP 的底层原理'
  link: '/interview/spring/06_aop'
next:
  text: '@Autowired 和 @Resource 的区别'
  link: '/interview/spring/08_autowired_resource'
---

# JDK动态代理和CGLIB的区别

## 题目

> JDK 动态代理和 CGLIB 的区别是什么？

## 参考答案

- JDK 动态代理基于接口
- CGLIB 基于继承生成子类

一般来说，目标类有接口就优先用 JDK 代理；没有接口时才会退到 CGLIB。
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





