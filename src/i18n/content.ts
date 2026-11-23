import type { Chapter } from "@/content/site.ts"
import type { SchoolId } from "@/content/team.ts"

export type Lang = "en" | "zh"

type Step = { chapter: string; caption: string }
type Plugin = { name: string; body: string }
type Term = { name: string; body: string }

export type Content = {
  meta: { title: string }
  nav: Record<Chapter, string> & { github: string; menu: string; switchLang: string; primaryLabel: string; footerLabel: string }
  hero: {
    openSource: string
    foundations: string
    titleMain: string
    titleFor: string
    titleDomain: string
    titleRole: string
    lede: string
    download: string
  }
  film: { title: string; caption: string; play: string }
  workspace: { title: string; lede: string; imageAlt: string; parts: readonly Term[] }
  workflow: { title: string; lede: string; steps: readonly Step[] }
  agents: {
    title: string
    lede: string
    privacy: string
    more: string
    architecture: {
      title: string
      description: string
      agent: string
      human: string
      context: string
      gui: string
      api: string
      core: Term
      plugins: Term
    }
  }
  plugins: {
    title: string
    lede: string
    thermal: Plugin
    spice: Plugin
    emc: Plugin
    parasitics: Plugin
    skill: Plugin
    yours: { name: string; run: string; reset: string; output: string; ready: string }
  }
  team: {
    title: string
    lede: string
    core: string
    institutions: string
    schoolNames: Record<SchoolId, readonly [string, string]>
  }
  footer: { license: string }
}

const en: Content = {
  meta: { title: "OpenPE · AI-Native Workbench for Power Electronics Engineer" },
  nav: {
    workspace: "Workspace",
    workflow: "Workflow",
    agents: "Agents",
    plugins: "Plugins",
    team: "Team",
    github: "GitHub",
    menu: "Menu",
    switchLang: "Switch to Chinese",
    primaryLabel: "Primary navigation",
    footerLabel: "Footer navigation",
  },
  hero: {
    openSource: "Open source",
    foundations: "Built with open source",
    titleMain: "AI-Native Workbench",
    titleFor: "for",
    titleDomain: "Power Electronics",
    titleRole: "Engineer",
    lede: "An open-source, AI-native desktop app for power-electronics design. Your AI agent works on the same schematic, PCB layout, 3D model and simulation as you.",
    download: "Download",
  },
  film: {
    title: "Watch the workflow",
    caption: "EMC Flyback",
    play: "Play the demo",
  },
  workspace: {
    title: "Design alongside your Agent",
    lede: "The agent conversation sits on the left and the editable design on the right: schematic, PCB layout, 3D model and native KiCad source. Select a marker to see what each area does.",
    imageAlt: "OpenPE desktop with the EMC Flyback layout open and transformer T1 selected",
    parts: [
      { name: "Session manager", body: "Switch between conversations." },
      { name: "Agent interface", body: "Discuss and request edits." },
      { name: "Design workspace", body: "Open Schematic, Layout, Model or Source." },
      { name: "Properties", body: "Inspect or edit the selection." },
    ],
  },
  workflow: {
    title: "From schematic to enclosure",
    lede: "One project from circuit to enclosure. Edit directly or ask your agent at any step.",
    steps: [
      {
        chapter: "Schematic",
        caption: "Your agent runs a 10 ms ngspice transient and tunes R15 until VOUT sits inside ±1%.",
      },
      {
        chapter: "Layout",
        caption: "Place a group of parts from a preview, then mark a region and send a comment with your next message.",
      },
      {
        chapter: "Module",
        caption: "Model an enclosure from dimensions, then refine posts, walls and a 3 mm acrylic lid in conversation.",
      },
    ],
  },
  agents: {
    title: "Work with your local Agent",
    lede: "Connect an agent you already use. It works on the project you have open, with the access its mode allows.",
    privacy: "No OpenPE servers. Projects stay on your disk as native KiCad files. The AI provider you choose receives the prompts and context you send.",
    more: "More Agents",
    architecture: {
      title: "OpenPE architecture",
      description: "The GUI supplies project context to the Agent. Both share the Uniform API for Core and plugin capabilities.",
      agent: "Agent",
      human: "Human",
      context: "Context Management",
      gui: "GUI",
      api: "Uniform API",
      core: { name: "Core", body: "Schematic · PCB · Model" },
      plugins: { name: "Plugins", body: "Analysis and extensions" },
    },
  },
  plugins: {
    title: "Extend the workbench",
    lede: "Five plugins ship built in: PCB temperature, parasitics, SPICE, EMC geometry review and PE layout guidance. You can also write your own in JavaScript.",
    thermal: {
      name: "Layout Thermal",
      body: "Map PCB temperatures with Gmsh and Elmer.",
    },
    spice: {
      name: "SPICE Simulation",
      body: "Run a transient from the schematic.",
    },
    emc: {
      name: "EMC Analysis",
      body: "Review PCB geometry for EMC risks. A design review, not a compliance test.",
    },
    parasitics: {
      name: "Layout Parasitics",
      body: "Extract pad-to-pad DC resistance and partial inductance.",
    },
    skill: {
      name: "PE Layout Skill",
      body: "Guide power-electronics PCB design and review.",
    },
    yours: {
      name: "Your plugin",
      run: "Run",
      reset: "Reset",
      output: "Sample output",
      ready: "Run to count parts.",
    },
  },
  team: {
    title: "The OpenPE team",
    lede: "OpenPE is developed by contributors from leading universities around the world and released under Apache-2.0.",
    core: "Authors",
    institutions: "Universities",
    schoolNames: {
      berkeley: ["University of", "California, Berkeley"],
      ucla: ["University of", "California, Los Angeles"],
      mit: ["Massachusetts", "Institute of Technology"],
      glasgow: ["University of", "Glasgow"],
      eindhoven: ["Eindhoven University", "of Technology"],
      westlake: ["Westlake", "University"],
    },
  },
  footer: {
    license: "Apache-2.0 · © 2026 OpenPE contributors",
  },
}

const zh: Content = {
  meta: { title: "OpenPE · 面向电力电子工程师的 AI 原生工作台" },
  nav: {
    workspace: "工作区",
    workflow: "工作流",
    agents: "Agent",
    plugins: "插件",
    team: "团队",
    github: "GitHub",
    menu: "菜单",
    switchLang: "切换到英文",
    primaryLabel: "主导航",
    footerLabel: "页脚导航",
  },
  hero: {
    openSource: "开源",
    foundations: "基于开源技术",
    titleMain: "AI 原生工作台",
    titleFor: "面向",
    titleDomain: "电力电子",
    titleRole: "工程师",
    lede: "一款开源、AI 原生的电力电子设计桌面软件。你的 AI agent 和你在同一份原理图、PCB 布局、三维模型和仿真上工作。",
    download: "下载",
  },
  film: {
    title: "工作流演示",
    caption: "EMC Flyback",
    play: "播放演示",
  },
  workspace: {
    title: "与 Agent 协作设计",
    lede: "左侧是 agent 对话，右侧是可编辑的设计：原理图、PCB 布局、三维模型和 KiCad 原生源文件。点击标记查看各区域的用途。",
    imageAlt: "OpenPE 桌面端的 EMC Flyback PCB 布局，已选中变压器 T1",
    parts: [
      { name: "会话管理", body: "切换对话。" },
      { name: "Agent 对话", body: "和 Agent 讨论设计并提出修改请求。" },
      { name: "设计工作区", body: "在原理图、PCB 布局、三维建模和源文件视图间切换。" },
      { name: "属性面板", body: "查看或编辑所选对象。" },
    ],
  },
  workflow: {
    title: "从原理图到外壳",
    lede: "同一个工程，从电路一直做到外壳。每一步都可以自己动手，也可以交给 agent。",
    steps: [
      {
        chapter: "原理图",
        caption: "agent 运行 10 ms 的 ngspice 瞬态仿真，调整 R15，直到 VOUT 落在 ±1% 以内。",
      },
      {
        chapter: "PCB 布局",
        caption: "按预览放置一组元件，再圈出区域，把批注随下一条消息发给 agent。",
      },
      {
        chapter: "外壳建模",
        caption: "按尺寸为电路板建模外壳，再在对话中细化立柱、侧壁和 3 mm 亚克力盖板。",
      },
    ],
  },
  agents: {
    title: "与本地 Agent 协作",
    lede: "接入你已经在用的 agent。它直接在你打开的工程里工作，权限由它的接入方式决定。",
    privacy: "没有 OpenPE 服务器。工程以 KiCad 原生文件保存在你的磁盘上，你选择的 AI 服务商会收到你发送的提示词和上下文。",
    more: "更多 Agent",
    architecture: {
      title: "OpenPE 架构",
      description: "图形界面向 Agent 提供工程上下文。两者通过统一 API 使用核心与插件功能。",
      agent: "Agent",
      human: "用户",
      context: "上下文管理",
      gui: "图形界面",
      api: "统一 API",
      core: { name: "核心", body: "原理图、PCB 布局与建模" },
      plugins: { name: "插件", body: "分析工具与扩展" },
    },
  },
  plugins: {
    title: "扩展工作台",
    lede: "内置五个插件：PCB 温度、寄生参数、SPICE 仿真、EMC 几何审查和电力电子布局指导。你也可以用 JavaScript 编写自己的插件。",
    thermal: {
      name: "Layout Thermal",
      body: "用 Gmsh 和 Elmer 计算 PCB 温度分布。",
    },
    spice: {
      name: "SPICE Simulation",
      body: "基于原理图进行瞬态仿真。",
    },
    emc: {
      name: "EMC Analysis",
      body: "根据 PCB 几何结构检查潜在的 EMC 风险。这是设计审查，不是合规测试。",
    },
    parasitics: {
      name: "Layout Parasitics",
      body: "提取两个焊盘之间的直流电阻和部分电感。",
    },
    skill: {
      name: "PE Layout Skill",
      body: "指导电力电子 PCB 设计与审查。",
    },
    yours: {
      name: "自定义插件",
      run: "运行",
      reset: "重置",
      output: "示例输出",
      ready: "运行后显示元件数量。",
    },
  },
  team: {
    title: "OpenPE 团队",
    lede: "OpenPE 由来自全球多所知名高校的贡献者共同开发，以 Apache-2.0 协议开源。",
    core: "作者",
    institutions: "院校",
    schoolNames: {
      berkeley: ["加州大学", "伯克利分校"],
      ucla: ["加州大学", "洛杉矶分校"],
      mit: ["麻省", "理工学院"],
      glasgow: ["格拉斯哥", "大学"],
      eindhoven: ["埃因霍温", "理工大学"],
      westlake: ["西湖", "大学"],
    },
  },
  footer: {
    license: "Apache-2.0 · © 2026 OpenPE 贡献者",
  },
}

export const closingCopy = {
  line1: "What will you",
  power: "Power",
  between: " next, ",
  engineer: "Engineer",
} as const

export const content: Record<Lang, Content> = { en, zh }
