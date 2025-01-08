let sampleColumnCount = 0; // 記錄限度樣品編號的計數器

// 用於追蹤最大編號的變數
function getMaxSampleNumber() {
  let maxNumber = 0;

  const tableRows = document.querySelectorAll(".user-form-table tbody tr");
  tableRows.forEach((row) => {
    const inputs = row.querySelectorAll("input");
    // 遍歷每個輸入框，找出最大編號
    for (let i = 5; i < inputs.length; i++) {
      const sampleNumber = inputs[i]?.placeholder || "";
      const match = sampleNumber.match(/限度樣品編號-(\d+)/);
      if (match && match[1]) {
        const currentNumber = parseInt(match[1], 10);
        if (currentNumber > maxNumber) {
          maxNumber = currentNumber;
        }
      }
    }
  });
  return maxNumber;
}

function addSampleColumn() {
  const tableHeadRow = document.querySelector(".user-form-table thead tr");
  const tableBodyRow = document.querySelector(".user-form-table tbody tr");
  const nextSampleNumber = getMaxSampleNumber() + 1;

  // 新增欄位標題
  const newHeader = document.createElement("th");
  newHeader.textContent = `限度樣品編號-${nextSampleNumber}`; // 設定新的標題
  tableHeadRow.appendChild(newHeader); // 使用 appendChild 插入到最後

  // 新增欄位輸入框
  const newCell = document.createElement("td");
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = `限度樣品編號-${nextSampleNumber}`; // 設定新的輸入框
  newCell.appendChild(newInput);
  tableBodyRow.appendChild(newCell); // 使用 appendChild 插入到最後
}

function removeSampleColumn() {
  const tableHeadRow = document.querySelector(".user-form-table thead tr");
  const tableBodyRow = document.querySelector(".user-form-table tbody tr");

  if (tableHeadRow.children.length > 6) {
    tableHeadRow.removeChild(tableHeadRow.lastElementChild);
    tableBodyRow.removeChild(tableBodyRow.lastElementChild);
  } else {
    alert("無法刪除最後一個欄位");
  }
}

function saveSampleData() {
  const tableRows = document.querySelectorAll("#sampleFormTable tbody tr");
  const savedDataBody = document.querySelector("#savedSampleData tbody");

  tableRows.forEach((row) => {
    const inputs = row.querySelectorAll("input");
    const newRow = document.createElement("tr");

    inputs.forEach((input) => {
      const cell = document.createElement("td");
      cell.textContent = input.value;
      newRow.appendChild(cell);
    });

    savedDataBody.appendChild(newRow);
  });

  alert("點檢資料已保存！");
}

function filterSavedData() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const savedRows = document.querySelectorAll("#savedSampleData tbody tr");

  savedRows.forEach((row) => {
    const dateCell = row.children[0];
    const rowDate = new Date(dateCell.textContent);
    const start = new Date(startDate);
    const end = new Date(endDate);

    if ((startDate && rowDate < start) || (endDate && rowDate > end)) {
      row.style.display = "none";
    } else {
      row.style.display = "";
    }
  });
}

function editMachineRow(button) {
  const row = button.closest("tr");
  editingMachineRow = row;
  const cells = row.children;

  document.getElementById("machineId55").value = cells[0].textContent;
  document.getElementById("machineName55").value = cells[1].textContent;
  document.getElementById("inspectionTime55").value = cells[2].textContent;
  document.getElementById("inspectionFrequency55").value = cells[3].textContent;

  document.getElementById("machineFormContainer55").style.display = "block";
}

function deleteMachineRow(button) {
  button.closest("tr").remove();
}

function addMachineRow() {
  editingMachineRow = null;
  document.getElementById("machineForm").reset();
  document.getElementById("machineFormContainer55").style.display = "block";
}

function submitMachineData() {
  const machineId = document.getElementById("machineId55").value;
  const machineName = document.getElementById("machineName55").value;
  const inspectionTime = document.getElementById("inspectionTime55").value;
  const inspectionFrequency = document.getElementById("inspectionFrequency55")
    .value;

  if (editingMachineRow) {
    const cells = editingMachineRow.children;
    cells[0].textContent = machineId;
    cells[1].textContent = machineName;
    cells[2].textContent = inspectionTime;
    cells[3].textContent = inspectionFrequency;
  } else {
    const tableBody = document.querySelector("#machineTable tbody");
    const newRow = tableBody.insertRow();

    newRow.innerHTML = `
            <td>${machineId}</td>
            <td>${machineName}</td>
            <td>${inspectionTime}</td>
            <td>${inspectionFrequency}</td>
            <td>
                <button class="edit-button" onclick="editMachineRow(this)">編輯</button>
                <button class="delete-button" onclick="deleteMachineRow(this)">刪除</button>
            </td>
        `;
  }

  document.getElementById("machineForm").reset();
  document.getElementById("machineFormContainer55").style.display = "none";
}

function cancelMachineEdit() {
  document.getElementById("machineFormContainer55").style.display = "none";
}

const translations = {
  "zh-Hant": {
    "page-title": "限度樣品點檢",
    "sample-inspection": "範例一 限度樣品點檢",
    "machine-management": "範例二 機台資料管理者",
    "filter-function": "篩選功能:",
    "start-date": "開始日期:",
    "end-date": "結束日期:",
    "save-records": "保存紀錄如下表:",
    "add-column": "新增欄位",
    "remove-column": "刪除欄位",
    "save": "保存",
    "confirm": "確認送出",
    "cancel": "取消",
    "date-label": "日期",
    "time-label": "時間",
    "work-order": "工單",
    "part-number": "料號",
    "operator": "作業人員",
    "sample-number": "限度樣品編號",
    "record-date": "日期",
    "record-time": "時間",
    "record-work-order": "工單",
    "record-part-number": "料號",
    "record-operator": "作業人員",
    "test-one": "測試一",
    "test-two": "測試二",
    "test-three": "測試三",
    "machine-id": "機台編號",
    "machine-name": "機台名稱",
    "inspection-time": "檢驗時機",
    "inspection-frequency": "檢驗時間",
    "operation": "操作",
    "machine-id-header": "機台編號",
    "machine-name-header": "機台名稱",
    "inspection-time-header": "檢驗時機",
    "inspection-frequency-header": "檢驗時間",
    "add-machine-row": "新增機台資料",
    "machine-form-title": "編輯機台資料",
    "machine-id-form": "機台編號",
    "machine-name-form": "機台名稱",
    "inspection-time-form": "檢驗時機",
    "inspection-frequency-form": "檢驗時間",
    "filter": "篩選",
    "export-excel": "匯出Excel",
    "language": "語言",

  },
  en: {
    "page-title": "Limit Sample Inspection",
    "sample-inspection": "Example 1 Limit Sample Inspection",
    "machine-management": "Example 2 Machine Data Management",
    "filter-function": "Filter Function:",
    "start-date": "Start Date:",
    "end-date": "End Date:",
    "save-records": "Saved Records as Below:",
    "add-column": "Add Column",
    "remove-column": "Remove Column",
   "save": "Save",
    "confirm": "Confirm Submit",
    "cancel": "Cancel",
    "date-label": "Date",
    "time-label": "Time",
    "work-order": "Work Order",
    "part-number": "Part Number",
    "operator": "Operator",
    "sample-number": "Sample Number",
    "record-date": "Date",
    "record-time": "Time",
    "record-work-order": "Work Order",
    "record-part-number": "Part Number",
    "record-operator": "Operator",
    "test-one": "Test One",
    "test-two": "Test Two",
    "test-three": "Test Three",
    "machine-id": "Machine ID",
    "machine-name": "Machine Name",
    "inspection-time": "Inspection Time",
    "inspection-frequency": "Inspection Frequency",
    "operation": "Operation",
    "machine-id-header": "Machine ID",
    "machine-name-header": "Machine Name",
    "inspection-time-header": "Inspection Time",
    "inspection-frequency-header": "Inspection Frequency",
    "add-machine-row": "Add Machine Data",
    "machine-form-title": "Edit Machine Data",
    "machine-id-form": "Machine ID",
    "machine-name-form": "Machine Name",
    "inspection-time-form": "Inspection Time",
    "inspection-frequency-form": "Inspection Frequency",
    "filter": "Filter",
    "export-excel": "Export Excel",
    "language": "Language",
  },
  id: {
    "page-title": "Pemeriksaan Sampel Batas",
    "sample-inspection": "Contoh 1 Pemeriksaan Sampel Batas",
    "machine-management": "Contoh 2 Manajemen Data Mesin",
    "filter-function": "Fungsi Penyaringan:",
    "start-date": "Tanggal Mulai:",
    "end-date": "Tanggal Selesai:",
    "save-records": "Rekaman yang Disimpan di bawah:",
    "add-column": "Tambah Kolom",
    "remove-column": "Hapus Kolom",
    "save": "Simpan",
    "confirm": "Konfirmasi Kirim",
    "cancel": "Batal",
    "date-label": "Tanggal",
    "time-label": "Waktu",
    "work-order": "Nomor Pesanan Kerja",
    "part-number": "Nomor Bagian",
    "operator": "Operator",
    "sample-number": "Nomor Sampel",
    "record-date": "Tanggal",
    "record-time": "Waktu",
    "record-work-order": "Nomor Pesanan Kerja",
    "record-part-number": "Nomor Bagian",
    "record-operator": "Operator",
    "test-one": "Tes Satu",
    "test-two": "Tes Dua",
    "test-three": "Tes Tiga",
    "machine-id": "ID Mesin",
    "machine-name": "Nama Mesin",
    "inspection-time": "Waktu Pemeriksaan",
    "inspection-frequency": "Frekuensi Pemeriksaan",
    "operation": "Operasi",
    "machine-id-header": "ID Mesin",
    "machine-name-header": "Nama Mesin",
    "inspection-time-header": "Waktu Pemeriksaan",
    "inspection-frequency-header": "Frekuensi Pemeriksaan",
    "add-machine-row": "Tambah Data Mesin",
    "machine-form-title": "Edit Data Mesin",
    "machine-id-form": "ID Mesin",
    "machine-name-form": "Nama Mesin",
    "inspection-time-form": "Waktu Pemeriksaan",
    "inspection-frequency-form": "Frekuensi Pemeriksaan",
    "filter": "Penyaringan",
    "export-excel": "Ekspor Excel",
    "language": "Bahasa"
   
  },
  ja: {
    "page-title": "限度サンプル検査",
    "sample-inspection": "例1 限度サンプル検査",
    "machine-management": "例2 機械データ管理者",
    "filter-function": "フィルター機能:",
    "start-date": "開始日:",
    "end-date": "終了日:",
    "save-records": "保存された記録は以下の通りです:",
    "add-column": "列の追加",
    "remove-column": "列の削除",
    "save": "保存",
    "confirm": "確認送信",
    "cancel": "キャンセル",
    "date-label": "日付",
    "time-label": "時間",
    "work-order": "作業指示書",
    "part-number": "部品番号",
    "operator": "オペレーター",
    "sample-number": "サンプル番号",
    "record-date": "日付",
    "record-time": "時間",
    "record-work-order": "作業指示書",
    "record-part-number": "部品番号",
    "record-operator": "オペレーター",
    "test-one": "テスト一",
    "test-two": "テスト二",
    "test-three": "テスト三",
    "machine-id": "機械ID",
    "machine-name": "機械名",
    "inspection-time": "検査時点",
    "inspection-frequency": "検査頻度",
    "operation": "操作",
    "machine-id-header": "機械ID",
    "machine-name-header": "機械名",
    "inspection-time-header": "検査時点",
    "inspection-frequency-header": "検査頻度",
    "add-machine-row": "機械データの追加",
    "machine-form-title": "機械データ編集",
    "machine-id-form": "機械ID",
    "machine-name-form": "機械名",
    "inspection-time-form": "検査時点",
    "inspection-frequency-form": "検査頻度",
    "filter": "フィルタ",
    "export-excel": "Excelをエクスポート",
    "language": "言語",

  }
};

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "zh-Hant"; // 默認為繁體中文
  document.getElementById("language-select").value = savedLanguage;
  changeLanguage(); // 設置語言
});

function changeLanguage() {
  const selectedLanguage = document.getElementById("language-select").value;
  localStorage.setItem("language", selectedLanguage); // 保存選擇的語言到 localStorage
  const elements = document.querySelectorAll("[id]");

  elements.forEach((element) => {
    const elementId = element.id;
    if (translations[selectedLanguage][elementId]) {
      element.textContent = translations[selectedLanguage][elementId];
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  let machineData = [
    {
      id: "S-105",
      name: "自動勾彈簧機",
      standard: "生產前檢驗10PCS",
      frequency: "每周一次"
    }
  ];

  const machineSelect100 = document.getElementById("machine-select100");

  function renderMachineSelect100() {
    machineSelect100.innerHTML = '<option value="">-------------</option>';
    machineData.forEach(machine => {
      const option = document.createElement("option");
      option.value = machine.id;
      option.textContent = machine.id;
      machineSelect100.appendChild(option);
    });
  }

  renderMachineSelect100();

  machineSelect100.addEventListener("change", function () {
    const selectedMachine = machineData.find(machine => machine.id === this.value);
    if (selectedMachine) {
      document.getElementById("machine-name100").textContent = selectedMachine.name;
      document.getElementById("inspection-standard100").textContent = selectedMachine.standard;
      document.getElementById("inspection-frequency100").textContent = selectedMachine.frequency;
    } else {
      document.getElementById("machine-name100").textContent = "-";
      document.getElementById("inspection-standard100").textContent = "-";
      document.getElementById("inspection-frequency100").textContent = "-";
    }
  });

  document.getElementById("confirm").addEventListener("click", function () {
    const newMachineId = document.getElementById("new-machine-id").value.trim();
    const newMachineName = document.getElementById("new-machine-name").value.trim();
    const newInspectionStandard = document.getElementById("new-inspection-standard").value.trim();
    const newInspectionFrequency = document.getElementById("new-inspection-frequency").value.trim();

    if (!newMachineId || !newMachineName || !newInspectionStandard || !newInspectionFrequency) {
      alert("請填寫所有欄位！");
      return;
    }

    machineData.push({
      id: newMachineId,
      name: newMachineName,
      standard: newInspectionStandard,
      frequency: newInspectionFrequency
    });

    const tableBody = document.querySelector("#machineTable tbody");
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${newMachineId}</td>
      <td>${newMachineName}</td>
      <td>${newInspectionStandard}</td>
      <td>${newInspectionFrequency}</td>
      <td>
        <button class="edit-button" onclick="editMachineRow(this)">編輯</button>
        <button class="delete-button" onclick="deleteMachineRow(this)">刪除</button>
      </td>
    `;

    renderMachineSelect100();

    document.getElementById("new-machine-id").value = "";
    document.getElementById("new-machine-name").value = "";
    document.getElementById("new-inspection-standard").value = "";
    document.getElementById("new-inspection-frequency").value = "";

    alert("機台資料新增成功！");
  });
});