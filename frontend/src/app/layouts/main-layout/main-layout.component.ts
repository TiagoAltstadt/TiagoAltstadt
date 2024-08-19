import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  headerOptions = [
    { tag: 'Home', link: '' }, 
    { tag: 'Experience', link: 'experience' }, // Will have Work, Studies and Projects
    { tag: 'Bio', link: 'bio' },
    { tag: 'Contact', link: 'contact' },
    // { tag: '🌙', link: '#' },
  ]
  menuState: boolean = false;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    console.clear();
    console.log(`
            
   ______________________________  
  |                :%.           |
  |              -@:             |
  |              +@=             |
  |            *@*               |
  |          .%@#                |
  |          :@@%    *@@@%:      |
  |        -@@@:   -@@@@@#       |
  |        +@@@-     =#%%*.       |
  |      *@@@+                   |
  |    .%@@@#                    |
  |    :@@@@@=---:::::::.......  |
  |  .#%%@@@@@@@@@@@@@@@@@@@@#.   |
  |            ...:::-*@@@@%=    |
  |                  +@@@@=      |
  |    .==-        .#@@@+        |
  |    :@@@@#      -@@@*.        |
  |    .#@@@=     +@@#.          |
  |      .     .#@%-             |
  |            -@%-              |
  |          *@=                 |
  |        :%+                   |
  |        .*.                   |
  |______________________________|               
        
  Hello there!
  You found my little easter egg!
  My name is Tiago Altstadt,
  nice to meet you!
  https://www.linkedin.com/in/tiagoaltstadt/
`);
  }

  navigationFunction(link: string) {
    this.router.navigate(['/' + link]);
    console.log('/' + link)
  }

  toggleMenu(state: boolean){
    this.menuState = state;
  }

}
