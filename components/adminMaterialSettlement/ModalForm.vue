<template>
  <b-modal
    v-model="showModalForm"
    :id="id"
    no-close-on-backdrop
    no-close-on-esc
    size="xl"
    @hide="resetInfoModal">
    <template #modal-header>
      <h5>{{ title }}</h5>
      <b-icon-x @click="resetInfoModal()" class="icon-close" font-scale="2"></b-icon-x>
    </template>
    <b-form
      @submit="handleForm">
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="4">
            <label for="feedback-consecutive">Consecutivo</label>
            <b-form-input
              id="feedback-consecutive"
              v-model="consecutive"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
          <b-col md="4">
            <label for="feedback-date">Fecha</label>
            <b-form-input
              id="feedback-date"
              v-model="date"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
          <b-col md="4">
            <label for="feedback-third">Tercero</label>
            <b-form-input
              id="feedback-third"
              v-model="third"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="4">
            <label for="feedback-amount">Cantidad</label>
            <b-form-input
              id="feedback-amount"
              v-model="subtotalAmount"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
          <b-col md="4">
            <label for="feedback-retention-percentage">Porcentaje Retencion</label>
            <b-form-input
              id="feedback-retention-precentage"
              v-model="retentionsPercentage"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
          <b-col md="4">
            <label for="feedback-retention">Retención</label>
            <b-form-input
              id="feedback-retention"
              v-model="retentions"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <label for="feedback-base-royalties">Base Regalías</label>
            <b-form-input
              id="feedback-base-royalties"
              v-model="baseRoyalties"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
          <b-col>
            <label for="feedback-royalties">Regalías</label>
            <b-form-input
              id="feedback-royalties"
              v-model="royalties"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
          <b-col md="4">
            <label for="feedback-subtotal">Subtotal</label>
            <b-form-input
              id="feedback-subtotal"
              v-model="subtotalSettlement"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="4">
            <label for="feedback-total">Total</label>
            <b-form-input
              id="feedback-total"
              v-model="totalSettle"
              type="text"
              :disabled="true"
              required>
            </b-form-input>
          </b-col>
          <b-col md="4">
            <label for="feedback-invoice">Factura</label>
            <b-form-input
              id="feedback-invoice"
              v-model="invoice"
              type="text"
              required>
            </b-form-input>
          </b-col>
          <b-col md="4">
            <label for="feedback-invoice-date">Fecha Factura</label>
            <b-form-datepicker
              id="feedback-invoice-date"
              v-model="invoiceDate"
              type="text"
              required>
            </b-form-datepicker>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="4">
            <label for="feedback-internal-document">Documento Interno</label>
            <b-form-input
              id="feedback-internal-document"
              v-model="internalDocument"
              type="text"
              required>
            </b-form-input>
          </b-col>
        </b-form-row>
        <b-form-group>
          <label for="feedbackobservation">Observaciones</label>
          <b-form-textarea
            id="feedbackobservation"
            v-model="observation"
            maxlength="200"
            no-resize
            rows="3"
            :disabled="true"
            >
          </b-form-textarea>
        </b-form-group>
      </b-form-group>
      <b-button
        id="button-submit"
        type="submit"
        href="#"
        variant="primary"
        class="mt-3 form-control"
        :disabled="false"
        @click="handleForm">
        {{ textBtnSubmit }}
      </b-button>
      <b-button
        id="button-submit"
        type="submit"
        href="#"
        variant="primary"
        class="mt-3 form-control"
        :disabled="false"
        @click="printReport">
        Imprimir
      </b-button>
    </b-form>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="secondary"
          size="sm"
          class="float-right"
          @click="resetInfoModal()">
          Cancelar
        </b-button>
      </div>
    </template>
    <template>
      <b-table
        class="mt-4"
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
        <template v-slot:cell(material_settle_receipt_weight)="row">
          <b-form-checkbox
            :checked="row.item.material_settle_receipt_weight=== '1' ? true : false"
            :disabled="true"
          />
        </template>
      </b-table>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { typesAdminMaterialSettlement as types } from '@/store/adminMaterialSettlement/types';
import { BIconX } from 'bootstrap-vue';

export default {
  name: 'modal-form',
  data () {
    return {
      fields: [
        { key: 'type', label: 'Tipo', sortable: true, class: 'text-center' },
        { key: 'date', label: 'Fecha', sortable: true, class: 'text-center' },
        { key: 'referral_number', label: 'Número Referencia', sortable: true, class: 'text-center' },
        { key: 'receipt_number', label: 'Número Recibo', sortable: true, class: 'text-center' },
        { key: 'origin_supplier', label: 'Patio Origen / Proveedor', sortable: true, class: 'text-center' },
        { key: 'destiny_customer', label: 'Patio Destino / Cliente', sortable: true, class: 'text-center' },
        { key: 'unit_value', label: 'Valor Unitario', sortable: true, class: 'text-center' },
        { key: 'material_settle_receipt_weight', label: 'Liquidado Con Peso Destino', class: 'text-center' }
      ],
      id: 'admin-material-settlement-modal',
      title: 'Modificar Liquidación de Material',
      textBtnSubmit: 'Guardar',
      consecutive: '',
      date: '',
      third: '',
      subtotalAmount: '',
      subtotalSettlement: '',
      totalSettle: '',
      retentionsPercentage: '',
      retentions: '',
      baseRoyalties: '',
      royalties: '',
      observation: '',
      invoice: '',
      invoiceDate: '',
      internalDocument: '',
      labelTextFieldRequired: 'Campo obligatorio',
      disabledElements: false
    };
  },
  watch: {
    typeAction (val) {
      if (val === 'edit') {
        this.title = 'Modificar Liquidación de Material';
        this.id = 'edit-admin-material-settlement-modal';
        this.textBtnSubmit = 'Guardar cambios';
        this.disabledElements = false;
      }
    },
    adminMaterialSettlement (val) {
      if (this.typeAction === 'edit') {
        this.consecutive = val.consecutive;
        this.date = val.date;
        this.third = val.third;
        this.subtotalAmount = val.subtotalAmount;
        this.subtotalSettlement = val.subtotalSettlement;
        this.totalSettle = val.totalSettle;
        this.baseRoyalties = val.unitRoyalties;
        this.royalties = val.royalties;
        this.retentionsPercentage = val.retentionsPercentage;
        this.retentions = val.retentions;
        this.invoice = val.invoice;
        this.invoiceDate = val.invoiceDate;
        this.internalDocument = val.internalDocument;
        this.observation = val.observation;
      }
    }
  },
  components: {
    BIconX
  },
  computed: {
    ...mapState(types.PATH, [
      'showModalForm',
      'adminMaterialSettlement',
      'typeAction'
    ]),
    items () {
      if (this.adminMaterialSettlement && this.adminMaterialSettlement?.tiquets) {
        return this.adminMaterialSettlement.tiquets.map((item) => {
          return {
            ...item
          };
        });
      } else {
        return [];
      }
    },
    validationCode () {
      return false;
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(types.PATH, {
      setShowModalForm: types.actions.SET_SHOW_MODAL_FORM,
      edit: types.actions.EDIT,
      print: types.actions.PRINT
    }),
    resetInfoModal () {
      this.consecutive = '';
      this.date = '';
      this.third = '';
      this.subtotalAmount = '';
      this.subtotalSettlement = '';
      this.totalSettle = '';
      this.retentionsPercentaje = '';
      this.retentions = '';
      this.observation = '';
      this.invoice = '';
      this.invoiceDate = null;
      this.internalDocument = null;
      this.setShowModalForm(false);
    },
    async handleForm (event) {
      event.preventDefault();
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.adminMaterialSettlement.id,
          invoice: this.invoice,
          invoiceDate: this.invoiceDate,
          internalDocument: this.internalDocument
        });
      }
    },
    upperFormatter (value) {
      return value.toUpperCase();
    },
    printReport () {
      if (this.adminMaterialSettlement !== null) {
        this.print(this.adminMaterialSettlement);
      }
    }
  }
};
</script>
