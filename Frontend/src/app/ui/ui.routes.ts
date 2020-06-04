import { AddDoctorComponent } from './addDoctor/addDoctor.component';
import {RegisterPatientComponent} from './registerPatient/registerPatient.component';
import {GiveCreateOnlyAccessComponent} from './giveCreateOnlyAccess/giveCreateOnlyAccess.component';
import {PermittedDoctorsComponent} from './permittedDoctors/permittedDoctors.component';
import {AddPrescriptionComponent} from './addPrescription/addPrescription.component';
import {PrescriptionComponent} from './prescription/prescription.component';
import {PatientsComponent} from './patients/patients.component';
import {GiveViewOnlyAccessComponent} from './giveViewOnlyAccess/giveViewOnlyAccess.component';
import {RevokeCreateOnlyAccessComponent} from './revokeCreateOnlyAccess/revokeCreateOnlyAccess.component';
import {RevokeViewOnlyAccessComponent} from './revokeViewOnlyAccess/revokeViewOnlyAccess.component';

import { Routes } from '@angular/router';
export const UiRoute: Routes = [
  { path: '', component: AddDoctorComponent },
  { path: 'addDoc', component: AddDoctorComponent},
  { path: 'registerPatient', component: RegisterPatientComponent},
  { path: 'giveCreateOnlyAccess', component: GiveCreateOnlyAccessComponent},
  { path: 'revokeCreateOnlyAccess', component: RevokeCreateOnlyAccessComponent},
  { path: 'giveViewOnlyAccess', component: GiveViewOnlyAccessComponent},
  { path: 'revokeViewOnlyAccess', component: RevokeViewOnlyAccessComponent},
  { path: 'permittedDoctors', component: PermittedDoctorsComponent},
  { path: 'addPrescription', component: AddPrescriptionComponent},
  { path: 'prescription', component: PrescriptionComponent},
  { path: 'patients', component: PatientsComponent},


];


