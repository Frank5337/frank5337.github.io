---
prev:
  text: '自动装配原理'
  link: '/interview/spring/12_autoconfiguration'
next:
  text: 'Spring Boot 中常见的配置加载顺序'
  link: '/interview/spring/14_config_order'
---

# starter的原理是什么

## 题目

> Spring Boot starter 的原理是什么？

## 参考答案

starter 本质上是“一组依赖 + 一套自动配置”。它把某项能力需要的依赖和默认装配逻辑打包起来，业务项目只要引入 starter 就能快速使用。
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





