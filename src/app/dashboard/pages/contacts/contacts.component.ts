import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../../services/contact/contact.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CampaignService} from '../../../services/campaign/campaign.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactId: any;
  editForm: any;
  campaigns: any;
  createForm: any;
  contacts: any;
  constructor(private contactService: ContactService, private campaignService: CampaignService) {
    this.editForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      country_code: new FormControl(''),
      phone: new FormControl(''),
      cid: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getMyContacts();
    this.getMycampaigns()
    this.createForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      country_code: new FormControl(''),
      phone: new FormControl(''),
      cid: new FormControl('')
    });
  }

  getMyContacts(): void{
    this.contactService.getMyContacts().subscribe(
      (res: any) => {
        this.contacts = res.map((e: any) => ({id: e.payload.doc.id, ...e.payload.doc.data()}));
        console.log(this.contacts);
      }
    );
  }

  getMycampaigns(): void{
    this.campaignService.getMyCampaign().subscribe(
      (res: any) => {
        this.campaigns = res.map((e: any) => ({id: e.payload.doc.id, ...e.payload.doc.data()}));
        console.log(this.campaigns);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onSubmit(): void{
    if (!this.createForm.invalid) {
      this.contactService.createContact(this.createForm.value);
    }
    this.createForm.reset();
  }

  getContact(id: string): void{
    this.contactId = id;
    this.contactService.getContact(id).subscribe(
      (res: any) => {
        this.editForm = new FormGroup({
          name: new FormControl(res?.name),
          email: new FormControl(res?.email),
          country_code: new FormControl(res?.country_code),
          phone: new FormControl(res?.phone),
          cid: new FormControl(res?.cid)
        });
      }
    );
  }

  updateContact(): void{
    this.contactService.updateContact(this.editForm.value, this.contactId);
  }

  deleteContact(id: string): void{
    this.contactService.deleteContact(id);
  }

}
