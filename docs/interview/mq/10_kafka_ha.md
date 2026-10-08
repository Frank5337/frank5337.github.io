---
prev:
  text: 'Kafka为什么吞吐高'
  link: '/interview/mq/09_kafka_throughput'
next:
  text: 'Message Queue 题目列表'
  link: '/interview/mq'
---

# Kafka如何保证高可用

## 题目

> Kafka 如何保证高可用？

## 参考答案

Kafka 主要依赖：

- 分区副本机制
- ISR 同步副本集合
- leader / follower 切换

可以再补一句：可用性靠副本，一致性靠 ISR 和 ack 策略。
## 回答展开

- MQ 题最好分成生产端、Broker、消费端三段来讲。
- 如果涉及幂等、重试、顺序性，重点说明业务语义而不是只看消息语义。
- 如果是 Kafka，还可以带上分区、副本、ISR 这些关键字。

## 实际场景

比如订单创建、支付成功、发券通知这类消息链路，一旦出现重复消费、积压或消息丢失，都会直接影响业务结果，所以 MQ 治理非常关键。





