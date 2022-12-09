import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {

  constructor() { }

  async generateExcel(keyData: any, apiKeys: any, data: any, name: any) {    
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(name[0].sheet_name);

    // worksheet.addRow([]);// Blank Row
    const headerRow = worksheet.addRow(keyData); // Add Header Row

    let result: any = data.map((obj: any) => {
      let filterObj: any = {};
      for (let i: any = 0; i < apiKeys.length; i++) {
        filterObj[apiKeys[i]] = obj[apiKeys[i]];
      }
      return filterObj;
    });    

    headerRow.eachCell((cell: any) => { // Cell Style : Fill and Border
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'C0C0C0' }, bgColor: { argb: 'C0C0C0' } };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    
    var headerSize = [12, 30, 40, 15, 20, 60, 20, 10, 10, 15, 20, 20, 20, 10, 10, 10, 60, 15, 15, 15];

    for(var i = 0; i < headerSize.length; i++){      
      worksheet.getColumn(i+1).width = headerSize[i];
    }

    // Add Data
    result.map((d: any) => {
      worksheet.addRow(Object.values(d));
    });

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, name[0].excel_name);
    });
  }
}

