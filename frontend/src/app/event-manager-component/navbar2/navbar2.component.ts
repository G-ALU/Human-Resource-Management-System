import { Component, EventEmitter,Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-navbar2',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navbar2.component.html',
  styleUrl: './navbar2.component.css'
})
export class Navbar2Component {
        @Output() selectSection = new EventEmitter<string>();
        onSelectSection(section:string){
          this.selectSection.emit(section);
        }
}
