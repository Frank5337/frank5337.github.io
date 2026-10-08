---
prev:
  text: 'JDK动态代理和CGLIB的区别'
  link: '/interview/spring/07_jdk_cglib'
next:
  text: 'Spring事务什么时候会失效'
  link: '/interview/spring/09_transaction_invalid'
---

# @Autowired 和 @Resource 的区别

## 题目

> `@Autowired` 和 `@Resource` 的区别是什么？

## 参考答案

- `@Autowired` 默认按类型注入，属于 Spring
- `@Resource` 默认先按名称再按类型，属于 JSR 规范

两者都能完成依赖注入，但规则和来源不同，团队里最好统一风格。
## 回答展开

- 这题建议从三个点回答：来源规范不同、默认匹配方式不同、和 Spring 生态集成能力不同。
- Autowired 默认按类型注入，更贴 Spring 体系，通常会和 Qualifier 一起用；Resource 属于 JSR 规范，默认更偏按名称匹配。
- 真正项目里两者都能完成依赖注入，但团队最好统一风格，否则排查 Bean 注入冲突时会更容易混乱。

## 实际场景

比如系统里有两个短信发送实现，一个是阿里云，一个是腾讯云。这时如果用 Autowired，通常会配合 Qualifier 明确指定注入哪个实现，避免歧义。




