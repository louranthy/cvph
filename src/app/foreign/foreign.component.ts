import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CovidService } from 'app/service/covid.service';
import { FormatterService } from 'app/service/formatter.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tables',
  templateUrl: './foreign.component.html',
  styleUrls: ['./foreign.component.css']
})

export class ForeignCasesComponent implements OnInit, OnDestroy {
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

    this.covidService.getForeignNationalCases().subscribe(data => {
      this.numberCases = data.length;
      this.tableData = data;

      this.dtOptions = {
        data: this.tableData,
        processing: true,
        columns: [
          { title: 'ID', data: 'caseID' },
          { title: 'AGE', data: 'age' },
          { title: 'SEX', data: 'sex' },
          { title: 'NATIONALITY', data: 'nationality' },
          { title: 'STATUS', data: 'status' },
          { title: 'ARRIVAL', data: 'travel_date.arrival', render: this.formatterService.formatDate },
          { title: 'DEPARTURE', data: 'travel_date.departure', render: this.formatterService.formatDate },
          { title: 'TRAVEL HISTORY', data: 'travel_history' },
          { title: 'CURRENT LOCATION', data: 'where_now' }
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
