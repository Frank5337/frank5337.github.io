# Excel中处理日期和时间的实用技巧

咱们Excel里的日期时间处理，说简单吧，确实不复杂；说难吧，还真有不少坑。今天咱就一起聊聊Excel中那些跟日期和时间打交道的小技巧，帮你处理各种日期时间数据，让你不再为算天数、找周几、提取年月而犯愁。

## Excel如何存储日期和时间

Excel存日期时间可有意思了，它把日期当成了数字！具体来说，1900年1月1日是1，1900年1月2日是2...依此类推。时间则是一天的小数部分，比如中午12点是0.5，晚上6点是0.75。
    
    
    =TODAY() '返回今天的日期
    =NOW() '返回现在的日期和时间
    

你在单元格里看到“2023/4/9”，但Excel心里想的是数字44695。这就是为啥有时候你输入日期，Excel却给你显示成数字了。

**温馨提示** ：Excel和我们想的不太一样，它默认1900年是闰年，这是个历史遗留问题。其实那年不是闰年，这导致了2月29日这个本不该存在的日期在Excel里却能正常使用！

## 日期格式化花样百出

Excel里格式化日期的方式多得很，想咋显示就咋显示。

右键单元格→单元格格式→数字→日期/时间，你就能看到各种内置格式。不过更灵活的是自定义格式：
    
    
    yyyy-mm-dd     # 2023-04-09
    d/m/yyyy       # 9/4/2023
    dd-mmm-yy      # 09-Apr-23
    yyyy年m月d日    # 2023年4月9日
    dddd           # 星期日
    

还有，你知道吗？自定义格式里还可以搞条件格式：
    
    
    [>0]“正数”；[<0]“负数”；[=0]“零”；@
    

## 算算日期差 - 天数和工作日

两个日期相减最简单，直接减就行了，得到的是天数：
    
    
    =B2-A2 '两个日期之间的天数
    

不过生活里咱们常常只关心工作日，周末不算。这时候就用NETWORKDAYS函数：
    
    
    =NETWORKDAYS(A2，B2) '两个日期之间的工作日数量
    =NETWORKDAYS(A2，B2，C2：C10) '可以在C2：C10指定哪些日子是假期，不算工作日
    

有次我算错工作日，搞得加班费少拿了好几百...记得用这函数！

## 加加减减日期

想算出30天后是几号？别用日历掰手指头算，用DATEADD函数：
    
    
    =DATE(YEAR(A2)，MONTH(A2)，DAY(A2)+30) '加30天
    

或者更简单点：
    
    
    =A2+30 '加30天
    

加月或年就不能直接算了，得这么写：
    
    
    =DATE(YEAR(A2)，MONTH(A2)+3，DAY(A2)) '加3个月
    =DATE(YEAR(A2)+1，MONTH(A2)，DAY(A2)) '加1年
    

**温馨提示** ：月份加减要小心月底问题！比如1月31日加一个月，Excel会聪明地给你2月28日（非闰年）。

## 提取年月日时分秒

有时候我们只需要日期的一部分，比如只要年份或月份，这时候就用这些函数：
    
    
    =YEAR(A2)     '提取年份
    =MONTH(A2)    '提取月份（1-12）
    =DAY(A2)      '提取日(1-31)
    =HOUR(A2)     '提取小时(0-23)
    =MINUTE(A2)   '提取分钟(0-59)
    =SECOND(A2)   '提取秒(0-59)
    

还有个冷门但超实用的：
    
    
    =WEEKDAY(A2)  '返回星期几(1-7)，默认1是星期日
    =WEEKDAY(A2，2) '返回星期几(1-7)，指定1是星期一
    

上个月做报表，我就用这个把销售数据按星期几分析，发现周三销量最高，老板直呼内行！

## 文本转日期的小把戏

最烦的就是从别处复制来的日期变成了文本，Excel不认。处理这种情况有几招：

  1. VALUE函数：

    
    
    =VALUE(A2) '把文本格式的日期转换成真正的日期
    

  2. 文本分列大法：  
选中数据→数据→文本分列→按固定宽度→下一步→完成

  3. 还有个偏方，就是乘以1：

    
    
    =A2*1 '文本日期乘以1，神奇地变成了真日期
    

我上次遇到个文本日期是“2023年04月09日”这种格式，那就用：
    
    
    =DATEVALUE(SUBSTITUTE(SUBSTITUTE(A2，“年”，“/”)，“月”，“/日”，“”))
    

好吧，这行代码有点绕，其实就是把中文的年月日替换成斜杠，再用DATEVALUE转成日期。

## 显示“昨天”、“今天”、“明天”这种动态描述

想在报表里显示更加人性化的日期描述？可以用条件格式：
    
    
    =IF(A2=TODAY()，“今天”，IF(A2=TODAY()-1，“昨天”，IF(A2=TODAY()+1，“明天”，TEXT(A2，“yyyy-mm-dd”))))
    

其实这段公式写得不太优雅，但挺管用。我记得有次做个日程表，就用这招让老板一眼就能看出哪些任务是今明天要做的。

## 处理跨时区日期

处理国际业务时，时区问题最头疼。Excel没有直接处理时区的功能，但可以通过加减小时来实现：
    
    
    =A2+TIME(8，0，0) '把UTC时间转成北京时间(加8小时)
    

偶尔收到美国客户的订单，我就用这招把他们那边的时间换算成咱们这边的。

处理日期时间，Excel还有不少实用招数。多琢磨琢磨这些函数的组合应用，你肯定能让那些报表和数据分析变得更加高效。这些技巧看似简单，但我估计有70%的Excel用户都不完全清楚，掌握了就是你的小秘招！

日期时间处理好了，效率提高不少吧。Excel真是个好东西，简单又强大，每天都能发现它的新用途。‌​​‌​​‌​‌​​‌‌‌‌​‌​​‌​​​​‌​​‌‌​​​‌​​‌‌​‌​‌‌​​‌‌‌​‌‌​​‌​​​‌‌​​​‌‌‌‌‌​​​‌‌‌‌‌​​​‌‌‌