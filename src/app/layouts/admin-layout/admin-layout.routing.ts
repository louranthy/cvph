import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { ForeignCasesComponent } from '../../foreign/foreign.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  //  { path: 'user',           component: UserComponent },
  { path: 'local-case', component: TablesComponent },
  { path: 'foreign-case', component: ForeignCasesComponent },
  //    { path: 'typography',     component: TypographyComponent },
  //  { path: 'icons',          component: IconsComponent },
  //  { path: 'maps',           component: MapsComponent },
  //   { path: 'notifications',  component: NotificationsComponent },
  //  { path: 'upgrade',        component: UpgradeComponent },
];
