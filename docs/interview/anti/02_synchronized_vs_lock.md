# 题目2：synchronized vs ReentrantLock

> 📊 评分：7/10 | 📅 完成时间：2026-01-23

---

## 📝 题目

> synchronized 和 ReentrantLock 有什么区别？在什么场景下你会选择使用 ReentrantLock？请举例说明你在实际项目中是如何处理并发问题的。

---

## 💬 我的回答

<PasswordProtect>

都是锁，synchronized是java关键字，jdk8优化了锁升级、锁碰撞、自旋锁，靠CPU获取执行权来的。ReentrantLock是AQS的一个实现的，有队列，可以设置公平/非公平，可以设置超时时间、重试策略。

</PasswordProtect>

---

## 📊 评分：7/10

### ✅ 优点
- 正确指出两者本质区别（关键字 vs API）
- 提到了JDK优化的锁升级机制
- 知道ReentrantLock基于AQS实现
- 能说出公平/非公平锁、超时设置等高级特性

### ⚠️ 需要改进
1. **锁升级是JDK6引入的** - 不是JDK8，包括：偏向锁→轻量级锁→重量级锁
2. **"锁碰撞"表述不准确** - 应该是"锁消除"或"锁粗化"
3. **缺少关键区别** - 未提及可中断、Condition条件变量、可重入性比较
4. **实际案例缺失** - 8年经验应该举出具体使用场景

---

## 📖 参考答案

### 一、核心区别对比

| 特性 | synchronized | ReentrantLock |
|------|-------------|---------------|
| **实现方式** | JVM内置关键字，monitorenter/monitorexit | JDK API，基于AQS |
| **锁释放** | 自动释放（离开同步块） | 必须手动unlock()，通常在finally中 |
| **可中断** | ❌ 不支持 | ✅ lockInterruptibly() |
| **超时获取** | ❌ 不支持 | ✅ tryLock(timeout) |
| **公平锁** | ❌ 非公平 | ✅ 可选公平/非公平 |
| **条件变量** | 单一wait/notify | 多个Condition，更灵活 |
| **性能** | JDK6后优化，差距不大 | 高并发竞争激烈时略优 |

### 二、锁升级机制（JDK6引入）

```
无锁 → 偏向锁 → 轻量级锁(CAS) → 重量级锁(OS Mutex)
       ↓           ↓              ↓
    单线程访问   竞争不激烈     竞争激烈
```

**JVM优化**：
- **锁消除**：JIT检测到不可能存在共享数据竞争，消除锁
- **锁粗化**：连续加锁解锁合并为一次

### 三、选择ReentrantLock的场景

```java
// 场景1：需要尝试获取锁（避免死锁）
if (lock.tryLock(3, TimeUnit.SECONDS)) {
    try {
        // 业务逻辑
    } finally {
        lock.unlock();
    }
} else {
    // 获取锁失败的处理
}

// 场景2：可中断的锁获取
lock.lockInterruptibly(); // 可响应中断

// 场景3：多条件变量（生产者消费者）
Condition notFull = lock.newCondition();
Condition notEmpty = lock.newCondition();
```

### 四、实际项目案例（示范回答）

> "在订单系统中，我们有个库存扣减的场景。最初用synchronized，但遇到两个问题：
> 
> 1. **死锁风险**：多商品同时扣减时可能死锁，需要tryLock+超时机制
> 2. **公平性需求**：大促时发现部分请求饿死，需要公平锁
> 
> 改用ReentrantLock后：
> ```java
> ReentrantLock lock = new ReentrantLock(true); // 公平锁
> if (lock.tryLock(500, TimeUnit.MILLISECONDS)) {
>     try {
>         // 扣减库存
>     } finally {
>         lock.unlock();
>     }
> } else {
>     throw new BusinessException("系统繁忙，请稍后重试");
> }
> ```
> 解决了死锁和饿死问题，QPS从3000提升到5000。"

---

## 📚 深入知识点

### 一、锁升级机制详解

```
┌─────────────────────────────────────────────────────────────────┐
│  无锁状态                                                        │
│    ↓ 第一个线程访问                                               │
│  偏向锁 ─────────── 对象头存储线程ID，无CAS开销                    │
│    ↓ 出现第二个线程竞争                                           │
│  轻量级锁 ──────── CAS自旋尝试获取，不阻塞线程                     │
│    ↓ 自旋超过阈值（默认10次）或竞争激烈                            │
│  重量级锁 ──────── OS Mutex，线程阻塞挂起                         │
└─────────────────────────────────────────────────────────────────┘
```

### 二、重量级锁队列机制（ObjectMonitor）

```
┌─────────────────────────────────────────────────────────────────────┐
│                       ObjectMonitor 结构                            │
├─────────────────────────────────────────────────────────────────────┤
│  _owner        ←─ 当前持有锁的线程                                  │
│  _recursions   ←─ 重入次数                                          │
│  _count        ←─ 等待线程数                                        │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ _EntryList (入口队列)                                       │   │
│  │ ┌────┐ ┌────┐ ┌────┐                                       │   │
│  │ │ T1 │→│ T2 │→│ T3 │  等待获取锁的线程（阻塞状态）           │   │
│  │ └────┘ └────┘ └────┘                                       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ _WaitSet (等待队列)                                         │   │
│  │ ┌────┐ ┌────┐                                               │   │
│  │ │ T4 │→│ T5 │  调用wait()的线程（等待被notify唤醒）          │   │
│  │ └────┘ └────┘                                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  _cxq          ←─ 竞争队列（新来的线程先进这里）                    │
└─────────────────────────────────────────────────────────────────────┘
```

### 三、队列流转详解

```
线程想获取锁 → CAS尝试设置_owner
  ├── 成功 → 获得锁，执行同步代码
  │            ├── 调用wait() → 释放锁 → 进入_WaitSet
  │            └── 执行完毕 → 释放锁 → 唤醒_EntryList中一个线程
  └── 失败 → 进入_cxq → 自旋 → 失败 → 进入_EntryList阻塞

_WaitSet被notify()唤醒后 → 进入_EntryList → 重新竞争锁
```

**关键点**：只有已经持有锁的线程才能调用wait()！

### 四、锁释放时的竞争机制

```
锁释放瞬间的竞争者：
┌─────────────────────────────────────────────────────────────────┐
│  从 _EntryList 唤醒的:  【1个】 T1 (刚从 park 醒来)             │
│  _cxq 中自旋的:        【多个】 T2, T3, T4... (一直在 CAS 尝试) │
│  刚到还没入队的:       【不定】 T5, T6... (直接 CAS)            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    所有这些同时 CAS 抢锁
                              ↓
                      谁成功谁拿到锁
```

| 来源 | 数量 | 状态 |
|------|------|------|
| _EntryList | **1个** | 刚被唤醒（HotSpot从头部取） |
| _cxq | **N个** | 一直在自旋 |
| 新来的 | **不定** | 随时可能加入 |

**非公平的本质**：不是随机唤醒，而是唤醒后还要和其他线程竞争，新来的可能插队！

### 五、synchronized vs ReentrantLock 队列对比

| 特性 | synchronized (ObjectMonitor) | ReentrantLock (AQS) |
|------|------------------------------|---------------------|
| **队列结构** | EntryList + WaitSet + cxq | CLH双向链表 |
| **公平性** | ❌ 非公平（新来的可能插队） | ✅ 可选公平/非公平 |
| **唤醒策略** | 随机或按策略唤醒一个 | FIFO顺序唤醒 |
| **实现层面** | C++实现（JVM内部） | Java实现（可读源码） |

### 六、JVM锁优化

| 优化 | 含义 | 例子 |
|------|------|------|
| **锁消除** | JIT发现不可能有竞争，直接去掉锁 | 局部变量的StringBuffer |
| **锁粗化** | 连续加锁解锁合并为一次 | 循环内加锁 → 移到循环外 |
| **自适应自旋** | 根据历史成功率动态调整自旋次数 | 上次成功→多转几次 |

### 七、ReentrantLock 核心特性（6个）

```java
// 1️⃣ 可中断
lock.lockInterruptibly();  // 等待时可响应中断

// 2️⃣ 超时获取
lock.tryLock(3, TimeUnit.SECONDS);  // 超时返回false

// 3️⃣ 非阻塞尝试
if (lock.tryLock()) { ... }  // 立即返回

// 4️⃣ 公平锁
new ReentrantLock(true);  // FIFO顺序获取锁

// 5️⃣ 多条件变量
Condition cond1 = lock.newCondition();
Condition cond2 = lock.newCondition();  // 可创建多个

// 6️⃣ 可查询状态
lock.isLocked();           // 是否被持有
lock.getHoldCount();       // 重入次数
```

### 八、AQS 核心原理

```
┌────────────────────────────────────────────────┐
│ AbstractQueuedSynchronizer (AQS)               │
├────────────────────────────────────────────────┤
│  state (int)  ←─ 0表示锁空闲，>0表示被持有       │
│                                                │
│  CLH队列（双向链表）                             │
│  ┌──────┐   ┌──────┐   ┌──────┐               │
│  │ head │ ↔ │ node │ ↔ │ tail │               │
│  └──────┘   └──────┘   └──────┘               │
│  等待队列，FIFO，线程在此park等待                │
└────────────────────────────────────────────────┘
```

### 九、更多实战案例

#### 案例2：分布式锁降级方案

```java
/**
 * 场景：Redis分布式锁获取失败时，降级为本地锁
 * 优点：保证高可用，Redis故障时仍能工作
 */
public class DegradeLockService {
    private final ReentrantLock localLock = new ReentrantLock();
    
    public void doWithLock(String lockKey, Runnable task) {
        boolean redisLocked = redisLock.tryLock(lockKey, 3, TimeUnit.SECONDS);
        
        if (redisLocked) {
            try { task.run(); } 
            finally { redisLock.unlock(lockKey); }
        } else {
            log.warn("Redis锁获取失败，降级为本地锁");
            if (localLock.tryLock(1, TimeUnit.SECONDS)) {
                try { task.run(); } 
                finally { localLock.unlock(); }
            } else {
                throw new BusinessException("系统繁忙");
            }
        }
    }
}
```

**面试话术**：
> "我们用ReentrantLock做Redis分布式锁的降级方案。正常走Redis锁，Redis故障时降级为本地锁，保证高可用。"

#### 案例3：令牌桶限流器

```java
/**
 * 场景：接口限流，控制每秒最多处理N个请求
 */
public class RateLimiter {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition tokenAvailable = lock.newCondition();
    private int tokens;
    
    public boolean tryAcquire() {
        if (lock.tryLock()) {  // 非阻塞
            try {
                if (tokens > 0) { tokens--; return true; }
                return false;
            } finally { lock.unlock(); }
        }
        return false;
    }
    
    private void addToken() {
        lock.lock();
        try {
            tokens++;
            tokenAvailable.signal();  // 精确唤醒
        } finally { lock.unlock(); }
    }
}
```

**面试话术**：
> "我用ReentrantLock + Condition实现令牌桶限流器。tryLock()非阻塞快速失败，Condition实现精确唤醒。"

---

## 🎯 速记口诀

```
synchronized记3点：关键字、自动释放、JDK6锁升级
ReentrantLock记6点：可中断、可超时、非阻塞、公平锁、多Condition、查状态
选Lock的场景：需要超时、需要中断、需要公平、需要多条件
队列都有：sync用EntryList+WaitSet，Lock用AQS的CLH队列
```
