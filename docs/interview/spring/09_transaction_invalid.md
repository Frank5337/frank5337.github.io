---
prev:
  text: '@Autowired 和 @Resource 的区别'
  link: '/interview/spring/08_autowired_resource'
next:
  text: 'Spring事务传播行为有哪些'
  link: '/interview/spring/10_transaction_propagation'
---

# Spring事务什么时候会失效

## 题目

> Spring 事务什么时候会失效？

## 参考答案

高频失效场景：

- 同类内部调用
- 方法不是 `public`
- 异常被吞掉
- 抛出的异常不在默认回滚范围内
- Bean 不是 Spring 管理

一句话抓重点：没有经过代理对象时，事务最容易失效。
## 回答展开

- 缓存题建议按原理、风险、治理方案三个层次展开。
- 如果涉及集群或高可用，要明确 Redis 更偏最终一致而不是强一致。
- 如果涉及缓存问题，最好把穿透、击穿、雪崩的成因和治理手段区分开。

## 实际场景

比如统一日志、权限校验、事务管理、公司内部 SDK 接入，很多都是靠 Spring AOP 或 Spring Boot 自动装配来实现的。





