---
prev:
  text: 'Bean生命周期'
  link: '/interview/spring/02_bean_lifecycle'
next:
  text: 'BeanFactory 和 FactoryBean 有什么区别'
  link: '/interview/spring/04_beanfactory_factorybean'
---

# 怎么解决的循环依赖

## 题目

> Spring 是怎么解决循环依赖的？

## 参考答案

Spring 主要通过三级缓存解决单例 Bean 的 setter 循环依赖：

- 一级缓存：成品 Bean
- 二级缓存：早期曝光对象
- 三级缓存：对象工厂

注意点：

- 主要针对单例 Bean
- 构造器循环依赖通常解决不了
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如项目启动时的数据源、Mapper、Service、Controller 都是由 Spring 容器统一创建和管理的，这些题本质上都和容器能力有关。





