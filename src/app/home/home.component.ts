import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { CovidService } from 'app/service/covid.service';
import * as _ from "lodash";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    public localFemale: Number;
    public localMale: Number;
    public ofwCasesSex = {};
    public ofwCasesResidence = {};
    public ofwFemale: Number;
    public ofwMale: Number;
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
    public pieChartData: SingleDataSet = [30, 50, 20];
    public pieChartType: ChartType.Pie;
    public pieChartLegend = true;
    public pieChartPlugins = [];
  constructor(private  covidService : CovidService) {
     
   }

  ngOnInit() {

    
    var self = this;
    this.covidService.getConfirmedCases().subscribe(data=>{
      this.numberCases = data.length;
      this.confirmedCasesData = data;
      this.confirmedCasesSex = _.groupBy(this.confirmedCasesData, 'sex');
      this.confirmedCasesResidence = _.groupBy(this.confirmedCasesData, 'metadata[row_data][residence]');
      this.localFemale = Number(this.confirmedCasesSex['Female'].length);
      this.localMale = Number(this.confirmedCasesSex['Male'].length);
      this.addData(this.localChartType, this.localChartData, [this.localMale, this.localFemale], [this.localMale, this.localFemale], 'Local Statistics ' + this.numberCases);
    
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
     

      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Click', imageClass: 'fa fa-circle text-danger' },
        { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
        { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      ];


    }

     addData(chart, chartData, label, data, title) {
        setTimeout(() => {
          chartData.labels = label;
          chartData.series = data;
          chart.update;
        }, 500);
  }
}
