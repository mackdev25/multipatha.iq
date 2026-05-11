import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import type { FabricData, ValidationResult } from '../types';

export class ExcelUtils {
    /**
     * Read Excel file and parse fabric data
     */
    static async readExcelFile(file: File): Promise<FabricData[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(arrayBuffer);
                const worksheet = workbook.worksheets[0];

                if (!worksheet) {
                    throw new Error('Excel file must contain at least one worksheet');
                }

                // Convert to JSON with expected column names
                const jsonData: any[][] = [];
                worksheet.eachRow((row) => {
                    const rowValues: any[] = [];
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        rowValues[colNumber - 1] = cell.value;
                    });
                    jsonData.push(rowValues);
                });

                if (jsonData.length < 2) {
                    throw new Error('Excel file must contain headers and at least one data row');
                }

                const headers = jsonData[0] as string[];
                const rows = jsonData.slice(1) as any[][];

                // Map to FabricData objects
                const fabricData: FabricData[] = rows.map(row => {
                    const obj: any = {};
                    headers.forEach((header, index) => {
                        obj[header] = row[index] || '';
                    });
                    return obj as FabricData;
                }).filter(item => item.Fabric && item.Alias); // Filter out empty rows

                resolve(fabricData);
            } catch (error) {
                reject(new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`));
            }
        });
    }

    /**
     * Export validation results to Excel file with WWN information and color coding
     */
    static async exportToExcel(results: ValidationResult[], fileName = 'validation_report.xlsx') {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Validation Report');

        // Create worksheet data with WWN column
        const headers = [
            'Host',
            'WWNs (Logged In Status)',
            'Server Type',
            'Total WWNs',
            'Fab A : Logged in Yes',
            'Fab A : Logged in No',
            'Validation-A',
            'Fab B : Logged in Yes',
            'Fab B : Logged in No',
            'Validation-B',
            'Final Validation'
        ];

        worksheet.addRow(headers);

        // Header styling
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // Add rows
        results.forEach((result) => {
            const wwnText = result.wwns.map(wwn =>
                `${wwn.wwn} (${wwn.fabric}: ${wwn.isLoggedIn ? 'Logged In' : 'NOT LOGGED IN'})`
            ).join('\n');

            const serverType = result.wwns.length >= 8 ? 'AIX' :
                result.wwns.length >= 2 ? 'RHEL/ESXi' : 'Unknown';

            const rowData = [
                result.host,
                wwnText,
                serverType,
                result.wwns.length,
                result.fabA_LoggedInYes,
                result.fabA_LoggedInNo,
                result.validationA,
                result.fabB_LoggedInYes,
                result.fabB_LoggedInNo,
                result.validationB,
                result.finalValidation
            ];

            const row = worksheet.addRow(rowData);
            
            // Color-code WWN cell based on logged-in status
            const wwnCell = row.getCell(2);
            const hasNotLoggedIn = result.wwns.some(wwn => !wwn.isLoggedIn);
            if (hasNotLoggedIn) {
                wwnCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE6E6' } };
                wwnCell.font = { color: { argb: 'FFC53030' } };
            } else {
                wwnCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6F4EA' } };
                wwnCell.font = { color: { argb: 'FF276749' } };
            }
            wwnCell.alignment = { wrapText: true, vertical: 'top' };

            // Color-code final validation column
            const finalValidationCell = row.getCell(11);
            switch (result.finalValidation) {
                case 'Good':
                    finalValidationCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
                    finalValidationCell.font = { color: { argb: 'FFFFFFFF' } };
                    break;
                case 'Both FABs Are BAD':
                    finalValidationCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC5504B' } };
                    finalValidationCell.font = { color: { argb: 'FFFFFFFF' } };
                    break;
                case 'FAB-A Is BAD':
                case 'FAB-B Is BAD':
                    finalValidationCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE07C24' } };
                    finalValidationCell.font = { color: { argb: 'FFFFFFFF' } };
                    break;
            }
        });

        // Auto-size columns with special handling for WWN column
        worksheet.columns.forEach((column, index) => {
            if (index === 1) { // WWN column
                column.width = 60;
            } else {
                let maxLength = 0;
                column.eachCell?.({ includeEmpty: true }, cell => {
                    const columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength < 10 ? 10 : Math.min(maxLength + 2, 30);
            }
        });

        // Generate Excel file and download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName);
    }

    /**
     * Validate Excel file structure
     */
    static validateExcelStructure(data: any[]): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!Array.isArray(data) || data.length === 0) {
            errors.push('Excel file is empty or invalid');
            return { isValid: false, errors };
        }

        const requiredColumns = ['Fabric', 'Alias', 'Logged In'];
        const sampleRow = data[0];

        requiredColumns.forEach(column => {
            if (!sampleRow.hasOwnProperty(column)) {
                errors.push(`Missing required column: ${column}`);
            }
        });

        // Check for valid fabric values
        const validFabrics = ['FAB-A', 'FAB-B'];
        const invalidFabrics = data
            .map(row => row.Fabric)
            .filter(fabric => fabric && !validFabrics.includes(fabric))
            .filter((value, index, self) => self.indexOf(value) === index);

        if (invalidFabrics.length > 0) {
            errors.push(`Invalid fabric values found: ${invalidFabrics.join(', ')}. Expected: ${validFabrics.join(', ')}`);
        }

        return { isValid: errors.length === 0, errors };
    }
}