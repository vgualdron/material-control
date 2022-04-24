export const STORE_REPORT = 'report';
export const typesReport = {
  PATH: `${STORE_REPORT}`,
  getters: {
  },
  mutations: {
    SET_REPORTS: '@mutations/setReports'
  },
  actions: {
    GET_MOVEMENTS_REPORT: '@actions/getMovementsReport',
    GET_YARD_STOCK_REPORT: '@actions/getYardStockReport',
    GET_COMPLETE_TRANSFER_REPORT: '@actions/getCompleteTransferReport',
    GET_UNCOMPLETE_TRANSFERS_REPORT: '@actions/getUncompleteTransfersReport',
    GET_UNBILLED_PURCHASES_REPORT: '@actions/getUnbilledPurchasesReport',
    GET_UNBILLED_SALES_REPORT: '@actions/getUnbilledSalesReport',
    GET_UNBILLED_FREIGHT_REPORT: '@actions/getUnbilledFreightReport'
  }
};

export default {};
