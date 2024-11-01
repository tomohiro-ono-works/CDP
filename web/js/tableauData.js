function initViz2(url2) {
  var containerDiv = document.getElementById("vizContainer"),
      url = url2; // Sheetのリンク
  var options = {
    hideTabs: true,
    onFirstInteractive: function () {
      console.log("Viz is interactive");
    }
  };
  viz = new tableau.Viz(containerDiv, url, options);
}

// 共通のデータ取得と処理関数
function handleWorksheetData(worksheet, callback, download = true, filename = 'tableau_data.csv') {
  worksheet.getUnderlyingDataAsync().then(function(t) {
    var data = t.getData();
    var columns = t.getColumns();
    var csvRows = [columns.map(col => col.getFieldName()).join(",")]; // ヘッダー行

    data.forEach(row => {
      csvRows.push(row.map(cell => cell.formattedValue).join(",")); // データ行
    });

    if (download) {
      // ダウンロード処理
      var csvString = csvRows.join("\n");
      var blob = new Blob([csvString], { type: 'text/csv' });
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else {
      callback(data); // コールバックでデータ処理
    }
  });
}

// 1. デフォルトワークシートのデータダウンロード
function downloadData() {
  handleWorksheetData(viz.getWorkbook().getActiveSheet());
}

// 2. 特定のワークシートからデータダウンロード
function downloadDataFromWorksheet(sheetName) {
  var worksheet = viz.getWorkbook().getActiveSheet().getWorksheets().get(sheetName);
  handleWorksheetData(worksheet, null, true, sheetName + "_data.csv");
}

// 3. ダッシュボード内の特定シートからデータを取得しPythonへ送信
function getDataFromWorksheet(sheetName) {
  var worksheet = viz.getWorkbook().getActiveSheet().getWorksheets().get(sheetName);
  handleWorksheetData(worksheet, eel.sendDataToPython, false); // ダウンロードなしでPythonに送信
}

