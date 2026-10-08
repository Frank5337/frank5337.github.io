# 面试题

### Java
- JUC了解多少, 介绍下体系, atomic包干什么的
- new Object(); 做了哪些事情
- 介绍下HashMap
- HashMap为什么线程不安全
- ConcurrentHashMap 1.7 和 1.8 的区别
- volatile关键字的作用
- synchronized底层实现
- 线程池核心参数有哪些, 拒绝策略有哪些
- ThreadLocal的原理, 为什么会内存泄漏

### Mysql
- 什么是MVCC
- innodb索引数据结构
- 事务的隔离级别
- 什么是可重复读
- 怎么Sql调优的
- Explain分析看哪些指标
- 什么是回表
- 索引不生效的情况
- 什么是覆盖索引
- redo log、undo log、binlog 有什么区别
- MySQL主从同步原理
- 深分页为什么慢, 怎么优化

### Redis
- Cluster模式, 数据倾斜问题
- 哨兵模式, 脑裂
- 如何用redis的setnx命令实现一个可重入锁
- Redis集群中, 多个节点是怎么保证数据一致性的
- Redis为什么快
- Redis的持久化机制有哪些
- 缓存穿透、缓存击穿、缓存雪崩分别是什么, 怎么解决
- Redis内存淘汰策略有哪些

### Spring
- Spring启动时如何创建 Bean 对象，过程是什么样的
- Bean生命周期
- 怎么解决的循环依赖
- Spring AOP 的底层原理
- @Autowired 和 @Resource 的区别
- Spring事务什么时候会失效

### SpringBoot
- 自动装配原理
- starter的原理是什么


### Message Queue
- 如何保证消息不重复消费
- 消息积压问题
- 如何保证消息不丢失
- 如何保证消息有序
- 死信队列的使用场景

### 系统设计
- 如何设计一个秒杀系统
- 如何设计一个分布式ID生成器
- 如何设计一个排行榜系统
- 如何设计一个用户消息通知系统

### 算法
- 如何辨别一个数字是不是回文数?
- 用队列实现栈
- 用栈实现队列
- 二叉树的层序遍历
- 反转链表
- 判断链表是否有环
- LRU缓存机制
- Top K 问题怎么做
