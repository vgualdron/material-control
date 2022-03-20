import JsPDF from 'jspdf';
import 'jspdf-autotable';

function printMaterialSettlement (data) {
  /* current date */
  const stringFullDate = (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '');
  const arrayFullDate = stringFullDate.split(' ');
  let arrayDate = arrayFullDate[0].split('/');
  arrayDate = arrayDate.map(function (x) { return x.padStart(2, '0'); });
  const currentDate = arrayDate[0] + '/' + arrayDate[1] + '/' + arrayDate[2];
  const logo = require('~/assets/images/logo-banner.png');
  const doc = new JsPDF('l', 'in', [11, 8.5]);
  const img = new Image();
  img.src = logo;
  doc.addImage(img, 'png', 0.72, 0.74, 1.15, 0.42);
  doc.setFontSize(10.40);
  doc.setTextColor(68, 114, 196);
  doc.setFont('Helvetica', 'bold');
  doc.text(2.12, 0.95, 'NOVUM ENERGIA COLOMBIA SAS CI');
  doc.setFontSize(6.40);
  doc.text(2.12, 1.10, 'Nit: 900.997.047-9');
  doc.setTextColor(0, 0, 0);
  doc.text(8.65, 1.04, 'Fecha de impresión:');
  doc.text(9.59, 1.04, currentDate);
  doc.text(4.63, 1.29, 'LIQUIDACIÓN DE MATERIAL');
  doc.text(0.7, 1.55, 'TERCERO');
  doc.setFont('Helvetica', 'normal');
  doc.text(1.42, 1.55, data.third);
  doc.setFont('Helvetica', 'bold');
  doc.text(4.82, 1.55, 'LIQUIDACION N°');
  doc.setFont('Helvetica', 'normal');
  doc.text(5.81, 1.55, data.consecutive);
  doc.setFont('Helvetica', 'bold');
  doc.text(7.3, 1.55, 'FECHA');
  doc.setFont('Helvetica', 'normal');
  doc.text(7.9, 1.55, data.date);
  doc.setFont('Helvetica', 'bold');
  doc.text(0.7, 1.8, 'MATERIALES ENTREGADOS ENTRE EL ' + data.startDate + ' Y ' + data.finalDate);
  const itemsToTable = data.tiquets.map((item) => {
    return [item.date, item.referral_number, item.receipt_number, item.license_plate, item.origin_supplier, item.destiny_customer, item.material_name, item.material_weight_settled, item.unit_value, item.material_settlement_net_value];
  });
  itemsToTable.push([{ content: '', colSpan: 10, styles: { cellPadding: 0 } }]);
  itemsToTable.push([{ content: '', colSpan: 6, styles: { cellPadding: 0 } }, { content: 'SUBTOTAL', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold', halign: 'left' } }, { content: data.subtotalAmount, styles: { cellPadding: 0.02, halign: 'right' } }, { content: '', styles: { cellPadding: 0.02, halign: 'left' } }, { content: data.subtotalSettlement, styles: { cellPadding: 0.02, halign: 'right' } }]);
  itemsToTable.push([{ content: '', colSpan: 6, styles: { cellPadding: 0 } }, { content: 'RETENCION EN LA FUENTE', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold', halign: 'left' } }, { content: data.retentionsPercentage, styles: { cellPadding: 0.02, halign: 'right' } }, { content: '', styles: { cellPadding: 0.02, halign: 'left' } }, { content: data.retentions, styles: { cellPadding: 0.02, halign: 'right' } }]);
  itemsToTable.push([{ content: '', colSpan: 6, styles: { cellPadding: 0 } }, { content: 'REGALIAS', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold', halign: 'left' } }, { content: data.unitRoyalties, styles: { cellPadding: 0.02, halign: 'right' } }, { content: '', styles: { cellPadding: 0.02, halign: 'left' } }, { content: data.royalties, styles: { cellPadding: 0.02, halign: 'right' } }]);
  itemsToTable.push([{ content: '', colSpan: 6, styles: { cellPadding: 0 } }, { content: 'TOTAL', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold', halign: 'left' } }, { content: '', colSpan: 2, styles: { cellPadding: 0.02, halign: 'left' } }, { content: data.totalSettle, styles: { cellPadding: 0.02, halign: 'right' } }]);
  itemsToTable.push([{ content: '', colSpan: 10, styles: { cellPadding: 0 } }]);
  itemsToTable.push([{ content: 'OBSERVACIONES', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold' } }, { content: data.observation, colSpan: 9, styles: { cellPadding: 0.02 } }]);
  doc.autoTable({
    startX: 1.5,
    startY: 2,
    theme: 'striped',
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], 7: { halign: 'right' }, 8: { halign: 'right' }, 9: { halign: 'right' } },
    bodyStyles: { halign: 'left' },
    columnStyles: { 7: { halign: 'right' }, 8: { halign: 'right' }, 9: { halign: 'right' } },
    styles: { font: 'helvetica', fontSize: 6, cellPadding: 0.02, overflow: 'linebreak' },
    head: [[{ content: 'Fecha', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'N. Referencia', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'N. Recibo', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'Placa', styles: { halign: 'left' } },
      { content: 'P. Origen / Proveedor', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'P. Destino / Cliente', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'Material', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'Cantidad', styles: { halign: 'right', cellPadding: 0.02 } },
      { content: 'Valor Unitario', styles: { halign: 'right', cellPadding: 0.02 } },
      { content: 'Valor Total', styles: { halign: 'right', cellPadding: 0.02 } }]],
    body: itemsToTable
  });
  doc.save(data.consecutive + ' - ' + data.third.replace('/', ' ') + '.pdf');
}

function printFreightSettlement (data) {
  /* current date */
  const stringFullDate = (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '');
  const arrayFullDate = stringFullDate.split(' ');
  let arrayDate = arrayFullDate[0].split('/');
  arrayDate = arrayDate.map(function (x) { return x.padStart(2, '0'); });
  const currentDate = arrayDate[0] + '/' + arrayDate[1] + '/' + arrayDate[2];
  const logo = require('~/assets/images/logo-banner.png');
  const doc = new JsPDF('l', 'in', [11, 8.5]);
  const img = new Image();
  img.src = logo;
  doc.addImage(img, 'png', 0.72, 0.74, 1.15, 0.42);
  doc.setFontSize(10.40);
  doc.setTextColor(68, 114, 196);
  doc.setFont('Helvetica', 'bold');
  doc.text(2.12, 0.95, 'NOVUM ENERGIA COLOMBIA SAS CI');
  doc.setFontSize(6.40);
  doc.text(2.12, 1.10, 'Nit: 900.997.047-9');
  doc.setTextColor(0, 0, 0);
  doc.text(8.65, 1.04, 'Fecha de impresión:');
  doc.text(9.59, 1.04, currentDate);
  doc.text(4.63, 1.29, 'LIQUIDACIÓN DE FLETES');
  doc.text(0.7, 1.55, 'TERCERO');
  doc.setFont('Helvetica', 'normal');
  doc.text(1.42, 1.55, data.third);
  doc.setFont('Helvetica', 'bold');
  doc.text(4.82, 1.55, 'LIQUIDACION N°');
  doc.setFont('Helvetica', 'normal');
  doc.text(5.81, 1.55, data.consecutive);
  doc.setFont('Helvetica', 'bold');
  doc.text(7.3, 1.55, 'FECHA');
  doc.setFont('Helvetica', 'normal');
  doc.text(7.9, 1.55, data.date);
  doc.setFont('Helvetica', 'bold');
  doc.text(0.7, 1.8, 'SERVICIOS PRESTADOS ENTRE EL ' + data.startDate + ' Y ' + data.finalDate);
  const itemsToTable = data.tiquets.map((item) => {
    return [item.date, item.referral_number, item.receipt_number, item.license_plate, item.origin_supplier, item.destiny_customer, item.material_name, item.freight_weight_settled, item.unit_value, item.freight_settlement_net_value, item?.round_trip === '1' ? 'SI' : 'NO'];
  });
  itemsToTable.push([{ content: '', colSpan: 11, styles: { cellPadding: 0 } }]);
  itemsToTable.push([{ content: '', colSpan: 6, styles: { cellPadding: 0 } }, { content: 'SUBTOTAL', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold', halign: 'left' } }, { content: data.subtotalAmount, styles: { cellPadding: 0.02, halign: 'right' } }, { content: '', styles: { cellPadding: 0.02, halign: 'left' } }, { content: data.subtotalSettlement, styles: { cellPadding: 0.02, halign: 'right' } }]);
  itemsToTable.push([{ content: '', colSpan: 6, styles: { cellPadding: 0 } }, { content: 'RETENCION EN LA FUENTE', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold', halign: 'left' } }, { content: data.retentionsPercentage, styles: { cellPadding: 0.02, halign: 'right' } }, { content: '', styles: { cellPadding: 0.02, halign: 'left' } }, { content: data.retentions, styles: { cellPadding: 0.02, halign: 'right' } }]);
  itemsToTable.push([{ content: '', colSpan: 6, styles: { cellPadding: 0 } }, { content: 'TOTAL', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold', halign: 'left' } }, { content: '', colSpan: 2, styles: { cellPadding: 0.02, halign: 'left' } }, { content: data.totalSettle, styles: { cellPadding: 0.02, halign: 'right' } }]);
  itemsToTable.push([{ content: '', colSpan: 11, styles: { cellPadding: 0 } }]);
  itemsToTable.push([{ content: 'OBSERVACIONES', colSpan: 1, styles: { cellPadding: 0.02, fontStyle: 'bold' } }, { content: data.observation, colSpan: 10, styles: { cellPadding: 0.02 } }]);
  doc.autoTable({
    startX: 1.5,
    startY: 2,
    theme: 'striped',
    head: [[{ content: 'Fecha', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'N. Referencia', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'N. Recibo', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'Placa', styles: { halign: 'left' } },
      { content: 'P. Origen / Proveedor', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'P. Destino / Cliente', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'Material', styles: { halign: 'left', cellPadding: 0.02 } },
      { content: 'Cantidad', styles: { halign: 'right', cellPadding: 0.02 } },
      { content: 'Valor Unitario', styles: { halign: 'right', cellPadding: 0.02 } },
      { content: 'Valor Total', styles: { halign: 'right', cellPadding: 0.02 } },
      { content: 'Viaje Redondo', styles: { halign: 'left', cellPadding: 0.02 } }]],
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
    bodyStyles: { halign: 'left', cellPadding: 0.02 },
    columnStyles: { 7: { halign: 'right' }, 8: { halign: 'right' }, 9: { halign: 'right' } },
    styles: { font: 'helvetica', fontSize: 6, cellPadding: 0.02, overflow: 'linebreak' },
    body: itemsToTable
  });
  doc.save(data.consecutive + ' - ' + data.third.replace('/', ' ') + '.pdf');
}

export {
  printMaterialSettlement,
  printFreightSettlement
};
