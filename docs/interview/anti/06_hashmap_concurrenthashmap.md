# 题目6：HashMap 与 ConcurrentHashMap

> 📊 评分：— | 📅 完成时间：待完成

---

## 📝 题目

> 请介绍一下 HashMap 的底层数据结构。为什么 HashMap 线程不安全？ConcurrentHashMap 在 JDK1.7 和 JDK1.8 中分别是怎么实现线程安全的？

---

## 💬 我的回答

<PasswordProtect>

（待补充）

</PasswordProtect>

---

## 📖 参考答案

### 一、HashMap 底层结构

- JDK1.7：数组 + 链表
- JDK1.8：数组 + 链表 + 红黑树

当链表长度超过阈值且数组容量足够时，会树化，降低查询复杂度。

### 二、HashMap 为什么线程不安全

- 多线程 put 可能导致数据覆盖
- 扩容时可能出现数据迁移问题
- 读写并发时可能拿到不一致数据

### 三、ConcurrentHashMap 的实现

#### JDK1.7
- `Segment` 分段锁
- 每个 Segment 类似一个小 HashMap
- 锁粒度是 Segment

#### JDK1.8
- `Node[] + CAS + synchronized`
- 初始化、插入空桶时优先用 CAS
- 链表或树冲突时对桶头节点加 `synchronized`
- 锁粒度细化到单个桶

### 四、面试追问

- 为什么 JDK1.8 去掉了 Segment
- 为什么 size 统计不一定是强一致
- ConcurrentHashMap 为什么不允许 key/value 为 null

---

## 🎯 面试标准话术

> "HashMap 在 JDK1.8 中是数组、链表、红黑树结构。它线程不安全，主要体现在并发 put、扩容和读写并发上。ConcurrentHashMap 在 JDK1.7 用 Segment 分段锁，在 JDK1.8 改成了 CAS 加 synchronized，把锁粒度降低到桶级别，吞吐更高。"

