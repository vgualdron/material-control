<template>
  <b-card
    title="Gestionar patios"
    sub-title="Opciones de listar, crear, modificar y eliminar patios">
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="12" class="my-1">
        <b-input-group size="sm" class="mb-3 mt-5">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Buscar ..."
            @keyup.enter="search"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
            <b-button v-if="showInsert" class="ml-3" @click="showModal(null, 'create')">Nuevo</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <!-- Main table element -->
    <template v-if="showList">
      <b-table
        :striped="true"
        :bordered="true"
        :hover="true"
        :fixed="true"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page=0
        stacked="md"
        show-empty
        small
      >
        <template #cell(actions)="row">
          <b-button v-if="row.item.showDetail" size="sm" @click="row.toggleDetails" title="Ver detalle">
            {{ row.detailsShowing ? 'Ocultar' : 'Ver' }} detalle
          </b-button>
          <b-button v-if="row.item.showEdit" size="sm" @click="showModal(row.item, 'edit')" class="mr-1" title="Editar">
            <b-icon-pencil-fill></b-icon-pencil-fill>
          </b-button>
          <b-button v-if="row.item.showDelete" size="sm" @click="showModal(row.item, 'delete')" class="mr-1" title="Eliminar">
            <b-icon-trash-fill></b-icon-trash-fill>
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <div v-for="(value, key) in row.item" :key="key">
                <li v-if="key !== '_showDetails'">
                  {{ key }}: {{ value }}
                </li>
              </div>
            </ul>
          </b-card>
        </template>
      </b-table>

      <b-row>
        <b-col sm="9" md="9" class="my-1" style="float: right;">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
            pills
            @input="search"
          ></b-pagination>
        </b-col>
        <b-col sm="3" md="3" class="my-1" style="display: inline-block;">
          <b-form-group
            label="Por página"
            label-for="per-page-select"
            label-cols-sm="8"
            label-cols-md="8"
            label-cols-lg="8"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
              @change="search"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </template>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { typesZone as types } from '@/store/zone/types';
import { typesCommon } from '@/store/common/typesCommon';
import { BIconPencilFill, BIconTrashFill } from 'bootstrap-vue';
import { inArray } from '@/helpers/common/array';

export default {
  name: 'table-list',
  data () {
    return {
      view: 'zone',
      fields: [
        { key: 'code', label: 'Código', sortable: true, class: 'text-center' },
        { key: 'name', label: 'Nombre', sortable: true, class: 'text-center' },
        { key: 'actions', label: 'Acciones', class: 'text-center' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, { value: 100, text: 'Mostrar muchos' }],
      sortBy: '',
      filter: null,
      showInsert: false,
      showList: false
    };
  },
  watch: {
    zones (val) {
      this.totalRows = val.total;
      this.showInsert = inArray(`${this.view}.insert`, this.userPermisionsGroup);
      this.showList = inArray(`${this.view}.list`, this.userPermisionsGroup);
    }
  },
  components: {
    BIconPencilFill,
    BIconTrashFill
  },
  computed: {
    ...mapState(typesCommon.PATH, [
      'userPermisionsGroup'
    ]),
    ...mapState(types.PATH, [
      'zones',
      'zone'
    ]),
    items () {
      return this.zones.data.map((item) => {
        return {
          ...item,
          showDetail: inArray(`${this.view}.get`, this.userPermisionsGroup),
          showEdit: inArray(`${this.view}.update`, this.userPermisionsGroup),
          showDelete: inArray(`${this.view}.delete`, this.userPermisionsGroup)
        };
      });
    },
    sortOptions () {
      return this.fields.filter(f => f.sortable).map((f) => {
        return {
          text: f.label,
          value: f.key
        };
      });
    }
  },
  created () {
    this.search();
  },
  methods: {
    ...mapActions(types.PATH, {
      getZones: types.actions.GET_ZONES,
      setZone: types.actions.SET_ZONE,
      setShowModalForm: types.actions.SET_SHOW_MODAL_FORM,
      setTypeAction: types.actions.SET_TYPE_ACTION
    }),
    showModal (item, action) {
      this.setZone({ ...item });
      this.setTypeAction(action);
      this.setShowModalForm(true);
    },
    search () {
      const data = {
        perPage: this.perPage,
        page: this.currentPage,
        text: this.filter
      };
      this.getZones(data);
    }
  }
};
</script>
