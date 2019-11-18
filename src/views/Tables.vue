<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Data Tables</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom d-flex justify-content-between">
            <h6 class="m-0">Active users</h6>
            <button class="btn btn-primary" id="customXLSButton">Export</button>
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <table class="table mb-0" id="table">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">#</th>
                  <th scope="col" class="border-0">First Name</th>
                  <th scope="col" class="border-0">Last Name</th>
                  <th scope="col" class="border-0">Country</th>
                  <th scope="col" class="border-0">City</th>
                  <th scope="col" class="border-0">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ali</td>
                  <td>Kerry</td>
                  <td>Russian Federation</td>
                  <td>Gdańsk</td>
                  <td>107-0339</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Clark</td>
                  <td>Angela</td>
                  <td>Estonia</td>
                  <td>Borghetto di Vara</td>
                  <td>1-660-850-1647</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jerry</td>
                  <td>Nathan</td>
                  <td>Cyprus</td>
                  <td>Braunau am Inn</td>
                  <td>214-4225</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Colt</td>
                  <td>Angela</td>
                  <td>Liberia</td>
                  <td>Bad Hersfeld</td>
                  <td>1-848-473-7416</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../services/firebase';
import { TableExport } from 'tableexport';

const collectionLeads = db.collection('leads');

export default {
  data() {
    return {
      leads: [],
    };
  },
  // created() {
  //   console.log(this.leads);
  // },
  firestore: {
    leads: collectionLeads,
  },
  created() {
    collectionLeads.get().then(() => {
      this.exportFunction();
    });
  },
  methods: {
    exportFunction() {
      const table = document.getElementsByTagName('table');
      const instance = new TableExport(table, {
        formats: ['xls'],
        exportButtons: false,
      });
      /*  eslint-disable  */
      const exportData = instance.getExportData()['table']['xls'];
      /*  eslint-enable */
      const XLSbutton = document.getElementById('customXLSButton');
      XLSbutton.addEventListener('click', () => {
        //                   // data          // mime              // name              // extension
        instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
      });
    },
  },
};
</script>
