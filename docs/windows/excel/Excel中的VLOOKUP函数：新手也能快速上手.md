# Excel中的VLOOKUP函数：新手也能快速上手

VLOOKUP函数听着好像很高大上，实际上它就是个帮你找东西的小助手。就像你去超市买东西，你知道想买啥，但不知道在哪个货架。VLOOKUP就是那个熟悉超市布局的员工，告诉你：“哦，那个在3号货架，第2层。”它在处理大量数据时特别有用，帮你从表格中找出你需要的信息，省时省力又准确。

## VLOOKUP长啥样

VLOOKUP函数的基本格式是这样的：
    
    
    =VLOOKUP(查找值， 查找范围， 列索引值， [匹配方式])
    

咱们来看看每个参数是干嘛用的：

  * **查找值** ：你想找的东西，可以是文字、数字或单元格引用
  * **查找范围** ：你要在哪片“区域”里找，通常是一个表格区域
  * **列索引值** ：找到了之后，你想要返回查找行中的第几列数据
  * **匹配方式** ：TRUE表示近似匹配，FALSE表示精确匹配

啥？还是不明白？别急，我给你举个栗子。

## 实际栗子演示

假设你有个商品表，列了商品编号、名称、单价和库存量：

商品编号| 商品名称| 单价| 库存量  
---|---|---|---  
A001| 苹果| 5.5| 200  
A002| 香蕉| 3.5| 150  
A003| 橙子| 4.0| 180  
A004| 葡萄| 8.0| 120  
  
现在你知道商品编号是A003，想知道它的单价。可以这么写：
    
    
    =VLOOKUP(“A003”， A1：D5， 3， FALSE)
    

这个公式的意思是：

  1. 查找值是“A003”
  2. 在A1到D5这个范围里找
  3. 找到后，返回该行第3列的值（单价那列）
  4. FALSE表示精确匹配，必须完全一样才行

运行结果是4.0，这就是橙子的单价。

## VLOOKUP的“坑”们

大家用VLOOKUP时经常会踩坑，我也踩过不少，这里给你指出几个：

**坑1：查找值必须在最左列**

VLOOKUP只能从左往右找，不能从右往左。也就是说，你要找的值必须在查找范围的第一列。

❌ 错误示范：想通过商品名称找商品编号
    
    
    =VLOOKUP(“橙子”， A1：D5， 1， FALSE)  
    

这样是找不到的，因为“橙子”在第二列，不是第一列。

**坑2：列索引值是相对位置**

列索引值是相对于你设定的查找范围的，不是整个Excel表格的列号。

❌ 错误示范：
    
    
    =VLOOKUP(“A003”， A1：D5， C， FALSE)  
    

这里的C是错的，应该用数字3，因为单价是查找范围内的第3列。

**坑3：匹配模式的陷阱**

匹配模式设为TRUE时，VLOOKUP会找最接近的值（但不超过它）。数据必须按第一列升序排列，不然结果会出错。

温馨提示：大多数情况下，建议把匹配模式设为FALSE，避免莫名其妙的错误。除非你确实需要近似匹配功能。

## 实用技巧

**技巧1：用通配符进行模糊查找**

如果你不确定完整的查找值，可以用通配符：

  * *表示任意多个字符
  * ？表示任意单个字符

找所有A开头的商品：
    
    
    =VLOOKUP(“A*”， A1：D5， 2， FALSE)
    

用通配符时必须把匹配模式设为TRUE。这是个例外情况。

**技巧2：结合IFERROR处理找不到的情况**

有时候VLOOKUP找不到值就会返回#N/A错误，这样很难看。可以用IFERROR函数来优化显示：
    
    
    =IFERROR(VLOOKUP(“A009”， A1：D5， 3， FALSE)， “没找到此商品”)
    

这样，找不到A009时，就会显示“没找到此商品”，而不是难看的错误提示。

**技巧3：复制公式时锁定查找范围**

当你把VLOOKUP公式复制到其他单元格时，查找范围会跟着变化。要避免这种情况，可以用$符号锁定范围：
    
    
    =VLOOKUP(A10， $A$1：$D$5， 3， FALSE)
    

这样复制到哪儿，查找范围都固定在A1：D5。

## VLOOKUP和HLOOKUP的区别

VLOOKUP是垂直查找（V代表Vertical），从上到下找。而HLOOKUP是水平查找（H代表Horizontal），从左到右找。选哪个取决于你的数据排列方式。

大部分情况下咱们用VLOOKUP，因为数据通常是上下排列的。除非你的表格是横着排的，那才需要HLOOKUP。

用HLOOKUP时，参数跟VLOOKUP类似，但第三个参数变成了行索引值：
    
    
    =HLOOKUP(查找值， 查找范围， 行索引值， [匹配方式])
    

Excel的VLOOKUP虽然有些小脾气（比如只能从左往右找），但它确实是处理数据查找的一把好手。只要你掌握了这些基本用法和注意事项，就能在日常工作中游刃有余地运用它。记得多动手练习，遇到新的需求就琢磨着用VLOOKUP怎么解决，很快你就能成为办公室里的Excel达人啦！‌​​‌​​‌​‌​​‌‌‌‌​‌​​‌​​​​‌​​‌‌​​​‌​​‌‌​‌​‌‌​​‌‌‌​‌‌​​‌​​​‌‌​​​‌‌‌‌‌​​​‌‌‌‌‌​​​‌‌‌