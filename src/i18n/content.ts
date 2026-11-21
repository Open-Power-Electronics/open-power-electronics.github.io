import type { Chapter, FilmChapterId } from "@/content/site.ts"

export type Lang = "en" | "zh"

type Step = { chapter: string; title: string; body: string; data: readonly string[] }
type Plugin = { name: string; body: string; stat: string }
type SpecRow = { key: string; value: string }
type Term = { name: string; body: string }

export type Content = {
  meta: { title: string }
  nav: Record<Chapter, string> & { github: string; langLabel: string }
  hero: {
    badge: string
    titleTop: string
    titleAccent: string
    titleBottom: string
    lede: string
    watch: string
    github: string
    platformsLabel: string
  }
  film: { caption: string; play: string; chapters: Record<FilmChapterId, string> }
  workspace: { title: string; lede: string; imageAlt: string; parts: readonly Term[] }
  workflow: { title: string; lede: string; steps: readonly Step[] }
  agents: {
    title: string
    lede: string
    tools: Term
    proposals: Term
    parity: {
      name: string
      title: string
      lede: string
      human: Term
      agent: Term
      gui: string
      context: string
      api: string
      apiOps: readonly string[]
      core: string
      coreSub: string
      plugins: string
      points: readonly Term[]
    }
    mark: {
      name: string
      title: string
      lede: string
      commentLabel: string
      commentAction: string
      comment: string
      steps: readonly Term[]
      statValue: string
      statLabel: string
      statDetail: string
      note: string
    }
  }
  plugins: {
    title: string
    lede: string
    builtIn: string
    thermal: Plugin
    spice: Plugin
    emc: Plugin
    parasitics: Plugin
    skill: Plugin
    yours: { name: string; body: string; tags: readonly string[] }
  }
  privacy: {
    title: string
    lede: string
    machine: string
    studio: string
    files: string
    agents: string
    provider: string
    providerSub: string
    cloud: string
    cloudSub: string
    points: readonly string[]
    note: string
  }
  specs: { title: string; product: string; rows: readonly SpecRow[] }
  closing: { line1: string; accent: string; line3: string; github: string; watch: string }
  team: {
    title: string
    core: string
    institutions: string
    institutionsEmpty: string
    contact: string
    contactGithub: string
  }
  footer: { license: string; notices: string }
}

const en: Content = {
  meta: { title: "OpenPE — AI-Native Power Electronics Engineer Workbench" },
  nav: {
    workspace: "Workspace",
    workflow: "Workflow",
    agents: "Agents",
    plugins: "Plugins",
    privacy: "Privacy",
    specs: "Specs",
    team: "Team",
    github: "GitHub",
    langLabel: "Language",
  },
  hero: {
    badge: "Open source · Built on KiCad 10",
    titleTop: "AI-Native",
    titleAccent: "Power Electronics",
    titleBottom: "Engineer Workbench",
    lede: "A desktop studio where your AI agent works in the same schematic, PCB layout, 3D model and simulation as you — on native KiCad files that never leave your machine.",
    watch: "Watch the film",
    github: "View on GitHub",
    platformsLabel: "Runs on",
  },
  film: {
    caption: "OpenPE workflow · 1:38",
    play: "Play the film",
    chapters: {
      overall: "Overall",
      schematic: "Schematic",
      layout: "Layout",
      module: "Module",
      plugins: "Plugins",
    },
  },
  workspace: {
    title: "Design and conversation, in one window.",
    lede: "Schematic, PCB layout and 3D model sit beside your agent conversation. Switch views, inspect properties, or describe the change you want.",
    imageAlt: "OpenPE desktop with the EMC Flyback layout open and transformer T1 selected",
    parts: [
      { name: "Session manager", body: "Organize chats with your agent." },
      { name: "Agent interface", body: "Chat and send design requests." },
      { name: "Design workspace", body: "Switch between Schematic, Layout, 3D Model and Source." },
      { name: "Properties", body: "Inspect and edit the selected object." },
    ],
  },
  workflow: {
    title: "From schematic to enclosure.",
    lede: "Edit directly or guide your agent. Every view works on the same project.",
    steps: [
      {
        chapter: "Schematic",
        title: "Design and verify",
        body: "Your agent builds the feedback loop, runs a 10 ms ngspice transient and tunes R15 until the output sits inside ±1%.",
        data: ["R15 39.0 → 38.1 kΩ", "VOUT 11.99–12.05 V"],
      },
      {
        chapter: "Layout",
        title: "Place with guidance",
        body: "Preview positions and angles for a group of parts, then place the whole group with Tab.",
        data: ["5 parts placed", "Tab"],
      },
      {
        chapter: "Module",
        title: "Build the case",
        body: "Model an enclosure from dimensions, then refine it in conversation — posts, walls and a clear 3 mm acrylic lid.",
        data: ["112 × 88 mm", "3 mm lid"],
      },
    ],
  },
  agents: {
    title: "Bring your own agent.",
    lede: "Connect the agent you already use. It works on the project you have open, with the access its mode allows.",
    tools: { name: "Scoped tools", body: "Run the same design, simulation and project commands as the interface." },
    proposals: { name: "Proposals", body: "Suggest changes with restricted context. You review and apply them." },
    parity: {
      name: "Agent parity",
      title: "Same commands for you and your agent.",
      lede: "What you can do in the studio, your agent can do — through scoped tools, not a shell.",
      human: { name: "You", body: "Canvas · keyboard · Properties" },
      agent: { name: "Your agent", body: "Codex · Claude Code · Cursor" },
      gui: "GUI",
      context: "Context management",
      api: "Uniform API",
      apiOps: ["Set part value", "Route tracks", "Pour copper", "Run SPICE"],
      core: "Core",
      coreSub: "One validated transaction per edit",
      plugins: "Plugins",
      points: [
        { name: "One set of commands", body: "The interface and your agent call the same capabilities, with the same validation." },
        { name: "One undo history", body: "Agent edits are ordinary transactions. Review them, apply them, undo them." },
        { name: "Review or Auto", body: "Confirm each design change, or let supported commands run automatically." },
      ],
    },
    mark: {
      name: "Mark and refine",
      title: "Point at the board. Say what you want.",
      lede: "Mark a region on the schematic or PCB, leave a comment, and send it with your next message. Your agent refines exactly that part.",
      commentLabel: "User Comment",
      commentAction: "Add",
      comment: "Could you turn D7 and C19 so the pads line up better?",
      steps: [
        { name: "Mark", body: "Select parts or draw a region on the canvas." },
        { name: "Comment", body: "Describe the change right where it belongs." },
        { name: "Refine", body: "Your agent rotates, reroutes and compares." },
      ],
      statValue: "47%",
      statLabel: "shorter secondary copper",
      statDetail: "39.9 → 21.2 mm",
      note: "Marks are screenshots attached to your message. They never edit the design on their own.",
    },
  },
  plugins: {
    title: "Plugins bridge the studio and real-world engineering.",
    lede: "Five engineering plugins ship built in. Write your own in JavaScript — they run in a sandbox with no native or network access.",
    builtIn: "Built in",
    thermal: {
      name: "Layout Thermal",
      body: "Gmsh and Elmer map PCB temperatures and locate the hottest point.",
      stat: "67.7 °C peak PCB temperature",
    },
    spice: {
      name: "SPICE Simulation",
      body: "ngspice 47 transient analysis, straight from your schematic.",
      stat: "ngspice 47",
    },
    emc: {
      name: "EMC Analysis",
      body: "Review layout geometry for EMC risks. A design review, not a compliance test.",
      stat: "Geometry review",
    },
    parasitics: {
      name: "Layout Parasitics",
      body: "Follow a pad-to-pad path and read its DC resistance and partial inductance.",
      stat: "30.30 mΩ · 17.61 nH",
    },
    skill: {
      name: "PE Layout Skill",
      body: "Bundled power-electronics layout guidance for your agent.",
      stat: "Bundled guidance",
    },
    yours: {
      name: "Your plugin",
      body: "Package JavaScript as a local plugin. It installs with your approval and runs in a QuickJS sandbox with declared inputs and project reads.",
      tags: [".openpe-plugin", "QuickJS sandbox", "No network"],
    },
  },
  privacy: {
    title: "No OpenPE cloud. Your work stays local.",
    lede: "OpenPE has no servers and no accounts. Projects stay on your disk as native KiCad files, and prompts go only to the AI provider you choose.",
    machine: "Your computer",
    studio: "OpenPE studio",
    files: "Project files",
    agents: "Agent CLI or SDK",
    provider: "Your chosen AI provider",
    providerSub: "Prompts and the context you send",
    cloud: "OpenPE cloud",
    cloudSub: "Doesn't exist",
    points: [
      "No account, no OpenPE servers, no telemetry",
      "Native KiCad files on your own disk",
      "A Cursor API key is encrypted with OS safeStorage",
    ],
    note: "Library, price and datasheet lookups contact those vendors directly.",
  },
  specs: {
    title: "The details.",
    product: "OpenPE · Electrical Engineering Studio",
    rows: [
      { key: "Design files", value: "Native KiCad 10 — .kicad_pro, .kicad_sch, .kicad_pcb. Unchanged files keep their original bytes." },
      { key: "Editing", value: "Schematic, manual PCB layout, 3D Model CAD and native Source text" },
      { key: "History", value: "Whole-project undo · local Git snapshots" },
      { key: "Simulation", value: "ngspice 47 transient" },
      { key: "Thermal", value: "Gmsh 4.15.2 + Elmer 26.1 · PCB temperature" },
      { key: "Agents", value: "Codex · Claude Code · Cursor with scoped tools; DeepSeek Harness · Pi with proposals" },
      { key: "Plugins", value: "Five built in · JavaScript packages in a QuickJS sandbox" },
      { key: "Cloud", value: "None" },
      { key: "Scope", value: "Manual layout, no autorouter. Bounded ERC/DRC coverage, not full KiCad parity." },
      { key: "Platforms", value: "Windows x64 · macOS arm64 · Linux x64 (glibc 2.41+)" },
      { key: "License", value: "Apache-2.0" },
    ],
  },
  closing: {
    line1: "What will you",
    accent: "power next,",
    line3: "Engineer?",
    github: "View on GitHub",
    watch: "Watch the film",
  },
  team: {
    title: "The people behind OpenPE.",
    core: "Core developers",
    institutions: "Teams & institutions",
    institutionsEmpty: "To be announced",
    contact: "Contact",
    contactGithub: "GitHub organization",
  },
  footer: {
    license: "Apache-2.0 · © 2026 OpenPE contributors",
    notices: "Inter and JetBrains Mono are licensed under the SIL Open Font License. Product names belong to their owners.",
  },
}

const zh: Content = {
  meta: { title: "OpenPE — AI 原生的电力电子工程师工作台" },
  nav: {
    workspace: "工作区",
    workflow: "工作流",
    agents: "Agent",
    plugins: "插件",
    privacy: "隐私",
    specs: "规格",
    team: "团队",
    github: "GitHub",
    langLabel: "语言",
  },
  hero: {
    badge: "开源 · 基于 KiCad 10",
    titleTop: "AI 原生的",
    titleAccent: "电力电子",
    titleBottom: "工程师工作台",
    lede: "一个桌面工作室：你的 AI agent 和你在同一份原理图、PCB layout、3D 模型和仿真里协作。设计始终是原生 KiCad 文件，只保存在你的电脑上。",
    watch: "观看宣传片",
    github: "在 GitHub 查看",
    platformsLabel: "支持系统",
  },
  film: {
    caption: "OpenPE 工作流 · 1:38",
    play: "播放宣传片",
    chapters: {
      overall: "总览",
      schematic: "原理图",
      layout: "Layout",
      module: "模块",
      plugins: "插件",
    },
  },
  workspace: {
    title: "设计与对话，在同一个窗口里。",
    lede: "原理图、PCB layout 和 3D 模型与 agent 对话并排。切换视图、查看属性，或者直接描述你想要的修改。",
    imageAlt: "OpenPE 桌面端：打开 EMC Flyback 的 Layout 视图，选中变压器 T1",
    parts: [
      { name: "会话管理", body: "整理你和 agent 的对话。" },
      { name: "Agent 界面", body: "对话并发送设计请求。" },
      { name: "设计工作区", body: "在原理图、Layout、3D 模型和 Source 之间切换。" },
      { name: "属性面板", body: "查看并编辑选中的对象。" },
    ],
  },
  workflow: {
    title: "从原理图到外壳。",
    lede: "直接动手编辑，或者交给 agent。所有视图共享同一个工程。",
    steps: [
      {
        chapter: "原理图",
        title: "设计与验证",
        body: "agent 搭好反馈回路，运行 10 ms 的 ngspice 瞬态仿真，并调整 R15，直到输出落在 ±1% 以内。",
        data: ["R15 39.0 → 38.1 kΩ", "VOUT 11.99–12.05 V"],
      },
      {
        chapter: "Layout",
        title: "引导式放置",
        body: "预览一组元件的位置和角度，按 Tab 一次放置整组。",
        data: ["已放置 5 个元件", "Tab"],
      },
      {
        chapter: "模块",
        title: "生成外壳",
        body: "按尺寸建模外壳，再在对话中细化：立柱、侧壁和一块 3 mm 透明亚克力盖板。",
        data: ["112 × 88 mm", "3 mm 盖板"],
      },
    ],
  },
  agents: {
    title: "接入你自己的 agent。",
    lede: "连接你已经在用的 agent。它直接在你打开的工程里工作，权限由它的接入方式决定。",
    tools: { name: "受限工具", body: "调用与界面相同的设计、仿真和工程命令。" },
    proposals: { name: "修改提案", body: "在受限的上下文中提出修改，由你审阅并应用。" },
    parity: {
      name: "人机同权",
      title: "你和 agent，用同一套命令。",
      lede: "你在工作室里能做的，agent 也能做。它通过受限的工具操作，而不是开放一个 shell。",
      human: { name: "你", body: "画布 · 键盘 · 属性面板" },
      agent: { name: "你的 agent", body: "Codex · Claude Code · Cursor" },
      gui: "GUI",
      context: "上下文管理",
      api: "Uniform API",
      apiOps: ["设置元件值", "布线", "铺铜", "运行 SPICE"],
      core: "Core",
      coreSub: "每次编辑都是一次经过校验的事务",
      plugins: "插件",
      points: [
        { name: "同一套命令", body: "界面和 agent 调用同样的能力，经过同样的校验。" },
        { name: "同一条撤销历史", body: "agent 的修改就是普通事务：审阅、应用、撤销。" },
        { name: "审阅或自动", body: "逐条确认设计修改，或让支持的命令自动执行。" },
      ],
    },
    mark: {
      name: "圈选修改",
      title: "指着板子，说出你的想法。",
      lede: "在原理图或 PCB 上圈出区域，写下评论，随下一条消息发送。agent 只修改你指出的那一部分。",
      commentLabel: "User Comment",
      commentAction: "Add",
      comment: "Could you turn D7 and C19 so the pads line up better?",
      steps: [
        { name: "圈选", body: "选中元件，或在画布上框出区域。" },
        { name: "评论", body: "就在对应的位置描述修改。" },
        { name: "修改", body: "agent 旋转、重新布线并对比结果。" },
      ],
      statValue: "47%",
      statLabel: "次级铜线缩短",
      statDetail: "39.9 → 21.2 mm",
      note: "圈选标记是随消息附带的截图，本身不会修改设计。",
    },
  },
  plugins: {
    title: "插件连接工作室与真实的工程世界。",
    lede: "内置五个工程插件。你也可以用 JavaScript 编写自己的插件，它们运行在沙箱中，没有本机权限，也不能联网。",
    builtIn: "内置",
    thermal: {
      name: "Layout Thermal",
      body: "用 Gmsh 和 Elmer 计算 PCB 温度分布，定位最热点。",
      stat: "PCB 峰值温度 67.7 °C",
    },
    spice: {
      name: "SPICE Simulation",
      body: "直接基于原理图运行 ngspice 47 瞬态分析。",
      stat: "ngspice 47",
    },
    emc: {
      name: "EMC Analysis",
      body: "审查 layout 几何中的 EMC 风险。这是设计审查，不是合规测试。",
      stat: "几何审查",
    },
    parasitics: {
      name: "Layout Parasitics",
      body: "沿焊盘到焊盘的路径，读出直流电阻和部分电感。",
      stat: "30.30 mΩ · 17.61 nH",
    },
    skill: {
      name: "PE Layout Skill",
      body: "为 agent 内置的电力电子 layout 指导。",
      stat: "内置指导",
    },
    yours: {
      name: "你的插件",
      body: "把 JavaScript 打包成本地插件。安装需要你确认，运行在 QuickJS 沙箱中，只能读取声明的输入和工程内容。",
      tags: [".openpe-plugin", "QuickJS 沙箱", "无网络权限"],
    },
  },
  privacy: {
    title: "没有 OpenPE 云端，数据留在本地。",
    lede: "OpenPE 没有服务器，也不需要账号。工程以原生 KiCad 文件保存在你的磁盘上，提示词只发送给你选择的 AI 厂商。",
    machine: "你的电脑",
    studio: "OpenPE 工作室",
    files: "工程文件",
    agents: "Agent CLI 或 SDK",
    provider: "你选择的 AI 厂商",
    providerSub: "提示词和你发送的上下文",
    cloud: "OpenPE 云端",
    cloudSub: "不存在",
    points: [
      "无账号、无 OpenPE 服务器、无遥测",
      "原生 KiCad 文件保存在你自己的磁盘上",
      "Cursor API key 由系统 safeStorage 加密",
    ],
    note: "元件库、价格和数据手册查询会直接访问对应的供应商。",
  },
  specs: {
    title: "技术细节。",
    product: "OpenPE · Electrical Engineering Studio",
    rows: [
      { key: "设计文件", value: "原生 KiCad 10：.kicad_pro、.kicad_sch、.kicad_pcb。未修改的文件保留原始字节。" },
      { key: "编辑", value: "原理图、手动 PCB layout、3D Model CAD 和原生 Source 文本" },
      { key: "历史", value: "整个工程可撤销 · 本地 Git 快照" },
      { key: "仿真", value: "ngspice 47 瞬态" },
      { key: "热分析", value: "Gmsh 4.15.2 + Elmer 26.1 · PCB 温度" },
      { key: "Agent", value: "Codex · Claude Code · Cursor 使用受限工具；DeepSeek Harness · Pi 提出修改" },
      { key: "插件", value: "内置五个 · JavaScript 插件运行在 QuickJS 沙箱" },
      { key: "云端", value: "无" },
      { key: "范围", value: "手动 layout，无自动布线。ERC/DRC 覆盖有限，不等同于 KiCad 完整检查。" },
      { key: "平台", value: "Windows x64 · macOS arm64 · Linux x64（glibc 2.41+）" },
      { key: "许可证", value: "Apache-2.0" },
    ],
  },
  closing: {
    line1: "下一次，",
    accent: "你想为什么供电，",
    line3: "工程师？",
    github: "在 GitHub 查看",
    watch: "观看宣传片",
  },
  team: {
    title: "OpenPE 背后的人。",
    core: "核心开发者",
    institutions: "参与团队与机构",
    institutionsEmpty: "待公布",
    contact: "联系",
    contactGithub: "GitHub 组织",
  },
  footer: {
    license: "Apache-2.0 · © 2026 OpenPE contributors",
    notices: "Inter 与 JetBrains Mono 以 SIL Open Font License 授权。产品名称归各自所有者。",
  },
}

export const content: Record<Lang, Content> = { en, zh }
