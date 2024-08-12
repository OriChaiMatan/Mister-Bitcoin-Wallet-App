import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

  private contactService = inject(ContactService)
  private loaderService = inject(LoaderService)
  private destroyRef = inject(DestroyRef)
  isLoading$: Observable<boolean> = this.loaderService.isLoading$
  contacts$: Observable<Contact[]> = this.contactService.contacts$
}
