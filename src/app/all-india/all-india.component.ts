import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-all-india',
  templateUrl: './all-india.component.html',
  styleUrls: ['./all-india.component.css']
})
export class AllIndiaComponent implements OnInit {

  res: any;
  state_data = [];
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
        this.state_data.sort(compare);
        this.pieData.push(this.state_data[0].active);
        this.pieData.push(this.state_data[0].deaths);
        this.pieData.push(this.state_data[0].recovered);
      });

    function hideloader() {
      document.getElementById('loading').style.display = 'none';
    }
    function compare(a, b) {
      // tslint:disable-next-line: radix
      if (parseInt(a.confirmed) < parseInt(b.confirmed)) {
        return 1;
      }
      // tslint:disable-next-line: radix
      if (parseInt(a.confirmed) > parseInt(b.confirmed)) {
        return -1;
      }
      return 0;
    }
  }
}

