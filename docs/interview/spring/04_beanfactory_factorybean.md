---
prev:
  text: '怎么解决的循环依赖'
  link: '/interview/spring/03_circular_dependency'
next:
  text: 'Spring中Bean的作用域有哪些'
  link: '/interview/spring/05_scope'
---

# BeanFactory 和 FactoryBean 有什么区别

## 题目

> `BeanFactory` 和 `FactoryBean` 有什么区别？

## 参考答案

- `BeanFactory` 是 Spring 容器本身
- `FactoryBean` 是一个特殊 Bean，用来生产别的对象

一句话记忆：

- 一个是工厂“容器”
- 一个是工厂“Bean”
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如项目启动时的数据源、Mapper、Service、Controller 都是由 Spring 容器统一创建和管理的，这些题本质上都和容器能力有关。





