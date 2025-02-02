export default {
  install: (app: any) => {
    app.directive("history", {
      mounted(el: HTMLInputElement) {
        const key = "input-history";
        const limit = 10;
        const filter = (item: string, query: string) => item.includes(query);
        const renderItem = (item: string) =>
          `<li class="history-item">${item}</li>`;

        const historyList = document.createElement("ul");
        historyList.style.display = "none";
        historyList.style.position = "absolute";
        historyList.className = "history-list";

        const loadHistory = (): string[] => {
          const storedHistory = localStorage.getItem(key);
          return storedHistory ? JSON.parse(storedHistory) : [];
        };

        const saveHistory = (history: string[]) => {
          console.log(history, `history`);
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
          window.$logger?.success("addHistory", "addHistory");

        };

        const renderHistory = (query: string = "") => {
          const history = loadHistory();
          console.log(history, "renderHistory");
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

        el.addEventListener("input", (e) => {
          let value = fectchInnerInput()
          console.log(value, `inputElement.value`, e);
          renderHistory(value); // 渲染历史记录列表
        });

        el.addEventListener("focus", () => {
          renderHistory();
          positionList()
        });

        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            let value = fectchInnerInput()
            addHistory(value); // 保存历史记录
            renderHistory(); // 渲染历史记录列表
          }
        });

        el.addEventListener("blur", () => {
          console.log('获取到失焦事件');
          let value = fectchInnerInput()
          addHistory(value); // 保存历史记录
        });

        const fectchInnerInput = () => {
          const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input');
          if (inputElement) {
            const inputValue = inputElement.value.trim();
            return inputValue;
          } else {
            return "";
          }
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
        });

        document.body.appendChild(historyList); // fix el.parentElement后添加导致部分下拉的窗口不准确的问题,因为很多无法确定父组件的定位样式,考虑到绝对定位,所以可以window 对象元素,加入全局的定位,这样能相对的准确无误
      },
    });
  },
};



