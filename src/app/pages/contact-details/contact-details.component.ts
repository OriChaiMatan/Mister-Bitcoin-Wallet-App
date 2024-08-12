import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject  } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  @Input() contactId!: string
  @Output() back = new EventEmitter()

  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  contact$: Observable<Contact> = this.route.data.pipe(map(data => data['contact']))

  ngOnInit() {
    this.contact$ = this.route.params.pipe(
            switchMap(params => this.contactService.getContactById(params['id']))
        )
}

onBack() {
  this.router.navigateByUrl('/contact')
}

ngOnDestroy(): void {
}
}
