import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocialService } from '../interfaces/model';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-social-service',
  templateUrl: './social-service.component.html',
  styleUrls: ['./social-service.component.scss']
})
export class SocialServiceComponent implements OnInit {
  @Input() socialService: SocialService | null = null;
  @Output() socialServiceRemoved = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  unselectSS(){
    this.socialServiceRemoved.emit();
  }
}
