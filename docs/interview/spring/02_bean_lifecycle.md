---
prev:
  text: 'Spring启动时如何创建 Bean 对象，过程是什么样的'
  link: '/interview/spring/01_bean_create'
next:
  text: '怎么解决的循环依赖'
  link: '/interview/spring/03_circular_dependency'
---

# Bean生命周期

## 题目

> 说说 Spring Bean 的生命周期。

## 参考答案

常见顺序：

- 实例化
- 属性填充
- Aware 回调
- `BeanPostProcessor` 前置处理
- 初始化方法
- `BeanPostProcessor` 后置处理
- 容器关闭时销毁

面试里最好能把初始化前后处理器也带上。
## 回答展开

- Spring 题回答时最好从容器、代理和生命周期三个角度切入。
- 如果涉及事务或 AOP，一定要强调代理对象这一层。
- 如果是 Spring Boot 题，要把自动装配和条件注解说清楚。

## 实际场景

比如项目启动时的数据源、Mapper、Service、Controller 都是由 Spring 容器统一创建和管理的，这些题本质上都和容器能力有关。





