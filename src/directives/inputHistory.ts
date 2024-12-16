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
            console.log(history,`history`);
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
            window.$logger?.success("addHistory");

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
            const { top, left, width, height } = el.getBoundingClientRect();
            historyList.style.top = `${top + height + window.scrollY}px`;
            historyList.style.left = `${left + window.scrollX}px`;
            historyList.style.width = `${width}px`;
            console.log(top, left, width, height, "positionList");
          };
  
          el.addEventListener("input", (e) => {
            const inputValue = (e.target as HTMLInputElement).value.trim();
            renderHistory(inputValue);
            positionList();
          });
  
          el.addEventListener("focus", () => {
            renderHistory();
            positionList();
          });
  
          el.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              console.log(`keydown` , el);
              const inputValue = el.value.trim();
              addHistory(inputValue);
              renderHistory();
            }
          });
  
          document.addEventListener("click", (e) => {
            if (
              !el.contains(e.target as Node) &&
              !historyList.contains(e.target as Node)
            ) {
              historyList.style.display = "none";
            }
          });
  
          historyList.addEventListener("click", (e) => {
            const target = (e.target as HTMLElement).closest(".history-item");
            if (target) {
              el.value = target.textContent || "";
              el.dispatchEvent(new Event("input"));
              historyList.style.display = "none";
            }
          });
  
          el.parentElement?.appendChild(historyList);
        },
      });
    },
  };