# 题目4：JUC体系 & CAS / Atomic 原理

> 📊 评分：— | 📅 完成时间：2026-04-01（直接参考答案）

---

## 📝 题目

> JUC（java.util.concurrent）了解多少？请介绍下 JUC 的整体体系结构。Atomic 包是干什么的？CAS 的原理是什么？有什么问题？

---

## 💬 我的回答

<PasswordProtect>

（本题跳过作答，直接查看参考答案）

</PasswordProtect>

---

## 📖 参考答案

### 一、JUC 整体体系结构

```
┌─────────────────────────────────────────────────────────────────┐
│                  java.util.concurrent 体系                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ① 锁机制 (locks)                                              │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ ReentrantLock        — 可重入互斥锁                    │      │
│  │ ReentrantReadWriteLock — 读写锁（读共享、写排他）      │      │
│  │ StampedLock (JDK8)   — 乐观读锁，性能更高              │      │
│  │ Condition            — 条件变量，替代wait/notify        │      │
│  │ LockSupport          — park/unpark 线程阻塞工具         │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ② 原子类 (atomic)                                              │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ AtomicInteger/Long/Boolean — 基本类型原子操作           │      │
│  │ AtomicReference           — 引用类型原子操作            │      │
│  │ AtomicStampedReference    — 带版本号，解决ABA问题       │      │
│  │ LongAdder/LongAccumulator — 高并发累加器（JDK8）       │      │
│  │ AtomicIntegerArray       — 数组元素原子操作             │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ③ 并发容器                                                     │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ ConcurrentHashMap     — 线程安全HashMap                │      │
│  │ CopyOnWriteArrayList  — 读多写少的List                 │      │
│  │ ConcurrentLinkedQueue — 无锁队列                       │      │
│  │ BlockingQueue (多种实现) — 阻塞队列                    │      │
│  │   ├ ArrayBlockingQueue   — 有界数组队列                │      │
│  │   ├ LinkedBlockingQueue  — 可选有界链表队列            │      │
│  │   ├ PriorityBlockingQueue — 优先级队列                 │      │
│  │   ├ SynchronousQueue     — 无容量队列（直接传递）       │      │
│  │   └ DelayQueue           — 延迟队列                    │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ④ 线程池 (executor)                                            │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ ThreadPoolExecutor    — 核心线程池                      │      │
│  │ ScheduledThreadPoolExecutor — 定时/周期任务             │      │
│  │ ForkJoinPool          — 分治任务框架                    │      │
│  │ Executors             — 工厂类（不推荐直接用）          │      │
│  │ Future / CompletableFuture — 异步结果                   │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ⑤ 同步工具                                                     │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ CountDownLatch  — 倒计数门闩（一次性）                  │      │
│  │ CyclicBarrier   — 循环栅栏（可重用）                    │      │
│  │ Semaphore       — 信号量（控制并发数）                  │      │
│  │ Phaser (JDK7)   — 可重用的分阶段同步                   │      │
│  │ Exchanger       — 线程间数据交换                        │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**一句话概括**：JUC = 锁 + 原子类 + 并发容器 + 线程池 + 同步工具，是 Java 并发编程的工具百宝箱。

---

### 二、Atomic 包详解

#### 2.1 Atomic 包是干什么的？

> **提供无锁（Lock-Free）的线程安全操作**，底层基于 CAS 实现，比 synchronized 更轻量。

#### 2.2 常用类分类

| 分类 | 类名 | 说明 |
|------|------|------|
| **基本类型** | AtomicInteger, AtomicLong, AtomicBoolean | 对 int/long/boolean 的原子操作 |
| **引用类型** | AtomicReference | 对象引用的原子操作 |
| **带版本号** | AtomicStampedReference | 解决 ABA 问题 |
| **带标记** | AtomicMarkableReference | 带 boolean 标记的引用 |
| **数组类型** | AtomicIntegerArray, AtomicLongArray | 数组元素的原子操作 |
| **字段更新** | AtomicIntegerFieldUpdater | 对某个类的 volatile 字段做原子更新 |
| **高性能累加** | LongAdder, DoubleAdder (JDK8) | 分段CAS，高并发下性能远超AtomicLong |

#### 2.3 使用示例

```java
// 基本用法
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();    // 原子 ++i
count.compareAndSet(1, 2);  // CAS: 期望值1 → 新值2

// 高并发累加：LongAdder 比 AtomicLong 快数倍
LongAdder adder = new LongAdder();
adder.increment();  // 分段CAS，减少竞争
adder.sum();        // 汇总结果
```

---

### 三、CAS 原理

#### 3.1 什么是 CAS？

> **Compare And Swap（比较并交换）**，是一种无锁的原子操作。

```
CAS(V, Expected, New)

V：要修改的内存地址的值
Expected：期望的旧值
New：要设置的新值

如果 V == Expected，则 V = New，返回 true
如果 V != Expected，说明被别人改过了，返回 false
```

#### 3.2 底层实现

```
Java层：Unsafe.compareAndSwapInt()
   ↓
JNI层：调用 C++ 代码
   ↓
CPU层：lock cmpxchg 指令（x86架构）
         └── lock前缀保证原子性（锁总线或锁缓存行）
```

**关键**：CAS 是**一条 CPU 指令**完成的，天然原子，不需要锁！

#### 3.3 CAS 自旋流程

```java
// AtomicInteger.incrementAndGet() 的本质
do {
    int expected = get();        // 读取当前值
    int newValue = expected + 1; // 计算新值
} while (!compareAndSet(expected, newValue));  // CAS失败则重试
```

```
线程1: 读到 expected=5 → CAS(5, 6) → 成功 ✅
线程2: 读到 expected=5 → CAS(5, 6) → 失败（已经是6了）❌ → 重新读 expected=6 → CAS(6, 7) → 成功 ✅
```

---

### 四、CAS 的三大问题

#### 问题1：ABA 问题 ⭐⭐⭐

```
线程1: 读到 A，准备改成 C
线程2: 先把 A 改成 B，再改回 A
线程1: CAS发现还是A，以为没人改过 → 修改成功

但实际上中间被改过了！
```

**解决方案**：

```java
// AtomicStampedReference — 带版本号
AtomicStampedReference<Integer> ref = new AtomicStampedReference<>(100, 0);

int stamp = ref.getStamp();  // 获取版本号
ref.compareAndSet(100, 200, stamp, stamp + 1);  // 同时比较值和版本号
```

**面试追问**：ABA 在什么场景下真的有问题？
> 链表/栈等数据结构中，A节点被移除又放回来，但其后续节点已经变了，直接操作会出错。简单数值累加一般不受影响。

#### 问题2：自旋开销大

```
如果CAS一直失败（竞争激烈），线程会一直循环重试：
while (!cas(...)) { } // CPU空转，浪费资源
```

**解决方案**：
- **LongAdder**：分段CAS，把一个值拆分成多个Cell，减少竞争

```
AtomicLong:  所有线程对同一个值CAS → 竞争激烈
                    ┌─ CAS ─┐
           Thread1 ─┤       ├─ value
           Thread2 ─┤       │
           Thread3 ─┘       │

LongAdder:  不同线程对不同Cell CAS → 竞争分散
           Thread1 → Cell[0]
           Thread2 → Cell[1]
           Thread3 → Cell[2]
           最终结果 = base + ΣCell[i]
```

#### 问题3：只能保证一个变量的原子操作

```
CAS 只能对一个变量做原子操作
如果要同时更新两个变量？ → CAS做不到
```

**解决方案**：
- 把多个变量封装成一个对象，用 `AtomicReference`
- 或者用锁

```java
// 封装成对象
class Pair {
    int x, y;
}
AtomicReference<Pair> ref = new AtomicReference<>(new Pair(1, 2));
ref.compareAndSet(oldPair, newPair);  // 整体替换
```

---

### 五、LongAdder vs AtomicLong ⭐ 高频追问

| 特性 | AtomicLong | LongAdder (JDK8) |
|------|-----------|-------------------|
| **原理** | 所有线程CAS同一个值 | 分段CAS（base + Cell[]） |
| **低并发** | 性能差不多 | 略慢（多一层计算） |
| **高并发** | CAS频繁失败，性能差 | **性能高数倍** |
| **精确读取** | `get()` 精确 | `sum()` 不精确（非原子汇总） |
| **适用场景** | 需要精确值（如序列号） | 统计计数（如QPS统计） |

```java
// 高并发统计推荐用 LongAdder
LongAdder requestCount = new LongAdder();

// 每个请求
requestCount.increment();

// 定期统计
long total = requestCount.sum();
```

---

### 六、实际项目案例

#### 案例1：接口调用计数器

```java
/**
 * 场景：统计接口调用次数，用于监控
 * 选择 LongAdder 而非 AtomicLong，因为写多读少
 */
public class ApiCounter {
    private final ConcurrentHashMap<String, LongAdder> counterMap = new ConcurrentHashMap<>();

    public void record(String api) {
        counterMap.computeIfAbsent(api, k -> new LongAdder()).increment();
    }

    public long getCount(String api) {
        LongAdder adder = counterMap.get(api);
        return adder == null ? 0 : adder.sum();
    }
}
```

#### 案例2：CAS实现无锁栈

```java
/**
 * 场景：高性能无锁栈，用 CAS 替代 synchronized
 */
public class LockFreeStack<T> {
    private final AtomicReference<Node<T>> top = new AtomicReference<>();

    public void push(T value) {
        Node<T> newNode = new Node<>(value);
        Node<T> oldTop;
        do {
            oldTop = top.get();
            newNode.next = oldTop;
        } while (!top.compareAndSet(oldTop, newNode));  // CAS自旋
    }

    public T pop() {
        Node<T> oldTop;
        Node<T> newTop;
        do {
            oldTop = top.get();
            if (oldTop == null) return null;
            newTop = oldTop.next;
        } while (!top.compareAndSet(oldTop, newTop));
        return oldTop.value;
    }
}
```

---

## 🎯 面试标准话术

> "JUC 是 Java 并发的核心包，主要包括五大部分：**锁机制**（ReentrantLock、ReadWriteLock）、**原子类**（Atomic系列）、**并发容器**（ConcurrentHashMap、BlockingQueue）、**线程池**（ThreadPoolExecutor）、**同步工具**（CountDownLatch、Semaphore）。
>
> Atomic 包提供**无锁的线程安全操作**，底层基于 **CAS**（Compare And Swap）实现。CAS 是一条 CPU 指令（lock cmpxchg），比较内存值与期望值，相等则更新，天然原子。
>
> CAS 有三个问题：**ABA**（用 AtomicStampedReference 加版本号解决）、**自旋开销**（用 LongAdder 分段CAS解决）、**只能操作单个变量**（用 AtomicReference 封装对象解决）。
>
> 实际项目中，我们用 LongAdder 做接口调用计数，因为高并发写场景下它比 AtomicLong 性能高数倍。"

---

## 🔑 速记口诀

```
JUC五件套：锁、原子、容器、线程池、同步工具
CAS三句话：比较并交换、一条CPU指令、无锁原子
CAS三问题：ABA加版本号、自旋用LongAdder、单变量用AtomicReference
Atomic选型：精确值用AtomicLong，统计用LongAdder
```
