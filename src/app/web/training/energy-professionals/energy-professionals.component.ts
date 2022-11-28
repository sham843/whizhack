import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-energy-professionals',
  templateUrl: './energy-professionals.component.html',
  styleUrls: ['./energy-professionals.component.css']
})
export class EnergyProfessionalsComponent implements OnInit {
  getAllCoursesData=new Array();
  energyArray=new Array();
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getEnergyData();
  }
  getEnergyData() {
    this.apiService.setHttp('get', "whizhack_cms/course/GetAllCourses", false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe((res:any)=>{
      this.getAllCoursesData=res.responseData;
      this.getAllCoursesData.forEach((ele:any)=>{
        if(ele.pageName=='WhizTeens '){
          this.energyArray.push(ele);
        }
      })
    })
    console.log(this.energyArray)
  }
}


/* actual_price
courseId
course_Caption
course_Description
course_Title
duration
exclusive_offer
imagePath
pageName
price
price_Terms
srNo
syllabus_Summary */