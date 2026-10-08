# 什么是 Skill，怎么写 Skill

## 什么是 Skill

Skill 可以理解成给 Codex 准备的一份“专项工作说明书”。

它不是新的模型能力，也不是一个插件本身，而是一组可以复用的说明、流程、脚本和参考资料。它的作用是让 Codex 在遇到某类任务时，不必每次都重新摸索，而是直接按一套更稳定、更专业的方式去做。

可以把 Skill 想成下面这几种东西的结合：

- 某个领域的操作手册
- 某类任务的标准流程
- 一套可复用脚本和模板
- 一份“什么时候该这么做”的触发说明

比如下面这些场景就很适合做成 Skill：

- 反复处理 PDF
- 反复分析某个系统的日志
- 反复生成同一种前端项目骨架algoli
- 反复接入公司内部 API
- 反复处理某种固定格式的数据

一句话总结：

> Skill 的目标，是把“重复出现的专业任务”沉淀成一套可以稳定复用的能力包。

---

## Skill 能提供什么

一个 Skill 通常会提供 4 类价值：

### 1. 专项流程

告诉 Codex 这类任务该按什么步骤做。

例如：

- 先看输入文件格式
- 再跑哪个脚本
- 再读哪份参考资料
- 最后如何验证结果

### 2. 工具使用规范

告诉 Codex 某类工具该怎么安全、稳定地使用。

例如：

- 操作数据库前先做只读检查
- 处理图片时优先用某个脚本
- 修改 Word 文档时保留原始格式

### 3. 领域知识

放模型默认并不知道、但任务又经常依赖的背景资料。

例如：

- 公司内部表结构
- 业务规则
- 接口约定
- 文件格式规范

### 4. 可复用资源

把重复写的内容直接沉淀下来。

例如：

- 脚本
- 模板
- 样板代码
- 参考文档

---

## 一个 Skill 的基本结构

最小可用的 Skill，其实只需要一个文件：

```text
my-skill/
└── SKILL.md
```

稍微完整一点的结构通常是：

```text
my-skill/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── scripts/
├── references/
└── assets/
```

各部分含义如下：

- `SKILL.md`
  Skill 的核心文件，必须有。定义它是什么、什么时候用、怎么做。

- `agents/openai.yaml`
  给界面展示用的元信息，推荐有，但不是最小必需。

- `scripts/`
  放可执行脚本。适合那些每次都重复写、而且最好稳定执行的逻辑。

- `references/`
  放参考资料。适合体积比较大、但不是每次都要全部加载进上下文的内容。

- `assets/`
  放模板、素材、样板文件。这些通常不是给模型“读”的，而是给模型“拿来用”的。

---

## Skill 最重要的文件：SKILL.md

`SKILL.md` 是一个 Skill 的核心。它通常由两部分组成：

1. YAML frontmatter
2. Markdown 正文

一个最小示例如下：

```md
---
name: api-error-triage
description: Diagnose backend API errors, inspect logs, code paths, and config, then propose fixes. Use when Codex needs to排查接口报错、状态码异常、配置错误、调用链故障或服务响应异常。
---

# API Error Triage

## Workflow

1. Read the request context and error message.
2. Locate the relevant code path, config, and logs.
3. Determine whether the problem is in input, business logic, dependency, or environment.
4. Propose the smallest safe fix first.
5. Validate with a targeted reproduction or test.

## Use resources

- For common log patterns, read `references/log-patterns.md`
- For deterministic checks, run scripts in `scripts/`

## Notes

- Prefer config and recent-change checks before large refactors.
- Keep fixes minimal and easy to verify.
```

---

## `name` 怎么写

`name` 是 Skill 的名字，建议遵循这些规则：

- 用小写字母、数字、连字符
- 简短清晰
- 最好直接表达动作或用途

例如：

- `api-error-triage`
- `pdf-editor`
- `docx-review`
- `internal-sql-helper`

不太建议：

- `MyVeryPowerfulSkillForManyThings`
- `tool`
- `misc-helper`

因为这类名字太泛，不利于理解和触发。

---

## `description` 怎么写

`description` 是最重要的一块。

因为 Codex 在判断“什么时候该用这个 Skill”时，首先看的就是这里。它应该同时写清楚两件事：

- 这个 Skill 做什么
- 什么情况下应该用它

一个好的 `description` 应该尽量包含：

- 任务类型
- 触发场景
- 典型关键词

例如：

```yaml
description: Create, edit, and analyze DOCX documents while preserving formatting. Use when Codex needs to生成 Word 文档、修改合同内容、处理批注、保留格式或提取文档结构信息。
```

这个写法就比下面这种强很多：

```yaml
description: Help with DOCX files.
```

后者太短，触发信息不够。

---

## 正文该写什么

正文不要写成百科全书，更不要把模型本来就知道的大量常识重复一遍。

正文最适合写的是：

- 这类任务推荐的标准流程
- 哪些步骤不能跳
- 哪些资源该什么时候读
- 哪些脚本该什么时候用
- 常见陷阱和边界

### 推荐结构

可以按下面这种顺序写：

1. 核心流程
2. 资源入口
3. 约束和注意事项
4. 验证方式

例如：

```md
# Internal SQL Helper

## Workflow

1. Read the schema reference first.
2. Confirm whether the request is read-only or write-impacting.
3. Start with the smallest possible query.
4. Explain assumptions before generating destructive SQL.

## References

- Schema: `references/schema.md`
- Naming rules: `references/conventions.md`

## Notes

- Prefer read-only inspection first.
- Avoid full table scans when a narrower query is available.
```

---

## 什么时候需要 `scripts/`

如果你发现某类操作每次都在重复写，而且最好稳定执行，就适合放进 `scripts/`。

例如：

- 批量处理 PDF
- 批量重命名文件
- 解析固定格式日志
- 生成固定目录结构
- 调用内部系统接口

放脚本的好处有两个：

- 节省上下文
- 执行更稳定

也就是说，能靠脚本稳定解决的事情，就不要每次都让模型现写一遍。

---

## 什么时候需要 `references/`

如果有一类信息很重要，但不是每次都需要全部读进上下文，就放到 `references/`。

例如：

- 数据库 schema
- API 文档
- 业务规则
- 文件格式说明
- 公司内部流程

这样做的好处是：

- `SKILL.md` 可以保持简洁
- 只有需要时才去读详细资料

这就是典型的“渐进加载”思路。

---

## 什么时候需要 `assets/`

如果某些文件主要是“拿来作为输出基础”，而不是“拿来给模型阅读”，那就适合放 `assets/`。

例如：

- 前端模板
- PPT 模板
- Logo
- 图标
- 字体
- 样板工程

这些资源通常是给最终产出服务的，不一定需要全部塞进上下文。

---

## 写 Skill 的核心原则

### 1. 只写模型不知道但任务又需要的内容

不要把 Skill 写成教科书。

模型本来就知道的通用知识，没必要反复灌进去。Skill 更应该写：

- 任务流程
- 环境约束
- 专有规则
- 可复用资源入口

### 2. 正文尽量短

`SKILL.md` 最好保持精炼。

因为它一旦触发，就要占上下文。写得太长，会把真正用户任务的上下文挤掉。

### 3. 细节放到 references

如果正文快变成长文档了，就该把细节拆到 `references/`。

### 4. 重复逻辑放到 scripts

不要让模型反复重写同样的脚本。

### 5. 触发条件写进 description

不要把“什么时候使用这个 Skill”只写在正文里。因为正文是在 Skill 触发后才会被读到的，真正决定是否触发的是 `description`。

---

## 一个完整一点的 Skill 示例

下面是一个“排查后端接口报错”的 Skill 示例：

```text
api-error-triage/
├── SKILL.md
├── scripts/
│   └── parse-log.py
└── references/
    ├── common-errors.md
    └── service-layout.md
```

`SKILL.md`：

```md
---
name: api-error-triage
description: Diagnose backend API errors, inspect logs, code paths, and config, then propose fixes. Use when Codex needs to排查接口报错、状态码异常、配置错误、调用链故障或服务响应异常。
---

# API Error Triage

## Workflow

1. Read the request context and error symptoms.
2. Locate related code paths and recent changes.
3. Inspect logs and config before changing code.
4. Classify the issue as input, business logic, dependency, or environment.
5. Propose the smallest safe fix.
6. Validate with a targeted reproduction or test.

## Resources

- Error patterns: `references/common-errors.md`
- Service layout: `references/service-layout.md`
- Log parser: `scripts/parse-log.py`

## Notes

- Prefer read-only investigation first.
- Avoid broad refactors before confirming the root cause.
- Keep fixes easy to verify.
```

这个 Skill 的特点是：

- 触发条件清楚
- 流程明确
- 资源入口明确
- 没有堆太多无用解释

---

## Skill 怎么从 0 到 1 写出来

可以按这个顺序来：

### 第一步：先想清楚要解决什么重复问题

先回答一个问题：

> 这个 Skill 想让 Codex 在什么任务上做得更稳定？

如果这个问题都答不清楚，Skill 很容易写散。

### 第二步：列出典型使用场景

比如：

- 用户会怎么提需求
- 哪些关键词会出现
- 常见输入是什么
- 常见输出是什么

### 第三步：决定要不要准备脚本和资料

思考三件事：

- 有没有重复脚本适合沉淀到 `scripts/`
- 有没有专有文档适合放到 `references/`
- 有没有模板适合放到 `assets/`

### 第四步：写 `SKILL.md`

优先写清楚：

- `name`
- `description`
- 流程
- 资源入口
- 注意事项

### 第五步：验证它是否真的实用

最简单的验证方式是：

- 拿一个真实任务试用
- 看 Codex 是否能顺着 Skill 的结构工作
- 看是否还会漏步骤、走偏、重复劳动

如果会，就继续改。

---

## 常见错误

### 错误 1：description 太泛

例如：

```yaml
description: Help with files
```

这种几乎没有触发价值。

### 错误 2：正文太长

把大量背景知识都塞进 `SKILL.md`，会导致上下文臃肿。

### 错误 3：没有流程，只有概念

Skill 不是知识科普，更重要的是“怎么做”。

### 错误 4：重复脚本不沉淀

明明每次都在写同样逻辑，却不放进 `scripts/`，会让 Skill 的价值大打折扣。

### 错误 5：把触发条件写在正文，不写在 description

正文不是触发入口，`description` 才是。

---

## 什么时候值得专门写一个 Skill

如果一个任务满足下面任意两条，通常就值得做成 Skill：

- 经常重复出现
- 有固定流程
- 需要专有背景知识
- 有可复用脚本
- 输出格式比较固定
- 容易踩坑，最好标准化

例如：

- 公司内部 SQL 查询助手
- PDF 批量处理
- 合同文档审阅
- 某个 SaaS 平台的接入和排障
- 某类前端项目模板生成

---

## 一句话总结

Skill 不是“再写一份说明文档”，而是：

> 把某类重复、专业、容易踩坑的任务，整理成一套让 Codex 能稳定复用的工作能力。

写 Skill 时，最重要的不是写多，而是写准：

- 触发条件要准
- 流程要准
- 资源入口要准
- 边界和注意事项要准

如果这些写准了，一个 Skill 就能真正帮 Codex 少走弯路。

