# 系统设计
- 最近一个小时内访问频率最高的10个IP
    ```
    实时输出最近一个小时内访问频率最高的10个IP，要求：
    
    实时输出
    从当前时间向前数的1个小时
    QPS可能会达到10W/s
    ```
- 短网址系统(TinyURL)
    ```
    如何设计一个短网址服务(TinyURL)？
    
    使用场景(Scenario)
    微博和Twitter都有140字数的限制，如果分享一个长网址，很容易就超出限制，发布出去。短网址服务可以把一个长网址变成短网址，方便在社交网络上传播。
    
    需求(Needs)
    很显然，要尽可能的短。长度设计为多少才合适呢？
    ```