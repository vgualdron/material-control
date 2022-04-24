<template>
  <b-card
    title="Liquidar Material"
    sub-title="Opción Para Liquidacion de Material">
    <!-- User Interface controls -->
    <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="4">
            <label for="feedback-type" class="mb-0">Tipo</label>
            <b-form-select
              id="feedback-type"
              v-model="type"
              :options="types"
              @input="cleanFiltersStartDate('T')"
            />
            <b-form-invalid-feedback :state="stateType">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-start-date" class="mb-0">Fecha Inicial</label>
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
            <label for="feedback-final-date" class="mb-0">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date"
              v-model="final_date"
              placeholder="Seleccione la Fecha Final"
              :min="start_date"
              @input="searchThirds"
            />
            <b-form-invalid-feedback :state="stateFinalDate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="4" v-if="type=='C'">
            <label for="feedback-supplier" class="mb-0">Proveedor</label>
            <v-select
              v-if="localeSupplierThirds && localeSupplierThirds.data"
              id="feedback-supplier"
              required
              v-model="supplier"
              :options="localeSupplierThirds.data"
              label="name"
              :reduce="data => data.id"
            />
            <b-form-invalid-feedback :state="stateSupplier">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4" v-if="type=='V'">
            <label for="feedback-customer" class="mb-0">Cliente</label>
            <v-select
              v-if="localeCustomerThirds && localeCustomerThirds.data"
              id="feedback-customer"
              required
              v-model="customer"
              :options="localeCustomerThirds.data"
              label="name"
              :reduce="data => data.id"
            />
            <b-form-invalid-feedback :state="stateCustomer">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-material" class="mb-0">Material</label>
            <v-select
              v-if="materials && materials.data"
              :filterable="false"
              id="feedback-material"
              size="lg"
              required
              v-model="material"
              :options="materials.data"
              label="name"
              :reduce="data => data.id"
              @search="searchMaterials"
            />
          </b-col>
          <b-col md="4">
            <label for="feedback-material-type" class="mb-0">Tipo de material</label>
            <b-form-radio-group
              id="feedback-material-type"
              class="mt-1"
              v-slot="{ ariaDescribedby }"
              v-model="material_type"
            >
              <b-form-radio :aria-describedby="ariaDescribedby" name="material_type" value="T">Por Tonelada</b-form-radio>
              <b-form-radio :aria-describedby="ariaDescribedby" name="material_type" value="U">Por Viaje</b-form-radio>
            </b-form-radio-group>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-button :disabled="stateFilterDisabled" @click="search" class="mt-2 mb-2">Filtrar</b-button>
      <b-button v-if="showAdmin" @click="setRouterActive('adminMaterialSettlement')">Liquidaciones</b-button>
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
        <template v-slot:cell(aux_net_weight)="row">
          <b-form-input
            v-if="row.item.material_unit === 'T' && row.item.type_code === 'V' && row.item.settle_receipt_weight"
            class="transparent-input text-center"
            v-model="row.item.aux_net_weight"
            :disabled="!row.item.settle_receipt_weight || row.item.type_code == 'T'"
            :formatter="formatDecimal"
          />
        </template>
        <template v-slot:cell(material_price)="row">
          <b-form-input
            class="transparent-input text-center"
            v-model="row.item.material_price"
            :formatter="formatDecimal"
            @input="recalculateValues(row.index, row.item.type_code)"
          />
        </template>
        <template v-slot:cell(settle_receipt_weight)="row">
          <b-form-checkbox
            v-if="row.item.type_code === 'V' && row.item.material_unit !== 'U'"
            v-model="row.item.settle_receipt_weight"
          />
        </template>
        <template v-slot:custom-foot v-if="items && items.length > 0">
          <tr>
            <td class="text-right font-weight-bold" colspan="7">
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
            <td class="text-right font-weight-bold" colspan="7">
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
            <td class="text-right font-weight-bold" colspan="7">
              REGALIAS
            </td>
            <td class="font-weight-bold" colspan="1">
              <b-form-input
                class="text-center"
                :formatter="formatDecimal"
                v-model="royalties"
              />
            </td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1"></td>
            <td class="font-weight-bold" colspan="1">
              <b-form-input
                class="transparent-input text-center"
                :formatter="formatDecimal"
                v-model="subtotalRoyalties"
                :disabled="true"
              />
            </td>
            <td class="font-weight-bold" colspan="1"></td>
          </tr>
          <tr>
            <td class="text-right font-weight-bold" colspan="7">
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
            <td class="text-right font-weight-bold" colspan="7">
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
import { typesMaterialSettlement as types } from '@/store/materialSettlement/types';
import { typesThird } from '@/store/third/types';
import { typesCommon } from '@/store/common/typesCommon';
import { typesMaterial } from '@/store/material/types';
import { existInArray } from '@/helpers/common/array';

export default {
  name: 'table-list',
  data () {
    return {
      view: 'materialSettlement',
      fields: [
        { key: 'type', label: 'Tipo', sortable: true, class: 'text-center' },
        { key: 'date', label: 'Fecha', sortable: true, class: 'text-center' },
        { key: 'referral_number', label: 'Numero Remisión', sortable: true, class: 'text-center' },
        { key: 'receipt_number', label: 'Numero Recibo', sortable: true, class: 'text-center' },
        { key: 'material_name', label: 'Material', sortable: true, class: 'text-center' },
        { key: 'origin_supplier', label: 'Patio Despacho / Proveedor', sortable: true, class: 'text-center' },
        { key: 'destiny_customer', label: 'Patio Recepción / Cliente', sortable: true, class: 'text-center' },
        { key: 'net_weight', label: 'Cant. Despacho', sortable: true, class: 'text-center' },
        { key: 'aux_net_weight', label: 'Cant. Recepción', sortable: true, class: 'text-center' },
        { key: 'material_price', label: 'Valor Unitario', sortable: true, class: 'text-center' },
        { key: 'net_price', label: 'Valor Neto', sortable: true, class: 'text-center' },
        { key: 'settle_receipt_weight', label: 'Liquidar Cantidad Recibida', sortable: true, class: 'text-center' }
      ],
      types: [
        { value: 'C', text: 'Compra' },
        { value: 'V', text: 'Venta' }
      ],
      type: 'C',
      start_date: null,
      final_date: null,
      customer: null,
      supplier: null,
      material: null,
      material_type: 'T',
      showSettlement: false,
      showList: false,
      observations: '',
      retention: '2.5',
      royalties: 0,
      third_settled: '',
      start_date_settled: null,
      final_date_settled: null,
      labelTextFieldRequired: 'Campo obligatorio',
      arrayTiquets: []
    };
  },
  watch: {
    materialSettlements (val) {
      this.showSettlement = existInArray(`${this.view}.settle`, this.userPermisionsGroup);
      this.showList = existInArray(`${this.view}.list`, this.userPermisionsGroup);
    }
  },
  computed: {
    ...mapState(typesCommon.PATH, [
      'userPermisionsGroup'
    ]),
    ...mapState(types.PATH, [
      'materialSettlements',
      'materialSettlement'
    ]),
    ...mapState(typesThird.PATH, [
      'localeSupplierThirds',
      'localeCustomerThirds'
    ]),
    ...mapState(typesMaterial.PATH, [
      'materials'
    ]),
    items () {
      return this.materialSettlements.data.map((item) => {
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
      const total = (parseFloat(this.totalValue.toString().replace(/,/g, '')) / 100) * parseFloat(this.retention.toString().replace(/,/g, ''));
      return this.formatDecimal(total);
    },
    subtotalRoyalties () {
      const total = parseFloat(this.subtotalWeight.toString().replace(/,/g, '')) * parseFloat(this.royalties.toString().replace(/,/g, ''));
      return this.formatDecimal(total);
    },
    totalSettle () {
      const total = parseFloat(this.totalValue.toString().replace(/,/g, '')) - parseFloat(this.subtotalRetention.toString().replace(/,/g, '')) - parseFloat(this.subtotalRoyalties.toString().replace(/,/g, ''));
      return this.formatDecimal(total);
    },
    stateType () {
      if (!this.type || this.type === '') {
        return false;
      }
      return true;
    },
    stateFilterDisabled () {
      if (this.type === null || this.type === '' || this.material_type === null || this.material_type === '' || this.start_date === null || this.start_date === '' || this.final_date === null || this.final_date === '' ||
        (this.final_date < this.start_date) || (this.type === 'V' && (this.customer === null || this.customer === '')) || (this.type === 'C' && (this.supplier === null || this.supplier === ''))) {
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
    stateSupplier () {
      if (this.type === 'C' && (this.supplier === null || this.supplier === '')) {
        return false;
      }
      return true;
    },
    stateCustomer () {
      if (this.type === 'V' && (this.customer === null || this.customer === '')) {
        return false;
      }
      return true;
    },
    disableButtonSettle () {
      let disabled = false;
      this.items.forEach((element) => {
        if (element.net_price === null || element.net_price === '' || parseFloat(element.net_price.toString().replace(/,/g, '')) === 0 ||
            (element.settle_receipt_weight && element.settle_receipt_weight === true && parseFloat(element.aux_net_weight.toString().replace(/,/g, '')) === 0)) {
          disabled = true;
        }
      });
      return disabled;
    },
    showAdmin () {
      return existInArray('adminMaterialSettlement.get', this.userPermisionsGroup);
    }
  },
  created () {
    this.searchMaterials();
    this.searchInitialThirds();
  },
  methods: {
    ...mapActions(types.PATH, {
      getMaterialSettlements: types.actions.GET_MATERIAL_SETTLEMENTS,
      settle: types.actions.SAVE,
      print: types.actions.PRINT
    }),
    ...mapActions(typesCommon.PATH, {
      setRouterActive: typesCommon.actions.SET_ROUTER_ACTIVE
    }),
    ...mapActions(typesThird.PATH, {
      getSupplierThirds: typesThird.actions.GET_SUPPLIER_THIRDS,
      getCustomerThirds: typesThird.actions.GET_CUSTOMER_THIRDS
    }),
    ...mapActions(typesMaterial.PATH, {
      getMaterials: typesMaterial.actions.GET_MATERIALS
    }),
    async search () {
      this.retention = '2.5';
      this.royalties = 0;
      this.observations = '';
      await this.getMaterialSettlements({
        type: this.type,
        startDate: this.start_date,
        finalDate: this.final_date,
        material: this.material,
        material_type: this.material_type,
        third: this.type === 'C' ? this.supplier : this.customer
      });
      this.third_settled = this.type === 'C'
        ? this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.nit)[0] + '/' +
        this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.name)[0]
        : this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.nit)[0] + '/' +
        this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.name)[0];
      this.start_date_settled = this.start_date;
      this.final_date_settled = this.final_date;
    },
    searchThirds (search) {
      const data = {
        type: this.type === 'C' ? 'ASOCIADO' : 'CLIENTE',
        movement: this.type,
        start_date: this.start_date,
        final_date: this.final_date
      };
      if (this.type === 'C') {
        this.getSupplierThirds(data);
      } else {
        this.getCustomerThirds(data);
      }
    },
    searchInitialThirds (search) {
      const dataA = {
        type: 'ASOCIADO'
      };
      this.getSupplierThirds(dataA);
      const dataC = {
        type: 'CLIENTE'
      };
      this.getCustomerThirds(dataC);
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
    recalculateValues (index, type) {
      if (type === 'V') {
        this.items[index].net_price = this.formatDecimal(this.items[index].material_price);
      } else {
        const valueToCalculate = parseFloat(this.items[index].net_weight.toString().replace(/,/g, ''));
        const materialPrice = parseFloat(this.items[index].material_price.toString().replace(/,/g, ''));
        const newValue = valueToCalculate * materialPrice;
        this.items[index].net_price = this.formatDecimal(newValue);
      }
    },
    cleanFiltersStartDate (origin) {
      this.final_date = null;
      this.customer = null;
      this.supplier = null;
      if (origin === 'T') {
        this.start_date = null;
      }
    },
    searchMaterials (search) {
      const data = {
        text: search,
        material: this.material,
        loaderState: false
      };
      this.getMaterials(data);
    },
    async save () {
      this.arrayTiquets = [];
      this.items.forEach((element) => {
        const objectTiquets = {
          id: element.id,
          net_value: parseFloat(element.net_price.toString().replace(/,/g, '')),
          settle_receipt_weight: element.settle_receipt_weight,
          weight_settled: element.settle_receipt_weight ? element.aux_net_weight : element.net_weight,
          unit_value: parseFloat(element.material_price.toString().replace(/,/g, ''))
        };
        this.arrayTiquets.push(objectTiquets);
      });
      await this.settle({
        tiquets: this.arrayTiquets,
        type: 'M',
        retentionPercentage: parseFloat(this.retention.toString().replace(/,/g, '')),
        retention: parseFloat(this.subtotalRetention.toString().replace(/,/g, '')),
        royalties: parseFloat(this.subtotalRoyalties.toString().replace(/,/g, '')),
        royaltiesBase: parseFloat(this.royalties.toString().replace(/,/g, '')),
        subtotalSettle: parseFloat(this.totalValue.toString().replace(/,/g, '')),
        subtotalWeight: parseFloat(this.subtotalWeight.toString().replace(/,/g, '')),
        totalSettle: parseFloat(this.totalSettle.toString().replace(/,/g, '')),
        third: this.third_settled,
        startDate: this.start_date_settled,
        finalDate: this.final_date_settled,
        observations: this.observations
      });
      if (this.materialSettlement !== null) {
        this.printReport();
      }
    },
    printReport () {
      this.print(this.materialSettlement);
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
