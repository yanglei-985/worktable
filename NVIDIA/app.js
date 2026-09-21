// UI prototype: three visual treatments share one intentionally narrow flow.
// Add ?prototype=1&variant=A|B|C to reveal the design switcher.

const DEFAULT_CUES = [
  { start: 0, end: 3.568, text: "Learning from video can feel slow at first.", zh: "一开始，通过视频学习可能会让人觉得进展很慢。" },
  { start: 3.918, end: 8.547, text: "But once you get the hang of it, the rhythm becomes natural.", zh: "但一旦你掌握了窍门，节奏就会变得自然。" },
  { start: 8.897, end: 14.121, text: "Instead of translating every word, try to notice useful chunks.", zh: "不要逐字翻译，试着留意有用的语块。" },
  { start: 14.471, end: 19.845, text: "For example, get the hang of it means to become comfortable with a skill.", zh: "例如，get the hang of it 指逐渐熟悉并掌握一项技能。" },
  { start: 20.195, end: 24.923, text: "When a phrase stands out, tap it and check what it means here.", zh: "当一个短语引起你的注意时，点一下看看它在这里是什么意思。" },
  { start: 25.273, end: 29.442, text: "Then return to the video and keep the conversation flowing.", zh: "然后回到视频中，让对话自然地继续下去。" }
];

const YOUTUBE_VIDEO = {
  id: "1GowFTjbUnk",
  url: "https://www.youtube.com/watch?v=1GowFTjbUnk",
  shortUrl: "https://youtu.be/1GowFTjbUnk",
  title: "NVIDIA Explained Like You're 5",
  channel: "Crayon Capital",
  duration: 870,
  captions: "captions/1GowFTjbUnk.en-zh.json"
};

const PHRASES = {
  "at first": {
    zh: "一开始；起初",
    meaning: "It marks the early stage of the learning experience, before it becomes easier.",
    pattern: "Use “at first” when the situation later changes: At first it felt difficult, but it got easier."
  },
  "get the hang of it": {
    zh: "掌握窍门；逐渐上手",
    meaning: "Here it means becoming comfortable with learning through video after some practice.",
    pattern: "This is an informal fixed expression. Translate the whole chunk, not each word separately."
  },
  "instead of": {
    zh: "而不是；代替",
    meaning: "It introduces the action you should replace: do not translate every word; notice chunks instead.",
    pattern: "“Instead of” is followed by a noun or an -ing form: instead of translating."
  },
  "stands out": {
    zh: "显眼；引起注意",
    meaning: "The phrase becomes noticeable because it sounds useful or unfamiliar.",
    pattern: "“Stand out” is a phrasal verb. In this sentence it is not about physically standing."
  },
  "what it means here": {
    zh: "它在这里的具体意思",
    meaning: "The speaker is asking for the meaning in this exact sentence, not every dictionary meaning.",
    pattern: "“Here” points to the present context rather than a physical place."
  },
  "keep the conversation flowing": {
    zh: "让对话自然地继续下去",
    meaning: "Continue watching without breaking the natural rhythm of the conversation.",
    pattern: "“Keep + object + -ing” means to make an action continue: keep the conversation flowing."
  },
  "safe bet": {
    zh: "稳妥的选择；保险方案",
    meaning: "Here it contrasts a predictable decision with Jensen Huang's risky gamble.",
    pattern: "A “safe bet” is a choice that is very likely to succeed or avoid loss."
  },
  "took over": {
    zh: "占据；接管",
    meaning: "It means Nvidia became dominant across the AI space rather than merely entering it.",
    pattern: "“Take over” is a phrasal verb used for gaining control or becoming dominant."
  },
  "bring him down": {
    zh: "打压他；让他垮台",
    meaning: "The government action is presented as a threat to his success and power.",
    pattern: "“Bring someone down” means to cause that person to lose power, status, or success."
  },
  "build a future": {
    zh: "创造未来；为未来打基础",
    meaning: "It refers to studying and working toward a better life in America.",
    pattern: "“Build a future” is a common metaphorical collocation about long-term progress."
  },
  "start from zero": {
    zh: "从零开始",
    meaning: "They would leave secure jobs and create the company without an established product or market.",
    pattern: "“Start from zero” emphasizes having no existing advantage or foundation."
  },
  "opposite direction": {
    zh: "相反的方向",
    meaning: "Nvidia's first chip design was moving away from the new industry standard.",
    pattern: "“Go in the opposite direction” means to follow a fundamentally different approach."
  },
  "a lifeline": {
    zh: "救命稻草；关键援助",
    meaning: "Sega's contract gave Nvidia a final source of money and another chance to survive.",
    pattern: "A “lifeline” is literally a rescue line, but figuratively it is help that prevents failure."
  },
  "start over": {
    zh: "重新开始",
    meaning: "Nvidia had a chance to abandon its failed approach and try again.",
    pattern: "“Start over” means begin again from the beginning after a failure."
  },
  "dead end": {
    zh: "死路；没有前途的方向",
    meaning: "The technology could not lead to a useful future product.",
    pattern: "A “dead end” is a path with no exit, used here as a metaphor for failed technology."
  },
  "go bankrupt": {
    zh: "破产",
    meaning: "Nvidia would run out of money and be unable to continue operating.",
    pattern: "“Go bankrupt” is the standard collocation for entering bankruptcy."
  },
  "built from scratch": {
    zh: "从头打造；从零构建",
    meaning: "The Riva 128 was designed newly rather than adapted from the failed NV1 technology.",
    pattern: "“From scratch” means starting with only basic materials and no finished foundation."
  },
  "one last shot": {
    zh: "最后一次机会",
    meaning: "The company had only one remaining attempt to create a successful chip.",
    pattern: "“A shot” informally means an attempt or opportunity: give it a shot, one last shot."
  },
  "out of your hands": {
    zh: "不在你的掌控之中",
    meaning: "The outcome can no longer be influenced by your actions.",
    pattern: "“Out of someone's hands” means outside that person's control or responsibility."
  },
  "make the right call": {
    zh: "作出正确决定",
    meaning: "The speaker is questioning whether the earlier decision was correct.",
    pattern: "“Make the call” can mean make a decision, especially under pressure."
  },
  "paying attention": {
    zh: "开始重视；密切关注",
    meaning: "Major AI labs began to recognize that Nvidia's technology mattered.",
    pattern: "“Pay attention” is a fixed collocation meaning to focus or take notice."
  },
  "walked away": {
    zh: "退出；放弃交易",
    meaning: "Nvidia abandoned the ARM acquisition after regulators opposed it.",
    pattern: "“Walk away” can mean leave a negotiation, deal, or difficult situation."
  },
  "cut off": {
    zh: "被切断；被禁止获得",
    meaning: "Chinese customers could no longer buy the restricted Nvidia chips.",
    pattern: "“Cut someone off” means stop their access to a supply, service, or relationship."
  },
  "paid off": {
    zh: "取得回报；获得成功",
    meaning: "The risky decisions eventually produced major business success.",
    pattern: "When a plan or effort “pays off,” it brings the desired result."
  }
};

const WORDS = {
  learning: ["学习", "It refers to gaining English ability through the video, not merely watching it.", "“Learning from” means gaining knowledge or skill from a source."],
  feel: ["让人感觉；显得", "Here “feel” describes the learner's experience of the process.", "“Feel + adjective” describes an impression: feel slow, feel natural."],
  slow: ["缓慢的", "It describes perceived progress, not the playback speed.", "The context changes “slow” from physical speed to learning progress."],
  once: ["一旦", "It introduces the condition after which the learning rhythm changes.", "Here “once” means “as soon as / when,” not “one time.”"],
  rhythm: ["节奏", "It means the comfortable pace of watching, noticing, and continuing.", "“Rhythm” is metaphorical here; it describes a repeated learning flow."],
  natural: ["自然的；顺畅的", "The process begins to feel easy and unforced.", "“Become + adjective” describes a change of state."],
  translating: ["翻译", "Here it means converting each individual English word into Chinese.", "The -ing form follows “instead of.”"],
  notice: ["留意；注意到", "The learner should actively recognize useful language patterns.", "“Try to notice” is a gentle instruction to pay attention."],
  chunks: ["语块", "These are useful groups of words learned as one unit.", "In language learning, a “chunk” is a reusable phrase, collocation, or sentence frame."],
  comfortable: ["熟悉并能自如运用的", "It means the skill no longer feels awkward or difficult.", "“Comfortable with” means confident and at ease with something."],
  phrase: ["短语；语块", "It refers to a group of words that carries meaning together.", "The learning focus is the whole expression rather than isolated words."],
  tap: ["轻点", "It is the touch-screen action used to request an explanation.", "“Tap” is the natural mobile UI verb; “click” is more desktop-oriented."],
  check: ["查看；确认", "It means briefly look up the expression's contextual meaning.", "“Check what…” introduces the information you want to verify."],
  return: ["回到", "The learner goes back to watching after a short explanation.", "“Return to” is followed by the activity or place resumed."],
  conversation: ["对话", "It refers to the spoken exchange inside the video.", "“Conversation” commonly collocates with start, continue, follow, and flow."],
  flowing: ["流畅进行", "The conversation continues smoothly without frequent interruption.", "Here “flow” is metaphorical: speech progresses naturally."],
  video: ["视频", "It is the learning source being watched.", "“Learn from a video” treats the video as a source of input."],
  word: ["单词", "Here it contrasts a single word with a useful multi-word chunk.", "“Every word” emphasizes an unhelpful word-by-word strategy."],
  skill: ["技能", "It refers to an ability that improves through practice.", "A common collocation is “develop / master a skill.”"],
  empire: ["商业帝国", "It describes Nvidia as a very large and powerful business.", "“Build an empire” is a common metaphor for creating a dominant company."],
  pitched: ["推介；提出", "Jensen presented his business plan to persuade his future co-founders.", "“Pitch an idea / plan” means present it persuasively."],
  gamble: ["豪赌；冒险决定", "The decision carried a high risk of failure but a potentially huge reward.", "A “gamble” can be any risky decision, not only literal betting."],
  adapt: ["适应；调整", "It means changing your approach when circumstances are difficult.", "“Adapt to” a situation means adjust successfully to it."],
  obsession: ["痴迷；强烈专注", "It describes Jensen's unusually intense focus on semiconductors.", "“A level of obsession” emphasizes extreme dedication, sometimes humorously."],
  ambitious: ["雄心勃勃的", "The chip idea was difficult, large in scope, and aimed at the future.", "Common collocations include “ambitious plan” and “ambitious goal.”"],
  flopped: ["失败了；表现惨淡", "The NV1 product failed commercially.", "“Flop” is informal and often used for failed products, films, or launches."],
  lifeline: ["救命稻草", "The Sega contract was support that could keep Nvidia alive.", "A “financial lifeline” is money or help that prevents collapse."],
  vaporize: ["彻底消失；迅速垮掉", "Jensen means the company would cease to exist almost immediately.", "The literal meaning is turn into vapor; here it is vivid business hyperbole."],
  outcome: ["结果", "It refers to what eventually happens after a difficult decision.", "Common collocations include “possible outcome” and “control the outcome.”"],
  anxiety: ["焦虑", "It describes the mental stress caused by uncertainty and lack of control.", "“Anxiety about” something is worry about a future possibility."],
  reframe: ["换一个角度重新理解", "The therapist's question changed how the speaker understood the anxious thought pattern.", "To “reframe” is to place the same issue in a more useful mental frame."],
  bankruptcy: ["破产", "The company was extremely close to running out of money.", "“The brink of bankruptcy” means very near financial collapse."],
  dominant: ["占主导地位的", "It describes a strong market position compared with competitors.", "Common collocations include “dominant position” and “dominant player.”"],
  restricted: ["受到限制的；被管制的", "The chip could no longer be exported under the tightened rules.", "“Restricted to / restricted from” describes a formal limitation."]
};

const CET6_DICTIONARY = {
  empire: { level: "CET-6", pos: "noun", collocation: "build an empire", example: "He built an empire from a small idea." },
  pitched: { level: "CET-6", pos: "verb", collocation: "pitch a business plan", example: "She pitched the plan to three investors." },
  gamble: { level: "CET-6", pos: "noun", collocation: "take a gamble", example: "Starting a company was a huge gamble." },
  industries: { level: "CET-6", pos: "noun", collocation: "entire industries", example: "New technology can transform entire industries." },
  algorithms: { level: "CET-6", pos: "noun", collocation: "search algorithms", example: "Recommendation algorithms learn from user behavior." },
  adapt: { level: "CET-6", pos: "verb", collocation: "adapt to change", example: "Good teams adapt to change quickly." },
  discipline: { level: "CET-6", pos: "noun", collocation: "self-discipline", example: "Learning a language takes discipline." },
  complain: { level: "CET-6", pos: "verb", collocation: "complain about work", example: "He rarely complains about difficult work." },
  institute: { level: "CET-6", pos: "noun", collocation: "research institute", example: "The institute studies computer science." },
  origin: { level: "CET-6", pos: "noun", collocation: "origin story", example: "Every founder has an origin story." },
  lecture: { level: "CET-6", pos: "noun", collocation: "lecture hall", example: "The idea was tested outside the lecture hall." },
  semiconductors: { level: "CET-6", pos: "noun", collocation: "semiconductor industry", example: "Semiconductors power modern devices." },
  obsession: { level: "CET-6", pos: "noun", collocation: "a level of obsession", example: "Her obsession with detail improved the design." },
  ambitious: { level: "CET-6", pos: "adjective", collocation: "ambitious plan", example: "They announced an ambitious plan for growth." },
  universal: { level: "CET-6", pos: "adjective", collocation: "universal standard", example: "The team wanted a universal standard." },
  hardware: { level: "CET-6", pos: "noun", collocation: "computer hardware", example: "The software needs faster hardware." },
  launched: { level: "CET-6", pos: "verb", collocation: "launch a product", example: "The company launched a new product." },
  published: { level: "CET-6", pos: "verb", collocation: "publish a specification", example: "The organization published a new standard." },
  pipeline: { level: "CET-6", pos: "noun", collocation: "rendering pipeline", example: "The graphics pipeline processes each frame." },
  quadratic: { level: "CET-6", pos: "adjective", collocation: "quadratic mapping", example: "The old chip used quadratic mapping." },
  tremendous: { level: "CET-6", pos: "adjective", collocation: "tremendous confidence", example: "They moved forward with tremendous confidence." },
  flopped: { level: "CET-6", pos: "verb", collocation: "a product flops", example: "The first version flopped in the market." },
  lifeline: { level: "CET-6", pos: "noun", collocation: "financial lifeline", example: "The contract became a financial lifeline." },
  contracted: { level: "CET-6", pos: "verb", collocation: "contract a supplier", example: "The company contracted a chip designer." },
  generation: { level: "CET-6", pos: "noun", collocation: "next generation", example: "The next generation will be more efficient." },
  vaporize: { level: "CET-6", pos: "verb", collocation: "vaporize overnight", example: "The cash could vaporize overnight." },
  investment: { level: "CET-6", pos: "noun", collocation: "make an investment", example: "The investment gave the team more time." },
  anxiety: { level: "CET-6", pos: "noun", collocation: "anxiety about the outcome", example: "Uncertainty can create anxiety." },
  outcome: { level: "CET-6", pos: "noun", collocation: "possible outcome", example: "We cannot control every outcome." },
  reframe: { level: "CET-6", pos: "verb", collocation: "reframe a problem", example: "She reframed the problem as a learning task." },
  therapist: { level: "CET-6", pos: "noun", collocation: "credentialed therapist", example: "He spoke with a therapist about stress." },
  credential: { level: "CET-6", pos: "noun", collocation: "professional credential", example: "Check the therapist's credentials." },
  maintenance: { level: "CET-6", pos: "noun", collocation: "regular maintenance", example: "Every complex system needs maintenance." },
  payroll: { level: "CET-6", pos: "noun", collocation: "monthly payroll", example: "The company had one month of payroll left." },
  bankruptcy: { level: "CET-6", pos: "noun", collocation: "the brink of bankruptcy", example: "The business was near bankruptcy." },
  revenue: { level: "CET-6", pos: "noun", collocation: "annual revenue", example: "Revenue grew after the launch." },
  processor: { level: "CET-6", pos: "noun", collocation: "graphics processor", example: "The processor handles many calculations." },
  calculations: { level: "CET-6", pos: "noun", collocation: "complex calculations", example: "The GPU runs small calculations in parallel." },
  artificial: { level: "CET-6", pos: "adjective", collocation: "artificial intelligence", example: "Artificial intelligence needs a lot of computing power." },
  intelligence: { level: "CET-6", pos: "noun", collocation: "artificial intelligence", example: "The company builds tools for intelligence research." },
  simulate: { level: "CET-6", pos: "verb", collocation: "simulate weather", example: "Scientists simulate weather with powerful computers." },
  molecules: { level: "CET-6", pos: "noun", collocation: "model molecules", example: "The model can help researchers study molecules." },
  climate: { level: "CET-6", pos: "noun", collocation: "climate model", example: "A climate model requires many calculations." },
  architecture: { level: "CET-6", pos: "noun", collocation: "chip architecture", example: "The new architecture uses less energy." },
  researchers: { level: "CET-6", pos: "noun", collocation: "AI researchers", example: "Researchers tested the system on images." },
  subsidizing: { level: "CET-6", pos: "verb", collocation: "subsidize research", example: "The company kept subsidizing the research." },
  classifiers: { level: "CET-6", pos: "noun", collocation: "image classifiers", example: "Earlier classifiers needed hand-coded features." },
  features: { level: "CET-6", pos: "noun", collocation: "learn features", example: "The network learns useful features from data." },
  neural: { level: "CET-6", pos: "adjective", collocation: "neural network", example: "A neural network can learn patterns." },
  network: { level: "CET-6", pos: "noun", collocation: "neural network", example: "The network needs data and computing power." },
  dominant: { level: "CET-6", pos: "adjective", collocation: "dominant position", example: "The company holds a dominant position." },
  strategic: { level: "CET-6", pos: "adjective", collocation: "strategic weapon", example: "The technology became a strategic asset." },
  underlying: { level: "CET-6", pos: "adjective", collocation: "underlying architecture", example: "The underlying architecture controls the system." },
  instruction: { level: "CET-6", pos: "noun", collocation: "instruction set", example: "The instruction set tells the processor what to do." },
  competitor: { level: "CET-6", pos: "noun", collocation: "dangerous competitor", example: "The company faced a powerful competitor." },
  regulator: { level: "CET-6", pos: "noun", collocation: "government regulator", example: "A regulator investigated the acquisition." },
  exported: { level: "CET-6", pos: "verb", collocation: "export a chip", example: "Some chips could no longer be exported." },
  restricted: { level: "CET-6", pos: "adjective", collocation: "restricted access", example: "The new rule restricted access to the product." },
  demand: { level: "CET-6", pos: "noun", collocation: "strong demand", example: "Demand for the chips grew quickly." },
  valuable: { level: "CET-6", pos: "adjective", collocation: "valuable company", example: "The company became highly valuable." },
  survive: { level: "CET-6", pos: "verb", collocation: "survive a crisis", example: "The company survived a serious crisis." },
  exceeds: { level: "CET-6", pos: "verb", collocation: "exceed expectations", example: "The result exceeded expectations." }
};

const CET6_WORDS = new Set(Object.keys(CET6_DICTIONARY));

const BASIC_TRANSLATIONS = {
  but: "但是", you: "你", the: "这个／该", it: "它", becomes: "变得", try: "尝试",
  useful: "有用的", for: "对于／为了", example: "例子", means: "意思是", become: "变得",
  with: "对……／和……", when: "当……时", a: "一个", and: "并且", here: "这里",
  then: "然后", to: "到／去", from: "从", can: "可能／能够", every: "每个"
};

const screens = {
  import: document.querySelector("#importScreen"),
  loading: document.querySelector("#loadingScreen"),
  player: document.querySelector("#playerScreen")
};

const elements = {
  form: document.querySelector("#linkForm"),
  input: document.querySelector("#videoUrl"),
  formError: document.querySelector("#formError"),
  demoButton: document.querySelector("#demoButton"),
  backButton: document.querySelector("#backButton"),
  video: document.querySelector("#video"),
  youtubePlayer: document.querySelector("#youtubePlayer"),
  sourceBadge: document.querySelector("#sourceBadge"),
  lessonTitle: document.querySelector("#lessonTitle"),
  captionText: document.querySelector("#captionText"),
  sentenceButton: document.querySelector("#sentenceButton"),
  railCurrent: document.querySelector("#railCurrent"),
  railNext: document.querySelector("#railNext"),
  timeReadout: document.querySelector("#timeReadout"),
  loadingTitle: document.querySelector("#loadingTitle"),
  loadingStatus: document.querySelector("#loadingStatus"),
  loadingProgress: document.querySelector("#loadingProgress"),
  backdrop: document.querySelector("#sheetBackdrop"),
  sheet: document.querySelector("#explanationSheet"),
  closeSheet: document.querySelector("#closeSheet"),
  selectionType: document.querySelector("#selectionType"),
  selectionTitle: document.querySelector("#selectionTitle"),
  explanationLoading: document.querySelector("#explanationLoading"),
  explanationContent: document.querySelector("#explanationContent"),
  translationText: document.querySelector("#translationText"),
  meaningText: document.querySelector("#meaningText"),
  patternText: document.querySelector("#patternText"),
  dictionaryBlock: document.querySelector("#dictionaryBlock"),
  dictionaryText: document.querySelector("#dictionaryText"),
  sourceText: document.querySelector("#sourceText"),
  replayButton: document.querySelector("#replayButton"),
  responseTime: document.querySelector("#responseTime"),
  toast: document.querySelector("#toast"),
  variantSwitcher: document.querySelector("#variantSwitcher"),
  prevVariant: document.querySelector("#prevVariant"),
  nextVariant: document.querySelector("#nextVariant"),
  variantLabel: document.querySelector("#variantLabel"),
  prototypeState: document.querySelector("#prototypeState")
};

const state = {
  cues: DEFAULT_CUES,
  cueIndex: 0,
  selectedCue: DEFAULT_CUES[0],
  explanationTimer: null,
  toastTimer: null,
  sourceUrl: "sample/lesson.mp4",
  variant: "A",
  playerMode: "local",
  youtube: null,
  youtubeApiPromise: null,
  youtubeSyncTimer: null,
  duration: 30.4
};

function showScreen(name) {
  Object.entries(screens).forEach(([key, node]) => { node.hidden = key !== name; });
}

function cleanToken(value) {
  return value.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "");
}

function parseSrtTime(value) {
  const [clock, millis = "0"] = value.trim().replace(".", ",").split(",");
  const [hours, minutes, seconds] = clock.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds + Number(millis) / 1000;
}

function parseSrt(source) {
  const normalized = source.replace(/\r/g, "").trim();
  if (!normalized) return [];
  return normalized.split(/\n{2,}/).map((block) => {
    const lines = block.split("\n");
    const timingIndex = lines.findIndex((line) => line.includes("-->"));
    if (timingIndex < 0) return null;
    const [start, end] = lines[timingIndex].split("-->").map(parseSrtTime);
    const text = lines.slice(timingIndex + 1).join(" ").replace(/<[^>]+>/g, "").trim();
    const knownCue = DEFAULT_CUES.find((cue) => cue.text === text);
    return { start, end, text, zh: knownCue?.zh || "此句的中文翻译将在接入 AI 后根据上下文生成。" };
  }).filter(Boolean);
}

function findCueIndex(time) {
  for (let index = state.cues.length - 1; index >= 0; index -= 1) {
    const cue = state.cues[index];
    if (time >= cue.start && time <= cue.end + 0.12) return index;
  }
  for (let i = state.cues.length - 1; i >= 0; i -= 1) {
    if (time >= state.cues[i].start) return i;
  }
  return 0;
}

function phraseAt(words, index) {
  const candidates = Object.keys(PHRASES).sort((a, b) => b.split(" ").length - a.split(" ").length);
  for (const phrase of candidates) {
    const parts = phrase.split(" ");
    const slice = words.slice(index, index + parts.length).map(cleanToken);
    if (slice.join(" ") === phrase) return { phrase, length: parts.length };
  }
  return null;
}

function makeToken(label, type, selection) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `caption-token ${type}`;
  button.textContent = label;
  button.setAttribute("aria-label", `Explain ${type}: ${selection}`);
  button.addEventListener("click", () => openExplanation(selection, type, state.selectedCue));
  return button;
}

function renderCaption() {
  const cue = state.cues[state.cueIndex] || state.cues[0];
  state.selectedCue = cue;
  elements.captionText.replaceChildren();
  if (!cue) return;

  const words = cue.text.split(/\s+/);
  let index = 0;
  while (index < words.length) {
    if (index > 0) elements.captionText.append(document.createTextNode(" "));
    const match = phraseAt(words, index);
    if (match) {
      const label = words.slice(index, index + match.length).join(" ");
      elements.captionText.append(makeToken(label, "phrase", match.phrase));
      index += match.length;
    } else {
      const raw = words[index];
      const matchParts = raw.match(/^([^A-Za-z0-9']*)([A-Za-z0-9']+)([^A-Za-z0-9']*)$/);
      if (matchParts) {
        if (matchParts[1]) elements.captionText.append(document.createTextNode(matchParts[1]));
        const token = cleanToken(matchParts[2]);
        if (CET6_WORDS.has(token)) {
          elements.captionText.append(makeToken(matchParts[2], "cet6-word", token));
        } else {
          const plainWord = document.createElement("span");
          plainWord.className = "caption-plain";
          plainWord.textContent = matchParts[2];
          elements.captionText.append(plainWord);
        }
        if (matchParts[3]) {
          const punctuation = document.createElement("span");
          punctuation.className = "caption-punctuation";
          punctuation.textContent = matchParts[3];
          elements.captionText.append(punctuation);
        }
      } else {
        const plainWord = document.createElement("span");
        plainWord.className = "caption-plain";
        plainWord.textContent = raw;
        elements.captionText.append(plainWord);
      }
      index += 1;
    }
  }

  elements.railCurrent.textContent = cue.text;
  elements.railNext.textContent = state.cues[state.cueIndex + 1]?.text || "End of this short lesson.";
  updatePrototypeState();
}

function contextualAnswer(selection, type, cue) {
  if (type === "phrase" && PHRASES[selection]) return PHRASES[selection];
  if (type === "sentence") {
    return {
      zh: cue.zh || "此句将由 AI 结合上下文翻译。",
      meaning: "This translation treats the sentence as one complete idea, so the word groups keep their natural meaning.",
      pattern: "The full-line view is useful when the grammar or relationship between phrases matters more than one word."
    };
  }
  if (CET6_DICTIONARY[selection]) {
    const entry = CET6_DICTIONARY[selection];
    const legacy = WORDS[selection];
    return {
      zh: legacy?.[0] || `本句中的“${selection}”`,
      meaning: legacy?.[1] || `Here “${selection}” is used as a ${entry.pos} in the video's explanation of Nvidia's business and technology story.`,
      pattern: legacy?.[2] || `Useful collocation: ${entry.collocation}.`,
      dictionary: `${entry.level} · ${entry.pos} · ${entry.collocation}\nExample: ${entry.example}`
    };
  }
  return {
    zh: BASIC_TRANSLATIONS[selection] || `“${selection}”在本句中的含义`,
    meaning: `The demo reads “${selection}” inside this sentence: “${cue.text}” rather than returning an isolated dictionary entry.`,
    pattern: "A production AI endpoint would use the surrounding subtitle cues to choose the exact sense, tone, and grammar note."
  };
}

function openExplanation(selection, type, cue) {
  pauseActivePlayer();
  clearTimeout(state.explanationTimer);
  state.selectedCue = cue;
  elements.selectionType.textContent = type === "sentence"
    ? "Full line · in this context"
    : type === "phrase"
      ? "Contextual phrase · in this context"
      : "CET-6 contextual dictionary · word";
  elements.selectionTitle.textContent = selection;
  elements.explanationLoading.hidden = false;
  elements.explanationContent.hidden = true;
  elements.backdrop.hidden = false;
  elements.sheet.hidden = false;
  document.body.style.overflow = "hidden";

  const started = performance.now();
  state.explanationTimer = window.setTimeout(() => {
    const answer = contextualAnswer(selection, type, cue);
    elements.translationText.textContent = answer.zh;
    elements.meaningText.textContent = answer.meaning;
    elements.patternText.textContent = answer.pattern;
    elements.dictionaryBlock.hidden = !answer.dictionary;
    elements.dictionaryText.textContent = answer.dictionary || "";
    elements.sourceText.textContent = cue.text;
    elements.responseTime.textContent = `Context demo · ${((performance.now() - started) / 1000).toFixed(1)}s`;
    elements.explanationLoading.hidden = true;
    elements.explanationContent.hidden = false;
  }, 420);
}

function closeExplanation() {
  clearTimeout(state.explanationTimer);
  elements.sheet.hidden = true;
  elements.backdrop.hidden = true;
  document.body.style.overflow = "";
}

function formatTime(value) {
  if (!Number.isFinite(value)) return "00:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function pauseActivePlayer() {
  if (state.playerMode === "youtube" && state.youtube?.pauseVideo) {
    state.youtube.pauseVideo();
  } else {
    elements.video.pause();
  }
}

function playActivePlayer() {
  if (state.playerMode === "youtube" && state.youtube?.playVideo) {
    state.youtube.playVideo();
    return Promise.resolve();
  }
  return elements.video.play();
}

function seekActivePlayer(time) {
  if (state.playerMode === "youtube" && state.youtube?.seekTo) {
    state.youtube.seekTo(time, true);
  } else {
    elements.video.currentTime = time;
  }
}

function updatePlaybackAt(time, duration) {
  const nextIndex = findCueIndex(time);
  if (nextIndex !== state.cueIndex) {
    state.cueIndex = nextIndex;
    renderCaption();
  }
  state.duration = Number.isFinite(duration) && duration > 0 ? duration : state.duration;
  elements.timeReadout.textContent = `${formatTime(time)} / ${formatTime(state.duration)}`;
}

function updatePlayback() {
  updatePlaybackAt(elements.video.currentTime, elements.video.duration || state.duration);
}

function extractYouTubeId(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || null;
    if (["youtube.com", "m.youtube.com", "music.youtube.com"].includes(host)) {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const parts = url.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(parts[0])) return parts[1] || null;
    }
  } catch {}
  return null;
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (state.youtubeApiPromise) return state.youtubeApiPromise;

  state.youtubeApiPromise = new Promise((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    const timeout = window.setTimeout(() => reject(new Error("YouTube player took too long to load.")), 12000);
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout);
      previousCallback?.();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onerror = () => {
        clearTimeout(timeout);
        reject(new Error("YouTube player could not be loaded."));
      };
      document.head.append(script);
    }
  });

  return state.youtubeApiPromise;
}

function startYouTubeSync() {
  clearInterval(state.youtubeSyncTimer);
  state.youtubeSyncTimer = window.setInterval(() => {
    if (state.playerMode !== "youtube" || !state.youtube?.getCurrentTime) return;
    const time = state.youtube.getCurrentTime();
    const duration = state.youtube.getDuration() || state.duration;
    updatePlaybackAt(time, duration);
  }, 180);
}

async function mountYouTubePlayer(videoId) {
  await loadYouTubeApi();
  elements.video.hidden = true;
  const currentNode = document.querySelector("#youtubePlayer");
  currentNode.hidden = false;
  currentNode.style.display = "block";

  if (state.youtube?.cueVideoById) {
    state.youtube.cueVideoById(videoId);
    state.duration = state.youtube.getDuration?.() || YOUTUBE_VIDEO.duration;
    startYouTubeSync();
    return;
  }

  await new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("YouTube player initialization timed out.")), 12000);
    state.youtube = new window.YT.Player("youtubePlayer", {
      videoId,
      playerVars: {
        playsinline: 1,
        rel: 0,
        cc_load_policy: 0,
        modestbranding: 1,
        origin: location.origin
      },
      events: {
        onReady: (event) => {
          clearTimeout(timeout);
          state.youtube = event.target;
          state.duration = event.target.getDuration() || YOUTUBE_VIDEO.duration;
          startYouTubeSync();
          resolve();
        },
        onStateChange: () => {
          if (state.playerMode === "youtube") {
            updatePlaybackAt(state.youtube.getCurrentTime(), state.youtube.getDuration() || state.duration);
          }
        },
        onError: () => {
          clearTimeout(timeout);
          reject(new Error("YouTube refused to play this video in the embedded player."));
        }
      }
    });
  });
}

function showLocalPlayer() {
  state.youtube?.pauseVideo?.();
  const youtubeNode = document.querySelector("#youtubePlayer");
  if (youtubeNode) youtubeNode.style.display = "none";
  elements.video.hidden = false;
  state.playerMode = "local";
}

async function loadYouTubeCues(videoId) {
  if (videoId !== YOUTUBE_VIDEO.id) return null;
  const response = await fetch(YOUTUBE_VIDEO.captions, { cache: "no-store" });
  if (!response.ok) throw new Error("Prepared subtitles could not be loaded.");
  const payload = await response.json();
  return payload.cues;
}

function getHostLabel(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return "Video source"; }
}

function isDirectVideoUrl(url) {
  try {
    const path = new URL(url).pathname.toLowerCase();
    return [".mp4", ".webm", ".ogg", ".m4v"].some((ext) => path.endsWith(ext));
  } catch { return false; }
}

async function fetchSidecarCues(url) {
  try {
    const parsed = new URL(url);
    parsed.pathname = parsed.pathname.replace(/\.[^.\/]+$/, ".srt");
    const response = await fetch(parsed.toString());
    if (!response.ok) return null;
    const cues = parseSrt(await response.text());
    return cues.length ? cues : null;
  } catch { return null; }
}

function showToast(message, duration = 5200) {
  clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  state.toastTimer = window.setTimeout(() => { elements.toast.hidden = true; }, duration);
}

async function openSource(url, demo = false) {
  showScreen("loading");
  elements.loadingProgress.style.width = "0%";
  elements.loadingProgress.style.width = "18%";
  const youtubeId = extractYouTubeId(url);
  elements.loadingTitle.textContent = youtubeId === YOUTUBE_VIDEO.id ? "Loading the NVIDIA lesson…" : "Opening the source…";
  elements.loadingStatus.textContent = "Checking the video link";

  await new Promise((resolve) => setTimeout(resolve, 340));
  elements.loadingProgress.style.width = "56%";
  elements.loadingStatus.textContent = "Preparing English subtitles";

  let source = "sample/lesson.mp4";
  let cues = DEFAULT_CUES;
  let badge = "Demo lesson";
  let title = "Small steps, natural English";
  let mode = "local";
  let notice = "";

  if (youtubeId === YOUTUBE_VIDEO.id) {
    source = `youtube:${youtubeId}`;
    cues = await loadYouTubeCues(youtubeId);
    badge = `YouTube · ${YOUTUBE_VIDEO.channel}`;
    title = YOUTUBE_VIDEO.title;
    mode = "youtube";
    state.duration = YOUTUBE_VIDEO.duration;
  } else if (isDirectVideoUrl(url)) {
    source = url;
    badge = getHostLabel(url);
    const sidecarCues = await fetchSidecarCues(url);
    if (sidecarCues) {
      cues = sidecarCues;
      notice = "Direct video loaded with its matching sidecar SRT subtitles.";
    } else {
      notice = "The video is live. This prototype is showing demo captions because no matching sidecar SRT was found.";
    }
  } else {
    badge = `${getHostLabel(url)} · prototype`;
    notice = "URL ingestion for this site needs a backend. The local lesson is shown to demonstrate the final player interaction.";
  }

  elements.loadingProgress.style.width = "78%";
  elements.loadingStatus.textContent = mode === "youtube" ? "Connecting captions to the YouTube player" : "Preparing the player";

  try {
    if (mode === "youtube") {
      state.playerMode = "youtube";
      await mountYouTubePlayer(youtubeId);
    } else {
      showLocalPlayer();
      elements.video.src = source;
      elements.video.load();
    }
  } catch (error) {
    showScreen("import");
    elements.formError.textContent = error.message || "The video could not be prepared.";
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, demo ? 180 : 280));
  elements.loadingProgress.style.width = "100%";
  elements.loadingStatus.textContent = "Ready";

  state.sourceUrl = source;
  state.cues = cues;
  state.cueIndex = 0;
  state.selectedCue = cues[0];
  elements.sourceBadge.textContent = badge;
  elements.lessonTitle.textContent = title;
  renderCaption();

  await new Promise((resolve) => setTimeout(resolve, 160));
  showScreen("player");
  if (notice) showToast(notice);
}

function validateUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch { return false; }
}

function launchSource(url, demo = false) {
  openSource(url, demo).catch((error) => {
    showScreen("import");
    elements.formError.textContent = error.message || "The video could not be prepared.";
  });
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = elements.input.value.trim();
  if (!validateUrl(value)) {
    elements.formError.textContent = "Paste a complete http:// or https:// video link.";
    elements.input.focus();
    return;
  }
  elements.formError.textContent = "";
  launchSource(value, false);
});

elements.input.addEventListener("input", () => { elements.formError.textContent = ""; });
elements.demoButton.addEventListener("click", () => launchSource(YOUTUBE_VIDEO.url, true));
elements.backButton.addEventListener("click", () => {
  pauseActivePlayer();
  closeExplanation();
  showScreen("import");
  elements.input.focus();
});
elements.sentenceButton.addEventListener("click", () => {
  const cue = state.cues[state.cueIndex];
  if (cue) openExplanation(cue.text, "sentence", cue);
});
elements.closeSheet.addEventListener("click", closeExplanation);
elements.backdrop.addEventListener("click", closeExplanation);
elements.replayButton.addEventListener("click", () => {
  seekActivePlayer(Math.max(0, state.selectedCue.start));
  closeExplanation();
  playActivePlayer().catch(() => {});
});
elements.video.addEventListener("timeupdate", updatePlayback);
elements.video.addEventListener("loadedmetadata", updatePlayback);
elements.video.addEventListener("error", () => showToast("This video link could not be played by the browser. Try a direct MP4/WebM URL or the prepared YouTube lesson."));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.sheet.hidden) closeExplanation();
});

const VARIANTS = [
  { id: "A", label: "A · Immersive" },
  { id: "B", label: "B · Study rail" },
  { id: "C", label: "C · Focus card" }
];

function updatePrototypeState() {
  if (elements.prototypeState.hidden) return;
  elements.prototypeState.textContent = `variant=${state.variant} · cue=${state.cueIndex + 1}/${state.cues.length} · source=${state.sourceUrl}`;
}

function setVariant(id, updateUrl = true) {
  const selected = VARIANTS.find((item) => item.id === id) || VARIANTS[0];
  state.variant = selected.id;
  document.body.dataset.variant = selected.id;
  elements.variantLabel.textContent = selected.label;
  if (updateUrl) {
    const params = new URLSearchParams(location.search);
    params.set("variant", selected.id);
    history.replaceState({}, "", `${location.pathname}?${params.toString()}${location.hash}`);
  }
  updatePrototypeState();
}

function cycleVariant(direction) {
  const index = VARIANTS.findIndex((item) => item.id === state.variant);
  setVariant(VARIANTS[(index + direction + VARIANTS.length) % VARIANTS.length].id);
}

const initialParams = new URLSearchParams(location.search);
if (initialParams.get("prototype") === "1") {
  elements.variantSwitcher.hidden = false;
  elements.prototypeState.hidden = false;
  setVariant((initialParams.get("variant") || "A").toUpperCase(), false);
  elements.prevVariant.addEventListener("click", () => cycleVariant(-1));
  elements.nextVariant.addEventListener("click", () => cycleVariant(1));
  document.addEventListener("keydown", (event) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable) return;
    if (event.key === "ArrowLeft") cycleVariant(-1);
    if (event.key === "ArrowRight") cycleVariant(1);
  });
}

renderCaption();

const isPublishedNvidiaRoute = /\/NVIDIA\/?$/i.test(location.pathname);
if (initialParams.get("study") === "1" || isPublishedNvidiaRoute) {
  window.setTimeout(() => launchSource(YOUTUBE_VIDEO.url, true), 0);
}
