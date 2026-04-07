# 题目8：Spring Boot 自动装配

> 📊 评分：— | 📅 完成时间：待完成

---

## 📝 题目

> Spring Boot 的自动装配原理是什么？`@SpringBootApplication` 做了什么？如果让你实现一个自定义 starter，你会怎么做？

---

## 💬 我的回答

<PasswordProtect>

（待补充）

</PasswordProtect>

---

## 📖 参考答案

### 一、`@SpringBootApplication`

它是一个组合注解，核心包含：

- `@SpringBootConfiguration`
- `@EnableAutoConfiguration`
- `@ComponentScan`

### 二、自动装配原理

- 启动时加载自动配置类
- 自动配置类通过条件注解判断是否生效
- 满足条件后向容器中注入默认 Bean

常见条件注解：

- `@ConditionalOnClass`
- `@ConditionalOnMissingBean`
- `@ConditionalOnProperty`

### 三、自定义 starter 思路

1. 提供一个 `xxx-spring-boot-starter`
2. 写自动配置类
3. 写配置属性类
4. 通过自动装配配置文件让 Spring Boot 扫描到

### 四、面试追问

- 为什么自动装配不会把所有配置都生效
- 如何覆盖 Spring Boot 默认 Bean
- starter 和普通依赖的区别

---

## 🎯 面试标准话术

> "Spring Boot 自动装配的核心是 `EnableAutoConfiguration`。它会在启动阶段加载候选自动配置类，再通过一系列 `Conditional` 注解判断是否需要生效。starter 的本质就是一组依赖加一套自动配置。"

