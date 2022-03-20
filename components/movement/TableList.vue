<template>
  <b-card
    title="Movimientos de tiquet"
    sub-title="Opción Para Generar Movimientos de Tiquet">
    <!-- User Interface controls -->
    <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="6">
            <label for="feedback-start-date">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date"
              v-model="start_date"
              placeholder="Seleccione la Fecha Inicial"
              :max="final_date"
            />
            <b-form-invalid-feedback :state="stateStartDate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-final-date">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date"
              v-model="final_date"
              placeholder="Seleccione la Fecha Final"
              :min="start_date"
            />
            <b-form-invalid-feedback :state="stateFinalDate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-button :disabled="stateFilterDisabled" @click="search">Buscar</b-button>
    <!-- Main table element -->
    <template v-if="showList">
      <b-table
        class="text-nowrap"
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
      <template v-slot:custom-foot v-if="items && items.length > 0">
          <tr>
            <td class="font-weight-bold text-center align-middle" colspan="18">
              <b-button @click="save()" v-if="showGenerate">Generar</b-button>
            </td>
          </tr>
        </template>
      </b-table>
    </template>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { typesMovement as types } from '@/store/movement/types';
import { typesCommon } from '@/store/common/typesCommon';
import { existInArray } from '@/helpers/common/array';

export default {
  name: 'table-list',
  data () {
    return {
      view: 'movement',
      fields: [
        { key: 'PREFIJO', label: 'PREFIJO', sortable: true, class: 'text-center' },
        { key: 'CCOSTO', label: 'CCOSTO', sortable: true, class: 'text-center' },
        { key: 'NUMERO', label: 'NUMERO', sortable: true, class: 'text-center' },
        { key: 'FECHA', label: 'FECHA', sortable: true, class: 'text-center' },
        { key: 'ORIGEN', label: 'ORIGEN', sortable: true, class: 'text-center' },
        { key: 'DESTINO', label: 'DESTINO', sortable: true, class: 'text-center' },
        { key: 'PLACA', label: 'PLACA', sortable: true, class: 'text-center' },
        { key: 'ART1', label: 'ART1', sortable: true, class: 'text-center' },
        { key: 'BODEGA', label: 'BODEGA', sortable: true, class: 'text-center' },
        { key: 'ART2', label: 'ART2', sortable: true, class: 'text-center' },
        { key: 'BODEGA2', label: 'BODEGA2', sortable: true, class: 'text-center' },
        { key: 'BRUTO', label: 'BRUTO', sortable: true, class: 'text-center' },
        { key: 'TARA', label: 'TARA', sortable: true, class: 'text-center' },
        { key: 'NETO', label: 'NETO', sortable: true, class: 'text-center' },
        { key: 'TARIFAC', label: 'TARIFAC', sortable: true, class: 'text-center' },
        { key: 'TARIFAT', label: 'TARIFAT', sortable: true, class: 'text-center' },
        { key: 'TIPOES', label: 'TIPOES', sortable: true, class: 'text-center' },
        { key: 'NITTRANS', label: 'NITTRANS', sortable: true, class: 'text-center' }
      ],
      start_date: null,
      final_date: null,
      showList: false,
      showGenerate: false,
      labelTextFieldRequired: 'Campo obligatorio',
      arrayMovements: []
    };
  },
  watch: {
    movements (val) {
      this.showGenerate = existInArray(`${this.view}.generate`, this.userPermisionsGroup);
      this.showList = existInArray(`${this.view}.get`, this.userPermisionsGroup);
    }
  },
  computed: {
    ...mapState(typesCommon.PATH, [
      'userPermisionsGroup'
    ]),
    ...mapState(types.PATH, [
      'movements'
    ]),
    items () {
      return this.movements.data?.map((item) => {
        return {
          ...item
        };
      });
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
    stateFilterDisabled () {
      if (this.final_date === null || this.final_date === '' || this.start_date === null || this.start_date === '') {
        return true;
      }
      return false;
    }
  },
  created () {
  },
  methods: {
    ...mapActions(types.PATH, {
      list: types.actions.GET_MOVEMENTS,
      generate: types.actions.GENERATE_MOVEMENTS
    }),
    async search () {
      await this.list({
        startDate: this.start_date,
        finalDate: this.final_date
      });
    },
    async save () {
      const movementsToLiquidate = Object.assign({}, this.items);
      await this.generate({
        movements: movementsToLiquidate
      });
    }
  }
};
</script>
