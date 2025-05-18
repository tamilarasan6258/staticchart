// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';

interface ExpenseData {
  month: string;
  shopping: number;
  food: number;
  travel: number;
  others: number;
}


@Component({
  selector: 'app-pie-chart',
  imports: [FormsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements AfterViewInit {

  
 @ViewChild('chartContainer') chartContainer!: ElementRef;
 chartInstance: echarts.ECharts | null = null;
 chartType: string = 'bar';

 expenses: ExpenseData[] = [
   { month: 'January', shopping: 50000, food: 45000, travel: 3000, others: 4000 },
   { month: 'February', shopping: 52000, food: 46000, travel: 3200, others: 3800 },
   { month: 'March', shopping: 51000, food: 47000, travel: 2900, others: 4200 }
 ];

 ngAfterViewInit(): void {
   this.chartInstance = echarts.init(this.chartContainer.nativeElement);
   this.renderChart();
   setTimeout(() => this.chartInstance?.resize(), 100);
 }

 renderChart(): void {
   if (!this.chartInstance) return;

   
        const total = { shopping: 0, food: 0, travel: 0, others: 0 };
  
        this.expenses.forEach(e => {
          total.shopping += e.shopping;
          total.food += e.food;
          total.travel += e.travel;
          total.others += e.others;
        });
  
        const pieData = [
          { name: 'shopping', value: total.shopping },
          { name: 'Food', value: total.food },
          { name: 'Travel', value: total.travel },
          { name: 'Others', value: total.others }
        ];
  
        const option: echarts.EChartsOption = {
          title: { text: 'Total Expenses by Category', left: 'center' },
          tooltip: { trigger: 'item', formatter: '{b}: ₹{c} ({d}%)' },
          legend: { bottom: 10, left: 'center' },
          series: [
            {
              type: 'pie',
              radius: '60%',
              data: pieData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
  
        this.chartInstance.setOption(option, true);
      }
  
}

