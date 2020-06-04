import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TopNavComponent} from './top-nav/top-nav.component';
import {AppMaterialModule} from '../app.material.module';
import {UiRoute} from './ui.routes';
import {RouterModule} from '@angular/router';
import {AddDoctorComponent} from './addDoctor/addDoctor.component';
import {RegisterPatientComponent} from './registerPatient/registerPatient.component';
import {GiveCreateOnlyAccessComponent} from './giveCreateOnlyAccess/giveCreateOnlyAccess.component';
import {PermittedDoctorsComponent} from './permittedDoctors/permittedDoctors.component';
import {AddPrescriptionComponent} from './addPrescription/addPrescription.component';
import {PrescriptionComponent} from './prescription/prescription.component';
import {PatientsComponent} from './patients/patients.component';
import {GiveViewOnlyAccessComponent} from './giveViewOnlyAccess/giveViewOnlyAccess.component';
import {RevokeCreateOnlyAccessComponent} from './revokeCreateOnlyAccess/revokeCreateOnlyAccess.component';
import {RevokeViewOnlyAccessComponent} from './revokeViewOnlyAccess/revokeViewOnlyAccess.component';

@NgModule({
  declarations: [TopNavComponent,

    AddDoctorComponent,
    RegisterPatientComponent,
    GiveCreateOnlyAccessComponent,PermittedDoctorsComponent,AddPrescriptionComponent,PrescriptionComponent,PatientsComponent,GiveViewOnlyAccessComponent,
    RevokeCreateOnlyAccessComponent,RevokeViewOnlyAccessComponent],
  imports: [
    AppMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UiRoute)
  ],
  exports: [
    TopNavComponent
  ], providers: []
})
export class UiModule {
}
