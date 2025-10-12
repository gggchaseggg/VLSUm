import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelViewer = () => {
  const [sheets, setSheets] = useState<string[]>([]);
  const [dataBySheet, setDataBySheet] = useState<Record<string, any[][]>>({});
  const [activeSheet, setActiveSheet] = useState<string>('');

  useEffect(() => {
    const fetchExcelFile = async () => {
      try {
        const response = await fetch('/servicesNew.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

        const sheetNames = workbook.SheetNames;
        const sheetsData: Record<string, any[][]> = {};

        sheetNames.forEach((name) => {
          const sheet = workbook.Sheets[name];
          const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          sheetsData[name] = parsedData as any[][];
        });

        setSheets(sheetNames);
        setDataBySheet(sheetsData);
        setActiveSheet(sheetNames[0]);
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
      }
    };

    void fetchExcelFile();
  }, []);


  return (
    <div className="excel-viewer">
      <div className="excel-tabs">
        {sheets.map((sheetName) => (
          <button
            key={sheetName}
            className={`excel-tab-button ${activeSheet === sheetName ? 'active' : ''}`}
            onClick={() => setActiveSheet(sheetName)}
          >
            {sheetName}
          </button>
        ))}
      </div>

      <table className="excel-table">
        <tbody>
        {dataBySheet[activeSheet]?.map((row, rowIndex, fullData) => (
          <tr key={rowIndex} className={rowIndex === 0 ? 'header-row' : ''}>
            {new Array(fullData[0].length).fill(null).map((_, cellIndex) => {
              if (row.length === 0) return null
              const cell = row[cellIndex]
              const colSpan = ['Диагностика+Рентген', 'Лабораторная диагностика', 'хирургия Стоматология', 'Терапия'].includes(activeSheet) && row.length === 1 ? 5 : undefined

              if (colSpan && cellIndex !== 0) return null

              return (
                <td
                  key={cellIndex}
                  className={!cell ? 'empty-cell' : ''}
                  colSpan={colSpan}
                >{cell}</td>
              )
            })}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelViewer;
