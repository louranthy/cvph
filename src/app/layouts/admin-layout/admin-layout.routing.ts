import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { LocalCasesComponent } from '../../local/local.component';
import { ForeignCasesComponent } from '../../foreign/foreign.component';
import { OFWCaseComponent } from '../../ofw/ofw.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'local-case', component: LocalCasesComponent },
  { path: 'foreign-case', component: ForeignCasesComponent },
  { path: 'ofw-case', component: OFWCaseComponent },
];
