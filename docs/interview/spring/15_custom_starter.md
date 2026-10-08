---
prev:
  text: 'Spring Boot 中常见的配置加载顺序'
  link: '/interview/spring/14_config_order'
next:
  text: 'Spring 题目列表'
  link: '/interview/spring'
---

# Spring Boot 如何实现一个自定义 starter

## 题目

> 如果让你实现一个自定义 starter，你会怎么做？

## 参考答案

基本步骤：

1. 定义 starter 依赖模块
2. 编写自动配置类
3. 编写 `ConfigurationProperties`
4. 通过自动装配机制暴露给 Spring Boot

starter 负责“装”，真正业务能力通常放在独立模块里。
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





