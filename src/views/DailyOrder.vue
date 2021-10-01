<template>
  <div style="background: white">
    <b-container fluid class="dah-item-box py-3">
      <b-table
        show-empty
        small
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        empty-text="暫無資料"
      >
        <!-- <template v-slot:cell(date)="row">
          {{ returnCreat(row.item.date) }}
        </template> -->
        <!-- <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="view(row.item, row.index, $event.target)"
            class="mr-1 my-1"
            variant="info"
            >Details</b-button
          >
        </template> -->
      </b-table>
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'DailyOrder',
  data() {
    return {
      date: [],
      selected: null,
      form: {
        pccode: null,
        psccode: null,
        context: '',
      },

      items: [],
      fields: [
        {
          key: 'date',
          label: '日期',
          sortable: true,
          sortDirection: 'date',

          // class: "text-center",
        },
        {
          key: 'count',
          label: '數量',
          sortable: true,
          sortDirection: 'count',
        },
      ],
      mode: '',
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 15, 20, 25],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      modalData: {},
      repost: {},
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      let url = '/api/v1/OrderApi/GetDaliyOrders';
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.items = response.data.data;
          this.totalRows = response.data.data.length;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .md-body-content {
  .dah-item-box {
    .table {
      thead {
        tr {
          th {
            div {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
