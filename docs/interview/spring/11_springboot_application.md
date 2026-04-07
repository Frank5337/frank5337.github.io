---
prev:
  text: 'Spring事务传播行为有哪些'
  link: '/interview/spring/10_transaction_propagation'
next:
  text: '自动装配原理'
  link: '/interview/spring/12_autoconfiguration'
---

# @SpringBootApplication

## 题目

> `@SpringBootApplication` 做了什么？

## 参考答案

它是一个组合注解，核心包括：

- `@SpringBootConfiguration`
- `@EnableAutoConfiguration`
- `@ComponentScan`

也就是：配置类 + 自动装配 + 组件扫描。
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





