import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CampaignService} from '../../../services/campaign/campaign.service';
import {ContactService} from '../../../services/contact/contact.service';

@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.scss']
})
export class ViewCampaignComponent implements OnInit {

  campaignId: any;
  campaign: any;
  contacts: any;
  constructor(private url: ActivatedRoute, private campaignService: CampaignService,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.getCampaignId();
    this.getCampaignById(this.campaignId);
    this.getContactsByCampaign(this.campaignId);
  }

  getCampaignId(): any{
    this.url.params.subscribe(
      param => this.campaignId = param.id
    );
  }

  getCampaignById(id: string): void{
    this.campaignService.getCampaign(id).subscribe(
      (res: any) => {
        this.campaign = res;
      }
    );
  }

  getContactsByCampaign(campaignId: any): void{
    this.contactService.getByCampaign(campaignId).subscribe(
      (res: any) => {
        this.contacts = res.map((e: any) => ({id: e.payload.doc.id, ...e.payload.doc.data()}));
        console.log(this.contacts);
      }
    );
  }

}
