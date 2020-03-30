import { Component, OnInit, OnChanges, ViewChild, OnDestroy } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { CovidService } from 'app/service/covid.service';
import * as _ from "lodash";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, SingleDataSet, BaseChartDirective } from 'ng2-charts';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChartService } from 'app/service/chart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
     localGenderUpdated: boolean
     ofwGenderUpdated: boolean
    public localChartType: ChartType;
    public localChartData: any;
    public localChartLegendItems: LegendItem[];

    public ofwChartType: ChartType;
    public ofwChartData: any;
    public ofwChartLegendItems: LegendItem[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];

    public locationChartType: ChartType;
    public locationChartData: any;
    public locationChartLegendItems: LegendItem[];

    public numberCases: Number;
    public ofwCases: Number;
    public foreignCases: Number;
    public confirmedCasesData = [];
    public ofwCasesData = [];
    public foreignNationalCasesData = [];
    public confirmedCasesSex = {};
    public confirmedCasesResidence = {};
    public confirmedCasesFacility = {};
    public localFemale: Number;
    public localMale: Number;
    public ofwCasesSex = {};
    public ofwCasesResidence = {};
    public ofwFemale: Number;
    public ofwMale: Number;
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    
    public confirmedFacilityDtTrigger: Subject<any> = new Subject();
    confirmedFacilityDataTable: any;
    confirmedFacilityDtOptions: any;
    confirmedFacilityTableData = [];
    @ViewChild('confirmedFacilityTable', {static: true}) confirmedFacilityTable;
  constructor(private  covidService : CovidService,
    private chartService : ChartService) {
      this.chartService.localGenderUpdated.subscribe( value => {
        this.localGenderUpdated = value;
    });
    this.chartService.ofwGenderUpdated.subscribe( value => {
      this.ofwGenderUpdated = value;
  });
   }

  ngOnInit() {
    var self = this;
    this.covidService.getConfirmedCases().subscribe(data=>{
      this.numberCases = data.length;
      this.confirmedCasesData = data;
      this.confirmedCasesSex = _.groupBy(this.confirmedCasesData, 'sex');
      this.confirmedCasesResidence = _.groupBy(this.confirmedCasesData, 'metadata.row_data.residence');
      this.confirmedCasesFacility = _.groupBy(this.confirmedCasesData, 'facility');
      console.log(this.confirmedCasesFacility);
      this.localFemale = Number(this.confirmedCasesSex['Female'].length);
      this.localMale = Number(this.confirmedCasesSex['Male'].length);
      this.addData(this.localChartType, this.localChartData, [this.localMale, this.localFemale], [this.localMale, this.localFemale], 'Local Statistics ' + this.numberCases);
      this.chartService.localGenderUpdated.next(true);

      var facilities = [];
      _.forEach(this.confirmedCasesFacility, function(el,index,arr){
        //console.log( 'facility : ' +index + 'count : ' + el.length);
        facilities.push({"facility" : index , "count" : el.length})
      });
       this.confirmedFacilityDtOptions = {
         data: facilities,
         processing: true,
         columns: [
           {title: 'Facility', data: 'facility'},
           {title: 'Count', data: 'count'}
         ]
       };
    
    }, err => {}, () => {
      this.confirmedFacilityDataTable = $(this.confirmedFacilityTable.nativeElement);
      this.confirmedFacilityDataTable.DataTable(this.confirmedFacilityDtOptions)
    });

     this.localChartType = ChartType.Pie;
     this.localChartData = {
       labels: [],
       series: []
     };
    this.localChartLegendItems = [
      { title: 'Male', imageClass: 'fa fa-circle text-info' },
      { title: 'Female', imageClass: 'fa fa-circle text-danger' }
    ];
    
    this.covidService.getOfwCases().subscribe(data=>{
      this.ofwCases = data.length;
      this.ofwCasesData = data;
      this.ofwCasesSex = _.groupBy(this.ofwCasesData, 'sex');
      this.ofwFemale = Number(this.ofwCasesSex['Female'].length);
      this.ofwMale = Number(this.ofwCasesSex['Male'].length);
      this.addData(this.ofwChartType, this.ofwChartData, [this.ofwMale, this.ofwFemale], [this.ofwMale, this.ofwFemale], 'OFW Statistics ' + this.ofwCases);
      this.chartService.ofwGenderUpdated.next(true);
    });
    this.ofwChartType = ChartType.Pie;
    this.ofwChartData = {
      labels: [],
      series: []
    };
    this.ofwChartLegendItems = [
      { title: 'Male', imageClass: 'fa fa-circle text-info' },
      { title: 'Female', imageClass: 'fa fa-circle text-danger' }
    ];
    }

     addData(chart, chartData, label, data, title) {
          chartData.labels = label;
          chartData.series = data;
          setTimeout(() => {
            chartData.update;
          }, 10);
  }

  groupByAge(ary, keyFunc) {
    var r = {};
    ary.forEach(function(x) {
      var y = keyFunc(x);
      r[y] = (r[y] || []).concat(x);
    });
    return Object.keys(r).map(function(y) {
      return r[y];
    });
  }


  ngOnDestroy(){
    this.chartService.localGenderUpdated.next(false);
    this.chartService.ofwGenderUpdated.next(false);
  }
}
