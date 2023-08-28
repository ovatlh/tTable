let usuarioList = [];

const defColumnList1 = [
  {
    th: "#",
    width: "1%",
    minWidth: "1%",
    thClassList: ["col-01"],
    tdClassList: ["col-01", "col-number", "col-hover"],
    fnRender: function(item, index) {
      const res = index + 1;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-envelope"></i></span> Correo`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-02"],
    tdClassList: ["col-02", "col-hover"],
    fnRender: function(item, index) {
      const res = item.email;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-at"></i></span> Nombre de usuario`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-03"],
    tdClassList: ["col-03", "col-hover"],
    fnRender: function(item, index) {
      const res = item.username;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-user"></i></span> Nombre`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-04"],
    tdClassList: ["col-04", "col-hover"],
    fnRender: function(item, index) {
      const res = item.name;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-phone"></i></span> Telefono`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-05"],
    tdClassList: ["col-05", "col-hover"],
    fnRender: function(item, index) {
      const res = item.phone;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-globe"></i></span> Pagina`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-06"],
    tdClassList: ["col-06", "col-hover"],
    fnRender: function(item, index) {
      const res = item.website;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-gear"></i> Opciones</span>`,
    width: "1%",
    minWidth: "1%",
    thClassList: ["col-07"],
    tdClassList: ["col-07", "col-hover"],
    fnRender: function(item, index) {
      const res = `ACTIONS`;
      return res;
    },
  },
];
const defColumnList2 = [
  {
    th: "#",
    width: "1%",
    minWidth: "1%",
    thClassList: ["col-01"],
    tdClassList: ["col-01", "col-number", "col-hover"],
    fnRender: function(item, index) {
      const res = index + 1;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-envelope"></i></span> Email`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-02"],
    tdClassList: ["col-02", "col-hover"],
    fnRender: function(item, index) {
      const tempData = item.email;
      const res = `
        <a href="mailto:${tempData}">${tempData}</a>
      `;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-at"></i></span> Username`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-03"],
    tdClassList: ["col-03", "col-hover"],
    fnRender: function(item, index) {
      const res = item.username;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-user"></i></span> Name`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-04"],
    tdClassList: ["col-04", "col-hover"],
    fnRender: function(item, index) {
      const res = item.name;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-phone"></i></span> Phone`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-05"],
    tdClassList: ["col-05", "col-hover"],
    fnRender: function(item, index) {
      const res = item.phone;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-globe"></i></span> Website`,
    width: "20%",
    minWidth: "1%",
    thClassList: ["col-06"],
    tdClassList: ["col-06", "col-hover"],
    fnRender: function(item, index) {
      const tempData = item.website;
      const res = `
        <a href="//${tempData}" target="_blank">${tempData}</a>
      `;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-gear"></i> Actions</span>`,
    width: "1%",
    minWidth: "1%",
    thClassList: ["col-07"],
    tdClassList: ["col-07", "col-hover"],
    fnRender: function(item, index) {
      const res = `ACTIONS`;
      return res;
    },
  },
];
const defColumnList3 = [
  {
    th: "#",
    width: "1%",
    minWidth: "1%",
    thClassList: ["col-01"],
    tdClassList: ["col-01", "col-number", "col-hover"],
    fnRender: function(item, index) {
      const res = index + 1;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-at"></i></span> Username`,
    width: "50%",
    minWidth: "1%",
    thClassList: ["col-03"],
    tdClassList: ["col-03", "col-hover"],
    fnRender: function(item, index) {
      const res = item.username;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-globe"></i></span> Website`,
    width: "50%",
    minWidth: "1%",
    thClassList: ["col-06"],
    tdClassList: ["col-06", "col-hover"],
    fnRender: function(item, index) {
      const tempData = item.website;
      const res = `
        <a href="//${tempData}" target="_blank">${tempData}</a>
      `;
      return res;
    },
  },
  {
    th: `<span><i class="fa-solid fa-gear"></i> Actions</span>`,
    width: "1%",
    minWidth: "1%",
    thClassList: ["col-07"],
    tdClassList: ["col-07", "col-hover"],
    fnRender: function(item, index) {
      const res = `ACTIONS`;
      return res;
    },
  },
];

const asyncSleepPromise = (seconds) => {
  const ms = 1000;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms * seconds);
  });
};

async function loadUserList() {
  let list = [];
  try {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const res = await axios.get(url);
    const data = res.data;
    list = data;
  } catch (e) {
    console.log({ error: "loadUserList", e });
  }

  return list;
}

async function init() {
  tTable.init({
    id: "t-table-id-1",
    textNoData: `
      <div class="custom-status">
        <p>... Sin información ...</p>
      </div>
    `,
    columnList: defColumnList1,
    statusNRowsInTBody: 4,
  });

  tTable.init({
    id: "t-table-id-2",
    icons: {
      toExpandRow: `<i class="fa-solid fa-angle-right"></i>`,
      toCloseRow: `<i class="fa-solid fa-angle-down"></i>`,
      colExpander: `<i class="fa-solid fa-bars"></i>`,
    },
    textNoData: `
      <div class="custom-status">
        <p>... No data ...</p>
      </div>
    `,
    columnList: defColumnList2,
    statusNRowsInTBody: 4,
  });

  tTable.init({
    id: "t-table-id-3",
    textNoData: `
      <div class="custom-status">
        <p>... No data ...</p>
      </div>
    `,
    columnList: defColumnList3,
    statusNRowsInTBody: 4,
  });

  tTable.setStatus({
    id: "t-table-id-1",
    statusContent: `
      <div class="custom-status">
        <p><i class="fa-solid fa-spinner fa-spin-pulse"></i></p>
      </div>
    `,
  });

  tTable.setStatus({
    id: "t-table-id-2",
    statusContent: `
      <div class="custom-status">
        <p><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading</p>
      </div>
    `,
  });

  tTable.setStatus({
    id: "t-table-id-3",
    statusContent: `
      <div class="custom-status">
        <p><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading</p>
      </div>
    `,
  });

  usuarioList = await loadUserList();

  tTable.refreshDataList({
    id: "t-table-id-3",
    dataList: usuarioList,
  });

  await asyncSleepPromise(3);

  tTable.setStatus({
    id: "t-table-id-1",
    statusContent: `
      <div class="custom-status">
        <div>
          <p>... <i class="fa-solid fa-thumbs-up"></i> Completado ...</p>
          <p>... Por favor espere ...</p>
        </div>
      </div>
    `,
  });

  await asyncSleepPromise(3);

  tTable.refreshDataList({
    id: "t-table-id-1",
    // dataList: usuarioList,
  });

  tTable.setStatus({
    id: "t-table-id-2",
    statusContent: `
      <div class="custom-status">
        <div>
          <p><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading</p>
          <p>1 / 5</p>
        </div>
      </div>
    `,
  });

  await asyncSleepPromise(1);

  tTable.setStatus({
    id: "t-table-id-2",
    statusContent: `
      <div class="custom-status">
        <div>
          <p><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading</p>
          <p>2 / 5</p>
        </div>
      </div>
    `,
  });

  await asyncSleepPromise(1);

  tTable.setStatus({
    id: "t-table-id-2",
    statusContent: `
      <div class="custom-status">
        <div>
          <p><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading</p>
          <p>3 / 5</p>
        </div>
      </div>
    `,
  });

  await asyncSleepPromise(1);

  tTable.setStatus({
    id: "t-table-id-2",
    statusContent: `
      <div class="custom-status">
        <div>
          <p><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading</p>
          <p>4 / 5</p>
        </div>
      </div>
    `,
  });

  await asyncSleepPromise(1);

  tTable.setStatus({
    id: "t-table-id-2",
    statusContent: `
      <div class="custom-status">
        <div>
          <p><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading</p>
          <p>5 / 5</p>
        </div>
      </div>
    `,
  });

  await asyncSleepPromise(1);

  tTable.setStatus({
    id: "t-table-id-2",
    statusContent: `
      <div class="custom-status">
        <p><i class="fa-solid fa-circle-check"></i></p>
      </div>
    `,
  });

  await asyncSleepPromise(3);

  const tempDataList = [...usuarioList, ...usuarioList, ...usuarioList];
  tTable.refreshDataList({
    id: "t-table-id-2",
    dataList: tempDataList,
  });
}

init();
