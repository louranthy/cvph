import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CovidService } from 'app/service/covid.service';
import { FormatterService } from 'app/service/formatter.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tables',
  templateUrl: './ofw.component.html',
  styleUrls: ['./ofw.component.css']
})
export class OFWCaseComponent implements OnInit, OnDestroy {
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

    this.covidService.getOfwCases().subscribe(data => {
      this.numberCases = data.length;
      this.tableData = data;

      this.dtOptions = {
        data: this.tableData,
        processing: true,
        columns: [
          { title: '', data: 'caseID', render: this.formatterService.formatIdToNumber },
          { title: 'ID', data: 'caseID' },
          { title: 'AGE', data: 'age', defaultContent: "<i>NO DATA</i>" },
          { title: 'SEX', data: 'sex', defaultContent: "<i>NO DATA</i>" },
          { title: 'STATUS', data: 'metadata.raw_data.status', defaultContent: "<i>NO DATA</i>" },
          { title: 'COUNTRY', data: 'metadata.raw_data.country', defaultContent: "<i>NO DATA</i>" }
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
