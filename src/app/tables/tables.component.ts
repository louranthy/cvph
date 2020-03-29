import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CovidService } from 'app/service/covid.service';
import { FormatterService } from 'app/service/formatter.service';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy {
  public numberCases: Number;
  public data = [];
  public dtTrigger: Subject<any> = new Subject();
  dataTable: any;
  dtOptions: any;
  tableData = [];
  @ViewChild('datatable', { static: true }) table;
  constructor(
    private covidService: CovidService,
    private formatterService: FormatterService
  ) { }

  ngOnInit() {

    this.covidService.getConfirmedCases().subscribe(data => {
      this.numberCases = data.length;
      this.tableData = data;
      console.log(this.tableData);
      this.dtOptions = {
        data: this.tableData,
        processing: true,
        columns: [
          { title: '', data: 'caseID', render: this.formatterService.formatIdToNumber },
          { title: 'ID', data: 'caseID' },
          { title: 'AGE', data: 'age' },
          { title: 'SEX', data: 'sex' },
          { title: 'STATUS', data: 'status' },
          { title: 'FACILITY', data: 'facility' },
          { title: 'RESIDENCE', data: 'metadata.raw_data.residence' },
          { title: 'TRAVEL HISTORY', data: 'metadata.raw_data.travel_history' }
        ]
      };
    }, err => { }, () => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
