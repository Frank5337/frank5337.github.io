---
prev:
  text: 'starter的原理是什么'
  link: '/interview/spring/13_starter'
next:
  text: 'Spring Boot 如何实现一个自定义 starter'
  link: '/interview/spring/15_custom_starter'
---

# Spring Boot 中常见的配置加载顺序

## 题目

> Spring Boot 常见的配置加载顺序是什么？

## 参考答案

通常可以理解为：

- 命令行参数
- 环境变量
- 外部配置文件
- 内部配置文件
- 默认配置

优先级高的会覆盖优先级低的。
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





