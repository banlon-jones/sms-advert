import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CampaignService} from '../../../services/campaign/campaign.service';
import {SmsService} from '../../../services/sms/sms.service';
import {ContactService} from '../../../services/contact/contact.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  campaigns: any;
  smsForm: any;
  recipientsForm: any;
  contacts: any;
  constructor(
    private campaignService: CampaignService,
    private smsService: SmsService,
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.getCampaigns();
    this.smsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
    this.recipientsForm = new FormGroup({
      campaign: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  get smsFormControl(){
    return this.smsForm.controls;
  }

  // tslint:disable-next-line:typedef
  get recipientsFormControl(){
    return this.recipientsForm.controls;
  }

  sendSms(): void{
    const{campaign} = this.recipientsForm.value;
    this.getContactsByCampaign(campaign);
    const{name, message} = this.smsForm.value;
    this.smsService.send(this.contacts, name, message);
  }

  onSubmit(): void{
    console.log(this.smsForm);
  }

  getCampaigns(): void{
    // @ts-ignore
    this.campaignService.getMyCampaign().subscribe(
      (res: any) => {
        this.campaigns = res.map((e: any) => ({id: e.payload.doc.id, ...e.payload.doc.data()}));
      }
    );
  }

  getContactsByCampaign(id: string): any{
    this.contactService.getByCampaign(id).subscribe(
      (res: any) => {
      this.contacts = res.map((e: any) => ({id: e.payload.doc.id, ...e.payload.doc.data()}));
      }
    );
  }

}
