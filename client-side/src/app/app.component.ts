import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { DataSource } from '@angular/cdk/table';

export interface News {
  _id: String;
  title: String;
  author: String;
  date: String;
  story: String;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NewsService]
})
export class AppComponent {
  dataSource: any;
  constructor(private newsService: NewsService){}

  ngOnInit() {
    this.newsService.getNews().subscribe((data)=>{
      this.dataSource = data;
      console.log(this.dataSource);
    });
  } 
  

  displayedColumns: string[] = ['title', 'author', 'date'];


} 
