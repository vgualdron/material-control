<template>
  <b-card
    title="Liquidar Fletes"
    sub-title="Opción Para Liquidacion de Fletes">
    <!-- User Interface controls -->
    <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="4">
            <label for="feedback-start-date">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date"
              v-model="start_date"
              placeholder="Seleccione la Fecha Inicial"
              :max="final_date"
              @input="cleanFiltersStartDate"
            />
            <b-form-invalid-feedback :state="stateStartDate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-final-date">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date"
              v-model="final_date"
              placeholder="Seleccione la Fecha Final"
              :min="start_date"
              @input="searchConveyorThirds"
            />
            <b-form-invalid-feedback :state="stateFinalDate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-conveyor">Empresa Transportadora</label>
              <v-select
                v-if="localeConveyorThirds && localeConveyorThirds.data"
                id="feedback-conveyor"
                required
                v-model="conveyor_company"
                :options="localeConveyorThirds.data"
                label="name"
                :reduce="data => data.id"
                :clearable="false"
              />
              <b-form-invalid-feedback :state="stateConveyorCompany">
                {{ labelTextFieldRequired }}
              </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-button :disabled="stateFilterDisabled" @click="search">Filtrar</b-button>
      <b-button v-if="showAdmin" @click="setRouterActive('adminFreightSettlement')">Liquidaciones</b-button>
    <!-- Main table element -->
    <template v-if="showList">
      <b-table
        :striped="true"
        :bordered="true"
        :hover="true"
        :fixed="true"
        :items="items"
        :fields="fields"
        stacked="md"
        show-empty
        small
      >
        <template v-slot:cell(round_trip)="row">
          <b-form-checkbox
            v-if="row.item.type_code === 'T'"
            :checked="row.item.round_trip=== '1' ? true : false"
            :disabled="true"
          />
        </template>
        <template v-slot:cell(aux_net_weight)="row">
          <b-form-input
            v-if="(row.item.type_code === 'T' && row.item.material_unit !== 'U') || (row.item.settle_receipt_weight && row.item.type_code === 'V')"
            class="transparent-input text-center"
            v-model="row.item.aux_net_weight"
            :disabled="!row.item.settle_receipt_weight || row.item.type_code == 'T'"
            :formatter="formatDecimal"
            @input="recalculateValues(row.index)"
          />
        </template>
        <template v-slot:cell(freight_price)="row">
          <b-form-input
            class="transparent-input text-center"
            v-model="row.item.freight_price"
            :formatter="formatDecimal"
            @input="recalculateValues(row.index)"
          />
        </template>
        <template v-slot:cell(settle_receipt_weight)="row">
          <b-form-checkbox
            v-if="row.item.material_unit !== 'U' && row.item.type_code !== 'C'"
            v-model="row.item.settle_receipt_weight"
            @change="recalculateValues(row.index)"
          />
        </template>
        <template v-slot:custom-foot v-if="items && items.length > 0">
          <tr>
            <td class="text-right font-weight-bold" colspan="9">
              SUBTOTAL
            </td>
            <td class="font-weight-bold" colspan="1">
              <b-form-input
                class="transparent-input  text-center"
                :formatter="formatDecimal"
                v-model="subtotalWeight"
                :disabled="true"
              />
            </td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1">
              <b-form-input
                class="transparent-input  text-center"
                :formatter="formatDecimal"
                v-model="totalValue"
                :disabled="true"
              />
            </td>
            <td class="font-weight-bold" colspan="1"></td>
          </tr>
          <tr>
            <td class="text-right font-weight-bold" colspan="9">
              RETENCION EN LA FUENTE
            </td>
            <td class="font-weight-bold" colspan="1">
              <b-form-input
                class="text-center"
                :formatter="formatDecimal"
                v-model="retention"
              />
            </td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1">
              <b-form-input
                class="transparent-input text-center"
                :formatter="formatDecimal"
                v-model="subtotalRetention"
                :disabled="true"
              />
            </td>
            <td class="font-weight-bold" colspan="1"></td>
          </tr>
          <tr>
            <td class="text-right font-weight-bold" colspan="9">
              TOTAL
            </td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1">
              <b-form-input
                  class="transparent-input text-center"
                  :formatter="formatDecimal"
                  v-model="totalSettle"
                  :disabled="true"
                />
              </td>
            <td class="font-weight-bold" colspan="1"></td>
          </tr>
          <tr>
            <td class="text-right font-weight-bold" colspan="9">
              OBSERVACIONES
            </td>
            <td class="font-weight-bold" colspan="4">
              <b-form-textarea
                v-model="observations"
                placeholder="Escriba sus observaciones"
                rows="3"
                maxLength="200"
              />
            </td>
            <td class="font-weight-bold text-center align-middle" colspan="1">
              <b-button @click="save()" v-if="showSettlement" :disabled="disableButtonSettle">Liquidar</b-button>
            </td>
          </tr>
        </template>
      </b-table>
    </template>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { typesFreightSettlement as types } from '@/store/freightSettlement/types';
import { typesThird } from '@/store/third/types';
import { typesCommon } from '@/store/common/typesCommon';
import { existInArray } from '@/helpers/common/array';
/* import JsPDF from 'jspdf';
import 'jspdf-autotable'; */

export default {
  name: 'table-list',
  data () {
    return {
      view: 'freightSettlement',
      fields: [
        { key: 'type', label: 'Tipo', sortable: true, class: 'text-center' },
        { key: 'round_trip', label: 'Viaje Redondo', sortable: true, class: 'text-center' },
        { key: 'date', label: 'Fecha', sortable: true, class: 'text-center' },
        { key: 'referral_number', label: 'Numero Remisión', sortable: true, class: 'text-center' },
        { key: 'receipt_number', label: 'Numero Recibo', sortable: true, class: 'text-center' },
        { key: 'material_name', label: 'Material', sortable: true, class: 'text-center' },
        { key: 'conveyor_company_name', label: 'Emp. Transportadora', sortable: true, class: 'text-center' },
        { key: 'origin_supplier', label: 'Patio Despacho / Proveedor', sortable: true, class: 'text-center' },
        { key: 'destiny_customer', label: 'Patio Recepción / Cliente', sortable: true, class: 'text-center' },
        { key: 'net_weight', label: 'Cant. Despacho', sortable: true, class: 'text-center' },
        { key: 'aux_net_weight', label: 'Cant. Recepción', sortable: true, class: 'text-center' },
        { key: 'freight_price', label: 'Valor Unitario', sortable: true, class: 'text-center' },
        { key: 'net_price', label: 'Valor Neto', sortable: true, class: 'text-center' },
        { key: 'settle_receipt_weight', label: 'Liquidar Cantidad Recibida', sortable: true, class: 'text-center' }
      ],
      start_date: null,
      final_date: null,
      conveyor_company: null,
      showSettlement: false,
      showList: false,
      observations: '',
      retention: '1.00',
      conveyor_company_settled: '',
      start_date_settled: null,
      final_date_settled: null,
      labelTextFieldRequired: 'Campo obligatorio',
      arrayTiquets: []
    };
  },
  watch: {
    freightSettlements (val) {
      this.showSettlement = existInArray(`${this.view}.settle`, this.userPermisionsGroup);
      this.showList = existInArray(`${this.view}.list`, this.userPermisionsGroup);
    }
  },
  computed: {
    ...mapState(typesCommon.PATH, [
      'userPermisionsGroup'
    ]),
    ...mapState(types.PATH, [
      'freightSettlements',
      'freightSettlement'
    ]),
    ...mapState(typesThird.PATH, [
      'localeConveyorThirds'
    ]),
    items () {
      return this.freightSettlements.data.map((item) => {
        return {
          ...item,
          settle_receipt_weight: false
        };
      });
    },
    subtotalWeight () {
      let total = 0;
      let valueToCalculate;
      this.items.forEach((element) => {
        valueToCalculate = element.settle_receipt_weight ? element.aux_net_weight.toString().replace(/,/g, '') : element.net_weight.toString().replace(/,/g, '');
        total += parseFloat(valueToCalculate);
      });
      return this.formatDecimal(total);
    },
    totalValue () {
      let total = 0;
      this.items.forEach((element) => {
        total += parseFloat(element.net_price.toString().replace(/,/g, ''));
      });
      return this.formatDecimal(total);
    },
    subtotalRetention () {
      //  let retention = parseFloat(this.retention.toString().replace(/,/g, ''));
      const total = (parseFloat(this.totalValue.toString().replace(/,/g, '')) / 100) * parseFloat(this.retention.toString().replace(/,/g, ''));
      return this.formatDecimal(total);
    },
    totalSettle () {
      const total = parseFloat(this.totalValue.toString().replace(/,/g, '')) - parseFloat(this.subtotalRetention.toString().replace(/,/g, ''));
      return this.formatDecimal(total);
    },
    stateFilterDisabled () {
      if (this.start_date === null || this.start_date === '' || this.final_date === null || this.final_date === '' ||
        this.conveyor_company === '' || this.conveyor_company === null || (this.final_date < this.start_date)) {
        return true;
      }
      return false;
    },
    stateStartDate () {
      if (this.start_date === null || this.start_date === '') {
        return false;
      }
      return true;
    },
    stateFinalDate () {
      if (this.final_date === null || this.final_date === '') {
        return false;
      }
      return true;
    },
    stateConveyorCompany () {
      if (this.conveyor_company === null || this.conveyor_company === '') {
        return false;
      }
      return true;
    },
    disableButtonSettle () {
      let disabled = false;
      this.items.forEach((element) => {
        if (element.net_price === null || element.net_price === '' || parseFloat(element.net_price.toString().replace(/,/g, '')) === 0) {
          disabled = true;
        }
      });
      return disabled;
    },
    showAdmin () {
      return existInArray('adminFreightSettlement.get', this.userPermisionsGroup);
    }
  },
  created () {
    this.searchConveyorThirds();
  },
  methods: {
    ...mapActions(typesCommon.PATH, {
      setRouterActive: typesCommon.actions.SET_ROUTER_ACTIVE
    }),
    ...mapActions(types.PATH, {
      getFreightSettlements: types.actions.GET_FREIGHT_SETTLEMENTS,
      settle: types.actions.SAVE,
      print: types.actions.PRINT
    }),
    ...mapActions(typesThird.PATH, {
      getConveyorThirds: typesThird.actions.GET_CONVEYOR_THIRDS
    }),
    async search () {
      this.retention = '1.00';
      this.observations = '';
      await this.getFreightSettlements({
        startDate: this.start_date,
        finalDate: this.final_date,
        conveyorCompany: this.conveyor_company
      });
      this.conveyor_company_settled = this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.nit)[0] + '/' +
                                      this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.name)[0];
      this.start_date_settled = this.start_date;
      this.final_date_settled = this.final_date;
    },
    searchConveyorThirds (search) {
      const data = {
        type: 'CONTRATISTA',
        start_date: this.start_date,
        final_date: this.final_date
      };
      this.getConveyorThirds(data);
    },
    formatDecimal (value) {
      if (value === '.' || value === '0.') {
        return '0.';
      } else {
        value = value === null || value.toString().trim() === '' || value.toString().trim() === '-' ? 0 : value;
        value = value.toString().replace(/[^0-9.-]/g, '');
        value = value.toString();
        if (value === null || value === '' || parseFloat(value) === 0) {
          return 0;
        } else {
          value = value.substring(0, 2) === '0.' ? value : value.replace(/^0+/, '');
          value = value.replace(/[^0-9.-]/g, '');
          value = parseFloat(value) < 0 ? (parseFloat(value) * -1) : value;
          value = value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
        }
      }
    },
    cleanFiltersStartDate () {
      this.final_date = null;
      this.conveyor_company = null;
    },
    recalculateValues (index) {
      const settleCheck = this.items[index].settle_receipt_weight;
      const valueToCalculate = settleCheck ? parseFloat(this.items[index].aux_net_weight.toString().replace(/,/g, '')) : parseFloat(this.items[index].net_weight.toString().replace(/,/g, ''));
      const freightPrice = parseFloat(this.items[index].freight_price.toString().replace(/,/g, ''));
      const newValue = valueToCalculate * freightPrice;
      this.items[index].net_price = this.formatDecimal(newValue);
    },
    async save () {
      this.arrayTiquets = [];
      this.items.forEach((element) => {
        const objectTiquets = {
          id: element.id,
          net_value: parseFloat(element.net_price.toString().replace(/,/g, '')),
          settle_receipt_weight: element.settle_receipt_weight,
          weight_settled: element.settle_receipt_weight ? element.aux_net_weight : element.net_weight,
          unit_value: parseFloat(element.freight_price.toString().replace(/,/g, ''))
        };
        this.arrayTiquets.push(objectTiquets);
      });
      await this.settle({
        tiquets: this.arrayTiquets,
        type: 'F',
        retentionPercentage: parseFloat(this.retention.toString().replace(/,/g, '')),
        retention: parseFloat(this.subtotalRetention.toString().replace(/,/g, '')),
        subtotalSettle: parseFloat(this.totalValue.toString().replace(/,/g, '')),
        subtotalWeight: parseFloat(this.subtotalWeight.toString().replace(/,/g, '')),
        totalSettle: parseFloat(this.totalSettle.toString().replace(/,/g, '')),
        third: this.conveyor_company_settled,
        startDate: this.start_date_settled,
        finalDate: this.final_date_settled,
        observations: this.observations
      });
      if (this.freightSettlement !== null) {
        this.printReport();
      }
    },
    printReport () {
      this.print(this.freightSettlement);
    }
  }
};
</script>
<style>
    input.transparent-input:disabled{
      background-color:transparent !important;
      border:none !important;
      box-shadow: transparent !important;
      padding: 0 !important;
      height: auto !important;
    }
    input.transparent-input{
      background-color:transparent !important;
      border:none !important;
      box-shadow: transparent !important;
      padding: 0 !important;
      height: auto !important;
    }
    input.transparent-input.focus{
      background-color:transparent !important;
      border:none !important;
      box-shadow: transparent !important;
      padding: 0 !important;
      height: auto !important;
    }
</style>
