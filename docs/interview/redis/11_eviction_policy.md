---
prev:
  text: 'Redis过期键的删除策略'
  link: '/interview/redis/10_expire_delete'
next:
  text: '缓存穿透、缓存击穿、缓存雪崩分别是什么, 怎么解决'
  link: '/interview/redis/12_cache_problems'
---

# Redis内存淘汰策略有哪些

## 题目

> Redis 常见的内存淘汰策略有哪些？

## 参考答案

常见策略：

- `noeviction`
- `allkeys-lru`
- `allkeys-lfu`
- `volatile-lru`
- `volatile-lfu`
- `allkeys-random`

业务里最常被问的是 LRU 和 LFU 的区别。
## 回答展开

- 缓存题建议按原理、风险、治理方案三个层次展开。
- 如果涉及集群或高可用，要明确 Redis 更偏最终一致而不是强一致。
- 如果涉及缓存问题，最好把穿透、击穿、雪崩的成因和治理手段区分开。

## 实际场景

比如商品详情缓存、用户会话缓存、配置缓存是 Redis 的典型使用场景；一旦出现缓存失效、热点集中或删除失败，就需要完整的治理策略。





