---
prev:
  text: '@SpringBootApplication'
  link: '/interview/spring/11_springboot_application'
next:
  text: 'starter的原理是什么'
  link: '/interview/spring/13_starter'
---

# 自动装配原理

## 题目

> Spring Boot 自动装配原理是什么？

## 参考答案

启动时 Spring Boot 会加载候选自动配置类，再通过一系列 `Conditional` 条件注解决定哪些配置真正生效。

常见条件注解：

- `@ConditionalOnClass`
- `@ConditionalOnMissingBean`
- `@ConditionalOnProperty`
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





