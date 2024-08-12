import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit {

  private contactService = inject(ContactService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  contact = this.contactService.getEmptyContact()

  ngOnInit(): void {
    this.route.params.pipe(
      filter(params => params['id']),
      switchMap(params => this.contactService.getContactById(params['id'])),
    ).subscribe(contact => {
      this.contact = contact
    })
  }


  onSaveContact() {
    this.contactService.saveContact(this.contact as Contact)
      .subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: err => console.log('err:', err)
      })
  }

}
