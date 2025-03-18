import {  AfterViewInit, Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Sidebar3Component } from '../sidebar3/sidebar3.component';

import {Chart,registerables} from 'chart.js';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/users.service';
import { ManagerService } from '../../services/manager.service';
import { RevenueService } from '../../services/revenue.service';
import { footer3Component } from '../footer3/footer3.component';
@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, footer3Component,Sidebar3Component],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
// export class Dashboard1Component  implements AfterViewInit{

export class Dashboard1Component {

  managerCount: number = 0;
  userCount: number = 0;
  totalRevenue: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private userService: UserService,  private managerService: ManagerService,private revenueService: RevenueService) {
    Chart.register(...registerables);
    this.getallusers();
    this.getTotalRevenue();
    this.getallmanagers();
  }

  // ngAfterViewInit(): void {
  //   if (isPlatformBrowser(this.platformId))
  //   this.createChart();
  // }

  // createChart(): void {
  //   const ctx = document.getElementById('chart') as HTMLCanvasElement; // Corrected the ID
  //   if (ctx) {
  //     new Chart(ctx, {
  //       type: 'line',
  //       data: {
  //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //         datasets: [{
  //           label: 'Sales',
  //           data: [3, 5, 6, 9, 7, 12, 19],
  //           backgroundColor: 'rgba(75, 192, 192, 0.2)', // Added color
  //           borderColor: 'rgba(75, 192, 192, 1)', // Added border color
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         scales: {
  //           x: {
  //             beginAtZero: true
  //           },
  //           y: {
  //             beginAtZero: true
  //           }
  //         }
  //       }
  //     });
  //   } else {
  //     console.log("canvas error");
  //   }
  // }


  getallusers(): void {
    this.userService.fetchUsers().subscribe(users => {
      this.userCount = users.length;
    });

}

getallmanagers(): void {
  this.managerService.fetchManagers().subscribe(manager => {
    this.managerCount = manager.length;
  });

}

getTotalRevenue(): void {
  this.revenueService.getTotalRevenue().subscribe(revenue => {
    this.totalRevenue = revenue;
  });
}
}