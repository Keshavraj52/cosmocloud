import { Component,ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-vaidya',
  

  templateUrl: './vaidya.component.html',
  styleUrls: ['./vaidya.component.css']
})
export class VaidyaComponent {
  lang:string ='';

  constructor(private translateService:TranslateService){
    
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    
  }

  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;

    localStorage.setItem('lang',selectedLanguage);

    this.translateService.use(selectedLanguage);

  }
}
