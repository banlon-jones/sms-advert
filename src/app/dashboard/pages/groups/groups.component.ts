import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../../../services/campaign/campaign.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  campaigns: any;
  campaignId: any;
  createForm: any;
  editForm: any
  constructor(private campaignService: CampaignService) {
    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  ngOnInit(): void {
      this.getCampaigns();
      this.createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('')
      });
  }

  // tslint:disable-next-line:typedef
  get createFormControls(){
    return this.createForm.controls;
  }

  // tslint:disable-next-line:typedef
  get editFormControls(){
    return this.editForm.controls;
  }

  getCampaigns(): void {
    this.campaignService.getMyCampaign().subscribe(
      (res: any) => {
        this.campaigns = res.map((e: any) => ({id: e.payload.doc.id, ...e.payload.doc.data()}));
        console.log(res);
      }
    );
  }

  onSubmit(): void {
    if (!this.createForm.invalid) {
      this.campaignService.createCampaign(this.createForm.value);
    }
    this.createForm.reset();
  }

  getCampaign(id: string): void {
    this.campaignId = id;
    this.campaignService.getCampaign(id).subscribe(
      (res: any) => {
        this.editForm = new FormGroup({
          name: new FormControl(res?.name, Validators.required),
          description: new FormControl(res?.description)
        });
      }
    );
  }

  updateCampaign(): void{
    if (!this.editForm.invalid) {
      this.campaignService.updateCampaign(this.editForm.value, this.campaignId);
    }
  }

  deleteCampaign(id: string): void{
    this.campaignService.deleteCampaign(id);
  }

}
