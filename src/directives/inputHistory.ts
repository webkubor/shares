export default {
  install: (app: any) => {
    app.directive("history", {
      mounted(el: HTMLInputElement) {
        const key = "input-history";
        const limit = 10;
        const filter = (item: string, query: string) => item.includes(query);
        const renderItem = (item: string) =>
          `<li class="history-item">${item}</li>`;

        // 为每个输入框创建独立的历史列表
        const historyList = document.createElement("ul");
        historyList.style.display = "none";
        historyList.style.position = "absolute";
        historyList.className = "history-list";
        document.body.appendChild(historyList);

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
          const filteredHistory = query
            ? history.filter((item) => filter(item, query))
            : history;
          historyList.innerHTML = filteredHistory.map(renderItem).join("");
          historyList.style.display = filteredHistory.length ? "block" : "none";
        };

        const positionList = () => {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

          historyList.style.top = `${rect.top + rect.height + scrollTop}px`;
          historyList.style.left = `${rect.left + scrollLeft}px`;
          historyList.style.width = `${rect.width}px`;
        };

        el.addEventListener("input", () => {
          const value = fectchInnerInput();
          renderHistory(value);
        });

        el.addEventListener("focus", (e) => {
          e.stopPropagation();
          renderHistory();
          positionList();
          historyList.style.display = "block";
        });

        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            const value = fectchInnerInput();
            addHistory(value);
            renderHistory();
          }
        });

        el.addEventListener("blur", () => {
          const value = fectchInnerInput();
          addHistory(value);
        });

        const fectchInnerInput = () => {
          const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input');
          return inputElement?.value.trim() || "";
        }

        historyList.addEventListener("click", (e) => {
          const target = (e.target as HTMLElement).closest(".history-item");
          if (target) {
            el.value = target.textContent || "";
            el.dispatchEvent(new Event("input"));
            historyList.style.display = "none";
          }
        });
        
        document.addEventListener("click", (e) => {
          const target = e.target as HTMLElement;
          if (!el.contains(target) && !historyList.contains(target)) {
            historyList.style.display = "none";
          }
        }, true); // 使用捕获阶段处理点击事件
      },
    });
  },
};
