interface HistoryConfig {
  key: string; // localStorage 存储键
  limit?: number; // 最大存储条数，默认 10
  filter?: (item: string, query: string) => boolean; // 自定义过滤函数
  renderItem?: (item: string) => string; // 自定义渲染项模板
}

const defaultConfig: Required<HistoryConfig> = {
  key: "search-history",
  limit: 10,
  filter: (item, query) => item.includes(query), // 默认模糊匹配
  renderItem: (item) => `<li>${item}</li>`, // 默认渲染 HTML
};

export function createSearchHistory(config: HistoryConfig) {
  const { key, limit, filter, renderItem } = { ...defaultConfig, ...config };
  const historyList = document.createElement("ul");
  console.log("createSearchHistory start");
  historyList.style.display = "none";
  historyList.style.position = "absolute";
  historyList.className = "history-list";

  const loadHistory = (): string[] => {
    const storedHistory = localStorage.getItem(key);
    return storedHistory ? JSON.parse(storedHistory) : [];
  };

  const saveHistory = (history: string[]) => {
    localStorage.setItem(key, JSON.stringify(history));
  };

  const addHistory = (item: string) => {
    if (!item.trim()) return;

    let history = loadHistory();
    history = [item, ...history.filter((h) => h !== item)];

    if (history.length > limit) {
      history = history.slice(0, limit);
    }

    saveHistory(history);
  };

  const renderHistory = (query: string = "") => {
    const history = loadHistory();
    console.log(history, "renderHistory");
    const filteredHistory = query
      ? history.filter((item) => filter(item, query))
      : history;
    console.log(filteredHistory, "filteredHistory");

    historyList.innerHTML = filteredHistory.map(renderItem).join("");
    console.log(historyList.innerHTML, "filteredHistory");
    console.log(filteredHistory.length, "filteredHistory.length");

    historyList.style.display = filteredHistory.length ? "block" : "none";
    console.log(historyList, "filteredHistory");

  };

  const attachToInput = (input: HTMLInputElement) => {
    input.addEventListener("focus", () => {
      renderHistory();
      positionList(input);
    });

    input.addEventListener("input", (e) => {
      const value = (e.target as HTMLInputElement).value.trim();
      renderHistory(value);
      positionList(input);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = input.value.trim();
        addHistory(value);
        renderHistory();
      }
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target as Node) && !historyList.contains(e.target as Node)) {
        historyList.style.display = "none";
      }
    });
    
    historyList.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("history-item")) {
        input.value = target.textContent || ""; // 填入点击的历史记录
        input.dispatchEvent(new Event("input")); // 触发输入事件
        historyList.style.display = "none"; // 隐藏历史记录
      }
    });

    input.parentElement?.appendChild(historyList);
  };

  const positionList = (input: HTMLInputElement) => {
    const rect = input.getBoundingClientRect(); // 获取输入框的位置和尺寸
    const parentRect = input.offsetParent?.getBoundingClientRect(); // 获取父容器的位置
    const scrollX = parentRect ? 0 : window.scrollX; // 根据父容器是否存在调整
    const scrollY = parentRect ? 0 : window.scrollY;

    console.log(rect, "input rect");
    console.log(parentRect, "parent rect");

    historyList.style.top = `${rect.bottom - (parentRect?.top || 0) + scrollY}px`;
    historyList.style.left = `${rect.left - (parentRect?.left || 0) + scrollX}px`;
    historyList.style.width = `${rect.width}px`;
  };

  return {
    addHistory,
    renderHistory,
    attachToInput,
  };
}