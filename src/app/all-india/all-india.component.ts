import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { Sort } from '@angular/material/sort';

export interface StateData {
  name: string;
  confirmed: number;
  active: number;
  deceased: number;
}


@Component({
  selector: 'app-all-india',
  templateUrl: './all-india.component.html',
  styleUrls: ['./all-india.component.css']
})
export class AllIndiaComponent implements OnInit {

  res: any;
  state_data = [];
  flag = false;
  sortedData: StateData[];

  public pieChartLabels = ['Total Active', 'Total Desceased', 'Total Recovered'];
  public pieData = [];
  public pieChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
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

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    const link = 'https://api.covid19india.org/data.json';
    this.http.get(link)
      .subscribe(Response => {

        // If response comes hideloader() function is called
        // to hide that loader
        if (Response) {
          hideloader();
          this.flag = true;
        }
        console.log(Response);
        this.res = Response;
        this.state_data = this.res.statewise;
        console.log(this.state_data);
        this.pieData.push(this.state_data[0].active);
        this.pieData.push(this.state_data[0].deaths);
        this.pieData.push(this.state_data[0].recovered);
      });

    function hideloader() {
      document.getElementById('loading').style.display = 'none';
    }
  }

  sortData(sort: Sort) {
    const data = this.state_data.slice();
    console.log(data);
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.state, b.state, isAsc);
        // tslint:disable-next-line: radix
        case 'confirmed': return compare(parseInt(a.confirmed), parseInt(b.confirmed), isAsc);
        // tslint:disable-next-line: radix
        case 'active': return compare(parseInt(a.active), parseInt(b.active), isAsc);
        // tslint:disable-next-line: radix
        case 'deceased': return compare(parseInt(a.deaths), parseInt(b.deaths), isAsc);
        default: return 0;
      }
    });
    this.state_data = this.sortedData;
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

