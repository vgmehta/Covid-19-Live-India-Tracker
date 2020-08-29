import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { Sort } from '@angular/material/sort';

export interface DistrictData {
  name: string;
  confirmed: number;
  active: number;
  deceased: number;
}

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
  sortedData: DistrictData[];

  public pieChartLabels = ['Total Active', 'Total Desceased', 'Total Recovered'];
  public pieData = [];
  public pieChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
        this.pieData.push(this.route.snapshot.queryParamMap.get('active') || 'unknown');
        this.pieData.push(this.route.snapshot.queryParamMap.get('deaths') || 'unknown');
        this.pieData.push(this.route.snapshot.queryParamMap.get('recovered') || 'unknown');
      });
    function hideloader() {
      document.getElementById('loading').style.display = 'none';
    }
  }
  sortData(sort: Sort) {
    const data = this.arr.slice();
    console.log(data);
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.district, b.district, isAsc);
        // tslint:disable-next-line: radix
        case 'confirmed': return compare(parseInt(a.confirmed), parseInt(b.confirmed), isAsc);
        // tslint:disable-next-line: radix
        case 'active': return compare(parseInt(a.active), parseInt(b.active), isAsc);
        // tslint:disable-next-line: radix
        case 'deceased': return compare(parseInt(a.deceased), parseInt(b.deceased), isAsc);
        default: return 0;
      }
    });
    this.arr = this.sortedData;
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
