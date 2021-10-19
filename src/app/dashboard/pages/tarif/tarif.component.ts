import { Component, OnInit } from '@angular/core';
import {TarifService} from '../../../services/tarif/tarif.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.scss']
})
export class TarifComponent implements OnInit {

  createTarifForm: any;
  editTarifForm: any;
  tarifId: any;
  tarifs: any;

  constructor(private tarifService: TarifService) {
    this.editTarifForm = new FormGroup({
      name: new FormControl('', Validators.required),
      min: new FormControl('', Validators.required),
      max: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getTarifs();
    this.createTarifForm = new FormGroup({
      name: new FormControl('', Validators.required),
      min: new FormControl('', Validators.required),
      max: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  get tarifControl() {
    return this.createTarifForm.controls;
  }

  // tslint:disable-next-line:typedef
  get editControl() {
    return this.editTarifForm.controls;
  }

  onSubmit(): void{
    if (!this.createTarifForm.invalid){
      this.tarifService.createTarif(this.createTarifForm.value).then(
        () => {
          // success
        }
      );
    }
    this.createTarifForm.reset();
  }

  getTarifs(): void {
    this.tarifService.getTarifs().subscribe(
      (res: any) => {
        this.tarifs = res.map((e: any) => ({id: e.payload.doc.id, ...e.payload.doc.data()}));
      }
    );
  }

  getTarif(id: string): void{
    this.tarifId = id;
    this.tarifService.getTatif(id).subscribe(
      (res: any) => {
        this.editTarifForm = new FormGroup({
          name: new FormControl(res?.name, Validators.required),
          min: new FormControl(res?.min, Validators.required),
          max: new FormControl(res?.max, Validators.required),
          price: new FormControl(res?.price, Validators.required)
        });
      }
    );
  }

  updateTarif(): void {
    this.tarifService.updateTarif(this.editTarifForm.value, this.tarifId);
  }

  deleteTarif(id: string): void{
    this.tarifService.deleteTarif(id);
  }

}
