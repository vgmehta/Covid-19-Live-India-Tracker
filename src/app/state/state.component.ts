import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  res: any;
  data: any;
  arr = [];
  state_name: string;
  flag = false;
  public pieChartLabels = ['Total Active', 'Total Desceased', 'Total Recovered'];
  public pieData = [];
  public pieChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartColors = [
    {
      backgroundColor: ['#33a8de', '#c9241e', '#17a63d'],
    },
  ];
  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.http.get('https://api.covid19india.org/state_district_wise.json')
      .subscribe(Response => {

        // If response comes hideloader() function is called
        // to hide that loader
        if (Response) {
          hideloader();
          this.flag = true;
        }
        this.res = Response;
        console.log(this.res);
        this.state_name = this.route.snapshot.queryParamMap.get('name') || 'unknown';
        this.data = this.res[this.state_name].districtData;
        const temp = this.data;
        console.log(this.data);
        this.arr = Object.keys(temp).map(function (districtName) {
          const district = temp[districtName];
          district.district = districtName;
          return district;
        });
        console.log(this.arr);
        this.arr.sort(compare);
        this.pieData.push(this.route.snapshot.queryParamMap.get('active') || 'unknown');
        this.pieData.push(this.route.snapshot.queryParamMap.get('deaths') || 'unknown');
        this.pieData.push(this.route.snapshot.queryParamMap.get('recovered') || 'unknown');
      });
    function hideloader() {
      document.getElementById('loading').style.display = 'none';
    }
    function compare(a, b) {
      if (a.confirmed < b.confirmed) {
        return 1;
      }
      if (a.confirmed > b.confirmed) {
        return -1;
      }
      return 0;
    }
  }

}
