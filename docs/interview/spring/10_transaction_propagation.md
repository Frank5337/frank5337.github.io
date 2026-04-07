---
prev:
  text: 'Spring事务什么时候会失效'
  link: '/interview/spring/09_transaction_invalid'
next:
  text: '@SpringBootApplication'
  link: '/interview/spring/11_springboot_application'
---

# Spring事务传播行为有哪些

## 题目

> Spring 事务传播行为有哪些？

## 参考答案

常见传播行为：

- `REQUIRED`
- `REQUIRES_NEW`
- `SUPPORTS`
- `MANDATORY`
- `NOT_SUPPORTED`
- `NEVER`
- `NESTED`

面试里最常追问的是 `REQUIRED` 和 `REQUIRES_NEW` 的区别。
## 回答展开

- 缓存题建议按原理、风险、治理方案三个层次展开。
- 如果涉及集群或高可用，要明确 Redis 更偏最终一致而不是强一致。
- 如果涉及缓存问题，最好把穿透、击穿、雪崩的成因和治理手段区分开。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





