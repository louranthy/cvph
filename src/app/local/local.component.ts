import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CovidService } from 'app/service/covid.service';
import { FormatterService } from 'app/service/formatter.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-tables',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalCasesComponent implements OnInit, OnDestroy {
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

      this.dtOptions = {
        data: this.tableData,
        processing: true,
        columns: [
          { title: '', data: 'caseID', render: this.formatterService.formatIdToNumber },
          { title: 'ID', data: 'caseID' },
          { title: 'AGE', data: 'age' },
          { title: 'SEX', data: 'sex' },
          { title: 'NATIONALITY', data: 'nationality' },
          { title: 'STATUS', data: 'status' },
          { title: 'FACILITY', data: 'facility' },
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
