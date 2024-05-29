function doGet(e)
{
  var mo = e.parameter.func;
  if(mo == "addData")
  {
    var stat = add_data(e);
    if(stat == 1)
    {
      var result = 
      {
        status : true
      };
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }
  }
  if(mo == "currentValue")
  {
    var stat = current_value(e);
    if(stat == 1)
    {
      var result = 
      {
        status : true
      };
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }
  }
}

function add_data(e)
{
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Sheet1'));

  var CurrentDate = new Date();
  var Date_ = Utilities.formatDate(CurrentDate, "Europe/Paris", "dd/MM/YYYY");
  var Time_ = Utilities.formatDate(CurrentDate, "Europe/Paris", "HH:mm:ss");
  
  sheet.appendRow([Date_, Time_, e.parameter.temp, e.parameter.hum]);
  return 1;
}

function current_value(e)
{
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Sheet3'));

  let range = sheet.getRange('B2:C2');
  range.getCell(1,1).setValue(e.parameter.temp);
  range.getCell(1,2).setValue(e.parameter.hum);

  return 1
}
