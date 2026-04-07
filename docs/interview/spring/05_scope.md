---
prev:
  text: 'BeanFactory 和 FactoryBean 有什么区别'
  link: '/interview/spring/04_beanfactory_factorybean'
next:
  text: 'Spring AOP 的底层原理'
  link: '/interview/spring/06_aop'
---

# Spring中Bean的作用域有哪些

## 题目

> Spring 中 Bean 的作用域有哪些？

## 参考答案

常见作用域：

- `singleton`
- `prototype`
- `request`
- `session`
- `application`

默认作用域是 `singleton`。
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如项目启动时的数据源、Mapper、Service、Controller 都是由 Spring 容器统一创建和管理的，这些题本质上都和容器能力有关。





