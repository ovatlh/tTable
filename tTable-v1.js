var tTable=tTable||(function () {
  const VERSION = "1.0.0";
  let TABLE = {};

  function updateTrExpandedOnUpdateIsOverflow({
    id = "t-table-id",
  } = {}) {
    try {
      const isOverflow = TABLE[id].isOverflow;
      const tbody_DOM = TABLE[id].container.table.tbody.dom;
      const trList = TABLE[id].container.table.tbody.trList;
      const trList_Expanded = trList.filter((trItem) => trItem.isExpanded);

      if(isOverflow === false) {
        trList_Expanded.forEach((trItem, trIndex, trList) => {
          const tr_index = trItem.index;
          const trExpanded = tbody_DOM.querySelector(`tr.expanded[data-row-index="${tr_index}"]`);
          trExpanded.remove();
        });
      } else {
        trList_Expanded.forEach((trItem, trIndex, trList) => {
          const isExpanded = trItem.isExpanded;
          const isExpanded_NOT = !isExpanded;
          const tr_index = trItem.index;

          renderRowExpanded({ id: id, rowIndex: tr_index, preIsExpanded: isExpanded });
          renderRowExpanded({ id: id, rowIndex: tr_index, preIsExpanded: isExpanded_NOT });
        });
      }
    } catch (e) {
      console.log({ error: `updateTrExpandedOnUpdateIsOverflow: ${id}`, e });
    }
  }

  function renderRowExpanded({
    id = "t-table-id",
    rowIndex = 0,
    preIsExpanded = false,
  } = {}) {
    try {
      const tbody_DOM = TABLE[id].container.table.tbody.dom;
      const tr_Item = TABLE[id].container.table.tbody.trList[rowIndex];
      const tr_DOM = tr_Item.dom;
      const btnRowExpander_DOM = tr_Item.tdList[0].dom.querySelector("button");
      const icons = TABLE[id].icons;

      if(preIsExpanded === true) {
        const btnRowExpander_HTML = `
          <div>
            ${icons.toExpandRow}
          </div>
        `;
        btnRowExpander_DOM.innerHTML = btnRowExpander_HTML;

        const tr_Expanded = tbody_DOM.querySelector(`tr.expanded[data-row-index="${rowIndex}"]`);
        if(tr_Expanded) {
          tr_Expanded.remove();
        }
      } else {
        const btnRowExpander_HTML = `
          <div>
            ${icons.toCloseRow}
          </div>
        `;
        btnRowExpander_DOM.innerHTML = btnRowExpander_HTML;
        
        const th_List_isOverflow = TABLE[id].container.table.thead.thList.filter((thItem) => thItem.isOverflow);
        const th_List_isOverflow_Count = th_List_isOverflow.length;
        const th_List_Count = TABLE[id].container.table.thead.thList.length;
        const tr_td_ColSpan = th_List_Count - th_List_isOverflow_Count;

        const tr_Expanded_DOM = document.createElement("tr");
        const tr_classList = ["expanded"];
        const rowIndex_EvenOdd_res = rowIndex % 2;
          if(rowIndex_EvenOdd_res == 0) {
            tr_classList.push("even");
          }
          else {
            tr_classList.push("odd");
          }
        tr_Expanded_DOM.classList.add(...tr_classList);
        tr_Expanded_DOM.dataset.rowIndex = rowIndex;
        const tr_List_On_Expanded_Table = th_List_isOverflow.map((thItem, thIndex, thList) => {
          const th_index = thItem.index;
          const th_result = thItem.dom.innerHTML;
          const td_result = tr_Item.tdList[th_index].dom.innerHTML;
          const tr_HTML = `
            <tr>
              <td class="th-expanded">${th_result}</td>
              <td class="td-expanded">${td_result}</td>
            </tr>
          `;
          return tr_HTML;
        });
        const tr_List_On_Expanded_Table_HTML = tr_List_On_Expanded_Table.join("");
        const tr_HTML = `
          <td class="td-row-expanded" colspan="${tr_td_ColSpan}">
            <table class="table-expanded">
              <tbody>
                ${tr_List_On_Expanded_Table_HTML}
              </tbody>
            </table
          </td>
        `;
        tr_Expanded_DOM.innerHTML = tr_HTML;
        tr_DOM.insertAdjacentElement("afterend", tr_Expanded_DOM);
      }
    } catch (e) {
      console.log({ error: `renderRowExpanded: ${id}`, e });
    }
  }

  function updateRowExpanded({
    id = "t-table-id",
    rowIndex = 0,
  } = {}) {
    try {
      const trList = TABLE[id].container.table.tbody.trList;
      const isExpanded = trList[rowIndex].isExpanded;
      trList[rowIndex].isExpanded = !isExpanded;
      renderRowExpanded({ id: id, rowIndex: rowIndex, preIsExpanded: isExpanded });
    } catch (e) {
      console.log({ error: `updateRowExpanded: ${id}-${rowIndex}`, e });
    }
  }

  function btnExpanderClickEvent({
    id = "t-table-id",
    event = null,
  } = {}) {
    try {
      const src_DOM = event.srcElement;
      const dataSet = src_DOM.dataset;
      const row_Index = parseInt(dataSet.rowIndex);
      updateRowExpanded({ id: id, rowIndex: row_Index })
    } catch (e) {
      console.log({ error: "btnExpanderClickEvent", e });
    }
  }

  function btnExpanderSetupEvent({
    id = "t-table-id",
  } = {}) {
    try {
      const dataList = TABLE[id].dataList;
      const hasData = dataList.length > 0;
      if(hasData === true) {
        const tbody_DOM = TABLE[id].container.table.tbody.dom;
        const btn_Expander_List = tbody_DOM.querySelectorAll("button.btn-row-expander");
        const btn_Expander_List_ARRAY = Array.from(btn_Expander_List);
        btn_Expander_List_ARRAY.forEach((btnDOM, index) => {
          btnDOM.addEventListener("click", (e) => {
            btnExpanderClickEvent({ id: id, event: e });
          });
        });
      }
    } catch (e) {
      console.log({ error: `btnExpanderSetupEvent: ${id}`, e });
    }
  }

  function updateOverflow({
    id = "t-table-id",
    currentStep = 1,
  } = {}) {
    try {
      const container_DOM = TABLE[id].container.dom;
      
      if(currentStep === 1) {
        container_DOM.classList.add("is-overflow");
      }

      const isOverflow = TABLE[id].isOverflow;

      const thList = TABLE[id].container.table.thead.thList;
      const trList = TABLE[id].container.table.tbody.trList;

      thList.forEach((thItem, thIndex) => {
        const th_DOM = thItem.dom;
        const th_isOverflow = thItem.isOverflow;

        if(currentStep === 1) {
          th_DOM.classList.remove("is-overflow");
        }
        if(th_isOverflow === true) {
          if(currentStep === 2) {
            th_DOM.classList.add("is-overflow");
          }
        }
      });

      trList.forEach((trItem, trIndex) => {
        const tdList = trItem.tdList;

        tdList.forEach((tdItem, tdIndex) => {
          const td_DOM = tdItem.dom;
          const th_isOverflow = thList[tdIndex].isOverflow;

          if(currentStep === 1) {
            td_DOM.classList.remove("is-overflow");
          }
          if(th_isOverflow === true) {
            if(currentStep === 2) {
              td_DOM.classList.add("is-overflow");
            }
          }
        });
      });

      currentStep += 1;

      if(currentStep <= 3) {
        calcOverflow({ id: id, currentStep: currentStep });
      }
      else {
        if(isOverflow === false) {
          container_DOM.classList.remove("is-overflow");
        }
      }
    } catch (e) {
      console.log({ error: `updateOverflow: ${id}`, e });
    }
  }

  function calcOverflow({
    id = "t-table-id",
    currentStep = 1,
  } = {}) {
    try {
      const container_DOM = TABLE[id].container.dom;
      const table_DOM = TABLE[id].container.table.dom;
      const container_Rect = container_DOM.getBoundingClientRect();
      const table_Rect = table_DOM.getBoundingClientRect();
      const thList = TABLE[id].container.table.thead.thList;

      if(currentStep === 1) {
        const isOverflow_res = table_Rect.right > container_Rect.right;
        TABLE[id].isOverflow = isOverflow_res;
      }

      if(currentStep === 2) {
        let th_isOverflow_ANY = false;
        thList.forEach((item, index, list) => {
          const th_Rect = item.dom.getBoundingClientRect();
          const th_isOverflow = th_Rect.right > container_Rect.right;
          TABLE[id].container.table.thead.thList[index].isOverflow = th_isOverflow;
  
          if(th_isOverflow === true) {
            th_isOverflow_ANY = true;
          }
        });

        TABLE[id].isOverflow = th_isOverflow_ANY;
      }

      updateOverflow({ id: id, currentStep: currentStep });
    } catch (e) {
      console.log({ error: `calcOverflow: ${id}`, e });
    }
  }

  function trRefUpdate({
    id = "t-table-id",
  } = {}) {
    try {
      const dataList = TABLE[id].dataList;
      const hasData = dataList.length > 0;
      let tr_List = [];
      if(hasData === true) {
        const tbody_DOM = TABLE[id].container.table.tbody.dom;
        const tr_List_DOM = tbody_DOM.querySelectorAll("tr");
        const tr_List_ARRAY = Array.from(tr_List_DOM).map((trItem, trIndex) => {
          const td_List_DOM = trItem.querySelectorAll("td");
          const td_List_ARRAY = Array.from(td_List_DOM).map((tdItem, tdIndex) => {
            const td_Obj = {
              index: tdIndex,
              dom: tdItem,
            };

            return td_Obj;
          });

          const tr_Obj = {
            index: trIndex,
            dom: trItem,
            tdList: td_List_ARRAY,
            isExpanded: false,
          };

          return tr_Obj;
        });
        tr_List = tr_List_ARRAY;
      }

      TABLE[id].container.table.tbody.trList = tr_List;
      btnExpanderSetupEvent({ id: id });
      calcOverflow({ id: id });
    } catch (e) {
      console.log({ error: `trUpdate: ${id}`, e });
    }
  }

  function eventResize({
    id = "t-table-id",
  } = {}) {
    try {
      window.addEventListener("DOMContentLoaded", (e) => {
        calcOverflow({ id: id });
      });

      window.addEventListener("resize", (e) => {
        calcOverflow({ id: id });
        updateTrExpandedOnUpdateIsOverflow({ id: id });
      });
    } catch (e) {
      console.log({ error: `eventResize: ${id}`, e });
    }
  }

  function statusHTML({
    id = "t-table-id",
    statusContent = "Loading...",
  } = {}) {
    try {
      const statusNRowsInTBody = TABLE[id].statusNRowsInTBody;

      let res_tr_HTML_NoData = Array.from({ length: statusNRowsInTBody}, (_, index) => index).map((item, index) => {
        const res_tr_HTML = `
          <tr class="tr-status-nrowsintbody">
            <td class="td-status-nrowsintbody">0</td>
          </tr>
        `;

        return res_tr_HTML;
      });

      const td_status_content_HTML = `
        <tr class="tr-status">
          <td class="td-status-content">${statusContent}</td>
        </tr>
      `;
      res_tr_HTML_NoData.push(td_status_content_HTML);

      const res_tr_HTML_NoData_join = res_tr_HTML_NoData.join(" ");
      const res_tbody_HTML = res_tr_HTML_NoData_join;

      return res_tbody_HTML;
    } catch (e) {
      console.log({ error: `statusHTML: ${id}`, e });
    }
  }
  
  function setStatus({
    id = "t-table-id",
    statusContent = "Loading...",
  } = {}) {
    try {
      const tbody_DOM = TABLE[id].container.table.tbody.dom;
      tbody_DOM.classList.remove("tbody-status");

      tbody_DOM.innerHTML = "";
      let res_tbody_HTML = statusHTML({ id: id, statusContent: statusContent });

      tbody_DOM.innerHTML = res_tbody_HTML;
      tbody_DOM.classList.add("tbody-status");
    } catch (e) {
      console.log({ error: `setStatus: ${id}`, e });
    }
  }

  function tbodyHTML({
    id = "t-table-id",
  } = {}) {
    try {
      const textNoData = TABLE[id].textNoData;
      const dataList = TABLE[id].dataList;
      const hasData = dataList.length > 0;
      let res_tbody_HTML = ``;
      const tbody_classList = [];

      if(hasData === false) {
        res_tbody_HTML = statusHTML({ id: id, statusContent: textNoData });
      }
      else {
        const icons = TABLE[id].icons;
        const columnList = TABLE[id].columnList;

        const row_List_HTML = dataList.reduce((resultDataRow, currentDataRow, indexDataRow) => {
          const tr_classList = [];
          const td_Expander_HTML = `
            <td class="td-row-expander">
              <button class="btn-row-expander" data-row-index="${indexDataRow}">
                <div>${icons.toExpandRow}</div>
              </button>
            </td>
          `;
          const td_List_HTML = columnList.reduce((resultCol, currentCol, colIndex) => {
            const fnRender_HTML = currentCol.fnRender(currentDataRow, indexDataRow);
            currentCol.tdClassList.unshift("td-row");
            const td_classList = currentCol.tdClassList.join(" ");
            const td = `
              <td class="${td_classList}">${fnRender_HTML}</td>
            `;

            resultCol += td;

            return resultCol;
          }, "");

          const indexDataRow_even_odd_res = indexDataRow % 2;
          if(indexDataRow_even_odd_res == 0) {
            tr_classList.push("even");
          }
          else {
            tr_classList.push("odd");
          }

          const tr_classList_res = tr_classList.join(" ");

          const row = `
            <tr class="${tr_classList_res}" data-row-index="${indexDataRow}">
              ${td_Expander_HTML}
              ${td_List_HTML}
            </tr>
          `;

          resultDataRow += row;

          return resultDataRow;
        }, "");

        res_tbody_HTML = row_List_HTML;
      }

      const res_tbody_classList = tbody_classList.join(" ");

      let tbody_HTML = `
        <tbody class="${res_tbody_classList}">
          ${res_tbody_HTML}
        </tbody>
      `;

      return tbody_HTML;
    } catch (e) {
      console.log({ error: `tbodyHTML: ${id}`, e });
    }
  }

  function refreshDataList({
    id = "t-table-id",
    dataList = [],
  } = {}) {
    try {
      const tbody_DOM = TABLE[id].container.table.tbody.dom;
      tbody_DOM.innerHTML = "";

      TABLE[id].dataList = dataList;
      const tbody_HTML = tbodyHTML({ id: id });
      tbody_DOM.innerHTML = tbody_HTML;

      const hasData = dataList.length > 0;
      if(hasData === true) {
        tbody_DOM.classList.remove("tbody-status");
        tbody_DOM.classList.add("tbody-data");
        trRefUpdate({ id: id });
      }
    } catch (e) {
      console.log({ error: `refreshDataList: ${id}`, e });
    }
  }

  function theadHTML({
    id = "t-table-id",
  } = {}) {
    try {
      const columnList = TABLE[id].columnList;
      const icons = TABLE[id].icons;

      const tr_List_HTML = columnList.reduce((result, currentTH) => {
        currentTH.thClassList.unshift("th-row");
        const resClassList = currentTH.thClassList.join(" ");
        const resWidth = currentTH.width;
        const resMinWidth = currentTH.minWidth;
        const styleList = [];
        if(resWidth) {
          const resStyleWidth = `width: ${resWidth};`;
          styleList.push(resStyleWidth);
        }
        if(resMinWidth) {
          const resStyleMinWidth = `min-width: ${resMinWidth};`;
          styleList.push(resStyleMinWidth);
        }
        resStyle = styleList.join(" ");
        const th_HTML = `
          <th class="${resClassList}" style="${resStyle}">
            ${currentTH.th}
          </th>
        `;
        result += th_HTML;

        return result;
      }, "");
      const thead_tr_HTML = `
        <th class="th-row-expander">
          ${icons.colExpander}
        </th>
        ${tr_List_HTML}
      `;

      const thead_HTML = `
        <thead>
          <tr>
            ${thead_tr_HTML}
          </tr>
        </thead>
      `;

      return thead_HTML;
    } catch (e) {
      console.log({ error: `theadHTML: ${id}`, e });
    }
  }

  function setupInit({
    id = "t-table-id",
  } = {}) {
    try {
      const table_DOM = TABLE[id].container.table.dom;
      const thead_DOM =table_DOM.querySelector("thead");
      const tbody_DOM =table_DOM.querySelector("tbody");
      const th_List_DOM = thead_DOM.querySelectorAll("th");
      const th_List_MAP = Array.from(th_List_DOM).map((itemTH, indexTH) => {
        const th_Obj = {
          index: indexTH,
          dom: itemTH,
          isOverflow: false,
        };
        return th_Obj;
      });

      TABLE[id].container.table.thead = {
        dom: thead_DOM,
        thList: th_List_MAP,
      };
      TABLE[id].container.table.tbody = {
        dom: tbody_DOM,
      };
      trRefUpdate({ id: id });
    } catch (e) {
      console.log({ error: `setStatus: ${id}`, e });
    }
  }

  function renderInit({
    id = "t-table-id",
  } = {}) {
    try {
      const container_DOM = document.getElementById(id);
      container_DOM.innerHTML = "";
      const table_DOM = document.createElement("table");
      table_DOM.classList.add("t-table");

      const thead_HTML = theadHTML({ id: id });
      const tbody_HTML = tbodyHTML({ id: id });
      const table_HTML = `
        ${thead_HTML}
        ${tbody_HTML}
      `;
      table_DOM.innerHTML = table_HTML;
      container_DOM.appendChild(table_DOM);

      TABLE[id].container = {
        dom: container_DOM,
        table: {
          dom: table_DOM,
        },
      };

      setupInit({ id: id });
    } catch (e) {
      console.log({ error: `renderInit: ${id}`, e });
    }
  }

  function init({
    id = "t-table-id",
    icons = {
      toExpandRow: "➕",
      toCloseRow: "❌",
      colExpander: "⭕",
    },
    dataList = [],
    textNoData = "No data...",
    columnList = [],
    statusNRowsInTBody = 4,
  } = {}) {
    try {
      TABLE[id] = {
        icons: icons,
        dataList: dataList,
        textNoData: textNoData,
        columnList: columnList,
        statusNRowsInTBody: statusNRowsInTBody,
        isOverflow: false,
      };

      renderInit({ id: id });
      eventResize({ id: id });
    } catch (e) {
      console.log({ error: `init: ${id}`, e });
    }
  }

  return {
    VERSION,
    TABLE,
    init,
    setStatus,
    refreshDataList,
    trRefUpdate,
  };
})();
