# Excel数据验证功能：让表格填写更规范

数据验证是Excel中一个超好用的功能，它能给你的单元格设置规则，让数据输入更规范、减少错误。想象一下，你做了个表格给同事填，结果收回来时间格式五花八门，有的写数字没单位，有的随便乱填——这种情况太常见了！数据验证就是来解决这类问题的法宝。

## 什么是数据验证

数据验证说白了就是给单元格设定规则，不符合规则的数据就不让输入。比如说你要求只能填数字，那么输字母时Excel就会弹出警告，提醒你“诶，这儿只能填数字哦”。

操作也很简单：
    
    
    1. 选中要设置验证的单元格
    2. 点击「数据」选项卡
    3. 找到「数据验证」按钮并点击
    

这功能在做调查问卷、数据收集表格时特别有用。你肯定不想收到一堆格式各异的数据然后花几个小时去整理吧？

## 常见的验证类型

数据验证有好几种类型，根据需要选择适合的就行。

### 整数验证

限制只能输入整数，还能设置范围。
    
    
    验证条件：整数
    数据：介于
    最小值：1
    最大值：100
    

这样就限制了只能输入1到100之间的整数。做投票统计、库存管理啥的可太实用了。

温馨提示：设置了整数验证后，输入带小数点的数字时会报错哦。如果想允许小数，就用下面的“小数”验证类型。

### 日期验证

让用户只能输入特定日期范围：
    
    
    验证条件：日期
    数据：介于
    开始日期：=TODAY()
    结束日期：=TODAY()+30
    

这个例子限制只能输入今天到30天后的日期。挺适合做项目计划表、交付时间表之类的。

### 下拉列表验证

这个是我最爱用的！限制用户只能从预设选项中选择，避免乱填乱写：
    
    
    验证条件：序列
    来源：北京，上海，广州，深圳
    

也可以用单元格区域作为来源：
    
    
    验证条件：序列
    来源：=A1：A10
    

做表格常用的部门名称、产品分类啥的都可以用这个，填写又快又准确。

## 错误提示设置

数据验证的魅力还在于可以自定义错误提示，让用户看到友好的提示信息，而不是冰冷的系统错误。

在“数据验证”对话框中，切换到“错误警报”选项卡：
    
    
    标题：输入错误
    错误消息：请输入1-100之间的整数
    样式：停止
    

样式有三种：

  * **停止** ：禁止输入不符合条件的数据
  * **警告** ：显示警告但允许继续
  * **信息** ：提供信息，用户可选择是否继续

给错误提示设置个容易理解的说明，能大大提高用户体验。我做过一个表格，提示语是“销售数量必须是正整数，不能填小数和负数哦~”，同事们表示太贴心了。

## 输入信息提示

除了错误提示，还可以设置输入提示，在用户选中单元格时就显示规则说明：
    
    
    标题：员工编号
    输入信息：请输入6位数字员工编码，以9开头
    

这样用户一点到这个单元格，就能看到应该怎么填，省去反复沟通成本。

## 高级应用：组合验证

有时候单一的验证规则满足不了需求，这时候可以用公式验证来实现复杂规则。
    
    
    验证条件：自定义
    公式：=AND(LEN(A1)=6，LEFT(A1，1)=“9”)
    

这个例子验证A1单元格的值必须是6位且首字符为9。用AND函数组合条件，只有全部满足才能通过验证。

你还可以用OR函数设置“满足任一条件即可”的验证规则。玩转公式验证，你的表格智能程度直接上一个台阶！

## 批量设置验证

要在多个单元格设置相同的验证规则，不用重复操作：
    
    
    1. 设置好一个单元格的验证规则
    2. 复制这个单元格(Ctrl+C)
    3. 选中其他要设置的单元格
    4. 右键-选择性粘贴-验证
    

这招省时省力，尤其是处理大型表格的时候。

## 数据验证的维护

表格用着用着，需求可能会变化。修改已经设置过的验证也很简单：
    
    
    1. 选中已有验证的单元格
    2. 数据-数据验证
    3. 修改验证条件
    

要完全删除验证，在数据验证对话框中点击“清除全部”即可。

数据验证用好了是个神器，绝对能让你的表格更专业、更易用。不知不觉就讲了这么多，希望对你有所帮助。有空再给大家讲讲数据验证搭配条件格式的组合技，那更是Excel中的必杀技！‌​​‌​​‌​‌​​‌‌‌‌​‌​​‌​​​​‌​​‌‌​​​‌​​‌‌​‌​‌‌​​‌‌‌​‌‌​​‌​​​‌‌​​​‌‌‌‌‌​​​‌‌‌‌‌​​​‌‌‌