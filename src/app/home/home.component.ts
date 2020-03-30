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
     locationUpdated: boolean;
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
    public locationChartOptions: any;
    public locationChartResponsive: any[];
    public locationChartLegendItems: LegendItem[];

    public locationChartType: ChartType;
    public locationChartData: any;

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
    public confirmedResidenceDtTrigger: Subject<any> = new Subject();
    confirmedResidenceDataTable: any;
    confirmedResidenceDtOptions: any;
    confirmedResidenceTableData = [];
    @ViewChild('confirmedResidenceTable', {static: true}) confirmedResidenceTable;
  constructor(private  covidService : CovidService,
    private chartService : ChartService) {
      this.chartService.localGenderUpdated.subscribe( value => {
        this.localGenderUpdated = value;
    });
    this.chartService.ofwGenderUpdated.subscribe( value => {
      this.ofwGenderUpdated = value;
  });
  this.chartService.locationUpdated.subscribe( value => {
    this.locationUpdated = value;
});
   }

  ngOnInit() {
    var self = this;
    this.covidService.getConfirmedCases().subscribe(data=>{
      this.numberCases = data.length;
      this.confirmedCasesData = data;
      this.confirmedCasesSex = _.groupBy(this.confirmedCasesData, 'sex');
      this.confirmedCasesResidence = _.groupBy(this.confirmedCasesData, function(value){
        if(value.metadata.raw_data.residence == null)
        return 'N/A';
        return _.startCase(_.toLower(value.metadata.raw_data.residence));
    });
      this.confirmedCasesFacility = _.groupBy(this.confirmedCasesData, function(value){
        if(value.facility == null)
        return 'N/A';
        return _.startCase(_.toLower(value.facility));
    });
      this.localFemale = Number(this.confirmedCasesSex['Female'].length);
      this.localMale = Number(this.confirmedCasesSex['Male'].length);
      this.addData(this.localChartType, this.localChartData, [this.localMale, this.localFemale], [this.localMale, this.localFemale]);
      this.chartService.localGenderUpdated.next(true);

      var facilities = [];
      _.forEach(this.confirmedCasesFacility, function(el,index,arr){
        facilities.push({"facility" : index , "count" : arr[index].length})
      });
      var residencies = [];
      _.forEach(this.confirmedCasesResidence, function(el,index,arr){
        residencies.push({"residence" : index , "count" : arr[index].length})
      });
       this.confirmedFacilityDtOptions = {
         data: facilities,
         processing: true,
         columns: [
           {title: 'Facility', data: 'facility'},
           {title: 'Count', data: 'count'}
         ]
       };

       this.confirmedResidenceDtOptions = {
        data: residencies,
        processing: true,
        columns: [
          {title: 'Residence', data: 'residence'},
          {title: 'Count', data: 'count'}
        ]
      };


      var provinceCount = _.groupBy(this.confirmedCasesData, function(value){
        if(value.residence == null)
        return 'N/A';
        if(value.residence.province == null)
        return 'N/A';
        return _.startCase(_.toLower(value.residence.province));
    });
    

    var regionCount = _.groupBy(this.confirmedCasesData, function(value){
      if(value.residence == null)
      return 'N/A';
      if(value.residence.region == null)
      return 'N/A';
      return _.startCase(_.toLower(value.residence.region));
  });
  

  var values = new Array();
  var regions = new Array();
  _.forEach(regionCount, function(el,index,arr){
    regions.push(_.replace(index,"Region",""));
    values.push(arr[index].length);
  });
  this.addBarData(this.locationChartType,this.locationChartData, regions,values);
  this.chartService.locationUpdated.next(true);
    
    }, err => {}, () => {
      this.confirmedFacilityDataTable = $(this.confirmedFacilityTable.nativeElement);
      this.confirmedFacilityDataTable.DataTable(this.confirmedFacilityDtOptions);
      this.confirmedResidenceDataTable = $(this.confirmedResidenceTable.nativeElement);
      this.confirmedResidenceDataTable.DataTable(this.confirmedResidenceDtOptions);
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
    
   



    this.locationChartType = ChartType.Bar;
    this.locationChartData = {
      labels: [],
      series: []
    };
    this.locationChartOptions = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: '245px'
    };
    this.locationChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.locationChartLegendItems = [
   
    ];
    }

     addData(chart, chartData, label, data) {
       
          chartData.labels = label;
          chartData.series = data;
          setTimeout(() => {
            chartData.update;
          }, 10);
  }

  addBarData(chart, chartData, label, data) {
       
    chartData.labels = label;
    chartData.series = []
    chartData.series.push(data);
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
    this.chartService.locationUpdated.next(false);
  }
}
