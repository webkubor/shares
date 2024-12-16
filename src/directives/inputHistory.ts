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
          console.log(value, `inputElement.value`);
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
          let value = fectchInnerInput()
          addHistory(value); // 保存历史记录
          setTimeout(() => {
            historyList.style.display = "none";
          }, 500);
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

        document.addEventListener("click", (e) => {
          const target = e.target as HTMLElement;

          // Hide historyList if the click is outside of both `el` and `historyList`
          if (!el.contains(target) && !historyList.contains(target)) {
            historyList.style.display = "none";
          }

          console.log(el, "document.addEventListener");
          // Handle selection of an item from the historyList
          if (historyList.contains(target)) {
            const historyItem = target.closest(".history-item");
            console.log(historyItem, "document.addEventListener");

            if (historyItem) {
              el.value = historyItem.textContent || "";
              el.dispatchEvent(new Event("input"));
              historyList.style.display = "none";
            }
          }
        });

        document.body.appendChild(historyList); // fix el.parentElement后添加导致部分下拉的窗口不准确的问题,因为很多无法确定父组件的定位样式,考虑到绝对定位,所以可以window 对象元素,加入全局的定位,这样能相对的准确无误
      },
    });
  },
};



