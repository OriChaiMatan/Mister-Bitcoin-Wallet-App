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

  isEditMode = false

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
      filter(id => !!id), // Check if id exists
      switchMap(id => {
        this.isEditMode = true; // Set to edit mode if id exists
        return this.contactService.getContactById(id);
  }),
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

  onDeleteContact() {
    const id = this.route.snapshot.params['id']; // Get ID from route params
    if (id) {
      this.contactService.deleteContact(id).subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: err => console.log('Error:', err)
      });
    }
  }
  

}
